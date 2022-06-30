import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import {ToastContainer} from 'react-toastify'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header></Header>
          <Routes>
            <Route path='/' element={<Dashboard />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
          </Routes>
        </div>

      </Router>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
