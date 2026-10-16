
import {
  createContext,
  useContext,
  useState
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("demoUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  function register(email, password) {
    const accounts = JSON.parse(
      localStorage.getItem("demoAccounts") || "{}"
    );

    if (accounts[email]) {
      return {
        success: false,
        message: "This email is already registered."
      };
    }

    accounts[email] = { password };

    localStorage.setItem(
      "demoAccounts",
      JSON.stringify(accounts)
    );

    return {
      success: true,
      message: "Registration successful!"
    };
  }

  function login(email, password) {
    const accounts = JSON.parse(
      localStorage.getItem("demoAccounts") || "{}"
    );

    const account = accounts[email];

    if (!account || account.password !== password) {
      return {
        success: false,
        message: "Invalid email or password."
      };
    }

    const loggedInUser = { email };

    localStorage.setItem(
      "demoUser",
      JSON.stringify(loggedInUser)
    );

    setUser(loggedInUser);

    return { success: true };
  }

  function logout() {
    localStorage.removeItem("demoUser");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
