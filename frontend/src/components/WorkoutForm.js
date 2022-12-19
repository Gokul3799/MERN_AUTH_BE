import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [err, setErr] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setErr('You must be logged in');
      return;
    }
    const workout = { title, load, reps };
    const response = await fetch("/api/workouts", {
      method: "post",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    if (!response.ok) {
      setErr(json.err);
      setEmptyFields(json.emptyFields);
      return;
    }
    setErr(null);
    setTitle("");
    setLoad("");
    setReps("");
    setEmptyFields([]);
    dispatch({ type: "CREATE_WORKOUT", payload: json });
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>
      <label>Excersize Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
        // required
      ></input>
      <label>Load (kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
        // required
      ></input>
      <label>No of reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
        // required
      ></input>
      <button type="submit">Add Workout</button>
      {err && <div className="error">{err}</div>}
    </form>
  );
};

export default WorkoutForm;
