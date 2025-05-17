import { Router } from "express";
import passport from "passport";
import { ethers } from "ethers";
import { z } from "zod";

import { User, IUser } from "../models/user";
import asyncWrapper from "../utils/asyncWrapper";
import { CustomError } from "../utils/errorMiddleware";
import { provider, ERC721_ABI, ROLE_MAP, giveRole } from "../setup/discord";

const router = Router();

const verifySchema = z.object({
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
  signature: z.string(),
  nftAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid NFT address"),
  nftName: z.string(),
  guildId: z.string(),
});

// const LIMITED_ROLE_ID = "1367487915097063514";
// const ROLE_ASSIGNMENT_LIMIT = 200;

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  asyncWrapper(async (req, res) => {
    const authenticatedUser = req.user as IUser;
    const { address, signature, nftAddress, nftName, guildId } =
      verifySchema.parse(req.body);

    const recovered = ethers.verifyMessage(nftName, signature);
    if (recovered.toLowerCase() !== address.toLowerCase()) {
      throw new CustomError("Signature verification failed", 401);
    }

    const dbUser = await User.findOne({ email: authenticatedUser.email });
    if (!dbUser) {
      throw new CustomError("Authenticated user not found in database", 404);
    }

    if (!dbUser.walletAddress) {
      dbUser.walletAddress = address;
    } else if (dbUser.walletAddress.toLowerCase() !== address.toLowerCase()) {
      throw new CustomError(
        "Provided wallet address does not match user's bound wallet address.",
        400,
      );
    }

    const nftContract = new ethers.Contract(nftAddress, ERC721_ABI, provider);
    const balance = await nftContract.balanceOf(address);
    if (Number(balance) === 0) {
      throw new CustomError("User does not own the required NFT", 400);
    }

    const guildRoles = ROLE_MAP[guildId];
    if (!guildRoles) {
      throw new CustomError("No roles configured for this guild", 500);
    }

    const roleIdToAssign = guildRoles[nftAddress];
    if (!roleIdToAssign) {
      throw new CustomError(
        "No Discord role mapped for this NFT in this guild",
        500,
      );
    }

    if (dbUser.roles.includes(roleIdToAssign)) {
      throw new CustomError("User already has this role", 400);
    }

    // if (roleIdToAssign === LIMITED_ROLE_ID) {
    //   const usersWithLimitedRoleCount = await User.countDocuments({
    //     roles: LIMITED_ROLE_ID,
    //   });
    //
    //   if (usersWithLimitedRoleCount >= ROLE_ASSIGNMENT_LIMIT) {
    //     throw new CustomError(
    //       `The role (${LIMITED_ROLE_ID}) has reached its assignment limit of ${ROLE_ASSIGNMENT_LIMIT} users.`,
    //       403,
    //     );
    //   }
    // }

    if (!dbUser.discordId) {
      throw new CustomError("User does not have a Discord ID linked.", 500);
    }
    await giveRole(dbUser, roleIdToAssign, guildId);

    dbUser.roles.push(roleIdToAssign);
    await dbUser.save();

    res.json({ message: "Role assigned successfully" });
  }),
);

export default router;
