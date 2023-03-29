import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import TestPage from './pages/Test';
import CustomHooksPage from './pages/CustomHooks';
import TodoListPage from './pages/TodoList';

function App() {
 return (
  <>
   {/* //current route = / */}
   <Routes>
    <Route path="/home" element={<HomePage />}></Route>
    <Route path="test" element={<TestPage />}></Route>
    <Route path="custom" element={<CustomHooksPage />}></Route>
    <Route path="todo" element={<TodoListPage />}></Route>
   </Routes>
  </>
 );
}
export default App;
