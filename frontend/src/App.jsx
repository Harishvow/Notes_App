import { Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// Pages (create them inside src/pages/)
import Homepage from "./pages/Homepage";
import CreatePage from "./pages/CreatePage";
import NoteDetail from "./pages/NoteDetail";

function App() {
  return (
    <div>
      <Toaster /> {/* Toast notifications */}

      {/* Example button to test toast */}
      <button
        className="bg-blue-500 text-white px-4 py-2 m-4 rounded"
        onClick={() => toast.success("Congrats!")}
      >
        Click me
      </button>

      {/* React Router Routes */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetail />} />
      </Routes>
    </div>
  );
}

export default App;
