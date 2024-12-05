import "bootstrap/dist/css/bootstrap.min.css";
import Router from "./Components/Router";

function App() {
  const style = {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
  };

  return (
    <div style={style}>
      <Router></Router>
    </div>
  );
}

export default App;
