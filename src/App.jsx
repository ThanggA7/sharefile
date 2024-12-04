import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Layout/Header/Header";
import Login from "./components/Layout/Login/Login";
import Register from "./components/Layout/Register/Register";
import PublicRouter from "./Routes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleRegisterRedirect = () => {
    setIsRegistering(true);
  };

  return (
    <>
      {!isAuthenticated ? (
        isRegistering ? (
          <div
            className="text-white h-[100vh] flex justify-center items-center bg-cover "
            style={{ backgroundImage: "url('../src/assets/bg.png')" }}
          >
            <Register
              setIsAuthenticated={setIsAuthenticated}
              setIsRegistering={setIsRegistering}
            />
          </div>
        ) : (
          <div
            className="text-white h-[100vh] flex justify-center items-center bg-cover"
            style={{ backgroundImage: "url('../src/assets/bg.png')" }}
          >
            <Login
              setIsAuthenticated={setIsAuthenticated}
              handleRegisterRedirect={handleRegisterRedirect}
            />
          </div>
        )
      ) : (
        <div className="container mx-auto p-4">
          <Header onLogout={handleLogout} />
          <Routes>
            {PublicRouter.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Page />} />;
            })}
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
