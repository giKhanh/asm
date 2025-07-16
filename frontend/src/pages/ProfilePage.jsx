import { useState, useEffect } from 'react';
import {
    Typography,
    Box,
    Paper,
    Grid,
    Chip,
    Alert,
    CircularProgress
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { getUserProfile } from '../services/api';

const ProfilePage = () => {
    const { user } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // fetch profile data when component mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getUserProfile();
                if (response.success) {
                    setProfileData(response.data.user);
                }
            } catch (error) {
                console.log('Failed to fetch profile:', error);
                setError('Unable to load profile information');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error">
                {error}
            </Alert>
        );
    }

            // use profileData from server, fallback to user from context
    const userData = profileData || user;

    return (
        <Box>
            <Typography variant="h4" component="h1" mb={4}>
                Profile Information
            </Typography>

            <Paper elevation={2} sx={{ p: 4 }}>
                <Grid container spacing={3}>
                    {/* Basic information */}
                    <Grid item xs={12}>
                        <Typography variant="h6" mb={2}>
                            Personal Information
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box mb={2}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Name
                            </Typography>
                            <Typography variant="body1">
                                {userData?.name || 'No data'}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box mb={2}>
                            <Typography variant="subtitle2" color="text.secondary">
                                GOVAA Email
                            </Typography>
                            <Typography variant="body1">
                                {userData?.govaaEmail || 'No data'}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box mb={2}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Contact Email
                            </Typography>
                            <Typography variant="body1">
                                {userData?.contactEmail || 'No data'}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box mb={2}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Agency
                            </Typography>
                            <Typography variant="body1">
                                {userData?.agency || 'No data'}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box mb={2}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Job Description
                            </Typography>
                            <Typography variant="body1">
                                {userData?.jobDescription || 'No data'}
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Account Status */}
                    <Grid item xs={12}>
                        <Typography variant="h6" mb={2} mt={2}>
                            Account Status
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box mb={2}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Status
                            </Typography>
                            <Chip
                                label={userData?.isActive ? 'Active' : 'Inactive'}
                                color={userData?.isActive ? 'success' : 'error'}
                                size="small"
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box mb={2}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Account Created
                            </Typography>
                            <Typography variant="body1">
                                {userData?.createdAt
                                    ? new Date(userData.createdAt).toLocaleDateString('en-SG')
                                    : 'No data'
                                }
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box mb={2}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Last Login
                            </Typography>
                            <Typography variant="body1">
                                {userData?.lastLoginAt
                                    ? new Date(userData.lastLoginAt).toLocaleDateString('en-SG')
                                    : 'No data'
                                }
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default ProfilePage; 