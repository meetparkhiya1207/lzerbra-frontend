import { useTheme } from "@emotion/react";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function RegisterModal({ open, onClose, onSwitch }) {
  const theme = useTheme();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(
      formData.username,
      formData.phone,
      formData.password,
      formData.cpassword,
      () => {
        // called after successful registration
        onClose(); // close register modal
        onSwitch(); // open login modal
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ textAlign: "center", color: theme.palette.primary.main }}>
        Register
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField label="Username" name="username" value={formData.username} onChange={handleChange} required />
          <TextField label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
          <TextField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
          <TextField label="Confirm Password" type="password" name="cpassword" value={formData.cpassword} onChange={handleChange} required />

          <Button type="submit" variant="contained">Register</Button>

          <Typography variant="caption" textAlign="center">
            Already have an account?{" "}
            <Link component="button" onClick={onSwitch} underline="hover">
              Login
            </Link>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
