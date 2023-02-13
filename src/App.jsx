import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import { useContext } from "react";
import { Context } from "./context/Context";
import "./app.css";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  const { user } = useContext(Context);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Homepage />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/post/:id" element={<Single />}></Route>
        <Route exact path="/about" element={<About />}></Route>
        <Route exact path="/contact-us" element={<Contact />}></Route>
        <Route
          exact
          path="/write"
          element={user ? <Write /> : <Login />}
        ></Route>
        <Route
          exact
          path="/settings"
          element={user ? <Settings /> : <Login />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
