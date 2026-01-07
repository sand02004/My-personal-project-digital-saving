import express, { Router } from "express";
import authUserRouter from "./auth.userRouter";
// import authLoanRouter from "./aouth.loanRouter";
import contributionRoutes from "./auth.contributionRouter";

const mainRouter: Router = express.Router();

mainRouter.use("/users", authUserRouter);
// mainRouter.use("/loans", authLoanRouter);
mainRouter.use("/contributions", contributionRoutes);


export default mainRouter;