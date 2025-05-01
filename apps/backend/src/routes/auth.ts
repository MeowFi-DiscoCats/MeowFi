import { Router } from "express";
import asyncWrapper from "../utils/asyncWrapper";
import passport from "passport";
import { IUser } from "../models/user";
import { CustomError } from "../utils/errorMiddleware";
import jwt from "jsonwebtoken";
import { ethers } from "ethers";
import { z } from "zod";
import { User } from "../models/user";
import { Contract } from "ethers";
import { Client, GatewayIntentBits } from "discord.js";

const router = Router();

router.get("/discord", passport.authenticate("discord", { session: false }));

router.get(
  "/discord/callback",
  passport.authenticate("discord", {
    failureRedirect: "/error",
    session: false,
  }),
  asyncWrapper(async (req, res) => {
    const user = req.user as IUser;

    if (!user) {
      throw new CustomError("User not authorized", 403);
    }

    const token = jwt.sign(
      { id: user.username, email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "10m",
      },
    );

    res.redirect(`${process.env.REDIRECT_URL}?token=${token}`);
  }),
);

const verifySchema = z.object({
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
  signature: z.string(),
  nftAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid NFT address"),
  nftName: z.string(),
  guildId: z.string(),
});

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const ERC721_ABI = ["function balanceOf(address owner) view returns (uint256)"];

router.post(
  "/verify",
  passport.authenticate("jwt", { session: false }),
  asyncWrapper(async (req, res) => {
    const user = req.user as IUser;
    const { address, signature, nftAddress, nftName, guildId } =
      verifySchema.parse(req.body);

    const recovered = ethers.verifyMessage(nftName, signature);
    if (recovered.toLowerCase() !== address.toLowerCase()) {
      throw new CustomError("Signature verification failed", 401);
    }

    const dbUser = await User.findOne({ email: user.email });
    if (!dbUser) {
      throw new CustomError("User not found", 404);
    }
    if (
      dbUser.walletAddress &&
      dbUser.walletAddress.toLowerCase() !== address.toLowerCase()
    ) {
      throw new CustomError("Wallet already bound to another user", 400);
    }

    const nft = new Contract(nftAddress, ERC721_ABI, provider);
    const balance = await nft.balanceOf(address);
    if (Number(balance) === 0) {
      throw new CustomError("User does not own the required NFT", 400);
    }

    if (dbUser.roles.includes(ROLE_MAP[nftAddress])) {
      throw new CustomError("User already has this role", 400);
    }

    if (!dbUser.walletAddress) {
      dbUser.walletAddress = address;
    }

    await giveRole(dbUser, nftAddress, guildId);

    dbUser.roles.push(ROLE_MAP[nftAddress]);
    await dbUser.save();

    res.json({ message: "Role assigned successfully" });
  }),
);

const discordClient = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

discordClient.login(process.env.DISCORD_TOKEN);

const ROLE_MAP: Record<string, string> = {
  "0x34AF03074B7F72CFd1B1b0226d088A1E28c7405D": "1367438351703212043",
};

const giveRole = async (user: IUser, nftAddress: string, guildId: string) => {
  const roleId = ROLE_MAP[nftAddress];
  if (!roleId) {
    throw new CustomError("No Discord role mapped for this NFT", 500);
  }
  const guild = await discordClient.guilds.fetch(guildId);
  const member = await guild.members.fetch(user.discordId!);
  await member.roles.add(roleId);
};

export default router;
