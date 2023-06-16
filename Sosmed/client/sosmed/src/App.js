import logo from "./logo.svg";
import "./App.css";
import routes from "./routes/routes";
import { Routes } from "react-router-dom";
import Loading from "./components/loading";
import { useEffect, useState } from "react";
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [isLoading]);
  return (
    <>
      {isLoading ? (
        <Loading /> // <Loading />
      ) : (
        <Routes>{routes.map((val) => val)}</Routes>
      )}
    </>
  );
}

export default App;
