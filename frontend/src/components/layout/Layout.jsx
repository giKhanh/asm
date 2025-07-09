import { Box, AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { logoutUser } from '../../services/api';
import { ROUTES } from '../../constants';

const Layout = ({ children }) => {
  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Hàm xử lý logout
  const handleLogout = async () => {
    try {
      await logoutUser();
      logout(); // Clear state trong context
      alert('Logged out successfully!');
    } catch (error) {
      console.log('Lỗi logout:', error);
      // Vẫn logout ở client dù server có lỗi
      logout();
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header / AppBar */}
      <AppBar position="static">
        <Toolbar>
          {/* Logo/Title */}
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate(ROUTES.HOME)}
          >
            SurveySG
          </Typography>

          {/* Navigation Links */}
          <Box sx={{ flexGrow: 1, display: 'flex', ml: 3, gap: 1 }}>
            <Button color="inherit" onClick={() => navigate(ROUTES.HOME)}>
              Home
            </Button>
            {isLoggedIn && (
              <Button color="inherit" onClick={() => navigate(ROUTES.PROFILE)}>
                Profile
              </Button>
            )}
          </Box>

          {/* User info & Actions */}
          {isLoggedIn ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2">
                Hello, {user?.name}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          ) : (
            <Button color="inherit" onClick={() => navigate(ROUTES.LOGIN)}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout; 