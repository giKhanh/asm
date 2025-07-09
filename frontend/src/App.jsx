import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import { ROUTES } from './constants';

// Tạo theme MUI đơn giản
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Component để protect routes (chỉ cho user đã login vào)
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a nicer spinner
  }
  
  return isLoggedIn ? children : <Navigate to={ROUTES.LOGIN} />;
};

// Component chính của app
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Reset CSS cho MUI */}
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              {/* Trang chủ */}
              <Route path={ROUTES.HOME} element={<HomePage />} />
              
              {/* Trang login */}
              <Route path={ROUTES.LOGIN} element={<LoginPage />} />
              
              {/* Trang đăng ký */}
              <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
              
              {/* Protected routes (cần login) */}
              <Route 
                path={ROUTES.PROFILE} 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Fallback route (page not found) */}
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
