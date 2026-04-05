const ProblemRepository = require("../repositories/problems.repository");
const sanitizeMarkDownContent = require("../utils/markdownSanitizer");

class ProblemService {
  constructor(problemRepository) {
    this.problemRepository = problemRepository;
  }

  async createProblem(problemData) {
    try {
      problemData.description = sanitizeMarkDownContent(
        problemData.description,
      );
      const createdProblem =
        await this.problemRepository.createProblem(problemData);
      return createdProblem;
    } catch (error) {
      console.error("ProblemService: Error creating problem", error);
      throw error;
    }
  }

  async getAllProblems() {
    try {
      const problems = await this.problemRepository.getProblems();
      return problems;
    } catch (error) {
      console.error("ProblemService: Error fetching problems", error);
      throw error;
    }
  }

  async getProblem(problemId) {
    try {
      const problem = await this.problemRepository.getProblem(problemId);
      return problem;
    } catch (err) {
      console.error(
        `ProblemService: Error fetching problem with id ${problemId}`,
        err,
      );
      throw err;
    }
  }

  async updateProblem(problemId, updateData) {
    try {
      const allowedUpdates = [
        "title",
        "description",
        "difficulty",
        "testCases",
        "editorial",
      ];

      const filteredData = {};

      for (let key of Object.keys(updateData)) {
        if (allowedUpdates.includes(key)) {
          filteredData[key] = updateData[key];
        }
      }

      if (filteredData.description) {
        filteredData.description = sanitizeMarkDownContent(
          filteredData.description,
        );
      }

      const updatedProblem = await this.problemRepository.updateProblem(
        problemId,
        filteredData,
      );

      return updatedProblem;
    } catch (err) {
      console.error(
        `ProblemService: Error updating problem with id ${problemId}`,
        err,
      );
      throw err;
    }
  }

  async deleteProblem(problemId) {
    try {
      const deletedProblem =
        await this.problemRepository.deleteProblem(problemId);
      return deletedProblem;
    } catch (err) {
      console.error(
        `ProblemService: Error deleting problem with id ${problemId}`,
        err,
      );
      throw err;
    }
  }
}

module.exports = ProblemService;
