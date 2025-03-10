import { Router } from "express";
import asyncWrapper from "../utils/asyncWrapper";
import Vault from "../models/vault";
import { z } from "zod";
import { processAndSaveImage, uploadImg } from "../setup/multer";
import { CustomError } from "../utils/errorMiddleware";
import path from "path";
import passport from "passport";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 300 });
const router = Router();

router.get(
  "/",
  asyncWrapper(async (_req, res) => {
    let vaults = cache.get("vaults");
    if (!vaults) {
      vaults = await Vault.find();
      cache.set("vaults", vaults);
    }
    res.json(vaults);
  }),
);

router.post(
  "/",
  uploadImg.single("img"),
  passport.authenticate("jwt", { session: false }),
  asyncWrapper(async (req, res) => {
    if (!req.file) {
      throw new CustomError("file not found", 400);
    }
    const filename = await processAndSaveImage(req.file);

    const validator = z.object({
      title: z.string(),
      lockedInPeriod: z.preprocess((val) => Number(val), z.number()),
      APR: z.preprocess((val) => Number(val), z.number()),
      type: z.enum(["fixed", "flexible"]),
      earnings: z.preprocess((val) => Number(val), z.number()),
      proxyAddress: z.string(),
      tokenAddress: z.string(),
      AirdropIncentivised: z.preprocess((val) => Number(val), z.number()),
      totalSupply: z.preprocess((val) => Number(val), z.number()),
      availableSupply: z.preprocess((val) => Number(val), z.number()),
      joinInPeriod: z.string(),
      claimInPeriod: z.string(),
      price: z.preprocess((val) => Number(val), z.number()),
      yieldValue: z.preprocess((val) => Number(val), z.number()),
      backingRatio: z.preprocess((val) => Number(val), z.number()),
      backingPercentage: z.preprocess((val) => Number(val), z.number()),
      tokenSymbol: z.string(),
      NFTLimit: z.preprocess((val) => Number(val), z.number()),
    });

    const validatedData = validator.parse(req.body);
    const vault = new Vault({ ...validatedData, img: filename });
    await vault.save();

    cache.del("vaults");
    res.json(vault);
  }),
);

router.get("/:url", (req, res) => {
  const fileUrl = z.string().parse(req.params.url);
  const filePath = path.join(__dirname, "../files/images/", fileUrl);
  res.sendFile(filePath);
});

export default router;
