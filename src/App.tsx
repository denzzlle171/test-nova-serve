import { Header } from './components/Header'
import { Routes, Route, Navigate } from 'react-router-dom';
import { CreatePage } from './pages/CreatePage'
import { UsersListPage } from './pages/UsersListPage';
import { UserInfoPage } from './pages/UserInfoPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/create" />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/users" element={<UsersListPage />} />
        <Route path="/users/:userId" element={<UserInfoPage />} />
      </Routes>
    </>
  );
}

export default App
