import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraWrapper } from "./components/ChakraWrapper";
import { TauriConfirm } from "./components/tauriConfirm";
import HomePage from "./pages";
import EditPage from "./pages/edit";
import PreviewPage from "./pages/preview";

export default function App() {
  return (
    <div className="p-3">
      <ChakraWrapper>
        <TauriConfirm>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/edit" element={<EditPage />}>
                <Route path=":id" element={<EditPage />} />
              </Route>
              <Route path="/preview/:id" element={<PreviewPage />} />
            </Routes>
          </Router>
        </TauriConfirm>
      </ChakraWrapper>
    </div>
  );
}
