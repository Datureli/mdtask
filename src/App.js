import React from "react";
import Navbar from "./components/Navbar";
import Form from "./components/form";
import useLocalStorage from "use-local-storage";
import "./App.css";

function App() {
  const darkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    darkTheme ? "dark" : "light"
  );
  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  return (
    <div className="App" data-theme={theme}>
      <Navbar />
      <Form switchTheme={switchTheme} theme={theme}  />
    </div>
  );
}

export default App;
