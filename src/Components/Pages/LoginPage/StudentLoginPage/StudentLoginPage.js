import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import InputField from '../../../Atoms/InputField/InputField'
import Button from '../../../Atoms/Button/Button';
import styles from './StudentLoginPage.module.css'

function StudentLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
}

  const handlePassword = (e) => {
    setPassword(e.target.value);
}

  const handleStudentLogin = () => {
    if (username === 'Student' && password === 'Student@123') {
      navigate('/exampage');
    } else {
      alert('Invalid credentials');
    }
  }

  const handleAdminLogin = () => {
    navigate('/adminloginpage');
  }

  return (
    <div className={styles.wrapper}>
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmbdd3Cez-NSwoUbVQLLZq9Lvg7MomDPbWsqrjO_8zd-0U4hukBwDrqOL4k7wVj_8giw&usqp=CAU' alt='Student Login'/>
    <div className={styles.sideImg}>
      <img src='https://portal.bmbcollege.com/assets/img/logo-2.png' alt='Student Login'/>
    <div className={styles.loginInputs}>
      <h2>Login your Account</h2>
      <InputField
      type="text"
      placeholder="Username"
      value={username}
      onChange={handleUsername}
      />
      <InputField
      type="password"
      placeholder="Password"
      value={password}
      onChange={handlePassword}
      />
      <Button
      onClick={handleStudentLogin}
      buttonText="Login"/>
      <br/>
      <span>Not Student!</span> 
      <span>Go to Admin Login Page.</span> 
      <Button
      onClick={handleAdminLogin}
      buttonText="Admin Login"/>
      </div>
    </div>
    </div>
  )
}

export default StudentLoginPage
