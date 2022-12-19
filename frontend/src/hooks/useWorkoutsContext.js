import { WorkoutContext } from "../contexts/WorkoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw Error("useWorkoutsCOntext must be used in the provider");
  }

  return context;
};