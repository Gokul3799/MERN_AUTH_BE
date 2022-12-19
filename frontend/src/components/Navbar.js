import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const Navigate = useNavigate();

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout buddy</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={()=>{
                logout();
                Navigate('/login');
                }}>Log out</button>
            </div>
          )}
          <div>
            {!user && (
              <div>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
