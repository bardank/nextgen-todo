import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { logoutRequest } from "../api/auth";
import { getCookie } from "../customHooks/useCookie";
import { REFRESH_TOKEN } from "../constants";
import useTodoStore from "../store/todos";
const Navbar = () => {
  const { user, loading, isAuthenticated, logout } = useAuthStore();
  const { setTodos } = useTodoStore();
  const onLogout = async () => {
    try {
      await logoutRequest(getCookie(REFRESH_TOKEN) ?? "");
    } catch (error) {
    } finally {
      logout();
      setTodos([]);
    }
  };
  return (
    <nav className="navbar bg-gray-800 drop-shadow-md flex justify-between items-center  px-2 md:px-4 w-full fixed top-0 left-0 right-0 z-[1000]">
      <div className="text-xl font-semibold text-red-500">
        <Link to={"/"}>
          Nextgen<span className="text-cyan-500">TODO</span>
        </Link>
      </div>

      <ul className="flex">
        {isAuthenticated && (
          <NavItem label="Logout" to="/login" onClick={onLogout} />
        )}
        {!isAuthenticated && (
          <>
            <NavItem label="Register" to="/register" />
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
interface NavItemProps {
  label: string;
  to: string;
  onClick?: () => void;
}

const NavItem: FC<NavItemProps> = ({ label, to, onClick }) => {
  return (
    <div className="text-white mx-4" onClick={onClick}>
      <Link to={to}>{label}</Link>
    </div>
  );
};
