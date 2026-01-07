import { Contribution } from "../database/models/contribution";

interface ContributionInput {
  userId: number;
  amount: number;
  date: Date;
  status?: "pending" | "approved" | "rejected";
}

export class ContributionService {
  // Create or update contribution
  static async createContribution(data: ContributionInput) {
    const { userId, amount, date, status } = data;
    if (!userId || !amount || !date) {
      throw new Error("userId, amount, and date are required");
    }

    // Find last contribution of user to check missed contributions
    const lastContribution = await Contribution.findOne({
      where: { userId },
      order: [["date", "DESC"]],
    });

    let missedCount = 0;
    let penalty = 0;
    let isActive = true;

    if (lastContribution) {
      missedCount = lastContribution.missedCount;
      penalty = Number(lastContribution.penalty);

      // Apply penalty if last contribution was missed
      if (lastContribution.status !== "approved") {
        missedCount += 1;

        // Apply penalty: doubled if 3rd miss
        penalty += missedCount >= 3 ? 20 * 2 : 10;

        // Mark inactive if 3 consecutive misses
        if (missedCount >= 3) isActive = false;
      } else {
        // Reset missed count if last contribution was paid/approved
        missedCount = 0;
        penalty = 0;
      }
    }

    const newContribution = await Contribution.create({
      userId,
      amount,
      date,
      status: status || "pending",
      missedCount,
      penalty,
      isActive,
    });

    return newContribution;
  }

  static async getContributionById(id: number) {
    const contr = await Contribution.findByPk(id);
    if (!contr) throw new Error("Contribution not found");
    return contr;
  }

  static async getAllContributions() {
    return await Contribution.findAll();
  }

  static async updateContribution(
    id: number,
    data: Partial<ContributionInput>
  ) {
    const contr = await Contribution.findByPk(id);
    if (!contr) throw new Error("Contribution not found");

    await contr.update(data);
    return contr;
  }

  static async deleteContribution(id: number) {
    const contr = await Contribution.findByPk(id);
    if (!contr) throw new Error("Contribution not found");

    await contr.destroy();
    return { message: "Contribution deleted successfully" };
  }
}
