import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signUp = async (email, password) => {
    setIsLoading(true);
    setError("");

    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading("false");
      setError(json.error);
      return;
    }
    // save the user to local storage
    localStorage.setItem("user", JSON.stringify(json));

    //update the authContext
    dispatch({ type: "LOGIN", payload: json });
    setIsLoading(false);
  };

  return { signUp, isLoading, error };
};
