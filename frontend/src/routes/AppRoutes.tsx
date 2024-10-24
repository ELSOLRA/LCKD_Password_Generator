import { Routes, Route } from "react-router-dom";

import EditCredentials from "../pages/EditCredental/EditCredentialPage";
import NewCredentials from "../pages/NewCredential/NewCredentialPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import Login from "../pages/Login/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/edit" element={<EditCredentials />} />
      <Route path="/new" element={<NewCredentials />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
