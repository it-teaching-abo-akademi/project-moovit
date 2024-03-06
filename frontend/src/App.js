import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import CreateEventPage from "./pages/events/Create";
import About from "./pages/infoPages/about";
import Tac from "./pages/infoPages/tac.jsx";
import Privacypolicy from "./pages/infoPages/privacypolicy";
import HomeScreen from "./pages/HomeScreen/HomeScreen.js";
import SearchScreen from "./pages/SearchScreen/SearchScreen";
import SingleEvent from "./pages/events/Single.jsx";
import MenuBar from "./pages/components/MenuBar.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeScreen />}></Route>
                <Route path="/events/search" element={<SearchScreen />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route
                    path="/events/create"
                    element={<CreateEventPage />}
                ></Route>
                <Route path="/event/:id" element={<SingleEvent />} />
                <Route path="/about" element={<About />}></Route>
                <Route path="/tac" element={<Tac />}></Route>
                <Route path="/pp" element={<Privacypolicy />}></Route>
            </Routes>
            <div style={{ display: "block", height: "60px" }}></div>
            <MenuBar />
        </BrowserRouter>
    );
}

export default App;
