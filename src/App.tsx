
import './App.css';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import HomePage from './components/HomePage';
import PendingTransactions from './components/PendingTransactions';
import AdminPage from './components/AdminPage';
import GetLatestGameDetails from './components/GetLatestGameDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/pendingTransactions" element={<PendingTransactions/>}/>
        <Route path="/latestGameDetails" element={<GetLatestGameDetails/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path="*" element={"<NotFound />"} />

      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
