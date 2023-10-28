import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import "./styles/custom.css";
import Login from "./screens/Login";
import Edit from "./screens/Edit";
import Protected from "./screens/Protected";
import Settings from "./screens/Settings";
import Home from "./screens/Home";
import Dashboard from "./screens/Dashboard";
import Create from "./screens/Create";
import ChangePassword from "./screens/ChangePassword";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <h1 className="logo">
          <Link to="/dashboard/">LessonOfIslam</Link>
        </h1>
        <Routes>
          <Route path="/*" element={<Login />} />
          <Route exact path="/changepassword/:token" element={<ChangePassword />} />
          <Route
            exact
            path="/dashboard"
            element={<Protected Component={Dashboard} />}
          >
            <Route index element={<Home />} />
            <Route exact path="/dashboard/edit" element={<Edit />} />
            <Route exact path="/dashboard/settings" element={<Settings />} />
            <Route exact path="/dashboard/create" element={<Create />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
