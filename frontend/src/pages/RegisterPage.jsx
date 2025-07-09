import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    CircularProgress,
    MenuItem,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { registerUser, getAgencies } from '../services/api';
import { VALIDATION, ROUTES } from '../constants';

const RegisterPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Lấy thông tin GOVAA từ state (được pass từ LoginPage)
    const govaaUser = location.state?.govaaUser;

    // State cho form
    const [formData, setFormData] = useState({
        govaaName: govaaUser?.name || '',
        govaaEmail: govaaUser?.email || '',
        contactEmail: '',
        agency: '',
        jobDescription: '',
        acceptedTerms: false
    });

    const [agencies, setAgencies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingAgencies, setLoadingAgencies] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { saveUser } = useAuth();

    // Lấy danh sách agencies khi component mount
    useEffect(() => {
        const fetchAgencies = async () => {
            try {
                const response = await getAgencies();
                if (response.success) {
                    const list = Array.isArray(response.data)
                        ? response.data
                        : Array.isArray(response.data?.agencies)
                            ? response.data.agencies
                            : [];
                    setAgencies(list);
                }
            } catch (error) {
                console.log('Error fetching agencies:', error);
                setError('Unable to load agency list');
            } finally {
                setLoadingAgencies(false);
            }
        };

        fetchAgencies();
    }, []);

    // Redirect về login nếu không có thông tin GOVAA
    useEffect(() => {
        if (!govaaUser) {
            navigate(ROUTES.LOGIN, {
                state: { message: 'Please authenticate with GOVAA before registering' }
            });
        }
    }, [govaaUser, navigate]); 

    // Hàm cập nhật form data
    const handleInputChange = (field) => (event) => {
        const value = field === 'acceptedTerms' ? event.target.checked : event.target.value;
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle registration form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError('');
        setSuccess('');

        // Basic validation
        if (!formData.contactEmail || !formData.agency || !formData.jobDescription) {
            setError('Please fill out all required fields');
            setLoading(false);
            return;
        }

        if (formData.jobDescription.length < VALIDATION.JOB_DESCRIPTION.MIN_LENGTH) {
            setError(`Job description must be at least ${VALIDATION.JOB_DESCRIPTION.MIN_LENGTH} characters`);
            setLoading(false);
            return;
        }

        if (!formData.acceptedTerms) {
            setError('You must agree to the terms of service');
            setLoading(false);
            return;
        }

        try {
            const response = await registerUser(formData);

            if (response.success) {
                // Registration successful
                saveUser(response.data.user);
                setSuccess('Registration successful! Redirecting...');

                // Chuyển về trang chủ sau 2 giây
                setTimeout(() => {
                    navigate(ROUTES.HOME);
                }, 2000);
            }
        } catch (error) {
            console.log('Register error:', error);

            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred during registration');
            }
        } finally {
            setLoading(false);
        }
    };

    // Loading agencies
    if (loadingAgencies) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh"
        >
            <Paper elevation={3} sx={{ p: 4, maxWidth: 500, width: '100%' }}>
                <Typography variant="h4" component="h1" textAlign="center" mb={3}>
                    Register for SurveySG
                </Typography>

                <Typography variant="body2" textAlign="center" mb={3} color="text.secondary">
                    Complete the information to create your SurveySG account
                </Typography>

                {/* Show error message */}
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {/* Show success message */}
                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {success}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    {/* GOVAA information (read-only) */}
                    <TextField
                        fullWidth
                        label="Name (from GOVAA)"
                        value={formData.govaaName}
                        margin="normal"
                        disabled
                        helperText="Information from GOVAA system"
                    />

                    <TextField
                        fullWidth
                        label="GOVAA Email"
                        value={formData.govaaEmail}
                        margin="normal"
                        disabled
                        helperText="Email has been verified through GOVAA"
                    />

                    {/* Information to fill in */}
                    <TextField
                        fullWidth
                        label="Contact Email"
                        type="email"
                        value={formData.contactEmail}
                        onChange={handleInputChange('contactEmail')}
                        margin="normal"
                        required
                        placeholder="your.email@example.com"
                        helperText="Contact email (can be different from GOVAA email)"
                    />

                    <TextField
                        fullWidth
                        select
                        label="Agency"
                        value={formData.agency}
                        onChange={handleInputChange('agency')}
                        margin="normal"
                        required
                        helperText="Select your agency"
                    >
                        {(agencies || []).map((agency) => (
                            <MenuItem key={agency} value={agency}>
                                {agency}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        fullWidth
                        label="Job Description"
                        multiline
                        rows={4}
                        value={formData.jobDescription}
                        onChange={handleInputChange('jobDescription')}
                        margin="normal"
                        required
                        placeholder="Briefly describe your role and work..."
                        helperText={`${formData.jobDescription.length}/${VALIDATION.JOB_DESCRIPTION.MAX_LENGTH} characters (minimum ${VALIDATION.JOB_DESCRIPTION.MIN_LENGTH})`}
                        inputProps={{
                            maxLength: VALIDATION.JOB_DESCRIPTION.MAX_LENGTH
                        }}
                    />

                    {/* Terms checkbox */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.acceptedTerms}
                                onChange={handleInputChange('acceptedTerms')}
                                required
                            />
                        }
                        label="I agree to the SurveySG Terms of Service and Privacy Policy"
                        sx={{ mt: 2 }}
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
                            'Create SurveySG Account'
                        )}
                    </Button>
                </form>

                <Typography variant="body2" textAlign="center" color="text.secondary">
                    Already have an account? <Button onClick={() => navigate(ROUTES.LOGIN)}>Login</Button>
                </Typography>
            </Paper>
        </Box>
    );
};

export default RegisterPage; 