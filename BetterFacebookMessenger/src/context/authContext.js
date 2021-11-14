import React, { useContext, useState, useEffect, createContext } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

const AuthContext = createContext();
// diria que esta renombrando la llamada a otra más fácil simplemente
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // fijate todo lo que mete aqui
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const history = useHistory();

  // fijate como este efecto con el listener se activará a nivel global de la aplicación.Y con 'history' se va a disparar con cada navegación,asi que tengo un trigger en cada cambio de URL(importante)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        history.push("/chats");
      }
    });
  }, [user, history]);

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
