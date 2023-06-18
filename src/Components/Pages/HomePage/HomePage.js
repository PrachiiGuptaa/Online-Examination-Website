import React from 'react'
import styles from './HomePage.module.css'
import Button from '../../Atoms/Button/Button'
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate('/adminloginpage');
  }

  const handleStudentLogin = () => {
    navigate('/studentloginpage');
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
      <h2>LOGIN</h2>
        <div className={styles.loginBtn}>
         <Button
         onClick={handleAdminLogin}
        buttonText="If you are Admin Login Here"/>   
         <Button
         onClick={handleStudentLogin}
        buttonText="If you are Student Login Here"/>   
        </div>   
      </div>
    </div>
  )
}

export default HomePage
