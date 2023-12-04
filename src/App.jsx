import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
        </div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
