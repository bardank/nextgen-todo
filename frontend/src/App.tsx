import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./app.scss";
import ProtectRoutes from "./components/ProtectRoutes";
import AntiAuthRoutes from "./components/AntiAuthRoutes";
import AppLayout from "./layout/AppLayout";
import { refreshTokenRequest } from "./api/auth";
import { getCookie } from "./customHooks/useCookie";
import { REFRESH_TOKEN } from "./constants";
import { useAuthStore } from "./store/auth";
import { requestCurrentUser } from "./api/user";
import EditTodo from "./pages/EditTodo";
import AuthLayout from "./layout/AuthLayout";
function App() {
  const { user, loading, isAuthenticated, login, logout } = useAuthStore();
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const res = await requestCurrentUser();
      login(res.data.user);
    } catch (error) {
      logout();
    }
  };
  return (
    <Router>
      <Routes>
        <Route Component={AppLayout}>
          <Route Component={ProtectRoutes}>
            <Route path="/" Component={Home} />
            <Route path="/todos/:id" Component={EditTodo} />
          </Route>
          <Route Component={AntiAuthRoutes}>
            <Route Component={AuthLayout}>
              <Route path="/register" Component={Register} />
              <Route path="/login" Component={Login} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
