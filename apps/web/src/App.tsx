import "./styles/global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { SignIn } from "./pages/SignIn";
import { NotFound } from "./pages/404";
import { RequireAuth } from "lib/RequireAuth";
import { Admin } from "pages";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/Signin" element={<SignIn />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/" element={<Home />} />
                <Route element={<RequireAuth redirectTo="/" Role="ADMIN" />}>
                    <Route path="about" element={<About />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
