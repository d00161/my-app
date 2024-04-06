import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUser } from "../hooks/RegisterUser";





function Register() {



    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [emailId, setEmailId] = useState('');

    const navigate = useNavigate();



    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleMobileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMobile(e.target.value);
    }

    const handleEmailIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailId(e.target.value);
    }


    let {registerUser, registerUserResponse, errorOccurred} = useRegisterUser();
    // useEffect(()=>{
    //     registerUser();
    // }, []);

    useEffect(()=> {
        if(errorOccurred===false){
            navigate('/')
        }
        console.log(errorOccurred)
        console.log("use effect is called")
        
    }, [errorOccurred])


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);
        let data = {
            username,
            mobile,
            password
        }
        registerUser(data);

        if(errorOccurred===false){
            // localStorage.setItem("accessToken", registerUserResponse.token);
            navigate('/login');
        }

        console.log(errorOccurred)
        // navigate('/');
        // setUsername('');
        // setPassword('');
    };



    return (

    <div>
    <h2>Register Form</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <div>
        <label htmlFor="mobile">Mobile:</label>
        <input
          type="text"
          id="mobile"
          value={mobile}
          onChange={handleMobileChange}
          required
        />
      </div>
      <div>
        <label htmlFor="emailId">Email:</label>
        <input
          type="email"
          id="emailId"
          value={emailId}
          onChange={handleEmailIdChange}
          required
        />
      </div>

      <button type="submit">Register</button>
    </form>
  </div>


    );
  }
  
  export default Register;