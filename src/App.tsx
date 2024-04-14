
import './App.css';
import Login from './components/Login';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import HomePage from './components/HomePage';
import PendingTransactions from './components/PendingTransactions';
import AdminPage from './components/AdminPage';
import GetLatestGameDetails from './components/GetLatestGameDetails';
import { useState } from 'react';

function App() {

  const [x,setx] = useState(0);

  


  return (
    <>
    <div>
      <button onClick={()=>setx(0)}>HomePage</button>
      <button onClick={()=>setx(1)}>Login</button>
      <button onClick={()=>setx(2)}>Register</button>
      <button onClick={()=>setx(3)}>AdminPage</button>
    </div>
    <HashRouter>
      <Routes>
        {x===0 &&
        <Route path="/" Component={HomePage}/>}
        ||
        {x===1 &&
        <Route path="/" Component={Login}/>}
        ||
        {x===2 &&
        <Route path="/" Component={Register}/>}
        ||
        {x==3 &&
        <Route path='/' Component={AdminPage}/>}
        {/* ||
        {x===3 && 
        <Route path="/" Component={PendingTransactions}/>}
        ||
        {x===4 && 
        <Route path="/" Component={GetLatestGameDetails}/>} */}
        
        {/* <Route path="*" element={"<NoPageFound />"} /> */}

      </Routes>

    </HashRouter>
    </>
  );
}

export default App;
