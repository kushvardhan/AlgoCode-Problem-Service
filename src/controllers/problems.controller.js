const { StatusCodes } = require("http-status-codes");

const { ProblemService } = require("../services");
const { ProblemRepository } = require("../repositories");
const BadRequest = require("../errors/badRequest.error");

const problemService = new ProblemService(new ProblemRepository());

async function createProblem(req,res,next){
     try {
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new BadRequest("body", {
                reason: "Request body cannot be empty",
            });
        }

        const problem = await problemService.createProblem(req.body);
        if(!problem){
            throw new Error("Failed to create problem");
        }

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Successfully created a new problem",
            error: {},
            data: problem,
        });
    } catch (err) {
        next(err);
    }
}

async function getProblems(req, res, next) {
    try {
        const problems = await problemService.getAllProblems();

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully fetched all problems",
            error: {},
            data: problems,
        });
    } catch (err) {
        next(err);
    }
}


function getProblem(req,res){
    try{
        const {id}=req.params;
        return res.status(StatusCodes.NOT_IMPLEMENTED).json({message:`Get Problem controller isnt working right now. Id: ${id}`});  
    }catch(err){
        next(err);
    }   
}

function updateProblem(req,res){
    try{
        return res.status(StatusCodes.NOT_IMPLEMENTED).json({message:"Update Problem controller isnt working right now."});   
    }catch(err){
        next(err);
    }   
}

function deleteProblem(req,res){
    try{
        const {id}=req.params;
        return res.status(StatusCodes.NOT_IMPLEMENTED).json({message:`Delete Problem controller isnt working right now. Id: ${id}`});   
    }catch(err){
        next(err);
    }   
}

function pingProblem(req,res){
    try{
        return res.status(StatusCodes.OK).json({message:"pong"});
    }catch(err){
        next(err);
    }
}


module.exports={
    createProblem,
    getProblems,
    getProblem,
    updateProblem,
    deleteProblem,
    pingProblem,
}