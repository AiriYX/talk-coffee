import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import PostCreation from "./pages/PostCreation";
import { PostPage } from "./pages/PostPage";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} /> {/* 👈 Renders at /app/ */}
        <Route path="/post" element={<PostCreation />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/post/:id/edit" element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
