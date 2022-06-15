import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraWrapper } from './components/ChakraWrapper';
import HomePage from './pages';
import EditPage from './pages/edit';

export default function App() {
  return (
    <div className='p-3'>
      <ChakraWrapper>
        <Router>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/edit' element={<EditPage />}>
              <Route path=':id' element={<EditPage />} />
            </Route>
          </Routes>
        </Router>
      </ChakraWrapper>
    </div>
  );
}
