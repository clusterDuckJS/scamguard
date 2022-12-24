import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import Admin from './Pages/Admin';
import CreatePost from './Pages/CreatePost';
import Login from './Pages/Login';
import Main from './Pages/Main';
import Post from './Pages/Post';
import Submit from './Pages/Submit';


// import scamData from './data';

function App() {

  return (
    <div className="container container-app">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<Main />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/createpost' element={<CreatePost />}></Route>
          <Route path='/post/:id' element={<Post/>}></Route>
          <Route path='/adminprocreate' element={<Admin/>}></Route>
          <Route path='/submission' element={<Submit />} ></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
     
    </div>
  );
}

export default App;
