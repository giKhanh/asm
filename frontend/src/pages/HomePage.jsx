import { Typography, Box, Paper, Button } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate(ROUTES.LOGIN);
    };

    const handleProfileClick = () => {
        navigate(ROUTES.PROFILE);
    };

    return (
        <Box>
            <Typography variant="h3" component="h1" textAlign="center" mb={4}>
                Welcome to SurveySG! 🇸🇬
            </Typography>

            <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
                {isLoggedIn ? (
                    // user is logged in
                    <Box>
                        <Typography variant="h5" mb={2}>
                            Hello, {user?.name}!
                        </Typography>
                        <Typography variant="body1" mb={3} color="text.secondary">
                            You have successfully logged into the SurveySG system.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleProfileClick}
                        >
                            View Profile
                        </Button>
                    </Box>
                ) : (
                    // user is not logged in
                    <Box>
                        <Typography variant="h5" mb={2}>
                            Singapore Government Survey System
                        </Typography>
                        <Typography variant="body1" mb={3} color="text.secondary">
                            Please log in with your GOVAA account to continue.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={handleLoginClick}
                            >
                                Login
                            </Button>
                        </Box>
                    </Box>
                )}
            </Paper>

            {/* additional information */}
            <Box mt={4}>
                <Typography variant="h6" mb={2}>
                    About SurveySG
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    SurveySG is an online survey system for Singapore Government agencies.
                    The system uses GOVAA (Government Authentication) to ensure safety and security.
                </Typography>
            </Box>
        </Box>
    );
};

export default HomePage; 