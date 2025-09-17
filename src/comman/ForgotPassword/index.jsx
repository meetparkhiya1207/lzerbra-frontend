import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  useTheme,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { useForgotPassword } from "../../hooks/auth";
import { toast } from "react-toastify";
import CommonHeading from "../CommonHeading";

const ForgotPassword = () => {
  const theme = useTheme();
  const { userForgotPasswordTriger, isMutating } = useForgotPassword();
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await userForgotPasswordTriger({ email });
    if (res?.success) {
      toast.success(res?.message);
      setSuccess(true);
    } else {
      toast.error(res?.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 8, textAlign: "center" }}>
        {!success ? (
          <>
            <CommonHeading
              title="Forgot Password"
              lineWidth={120}
              align="center"
              mb={{ xs: 0, sm: 3 }}
            />
            <form onSubmit={handleSubmit}>
              <TextField
                label="Enter your email"
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  my: 2,
                  color: theme.palette.primary.main,
                  fontFamily: theme.palette.typography.fontFamily,
                }}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={isMutating}
                fullWidth
                sx={{
                  color: "#fff",
                  fontFamily: theme.palette.typography.fontFamily,
                  py: 1.5,
                }}
              >
                {isMutating ? "Send Reset Link...." : "Send Reset Link"}
              </Button>
            </form>
          </>
        ) : (
          <Box>
            <CheckCircle
              sx={{
                fontSize: 80,
                color: "green",
                animation: "pop 0.6s ease-out",
              }}
            />
            <Typography
              variant="h6"
              sx={{ mt: 2, color: theme.palette.primary.main }}
            >
              Reset link sent successfully!
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Simple keyframes for icon pop animation */}
      <style>
        {`
          @keyframes pop {
            0% { transform: scale(0.5); opacity: 0; }
            70% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </Container>
  );
};

export default ForgotPassword;
