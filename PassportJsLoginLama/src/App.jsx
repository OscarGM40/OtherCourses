import './app.css';
import Navbar from './components/Navbar';
import { Home } from './pages/Home';
import Login from './pages/Login';
import Post from './pages/Post';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch('http://localhost:5000/auth/login/success', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': true,
        }
      })
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('Auth failed: ' + response.status);
          }
        })
        .then(data => {
          console.log(data.user);
          setUser(data.user);
        })
        .catch(error => {
          console.error(error);
        }
        );}
    getUser();
  }, [])

  return (
    <BrowserRouter>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={
          user
            ? <Navigate to="/" />
            : <Login />} />
        <Route path="/post/:id" element={
          user
            ? <Post />
            : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
