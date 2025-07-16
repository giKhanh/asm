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

// create simple MUI theme
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

// component to protect routes (only allow logged in users)
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>; // TODO: replace this with a nicer spinner
  }
  
  return isLoggedIn ? children : <Navigate to={ROUTES.LOGIN} />;
};

// main component of app
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* reset MUI CSS */}
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              {/* home page */}
              <Route path={ROUTES.HOME} element={<HomePage />} />
              
              {/* login page */}
              <Route path={ROUTES.LOGIN} element={<LoginPage />} />
              
              {/* register page */}
              <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
              
              {/* protected routes (need login) */}
              <Route 
                path={ROUTES.PROFILE} 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              
              {/* fallback route (page not found) */}
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
