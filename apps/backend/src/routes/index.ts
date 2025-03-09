import { Router } from "express";
import vaultRoutes from "./vault";
import adminRoutes from "./admin";

const router = Router();

const API_PREFIX = "/api";

router.use(`${API_PREFIX}/vault`, vaultRoutes);
router.use(`${API_PREFIX}/admin`, adminRoutes);

export default router;
