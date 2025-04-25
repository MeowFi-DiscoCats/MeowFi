import { Router } from "express";
import vaultRoutes from "./vault";
import adminRoutes from "./admin";
import referralRoutes from "./referral";

const router = Router();

const API_PREFIX = "/api";

router.use(`${API_PREFIX}/vault`, vaultRoutes);
router.use(`${API_PREFIX}/admin`, adminRoutes);
router.use(`${API_PREFIX}/referral`, referralRoutes);

export default router;
