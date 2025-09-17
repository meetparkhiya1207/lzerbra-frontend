import React, { useEffect, useState } from 'react';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Link,
    Divider,
    Alert,
    useTheme,
} from '@mui/material';
import { Google, Facebook } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/auth';
import { toast } from 'react-toastify';
import CommonHeading from '../CommonHeading';

const Login = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const { loginCustomer, isMutating } = useLogin();
    const [formData, setFormData] = useState({
        customer_email: '',
        customer_password: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.customer_email) {
            newErrors.customer_email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.customer_email)) {
            newErrors.customer_email = 'Email is invalid';
        }

        if (!formData.customer_password) {
            newErrors.customer_password = 'Password is required';
        } else if (formData.customer_password.length < 6) {
            newErrors.customer_password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const res = await loginCustomer(formData);
            if (res?.success) {
                toast.success(res?.message);
                sessionStorage.setItem('token', res.token);
                try {
                    sessionStorage.setItem('userData', JSON.stringify(res.customer));
                } catch (_) {
                    sessionStorage.setItem('userData', res.customer);
                }
                navigate("/");
            } else {
                toast.error(res?.message);
            }
        }
    };

    useEffect(() => {
        // const otpStep = sessionStorage.getItem('otpStep');
        // const emailForOtp = sessionStorage.getItem('emailForOtp');
        // if (otpStep === '2' && emailForOtp) {
        //     navigate('/signup');
        // }

        sessionStorage.removeItem('otpStep');
        sessionStorage.removeItem('emailForOtp');
        sessionStorage.removeItem('otpStartTime');
    }, [navigate]);

    return (
        <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    {/* <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                        Welcome Back
                    </Typography> */}
                    <CommonHeading title="Welcome Back" lineWidth={120} align="center" mb={{ xs: 0, sm: 3 }} />
                    <Typography variant="body1" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main, fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" }, }}>
                        Sign in to your account to continue shopping
                    </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        fullWidth
                        label="Email Address"
                        name="customer_email"
                        type="email"
                        value={formData.customer_email}
                        onChange={handleChange}
                        error={!!errors.customer_email}
                        helperText={errors.customer_email}
                        sx={{ mb: 2 }}
                        autoComplete="email"
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        name="customer_password"
                        type="password"
                        value={formData.customer_password}
                        onChange={handleChange}
                        error={!!errors.customer_password}
                        helperText={errors.customer_password}
                        sx={{ mb: 3 }}
                        autoComplete="current-password"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{ mb: 2, py: 1.5, fontFamily: theme.palette.typography.fontFamily, color: "#fff" }}
                        disabled={isMutating}
                    >
                        {isMutating ? 'Signing In...' : 'Sign In'}
                    </Button>

                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                        <Link
                            component="button"
                            variant="body2"
                            type="button"
                            sx={{ textDecoration: 'none', fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}
                            onClick={() => navigate("/forgot-password")}
                        >
                            Forgot your password?
                        </Link>
                    </Box>

                    <Divider sx={{ mb: 2 }}>
                        <Typography variant="body2" color={theme.palette.primary.main} sx={{ fontFamily: theme.palette.typography.fontFamily }}>
                            OR
                        </Typography>
                    </Divider>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<Google />}
                            sx={{ py: 1.5, fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}
                        >
                            Continue with Google
                        </Button>
                        {/* <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<Facebook />}
                            sx={{ py: 1.5 }}
                        >
                            Continue with Facebook
                        </Button> */}
                    </Box>

                    <Box sx={{ textAlign: 'center', mt: 3 }}>
                        <Typography variant="body2" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                            Don't have an account?{' '}
                            <Link
                                component="button"
                                type="button"
                                onClick={() => navigate('/signup')}
                                sx={{ fontWeight: 'medium', textDecoration: 'none' }}
                            >
                                Sign up here
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;