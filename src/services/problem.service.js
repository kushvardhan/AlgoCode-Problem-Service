class ProblemService{
    constructor(problemRepository){
        this.problemRepository = problemRepository;
    }

    async createProblem(problemData){
        return await this.problemRepository.createProblem(problemData);
    }

}

module.exports = ProblemService;