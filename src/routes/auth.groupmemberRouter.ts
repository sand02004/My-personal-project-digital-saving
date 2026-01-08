import { Router } from "express";
import { GroupMemberController } from "../controllers/auth.groupmemberController";




const router = Router();
// Routes
router.post("/", GroupMemberController.create);

export default router;