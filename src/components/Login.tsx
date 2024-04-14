import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useGetUserDetails } from "../hooks/GetUserDetails";
import { useLoginUser } from "../hooks/LoginUser";
import { useNavigate } from "react-router-dom";






function Login() {



    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // const navigate = useNavigate();

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    let {getLoginUser, loginUserResponse, errorOccurred} = useLoginUser();
    // useEffect(() => {
    //     getLoginUser();
    // }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Here you can add your logic for handling login
        console.log('Username:', username);
        console.log('Password:', password);
        // Clear input fields after submission
        // setUsername('');
        // setPassword('');
        let data = {
            username: username,
            password: password
        }
        getLoginUser(data);

    };

    useEffect(() => {
        if(errorOccurred === false){
            localStorage.setItem("accessToken", loginUserResponse.token);
            // navigate('/');
        }
    });








    return (

    <div>
    <h2>Login Form</h2>
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
      <button type="submit">Login</button>
    </form>

    <div>
        {loginUserResponse.username}
        {loginUserResponse.mobile}
        {loginUserResponse.token}
        {errorOccurred}
    </div>
  </div>


    );
  }
  
  export default Login;