import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Components/Pages/HomePage/HomePage';
import AdminLoginPage from './Components/Pages/LoginPage/AdminLoginPage/AdminLoginPage';
import StudentLoginPage from './Components/Pages/LoginPage/StudentLoginPage/StudentLoginPage';
import AdminPage from './Components/Pages/AdminPage/AdminPage';
import StudentPage from './Components/Pages/StudentPage/StudentPage';
import ExamPage from './Components/Pages/ExamPage/ExamPage';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/adminloginpage" element={<AdminLoginPage/>} />
      <Route path="/studentloginpage" element={<StudentLoginPage/>} />
      <Route path="/exampage" element={<ExamPage/>}></Route>
      <Route path="/adminpage" element={<AdminPage/>} />
      <Route path="/studentpage" element={<StudentPage/>} />
      </Routes>
    </div>
  );
}

export default App;
