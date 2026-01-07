// // controllers/loan.controller.ts
// import type { Request, Response } from "express";
// import { LoanService } from "./../services/auth.loanService";

// export class LoanController {
//   static async calculateLoan(req: Request, res: Response) {
//     try {
//       const { userId, groupId, periodMonths } = req.body;

//       const result = await LoanService.calculateLoan({
//         userId,
//         groupId,
//         periodMonths,
//       });

//       res.json(result);
//     } catch (err) {
//       res.status(400).json({ error: (err as Error).message });
//     }
//   }

//   static async requestLoan(req: Request, res: Response) {
//     try {
//       const { userId, groupId, periodMonths } = req.body;

//       const result = await LoanService.requestLoan({
//         userId,
//         groupId,
//         periodMonths,
//       });

//       res.status(201).json(result);
//     } catch (err) {
//       res.status(400).json({ error: (err as Error).message });
//     }
//   }
// }
