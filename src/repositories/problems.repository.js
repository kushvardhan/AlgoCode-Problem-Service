const { Problem } = require("../models");
const mongoose = require("mongoose");
const BadRequest = require("../errors/badRequest.error");
const BaseError = require("../errors/base.error");
const logger = require("../config/logger.config");

class ProblemRepository {
  async createProblem(problemData) {
    return await Problem.create({
      title: problemData.title,
      description: problemData.description,
      testCases: problemData.testCases || [],
    });
  }

  async getProblems() {
    return await Problem.find();
  }

  async getProblem(problemId) {
    if (!mongoose.Types.ObjectId.isValid(problemId)) {
      throw new BadRequest("id", {
        reason: "Invalid MongoDB ObjectId",
      });
    }

    return await Problem.findById(problemId);
  }

  async updateProblem(problemId, updateData) {
    if (!mongoose.Types.ObjectId.isValid(problemId)) {
      throw new BadRequest("id", {
        reason: "Invalid MongoDB ObjectId",
      });
    }

    const updatedProblem = await Problem.findByIdAndUpdate(
      problemId,
      updateData,
      {
        new: true,
      },
    );

    if (!updatedProblem) {
      throw new BaseError("Problem not found", {
        reason: `No problem found with id ${problemId}`,
      });
    }

    return updatedProblem;
  }

  async deleteProblem(problemId) {
    if (!mongoose.Types.ObjectId.isValid(problemId)) {
      throw new BadRequest("id", {
        reason: "Invalid MongoDB ObjectId",
      });
    }

    const deletedProblem = await Problem.findByIdAndDelete(problemId);

    if (!deletedProblem) {
      logger.error(`Problem not found with id: ${problemId}`);

      throw new BaseError("Problem not found", {
        reason: `No problem found with id ${problemId}`,
      });
    }

    return deletedProblem;
  }
}

module.exports = ProblemRepository;
