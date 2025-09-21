import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Paper, Box, useTheme } from "@mui/material";
import { useResetPassword } from "../../hooks/auth";
import { toast } from "react-toastify";
import CommonHeading from "../CommonHeading";

const ResetPassword = () => {
    const theme = useTheme();
    const { token } = useParams();
    const navigate = useNavigate();

    const { userResetPasswordTriger } = useResetPassword();

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        customer_password: '',
        customer_confirmPassword: '',
    });

    const validateForm = () => {
        const newErrors = {};

        if (!formData.customer_password || formData.customer_password.length < 8) {
            newErrors.customer_password = "Password must be at least 8 characters";
        }

        if (!formData.customer_confirmPassword) {
            newErrors.customer_confirmPassword = "Please confirm your password";
        } else if (formData.customer_password !== formData.customer_confirmPassword) {
            newErrors.customer_confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const res = await userResetPasswordTriger({
                password: formData.customer_password,
                token,
            });
            if (res?.success) {
                toast.success(res?.message);
                setTimeout(() => navigate("/login"), 2000);
            } else {
                toast.error(res?.message);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper sx={{ p: 4, mt: 8 }}>
                 <CommonHeading title={"Reset Password"} lineWidth={100} align="center" mb={{ xs: 0, sm: 3 }} />
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth label="Password" name="customer_password" type="password" value={formData.customer_password} onChange={handleChange} error={!!errors.customer_password} helperText={errors.customer_password} sx={{ mb: 2 }} autoComplete="new-password" />
                    <TextField fullWidth label="Confirm Password" name="customer_confirmPassword" type="password" value={formData.customer_confirmPassword} onChange={handleChange} error={!!errors.customer_confirmPassword} helperText={errors.customer_confirmPassword} sx={{ mb: 2 }} autoComplete="new-password" />
                    <Button type="submit" variant="contained" fullWidth sx={{py:1.5,fontFamily: theme.palette.typography.fontFamily, color: "#fff"}}>Reset Password</Button>
                </form>
            </Paper>
        </Container>
    );
};

export default ResetPassword;
