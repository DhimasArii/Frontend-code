import "./App.css";
import Login from './pages/login/login'
import Forgot from './pages/reset-password/reset'
import Reset from "./pages/CreatePassword/reset";
import EmailConfirmation from "./pages/EmailConfirmation";
import Landing from "./pages/landing-page/landing"
import Kelas from "./pages/menu-kelas/menu-kelas"

import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forgot-password' element={<Forgot />} />
      <Route path='/new-password' element={<Reset />} />
      <Route path='/email-confirmation' element={<EmailConfirmation />} />
      <Route path='/menu-kelas' element={<Kelas />} />

    </Routes>
  );
}

export default App;
