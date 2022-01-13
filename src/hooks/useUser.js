import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/Login/mutations";

const useUser = () => {
  // const [login, { loading, error, data }] = useMutation(LOGIN);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("user");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
    }
  }, []);

  // const sigin = async (username, password) => {
  //   await login({ variables: { username, password } });

  //   console.log(`data hook`, data);
  //   if (data) {
  //     const user = {
  //       token: data.login.token,
  //       ...data.login.user,
  //     };

  //     console.log(`user hook`, user);
  //     setUser(user);
  //     window.localStorage.removeItem("user");
  //     window.localStorage.setItem("user", JSON.stringify(user));
  //   }
  // };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("user");
  };

  return {
    user,
    // sigin,
    logout,
  };
};

export default useUser;
