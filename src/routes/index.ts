import express, { Router } from "express";
import authUserRouter from "./auth.userRouter";
// import authLoanRouter from "./aouth.loanRouter";
import contributionRoutes from "./auth.contributionRouter";
import AuthGroupmemberRouter from "./auth.groupmemberRouter";
// import groupMemberRouter from "./auth.groupmemberRouter";

const mainRouter: Router = express.Router();

mainRouter.use("/users", authUserRouter);
// mainRouter.use("/loans", authLoanRouter);
mainRouter.use("/contributions", contributionRoutes);
mainRouter.use("/group-members", AuthGroupmemberRouter);


export default mainRouter;