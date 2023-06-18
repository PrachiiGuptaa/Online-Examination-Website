import React from 'react';
import styles from './ExamPage.module.css';
import Button from '../../Atoms/Button/Button';
import { useNavigate } from "react-router-dom";

function ExamPage() {
    const navigate = useNavigate();

  const handleTest = () => {
    navigate('/studentpage');
  }
  return (
    <div className={styles.wrapper}>
      <Button
      onClick={handleTest}
      buttonText="Start Exam"/>
    </div>
  )
}

export default ExamPage