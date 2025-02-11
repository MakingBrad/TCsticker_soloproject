import { useState, useEffect } from 'react';
import useStore from '../../zustand/store';


function RegisterPage() {
  // Brad needs to add two inputs to this page, that are unique to his DB FirstName and Last name
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  // This is the end of the setters and getters that are unique to Brads DB set up
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const register = useStore((state) => state.register)
  const errorMessage = useStore((state) => state.authErrorMessage);
  const setAuthErrorMessage = useStore((state) => state.setAuthErrorMessage);

  useEffect(() => {
    // Clear the auth error message when the component unmounts:
    return () => {
      setAuthErrorMessage('');
    }
  }, [])

  const handleRegister = (event) => {
    event.preventDefault();

    register({
      username: username,
      password: password,
    })
  };

  return (
    <>
      <h2>Register Page</h2>
      <form onSubmit={handleRegister}>
        {/* Brad adds these fields for the additional items he needs for his DB */}
        <label htmlFor="firstname">First name:</label>
        <input
          type="text"
          // Brad wants to use first_name because it is the name of the field in the DB, but he wonders if this is "doable"
          // Brad suspects that React 'doesn't like' the "_" being used... so he goes with 'firstname'
          id="firstname"
          required
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />

        <label htmlFor="lastname">Last name:</label>
        <input
          type="text"
          // Brad wants to use last_name because it is the name of the field in the DB, but he wonders if this is "doable"
          // Brad suspects that React 'doesn't like' the "_" being used... so he goes with 'lastname'
          id="lastname"
          required
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        {/* This is the end of the fields that Brad has added for his DB */}
        
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          Register 
        </button>
      </form>
      { // Conditionally render registration error:
        errorMessage && (
          <h3>{errorMessage}</h3>
        )
      }
    </>
  );
}


export default RegisterPage;
