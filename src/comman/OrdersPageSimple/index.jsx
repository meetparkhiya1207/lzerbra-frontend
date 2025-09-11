import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    Avatar,
    Chip,
    Button,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Paper,
    LinearProgress,
    useTheme,
} from '@mui/material';
import {
    ExpandMore,
    LocalShipping,
    CheckCircle,
    Schedule,
    Receipt,
    Replay,
} from '@mui/icons-material';
import CommonHeading from '../CommonHeading';

const OrdersPageSimple = () => {
    const theme = useTheme();

    const [orders] = useState([
        {
            id: 'ORD-2024-001',
            date: '2024-01-15',
            status: 'delivered',
            total: 459.97,
            trackingNumber: 'TN123456789',
            deliveryDate: '2024-01-18',
            items: [
                { id: 1, name: 'Premium Wireless Headphones', price: 199.99, quantity: 1, image: '/placeholder.svg' },
                { id: 2, name: 'Smart Fitness Watch', price: 299.99, quantity: 1, image: '/placeholder.svg' },
            ],
        },
        {
            id: 'ORD-2024-002',
            date: '2024-01-10',
            status: 'shipped',
            total: 79.99,
            trackingNumber: 'TN987654321',
            items: [{ id: 3, name: 'Laptop Stand Aluminum', price: 79.99, quantity: 1, image: '/placeholder.svg' }],
        },
        {
            id: 'ORD-2024-003',
            date: '2024-01-05',
            status: 'processing',
            total: 149.99,
            items: [
                { id: 4, name: 'Wireless Charging Pad', price: 49.99, quantity: 1, image: '/placeholder.svg' },
                { id: 5, name: 'Bluetooth Speaker', price: 99.99, quantity: 1, image: '/placeholder.svg' },
            ],
        },
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'delivered':
                return 'success';
            case 'shipped':
                return 'info';
            case 'processing':
                return 'warning';
            case 'cancelled':
                return 'error';
            default:
                return 'default';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'delivered':
                return <CheckCircle sx={{ color: theme.palette.primary.main }} />;
            case 'shipped':
                return <LocalShipping sx={{ color: theme.palette.primary.main }} />;
            case 'processing':
                return <Schedule sx={{ color: theme.palette.primary.main }} />;
            case 'cancelled':
                return <Replay sx={{ color: theme.palette.primary.main }} />;
            default:
                return <Receipt sx={{ color: theme.palette.primary.main }} />;
        }
    };

    const getOrderProgress = (status) => {
        switch (status) {
            case 'processing':
                return 25;
            case 'shipped':
                return 75;
            case 'delivered':
                return 100;
            default:
                return 0;
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <CommonHeading title="My Orders" lineWidth={100} align="center" />

            {orders.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Receipt sx={{ fontSize: 64, color: theme.palette.primary.main, mb: 2 }} />
                    <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }} variant="h6" gutterBottom>
                        No orders found
                    </Typography>
                    <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main, mb: 3 }}>
                        You haven't placed any orders yet.
                    </Typography>
                    <Button variant="contained" size="large" sx={{ fontFamily: theme.palette.typography.fontFamily }}>
                        Start Shopping
                    </Button>
                </Paper>
            ) : (
                <Box>
                    {orders.map((order) => (
                        <Card key={order.id} sx={{ mb: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' }}>
                                    <Box sx={{ minWidth: 200 }}>
                                        <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }} variant="h6" gutterBottom>
                                            Order #{order.id}
                                        </Typography>
                                        <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }} variant="body2">
                                            Placed on {new Date(order.date).toLocaleDateString()}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ minWidth: 200 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            {getStatusIcon(order.status)}
                                            <Chip
                                                label={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                color={getStatusColor(order.status)}
                                                sx={{ ml: 1, fontFamily: theme.palette.typography.fontFamily }}
                                            />
                                        </Box>
                                        <LinearProgress variant="determinate" value={getOrderProgress(order.status)} sx={{ height: 6, borderRadius: 3 }} />
                                    </Box>

                                    <Box sx={{ minWidth: 100 }}>
                                        <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }} variant="h6">
                                            ₹{order.total.toFixed(2)}
                                        </Typography>
                                        <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }} variant="body2">
                                            {order.items.length} item{order.items.length > 1 ? 's' : ''}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                        <Button variant="outlined" size="small" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                                            View Details
                                        </Button>
                                        {order.trackingNumber && (
                                            <Button variant="outlined" size="small" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                                                Track Package
                                            </Button>
                                        )}
                                        {order.status === 'delivered' && (
                                            <Button variant="outlined" size="small" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                                                Reorder
                                            </Button>
                                        )}
                                    </Box>
                                </Box>

                                <Accordion sx={{ mt: 2 }}>
                                    <AccordionSummary expandIcon={<ExpandMore sx={{ color: theme.palette.primary.main }} />}>
                                        <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                                            Order Items
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Divider sx={{ mb: 2 }} />
                                        {order.items.map((item, index) => (
                                            <Box key={item.id}>
                                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', py: 1, flexWrap: 'wrap' }}>
                                                    <Avatar src={item.image} variant="rounded" sx={{ width: 60, height: 60 }} />
                                                    <Box sx={{ flex: 1, minWidth: 200 }}>
                                                        <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }} variant="subtitle1">
                                                            {item.name}
                                                        </Typography>
                                                        <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }} variant="body2">
                                                            Quantity: {item.quantity}
                                                        </Typography>
                                                    </Box>
                                                    <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }} variant="subtitle1">
                                                        ₹{(item.price * item.quantity).toFixed(2)}
                                                    </Typography>
                                                </Box>
                                                {index < order.items.length - 1 && <Divider sx={{ my: 1 }} />}
                                            </Box>
                                        ))}

                                        {order.trackingNumber && (
                                            <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                                                <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }} variant="subtitle2" gutterBottom>
                                                    Tracking Information
                                                </Typography>
                                                <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }} variant="body2">
                                                    Tracking Number: {order.trackingNumber}
                                                </Typography>
                                                {order.deliveryDate && (
                                                    <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }} variant="body2">
                                                        Delivered on: {new Date(order.deliveryDate).toLocaleDateString()}
                                                    </Typography>
                                                )}
                                            </Box>
                                        )}
                                    </AccordionDetails>
                                </Accordion>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Container>
    );
};

export default OrdersPageSimple;
