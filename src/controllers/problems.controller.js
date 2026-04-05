const { StatusCodes } = require("http-status-codes");

const { ProblemService } = require("../services");
const { ProblemRepository } = require("../repositories");
const BadRequest = require("../errors/badRequest.error");

const problemService = new ProblemService(new ProblemRepository());

async function createProblem(req, res, next) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new BadRequest("body", {
        reason: "Request body cannot be empty",
      });
    }

    const problem = await problemService.createProblem(req.body);
    if (!problem) {
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

async function getProblem(req, res) {
  try {
    const { id } = req.params;
    const problem = await problemService.getProblem(id);
    if (!problem) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: `Problem with id ${id} not found`,
        error: {
          reason: "No problem found with the provided id",
        },
        data: {},
      });
    }
    return res.status(StatusCodes.OK).json({
      success: true,
      message: `Successfully fetched problem with id ${id}`,
      error: {},
      data: problem,
    });
  } catch (err) {
    next(err);
  }
}

async function updateProblem(req, res, next) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedProblem = await problemService.updateProblem(id, updateData);

    if (!updatedProblem) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: `Problem with id ${id} not found for update`,
        error: {
          reason: "No problem found with the provided id to update",
        },
        data: {},
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: `Successfully updated problem with id ${id}`,
      error: {},
      data: updatedProblem,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteProblem(req, res, next) {
  try {
    const { id } = req.params;
    const deletedProblem = await problemService.deleteProblem(id);

    if (!deletedProblem) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: `Problem with id ${id} not found for deletion`,
        error: {
          reason: "No problem found with the provided id to delete",
        },
        data: {},
      });
    }
    return res.status(StatusCodes.OK).json({
      success: true,
      message: `Successfully deleted problem with id ${id}`,
      deletedQuestionId: { id: deletedProblem._id },
      error: {},
      data: deletedProblem,
    });
  } catch (err) {
    console.error(
      `ProblemController: Error deleting problem with id ${req.params.id}`,
      err,
    );
    next(err);
  }
}

function pingProblem(req, res) {
  try {
    return res.status(StatusCodes.OK).json({ message: "pong" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createProblem,
  getProblems,
  getProblem,
  updateProblem,
  deleteProblem,
  pingProblem,
};
