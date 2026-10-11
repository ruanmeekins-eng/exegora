import { BrowserRouter, Routes, Route } from "react-router";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ReaderPage from "./pages/ReaderPage";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="reader" element={<ReaderPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;