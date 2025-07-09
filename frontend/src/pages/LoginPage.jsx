import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import {
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    CircularProgress
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { govaaAuth } from '../services/api';
import { GOVAA_CONFIG, ROUTES } from '../constants';

const LoginPage = () => {
    // State to store form data
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { saveUser } = useAuth();
    const navigate = useNavigate();

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Step 1: Attempt GOVAA authentication first
            const govaaResult = await govaaAuth(email, password);

            if (govaaResult.success) {
                if (govaaResult.needsRegistration) {
                    // User not yet registered -> redirect to register
                    setSuccess('GOVAA authentication successful! Redirecting to the registration page...');
                    
                    // Navigate to register page with GOVAA info
                    setTimeout(() => {
                        navigate(ROUTES.REGISTER, {
                            state: { govaaUser: govaaResult.govaaUser }
                        });
                    }, 1500);
                } else {
                    // User already has an account -> login success
                    saveUser(govaaResult.data.user);
                    setSuccess('Login successful! Redirecting...');
                    
                    // Navigate back to home page
                    setTimeout(() => {
                        navigate(ROUTES.HOME);
                    }, 1500);
                }
            }
        } catch (error) {
            console.log('Login error:', error);

            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred during login');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh"
        >
            <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
                <Typography variant="h4" component="h1" textAlign="center" mb={3}>
                    Login to SurveySG
                </Typography>

                <Typography variant="body2" textAlign="center" mb={3} color="text.secondary">
                    Use your GOVAA account to log in
                </Typography>

                {/* Show error message if any */}
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {/* Show success message if any */}
                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {success}
                    </Alert>
                )}

                {/* Login form */}
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email GOVAA"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        required
                        placeholder="example@agency.gov.sg"
                        helperText="Must use a .gov.sg email"
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        required
                        helperText={`Demo password: ${GOVAA_CONFIG.PASSWORD}`}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        disabled={loading}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Login with GOVAA'
                        )}
                    </Button>
                </form>

                <Typography variant="body2" textAlign="center" color="text.secondary">
                    Don't have a SurveySG account? The system will guide you through registration after GOVAA authentication.
                </Typography>
            </Paper>
        </Box>
    );
};

export default LoginPage; 