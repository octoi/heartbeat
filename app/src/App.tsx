import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraWrapper } from './components/ChakraWrapper';
import { TauriConfirm } from './components/tauriConfirm';
import { Paths } from './utils/paths';
import HomePage from './pages';
import NewPatient from './pages/newPatient';

export default function App() {
  return (
    <div className='p-3'>
      <ChakraWrapper>
        <TauriConfirm>
          <Router>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route
                path={Paths.NewPatient.toString()}
                element={<NewPatient />}
              />
            </Routes>
          </Router>
        </TauriConfirm>
      </ChakraWrapper>
    </div>
  );
}
