import {
  createContext,
  useContext,
  useState,
  useEffect,
  Children,
} from "react";
import { Navigate } from "react-router";

const AuthContext = createContext();
const navigate = Navigate();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");

      if (token && userStr) {
        const userData = JOSN.parse(userStr);
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("AUth check failed", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = (userData, login) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);

    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    setUser(null);
    setIsAuthenticated(false);
    navigate("/");

    const updateUser = (updatedUserData) => {
      const newUserData = { ...user, ...updatedUserData };
      localStorage.setItem("user", JSON.stringify(newUserData));
      setUser(newUserData);
    };
  };

  const updateUser = (updatedUserData) => {};

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
