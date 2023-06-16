import { Routes } from "react-router-dom";
import routes from "./Routes/routes";
const App = () => {
  return (
    <>
      <Routes>{routes.map((val) => val)}</Routes>
    </>
  );
};

export default App;
