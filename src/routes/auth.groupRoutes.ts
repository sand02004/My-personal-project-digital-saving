import { Router } from "express";
import { GroupController } from "../controllers/auth.groupController";
import { authenticate } from "../Middlewares/auth.middleware";

const router = Router();

router.use(authenticate);

router.post("/", GroupController.createGroup);
router.get("/my", GroupController.getMyGroups);
router.get("/:id", GroupController.getGroup);
router.put("/:id", GroupController.updateGroup);
router.delete("/:id", GroupController.deleteGroup);
router.post("/:id/members", GroupController.addMember);
router.delete("/:id/members/:userId", GroupController.removeMember);
router.get("/:id/members", GroupController.getMembers);

export default router;
