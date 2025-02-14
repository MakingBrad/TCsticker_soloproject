import { NavLink } from 'react-router-dom';
import useStore from '../../zustand/store';


function Nav() {
  const user = useStore((store) => store.user);

  return (
    <nav>
      <ul>
      { // User is not logged in, render these links:
        !user.id && (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/registration">Register</NavLink>
            </li>
          </>
        )
      }
      { // User is logged in, render these links:
        user.id && (
          <>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
          </>
        )
      }
      {/* 
      Brad wants to write the following code:
            if (user.user_is_admin==TRUE) {
        <Navlink to"/CreateUser">Create User</NavLink>
        <Navlink to"/anotherRoute">Another Route</NavLink>
      } else {
        null
      } 
     */}
     
      {/* Show these links regardless of auth status: */}
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>
    </nav>
  );
}


export default Nav;
