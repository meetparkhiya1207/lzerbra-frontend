import { useState, useCallback } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import { useTheme } from '@emotion/react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// ----------------------------------------------------------------------

export function ProductSort({ options, sortBy, onSort, sx, ...other }) {
  const [openPopover, setOpenPopover] = useState(null);
  const theme = useTheme();

  const handleOpenPopover = useCallback((event) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        onClick={handleOpenPopover}
     endIcon={
  openPopover ? (
    <KeyboardArrowUpIcon color="error" />
  ) : (
    <KeyboardArrowDownIcon color="inherit" />
  )
}
        sx={{
          border: `1px solid ${theme.palette.primary.main}`,
          px: 2,
          py: 1,
          bgcolor: 'background.paper',
          color: theme.palette.primary.main,
          fontFamily: theme.palette.typography.fontFamily,
          boxShadow: 0,
          ...sx,
        }}
        {...other}
      >
        Sort By:&nbsp;
        <Typography
          component="span"
          variant="subtitle2"
          sx={{
            color: 'text.secondary',
            fontFamily: theme.palette.typography.fontFamily,
          }}
        >
          {options.find((option) => option.value === sortBy)?.label}
        </Typography>
      </Button>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 2,
            boxShadow: 3,
            fontFamily: theme.palette.typography.fontFamily,
          },
        }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 180,
            display: 'flex',
            flexDirection: 'column',
            fontFamily: theme.palette.typography.fontFamily,
            [`& .${menuItemClasses.root}`]: {
              px: 1.5,
              gap: 2,
              borderRadius: 0.75,
              fontFamily: theme.palette.typography.fontFamily,
              [`&.${menuItemClasses.selected}`]: {
                bgcolor: theme.palette.action.selected,
                color: theme.palette.primary.main,
              },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === sortBy}
              onClick={() => {
                onSort(option.value);
                handleClosePopover();
              }}
              sx={{
                fontFamily: theme.palette.typography.fontFamily,
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </>
  );
}