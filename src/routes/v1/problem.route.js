const express = require('express');
const problemController = require('../../controllers').ProblemController;

const router = express.Router();

router.get('/ping',problemController.pingProblem);
router.post('/', problemController.createProblem);
router.get('/', problemController.getProblems);
router.get('/:id', problemController.getProblem);
router.put('/:id', problemController.updateProblem);
router.delete('/:id', problemController.deleteProblem);

module.exports = router;