// // services/loan.service.ts
// import { Loan } from ""
// import { GroupMember } from "../models/groupMember";
// import { User } from "../models/user";

// interface LoanRequest {
//   userId: number;
//   groupId: number;
//   periodMonths: number;
// }

// export class LoanService {
//   static async calculateLoan(request: LoanRequest) {
//     const { userId, groupId, periodMonths } = request;

//     // 1️⃣ Find user membership duration
//     const member = await GroupMember.findOne({ where: { userId, groupId } });
//     if (!member) throw new Error("User is not a member of this group");

//     const joinedAt = member.createdAt!;
//     const monthsInGroup = Math.floor(
//       (new Date().getTime() - joinedAt.getTime()) / (1000 * 60 * 60 * 24 * 30)
//     );

//     // 2️⃣ Max loan = monthly contribution * months in group * factor
//     const maxLoan = monthsInGroup * 100; // Example: 100 currency units per month

//     // 3️⃣ Simple interest example: 5% per month
//     const interestRate = 5;
//     const interest = (maxLoan * interestRate * periodMonths) / 100;

//     // 4️⃣ Total to repay
//     const totalRepay = maxLoan + interest;

//     return {
//       maxLoan,
//       interestRate,
//       interest,
//       totalRepay,
//       monthsInGroup,
//     };
//   }

//   static async requestLoan(request: LoanRequest) {
//     const calculation = await this.calculateLoan(request);

//     // Store loan in DB with pending status
//     const loan = await Loan.create({
//       userId: request.userId,
//       groupId: request.groupId,
//       amount: calculation.maxLoan,
//       interestRate: calculation.interestRate,
//       periodMonths: request.periodMonths,
//       status: "pending",
//     });

//     return { loan, calculation };
//   }
// }
