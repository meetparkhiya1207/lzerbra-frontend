import { Box, Typography, Divider, useTheme } from '@mui/material';
import { PriceDisplay } from './PriceDisplay';

export const ProductInfo = ({ product }) => {

    const theme = useTheme();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Product Name */}
            <Box>
                <Typography variant="body2" color={theme.palette.primary.main} gutterBottom sx={{ fontFamily: theme.palette.typography.fontFamily }}>
                    Name :
                </Typography>
                <Typography variant="h5" fontWeight={600} color={theme.palette.primary.main}>
                    {product?.productName}
                </Typography>
            </Box>

            {/* Category Information */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color={theme.palette.primary.main} gutterBottom sx={{ fontFamily: theme.palette.typography.fontFamily }} >
                        Category :
                    </Typography>
                    <Typography variant="body1" color={theme.palette.primary.lightmain}>
                        {product?.category}
                    </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color={theme.palette.primary.main} gutterBottom sx={{ fontFamily: theme.palette.typography.fontFamily }}>
                        Sub Category :
                    </Typography>
                    <Typography variant="body1" color={theme.palette.primary.lightmain}>
                        {product?.subCategory}
                    </Typography>
                </Box>
            </Box>

            <Divider />

            {/* Price Information */}
            <PriceDisplay originalPrice={product?.price} discountPrice={product?.discountPrice} />

            {/* Description */}
            {product.description && (
                <>
                    <Divider />
                    <Box>
                        <Typography variant="body2" color={theme.palette.primary.main} gutterBottom sx={{ fontFamily: theme.palette.typography.fontFamily }}>
                            Description :
                        </Typography>
                        <Typography variant="body1" color={theme.palette.primary.lightmain} sx={{ lineHeight: 1.7 }}>
                            {product?.description}
                        </Typography>
                    </Box>
                </>
            )}
        </Box>
    );
};