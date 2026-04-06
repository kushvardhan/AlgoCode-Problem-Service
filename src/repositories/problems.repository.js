const { Problem } = require("../models");
const mongoose = require("mongoose");
const BadRequest = require("../errors/badRequest.error");
const BaseError = require("../errors/base.error");
const logger = require("../config/logger.config");

class ProblemRepository {
  async createProblem(problemData) {
    try {
      logger.debug(`Creating problem with title: ${problemData.title}`);
      const problem = await Problem.create({
        title: problemData.title,
        description: problemData.description,
        testCases: problemData.testCases || [],
      });
      logger.info(`Problem created successfully with id: ${problem._id}`);
      return problem;
    } catch (error) {
      logger.error(`Error in createProblem: ${error.message}`, {
        stack: error.stack,
      });
      throw error;
    }
  }

  async getProblems() {
    try {
      logger.debug("Fetching all problems");
      const problems = await Problem.find();
      logger.info(`Retrieved ${problems.length} problems successfully`);
      return problems;
    } catch (error) {
      logger.error(`Error in getProblems: ${error.message}`, {
        stack: error.stack,
      });
      throw error;
    }
  }

  async getProblem(problemId) {
    try {
      logger.debug(`Fetching problem with id: ${problemId}`);
      if (!mongoose.Types.ObjectId.isValid(problemId)) {
        logger.warn(`Invalid MongoDB ObjectId provided: ${problemId}`);
        throw new BadRequest("id", {
          reason: "Invalid MongoDB ObjectId",
        });
      }

      const problem = await Problem.findById(problemId);
      if (problem) {
        logger.info(`Problem retrieved successfully with id: ${problemId}`);
      } else {
        logger.warn(`Problem not found with id: ${problemId}`);
      }
      return problem;
    } catch (error) {
      logger.error(`Error in getProblem: ${error.message}`, {
        problemId,
        stack: error.stack,
      });
      throw error;
    }
  }

  async updateProblem(problemId, updateData) {
    try {
      logger.debug(`Updating problem with id: ${problemId}`, { updateData });
      if (!mongoose.Types.ObjectId.isValid(problemId)) {
        logger.warn(
          `Invalid MongoDB ObjectId provided for update: ${problemId}`,
        );
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
        logger.error(`Problem not found for update with id: ${problemId}`);
        throw new BaseError("Problem not found", {
          reason: `No problem found with id ${problemId}`,
        });
      }

      logger.info(`Problem updated successfully with id: ${problemId}`);
      return updatedProblem;
    } catch (error) {
      logger.error(`Error in updateProblem: ${error.message}`, {
        problemId,
        stack: error.stack,
      });
      throw error;
    }
  }

  async deleteProblem(problemId) {
    try {
      logger.debug(`Deleting problem with id: ${problemId}`);
      if (!mongoose.Types.ObjectId.isValid(problemId)) {
        logger.warn(
          `Invalid MongoDB ObjectId provided for deletion: ${problemId}`,
        );
        throw new BadRequest("id", {
          reason: "Invalid MongoDB ObjectId",
        });
      }

      const deletedProblem = await Problem.findByIdAndDelete(problemId);

      if (!deletedProblem) {
        logger.error(`Problem not found for deletion with id: ${problemId}`);
        throw new BaseError("Problem not found", {
          reason: `No problem found with id ${problemId}`,
        });
      }

      logger.info(`Problem deleted successfully with id: ${problemId}`);
      return deletedProblem;
    } catch (error) {
      logger.error(`Error in deleteProblem: ${error.message}`, {
        problemId,
        stack: error.stack,
      });
      throw error;
    }
  }
}

module.exports = ProblemRepository;
