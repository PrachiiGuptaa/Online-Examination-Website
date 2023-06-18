import React, {useState} from 'react'
import styles from './AdminLoginPage.module.css'
import { useNavigate } from 'react-router-dom';
import InputField from '../../../Atoms/InputField/InputField'
import Button from '../../../Atoms/Button/Button';

function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => {
      setUsername(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleAdminLogin = () => {
    if (username === 'Admin' && password === 'Admin@123') {
      navigate('/adminpage');
    } else {
      alert('Invalid credentials');
    }
  }

  const handleStudentLogin = () => {
    navigate('/studentloginpage');
  }

  return (
    <div className={styles.wrapper}>
       <img src='https://i.pinimg.com/originals/4f/ae/bb/4faebb2031bb2787fda144179e3662a7.jpg' alt='Admin Login'/>
    <div className={styles.sideImg}>
    <img src='https://sales.webtel.in/images/Login-page-character1.png' alt='Admin Login'/>
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
      onClick={handleAdminLogin}
      buttonText="Login"/><br/>
      <span>Not Admin!</span> 
      <span>Go to Student Login Page.</span> 
      <Button
      onClick={handleStudentLogin}
      buttonText="Student Login"/>
    </div>
    </div>
    </div>
  )
}

export default AdminLoginPage
