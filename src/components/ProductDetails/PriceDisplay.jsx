import { Box, Typography, Chip, useTheme } from '@mui/material';

export const PriceDisplay = ({ originalPrice, discountPrice }) => {
    const theme = useTheme();

    const hasDiscount = discountPrice && discountPrice < originalPrice;
    const savings = hasDiscount ? originalPrice - discountPrice : 0;
    const savingsPercentage = hasDiscount ? Math.round((savings / originalPrice) * 100) : 0;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: theme.palette.typography.fontFamily }}>
                Price
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                {hasDiscount ? (
                    <>
                        <Typography
                            variant="h4"
                            fontWeight={700}
                            color={theme.palette.primary.main}
                            sx={{ lineHeight: 1, fontFamily: theme.palette.typography.fontFamily }}
                        >
                            ₹{discountPrice?.toLocaleString()}
                        </Typography>
                        <Typography
                            variant="h6"
                            color={theme.palette.primary.lightmain}
                            sx={{
                                textDecoration: 'line-through',
                                lineHeight: 1,
                                fontFamily: theme.palette.typography.fontFamily
                            }}
                        >
                            ₹{originalPrice?.toLocaleString()}
                        </Typography>
                        <Chip
                            label={`${savingsPercentage}% OFF`}
                            color="error"
                            size="small"
                            sx={{
                                fontWeight: 600,
                                fontSize: '0.75rem',
                                fontFamily: theme.palette.typography.fontFamily
                            }}
                        />
                    </>
                ) : (
                    <Typography
                        variant="h4"
                        fontWeight={700}
                        color="text.primary"
                        sx={{ lineHeight: 1, fontFamily: theme.palette.typography.fontFamily }}
                    >
                        ₹{originalPrice.toLocaleString()}
                    </Typography>
                )}
            </Box>

            {hasDiscount && (
                <Typography variant="body2" color={"#22c55e"} fontWeight={500} sx={{ fontFamily: theme.palette.typography.fontFamily }}>
                    You save ₹{savings.toLocaleString()}
                </Typography>
            )}
        </Box>
    );
};