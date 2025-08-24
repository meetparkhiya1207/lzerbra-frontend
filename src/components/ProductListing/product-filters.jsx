import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import CloseIcon from '@mui/icons-material/Close';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useTheme } from '@emotion/react';

export function ProductFilters({
  filters,
  options,
  canReset,
  openFilter,
  onSetFilters,
  onOpenFilter,
  onCloseFilter,
  onResetFilter,
}) {
  const theme = useTheme();
  // Gender: Multiple selection
  const renderGender = (
    <Stack spacing={1} sx={{ fontFamily: theme.palette.typography.fontFamily }}>
      <Typography
        variant="subtitle2"
        sx={{ fontFamily: theme.palette.typography.fontFamily }}
      >
        Category
      </Typography>
      <FormGroup sx={{ fontFamily: theme.palette.typography.fontFamily }}>
        {options.categories.map((option) => (
          <FormControlLabel
            sx={{ fontFamily: theme.palette.typography.fontFamily }}
            key={option.value}
            control={
              <Checkbox
                sx={{ fontFamily: theme.palette.typography.fontFamily }}
                checked={filters.category.includes(option.value)}
                onChange={() => {
                  const checked = filters.category.includes(option.value)
                    ? filters.category.filter((value) => value !== option.value)
                    : [...filters.category, option.value];
                  onSetFilters({ category: checked });
                }}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
    </Stack>
  );

  // Category: Single selection
  const renderCategory = (
    <Stack spacing={1}>
      <Typography variant="subtitle2" sx={{ fontFamily: theme.palette.typography.fontFamily }}>Sub Category</Typography>
      <RadioGroup
        value={filters.subcategory}
        onChange={(e) => onSetFilters({ subcategory: e.target.value })}
      >
        {options.subcategories.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </Stack>
  );

  // Price: Single selection
  const renderPrice = (
    <Stack spacing={1}>
      <Typography variant="subtitle2" sx={{ fontFamily: theme.palette.typography.fontFamily, }}>Price</Typography>
      <RadioGroup
        value={filters.price}
        onChange={(e) => onSetFilters({ price: e.target.value })}
      >
        {options.price.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </Stack>
  );

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={
          <Badge color="error" variant="dot" invisible={!canReset}>
            <FilterListIcon />
          </Badge>
        }
        onClick={onOpenFilter}
        sx={{
          border: `1px solid ${theme.palette.primary.main}`,
          px: 2,
          py: 1,
          bgcolor: 'background.paper',
          color: theme.palette.primary.main,
          boxShadow: canReset ? 2 : 0,
          fontFamily: theme.palette.typography.fontFamily,
        }}
      >
        Filters
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 320, overflow: 'hidden', borderRadius: '16px 0 0 16px' },
        }}
      >
        <Box
          sx={{
            py: 2,
            pl: 2.5,
            pr: 1.5,
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'background.default',
            borderBottom: '1px solid #eee',
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: theme.palette.typography.fontFamily, }}>
            Filters
          </Typography>
          <IconButton
            onClick={onResetFilter}
            disabled={!canReset}
            color={canReset ? 'error' : 'default'}
            sx={{ mr: 1 }}
          >
            <Badge color="error" variant="dot" invisible={!canReset} onClick={onCloseFilter}>
              <RestartAltIcon />
            </Badge>
          </IconButton>
          <IconButton onClick={onCloseFilter}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ p: 3, overflowY: 'auto', height: 'calc(100vh - 64px)' }}>
          <Stack spacing={3}>
            {renderGender}
            {renderCategory}
            {renderPrice}
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}