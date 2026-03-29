const ProblemRepository = require("../repositories/problems.repository");

class ProblemService{
    constructor(problemRepository){
        this.problemRepository = ProblemRepository;
    }

    async createProblem(problemData){
        try{
            problemData.description = sanitizeMarkDownContent(problemData.description);            const createdProblem = await this.problemRepository.createProblem(problemData);
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