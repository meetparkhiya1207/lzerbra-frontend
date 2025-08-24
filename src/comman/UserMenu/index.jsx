import React from "react";
import {
  Menu,
  MenuItem,
  Typography,
  Divider,
  ListItemIcon,
  IconButton,
  useTheme,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function UserMenu({
  anchorEl,
  open,
  handleMenuClose,
  isAuthenticated,
  user,
  logout,
}) {
    const theme = useTheme();
  return (
    <>
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleMenuClose}
      PaperProps={{
        elevation: 3,
        sx: {
          borderRadius: 2,
          minWidth: 200,
          p: 1,
        },
      }}
    >
      {isAuthenticated ? (
        <>
          {/* Username */}
          <MenuItem>
            <ListItemIcon sx={{ color: theme.palette.primary.main}}>
              <PersonIcon fontSize="small" sx={{color: theme.palette.primary.main}}/>
            </ListItemIcon>
            <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: theme.palette.typography.fontFamily,color: theme.palette.primary.main }}>
              {user?.username}
            </Typography>
          </MenuItem>

          <Divider />

          {/* Logout */}
          <MenuItem
            onClick={() => {
              logout();
              handleMenuClose();
            }}
            sx={{
              color: "error.main",
              borderRadius: 1,
              mt: 1,
            }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" color="error" />
            </ListItemIcon>
            <Typography variant="body2" fontWeight={500}>
              Logout
            </Typography>
          </MenuItem>
        </>
      ) : (
        <MenuItem disabled>
          <Typography variant="body2" color="text.secondary">
            Not logged in
          </Typography>
        </MenuItem>
      )}
    </Menu>
    </>

  );
}
