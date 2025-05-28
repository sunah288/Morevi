import { Routes, Route } from 'react-router-dom';
import Curation from '../pages/Curation';
import Gift from '../pages/Gift'
import Login from '../components/Login'; ;

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Curation />} />
      <Route path="/curation" element={<Curation />} />
      <Route path="/login" element={<Login />} /> 
      <Route path="/gift" element={<Gift />} />
    </Routes>
  );
}