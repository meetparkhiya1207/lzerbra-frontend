import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  useTheme,
  Link,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";

export default function LoginModal({ open, onClose, onSwitch }) {
  const theme = useTheme();
  const { isAuthenticated, login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  if (isAuthenticated) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.username, formData.password, () => {
        toast("Login successful!");
      // Only close modal if login successful
      onClose();
    });
  };

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        // Prevent closing manually
        if (reason === "backdropClick" || reason === "escapeKeyDown") return;
        onClose();
      }}
      disableEscapeKeyDown
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle sx={{ textAlign: "center", color: theme.palette.primary.main }}>
        Login
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Username" name="username" value={formData.username} onChange={handleChange} required />
          <TextField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
          <Button type="submit" variant="contained">Login</Button>

          <Typography variant="caption" textAlign="center">
            Don’t have an account?{" "}
            <Link component="button" onClick={onSwitch} underline="hover">
              Register
            </Link>
          </Typography>

          <Typography variant="caption" textAlign="center">
            Demo: Username <b>admin</b>, Password <b>1234</b>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
