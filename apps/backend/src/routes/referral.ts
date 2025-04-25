import { Router } from "express";
import asyncWrapper from "../utils/asyncWrapper";
import { z } from "zod";
import { Referral } from "../models/referral";

const router = Router();

const successSchema = z.object({
  walletAddress: z
    .string()
    .nonempty()
    .transform((s) => s.toLowerCase()),
  refCode: z.string().nonempty(),
});

router.post(
  "/success",
  asyncWrapper(async (req, res) => {
    const { refCode, walletAddress } = successSchema.parse(req.body);

    let referral = await Referral.findOne({ referredCode: refCode });

    if (!referral) {
      referral = new Referral({
        referrerWallet: walletAddress,
        referredCode: refCode,
        referredWallets: [],
        count: 0,
      });
      await referral.save();
      return res.status(201).json({
        success: true,
        data: referral,
        message: "New referral created.",
      });
    }

    if (
      referral.referrerWallet !== walletAddress &&
      !referral.referredWallets.includes(walletAddress)
    ) {
      referral.referredWallets.push(walletAddress);
      referral.count += 1;
      await referral.save();
    }

    res.status(200).json({ success: true, data: referral });
  }),
);

const countQuery = z.object({
  address: z
    .string()
    .nonempty()
    .transform((s) => s.toLowerCase()),
});

router.get(
  "/count",
  asyncWrapper(async (req, res) => {
    const { address } = countQuery.parse(req.query);
    const record = await Referral.findOne({ referrerWallet: address });
    const count = record?.count ?? 0;
    res.status(200).json({ success: true, count });
  }),
);

export default router;
