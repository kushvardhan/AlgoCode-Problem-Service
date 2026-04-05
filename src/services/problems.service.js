const ProblemRepository = require("../repositories/problems.repository");
const sanitizeMarkDownContent = require("../utils/markdownSanitizer");

class ProblemService{
    constructor(problemRepository){
        this.problemRepository = problemRepository;
    }

    async createProblem(problemData){
        try{
            problemData.description = sanitizeMarkDownContent(problemData.description);
            const createdProblem = await this.problemRepository.createProblem(problemData);
            return createdProblem;
        }catch(error){
            console.error("ProblemService: Error creating problem", error);
            throw error;
        }
    }

    async getAllProblems(){
        try{
            const problems = await this.problemRepository.getProblems();
            return problems;
        }catch(error){
            console.error("ProblemService: Error fetching problems", error);
            throw error;
        }
    }

}

module.exports = ProblemService;