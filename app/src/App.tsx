import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraWrapper } from './components/ChakraWrapper';
import HomePage from './pages';
import EditPage from './pages/edit';
import SettingsPage from './pages/settings';

export default function App() {
  return (
    <div className='p-3'>
      <ChakraWrapper>
        <Router>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/settings' element={<SettingsPage />} />
            <Route path='/edit' element={<EditPage />}>
              <Route path=':id' element={<EditPage />} />
            </Route>
          </Routes>
        </Router>
      </ChakraWrapper>
    </div>
  );
}
