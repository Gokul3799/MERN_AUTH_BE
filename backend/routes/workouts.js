const express = require("express");
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

//require auth for all workout routes - middleware (gets called everytime if any one of the below req is triggered)
router.use(requireAuth);

//GET all workouts
router.get("/", getWorkouts);

//GET single workout
router.get("/:id", getWorkout);

//POST a new workout
router.post("/", createWorkout);

//DELETE a  workout
router.delete("/:id", deleteWorkout);

//Update a  workout
router.patch("/:id", updateWorkout);

module.exports = router;
