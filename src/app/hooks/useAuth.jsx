import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";

import userService from "../services/user.service";
import localStorageService, { setTokens } from "../services/localStorage.service";

const AuthContext = React.createContext();
export const httpAuth = axios.create({
  baseURL: "https://identitytollkit.googleapis.com/v1/",
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
});

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState({});
  const [error, setError] = useState(null);

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  async function signUp({ email, password, ...rest }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;

    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      await createUser({ _id: data.localId, email, rate: randomInt(1, 5), completedMeetings: randomInt(0, 200), ...rest });
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      console.log(code, message);
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = {
            email: "Пользователь с таким Email уже существует"
          };
          throw errorObject;
        };
      };
    };
  };

  async function logIn({ email, password }) {
    try {
      const { data } = await httpAuth.post(
        `accounts:signInWithPassword`,
        {
          email,
          password,
          returnSecureToken: true
        }
      );
      setTokens(data);
    } catch (error) {
      errorCatcher(error);

      const { code, message } = error.response.data.error;

      if (code === 400) {
        switch (message) {
          case "INVALID_PASSWORD":
            throw new Error("Email или пароль введены некорректно");
          default:
            throw new Error(
              "Слишком много попыток входа. Попробуйте позже"
          );
        };
      };
    };
  };

  async function createUser(data) {
    try {
        const { content } = await userService.create(data);
        setUser(content);
      } catch (error) {
        errorCatcher(error);
      }
  };

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  };

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser();
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  };

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ signUp, currentUser, logIn }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AuthProvider;
