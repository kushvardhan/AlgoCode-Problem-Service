const { Problem } = require("../models");
const mongoose = require("mongoose");
const BadRequest = require("../errors/badRequest.error");

class ProblemRepository {

    async createProblem(problemData) {
        return await Problem.create({
            title: problemData.title,
            description: problemData.description,
            testCases: problemData.testCases || [],
        });
    }

    async getProblem(problemId) {
        if (!mongoose.Types.ObjectId.isValid(problemId)) {
            throw new BadRequest("id", {
                reason: "Invalid MongoDB ObjectId",
            });
        }

        return await Problem.findById(problemId);
    }

    async getProblems() {
        return await Problem.find();
    }

    async updateProblem(problemId, updateData) {
        if (!mongoose.Types.ObjectId.isValid(problemId)) {
            throw new BadRequest("id", {
                reason: "Invalid MongoDB ObjectId",
            });
        }

        return await Problem.findByIdAndUpdate(
            problemId,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        );
    }

    async deleteProblem(problemId) {
        if (!mongoose.Types.ObjectId.isValid(problemId)) {
            throw new BadRequest("id", {
                reason: "Invalid MongoDB ObjectId",
            });
        }

        const deletedProblem =  await Problem.findByIdAndDelete(problemId);
        if(!deletedProblem){
            console.log(`Problem.Respository: Problem with id: ${problemId} not found in the DB.`);
        }
        return deletedProblem;
    }
}

module.exports = ProblemRepository;