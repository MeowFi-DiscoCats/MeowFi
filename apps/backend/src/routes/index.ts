import { Router } from "express";
import vaultRoutes from "./vault";
import adminRoutes from "./admin";
import referralRoutes from "./referral";
import authRoutes from "./auth";
import verifyRoutes from "./verify";

const router = Router();

const API_PREFIX = "/api";

router.use(`${API_PREFIX}/vault`, vaultRoutes);
router.use(`${API_PREFIX}/admin`, adminRoutes);
router.use(`${API_PREFIX}/referral`, referralRoutes);
router.use(`${API_PREFIX}/auth`, authRoutes);
router.use(`${API_PREFIX}/verify`, verifyRoutes);

export default router;
