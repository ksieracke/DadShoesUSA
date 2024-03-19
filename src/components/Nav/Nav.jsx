import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h4 className="nav-title">Home</h4>
      </Link>
      <Link to="/purchase">
        <h4 className="nav-title">Purchase</h4>
      </Link>
      <Link to="/gallery">
        <h4 className="nav-title">Gallery</h4>
      </Link>

      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/account">
              Account
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        
      </div>
    </div>
  );
}

export default Nav;
