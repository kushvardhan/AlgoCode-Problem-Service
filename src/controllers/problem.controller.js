const { StatusCodes } = require("http-status-codes");

function createProblem(req,res){
    try{
        return res.status(StatusCodes.NOT_IMPLEMENTED).json({message:"Create Problem controller isnt working right now."});
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

function getProblems(req,res){
    try{
        return res.status(StatusCodes.NOT_IMPLEMENTED).json({message:"Get Problems controller isnt working right now."});
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

function getProblem(req,res){
    try{
        const {id}=req.params;
        return res.status(StatusCodes.NOT_IMPLEMENTED).json({message:`Get Problem controller isnt working right now. Id: ${id}`});  
    }catch(err){
        res.status(500).json({message:err.message});
    }   
}

function updateProblem(req,res){
    try{
        return res.status(StatusCodes.NOT_IMPLEMENTED).json({message:"Update Problem controller isnt working right now."});   
    }catch(err){
        res.status(500).json({message:err.message});
    }   
}

function deleteProblem(req,res){
    try{
        const {id}=req.params;
        return res.status(StatusCodes.NOT_IMPLEMENTED).json({message:`Delete Problem controller isnt working right now. Id: ${id}`});   
    }catch(err){
        res.status(500).json({message:err.message});
    }   
}

function pingProblem(req,res){
    try{
        return res.status(StatusCodes.OK).json({message:"pong"});
    }catch(err){
        res.status(500).json({message:err.message});
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