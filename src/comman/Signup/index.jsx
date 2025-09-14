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
  FormControlLabel,
  Checkbox,
  useTheme,
} from '@mui/material';
import { Google } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRegister, useResendOTP, useVerifyOTP } from '../../hooks/auth';
import { toast } from 'react-toastify';
import CommonHeading from '../CommonHeading';

const Signup = () => {
  const { registerCustomer, isMutating } = useRegister();
  const { verifyOtp, isMutatingOtp } = useVerifyOTP();
  const { resendOtp, isMutatingResendOtp } = useResendOTP();

  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [emailForOtp, setEmailForOtp] = useState('');
  const [otpTimer, setOtpTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [otpStartTime, setOtpStartTime] = useState(Number(sessionStorage.getItem('otpStartTime')) || 0);


  const [formData, setFormData] = useState({
    customer_firstName: '',
    customer_lastName: '',
    customer_email: '',
    customer_password: '',
    customer_confirmPassword: '',
    customer_agreeToTerms: false,
  });

  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.customer_firstName.trim()) newErrors.customer_firstName = 'First name is required';
    if (!formData.customer_lastName.trim()) newErrors.customer_lastName = 'Last name is required';
    if (!formData.customer_email) newErrors.customer_email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.customer_email)) newErrors.customer_email = 'Email is invalid';
    if (!formData.customer_password) newErrors.customer_password = 'Password is required';
    else if (formData.customer_password.length < 8) newErrors.customer_password = 'Password must be at least 8 characters';
    if (!formData.customer_confirmPassword) newErrors.customer_confirmPassword = 'Please confirm your password';
    else if (formData.customer_password !== formData.customer_confirmPassword) newErrors.customer_confirmPassword = 'Passwords do not match';
    if (!formData.customer_agreeToTerms) newErrors.customer_agreeToTerms = 'You must agree to the terms and conditions';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Register form submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await registerCustomer(formData);
      console.log("✅ Registered:", res);
      if (res?.success) {
        toast.success(res?.message);
        sessionStorage.setItem('emailForOtp', formData.customer_email);
        sessionStorage.setItem('otpStep', '2');
        setEmailForOtp(formData.customer_email);
        setStep(2);
        const now = new Date().getTime();
        sessionStorage.setItem('otpStartTime', now);
        setOtpStartTime(now);
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      console.error("❌ Register error:", err);
      toast.error(err?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const savedStep = sessionStorage.getItem('otpStep');
    const savedEmail = sessionStorage.getItem('emailForOtp');

    if (savedStep === '2' && savedEmail) {
      setStep(2);
      setEmailForOtp(savedEmail);
    }
  }, []);

  useEffect(() => {
    if (step !== 2 || !otpStartTime) return;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const elapsed = Math.floor((now - otpStartTime) / 1000);
      const remaining = 30 - elapsed;
      if (remaining > 0) {
        setOtpTimer(remaining);
        setCanResend(false);
      } else {
        setOtpTimer(0);
        setCanResend(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [step, otpStartTime]);


  // OTP verification submit
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp) return toast.error("Please enter OTP");

    try {
      const res = await verifyOtp({ email: emailForOtp, otp });
      if (res.success) {
        toast.success(res.message);
        sessionStorage.removeItem('otpStep');
        sessionStorage.removeItem('emailForOtp');
        navigate('/login');
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error(err?.message || "OTP verification failed");
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await resendOtp({ email: emailForOtp });
      if (res.success) {
        toast.success(res?.message);
        sessionStorage.setItem('emailForOtp', formData.customer_email);
        sessionStorage.setItem('otpStep', '2');
        setEmailForOtp(formData.customer_email);
        setStep(2);
        const now = new Date().getTime();
        sessionStorage.setItem('otpStartTime', now);
        setOtpStartTime(now);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error(err.message || "Failed to resend OTP");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          {/* <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
            {step === 1 ? "Create Account" : "Verify OTP"}
          </Typography> */}
           <CommonHeading title={step === 1 ? "Create Account" : "Verify OTP"} lineWidth={100} align="center" mb={{ xs: 0, sm: 3 }} />
          <Typography variant="body1" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main, fontSize: { xs: "0.8rem", sm: "1rem" } }}>
            {step === 1 ? "Join Lzebra and start shopping today" : "Enter the OTP sent to your email"}
          </Typography>
        </Box>

        {step === 1 && (
          <Box component="form" onSubmit={handleRegisterSubmit} sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField fullWidth label="First Name" name="customer_firstName" value={formData.customer_firstName} onChange={handleChange} error={!!errors.customer_firstName} helperText={errors.customer_firstName} autoComplete="given-name" />
              <TextField fullWidth label="Last Name" name="customer_lastName" value={formData.customer_lastName} onChange={handleChange} error={!!errors.customer_lastName} helperText={errors.customer_lastName} autoComplete="family-name" />
            </Box>

            <TextField fullWidth label="Email Address" name="customer_email" type="email" value={formData.customer_email} onChange={handleChange} error={!!errors.customer_email} helperText={errors.customer_email} sx={{ mb: 2 }} autoComplete="customer_email" />
            <TextField fullWidth label="Password" name="customer_password" type="password" value={formData.customer_password} onChange={handleChange} error={!!errors.customer_password} helperText={errors.customer_password} sx={{ mb: 2 }} autoComplete="new-password" />
            <TextField fullWidth label="Confirm Password" name="customer_confirmPassword" type="password" value={formData.customer_confirmPassword} onChange={handleChange} error={!!errors.customer_confirmPassword} helperText={errors.customer_confirmPassword} sx={{ mb: 2 }} autoComplete="new-password" />

            <Box sx={{ mb: 2 }}>
              <FormControlLabel
                control={<Checkbox name="customer_agreeToTerms" checked={formData.customer_agreeToTerms} onChange={handleChange} color="primary" />}
                label={<Typography variant="body2" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                  I agree to the <Link href="#" sx={{ fontWeight: 'medium', fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.lightmain }}>Terms of Service</Link> and <Link href="#" sx={{ fontWeight: 'medium', fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.lightmain }}>Privacy Policy</Link>
                </Typography>}
              />
              {errors.customer_agreeToTerms && <Typography variant="caption" color="error" sx={{ ml: 4 }}>{errors.customer_agreeToTerms}</Typography>}
            </Box>

            <Button type="submit" fullWidth variant="contained" size="large" sx={{ mb: 2, py: 1.5, fontFamily: theme.palette.typography.fontFamily, color: "#fff" }}>
              {isMutating ? "Registering..." : "Register"}
            </Button>
          </Box>
        )}

        {step === 2 && (
          <Box component="form" onSubmit={handleOtpSubmit} sx={{ mt: 3 }}>
            <TextField fullWidth label="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} sx={{ mb: 2 }} />
            <Typography variant="body2" sx={{ mb: 2 }}>
              {otpTimer > 0 ? `OTP expires in ${otpTimer}s` : "OTP expired"}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ py: 1.5, fontFamily: theme.palette.typography.fontFamily, color: "#fff", mb: 1 }}
              disabled={otpTimer === 0}
            >
              {isMutatingOtp ? "Please wait..." : "Verify OTP"}
            </Button>
            {canResend && (
              <Button type="button" fullWidth variant="outlined" onClick={handleResendOtp}>
                Resend OTP
              </Button>
            )}
          </Box>
        )}

        <Divider sx={{ mb: 2, mt: 2 }}>
          <Typography variant="body2" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>OR</Typography>
        </Divider>

        <Button fullWidth variant="outlined" startIcon={<Google />} sx={{ py: 1.5, fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
          Sign up with Google
        </Button>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
            Already have an account?{' '}
            <Link component="button" type="button" onClick={() => navigate('/login')} sx={{ fontWeight: 'medium', textDecoration: 'none', fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
              Sign in here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
