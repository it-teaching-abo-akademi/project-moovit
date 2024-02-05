import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import About from "./pages/infoPages/about";
import Tac from "./pages/infoPages/tac.jsx";
import Privacypolicy from "./pages/infoPages/privacypolicy";
import CreateEventPage from "./pages/events/Create";
import EventDetailPage from "./pages/singleEvent/EventDetail.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/tac" element={<Tac />}></Route>
                <Route path="/pp" element={<Privacypolicy />}></Route>
                <Route
                    path="/events/create"
                    element={<CreateEventPage />}
                ></Route>
                <Route
                    path="/events/detail/:id"
                    element={<EventDetailPage />}
                ></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
