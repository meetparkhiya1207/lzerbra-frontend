import React, { useEffect, useState } from 'react';
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
    CheckCircleOutline,
    PendingActions,
} from '@mui/icons-material';
import CommonHeading from '../CommonHeading';
import { getOrderDetails } from '../../hooks/useOrdera';

const OrdersPageSimple = () => {
    const theme = useTheme();
    const [orders, setOrders] = useState([]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return '#9E9E9E';
            case 'confirmed':
                return '#1976D2';
            case 'processing':
                return '#FFA000';
            case 'shipped':
                return '#0288D1';
            case 'delivered':
                return '#2E7D32';
            case 'cancelled':
                return '#D32F2F';
            default:
                return '#757575';
        }
    };


    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return <PendingActions sx={{ color: theme.palette.primary.main }} />;
            case 'confirmed':
                return <CheckCircleOutline sx={{ color: theme.palette.primary.main }} />;
            case 'processing':
                return <Schedule sx={{ color: theme.palette.primary.main }} />;
            case 'shipped':
                return <LocalShipping sx={{ color: theme.palette.primary.main }} />;
            case 'delivered':
                return <CheckCircle sx={{ color: theme.palette.primary.main }} />;
            case 'cancelled':
                return <Replay sx={{ color: theme.palette.primary.main }} />;
            default:
                return <Receipt sx={{ color: theme.palette.primary.main }} />;
        }
    };

    const getOrderProgress = (status) => {
        switch (status) {
            case 'pending':
                return 20;
            case 'confirmed':
                return 40;
            case 'processing':
                return 60;
            case 'shipped':
                return 80;
            case 'delivered':
                return 100;
            default:
                return 0;
        }
    };

    const getAllOrderDetails = async () => {
        try {
            const response = await getOrderDetails();
            if (response && response.success) {
                setOrders(response.order);
            } else {
                throw new Error('Order creation failed');
            }
        } catch (err) {
            console.error("Error inserting order:", err);
        }
    }

    useEffect(() => {
        getAllOrderDetails();
    }, []);

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
        <CommonHeading title="My Orders" lineWidth={100} align="center" />
            {orders?.length === 0 ? (
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
                    {orders?.map((order) => (
                        <Card key={order?.orderId} sx={{ mb: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' }}>
                                    <Box sx={{ minWidth: 200 }}>
                                        <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }} variant="h6" gutterBottom>
                                            Order #{order?.orderId?.slice(6)}
                                        </Typography>
                                        <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }} variant="body2">
                                            Placed on {new Date(order?.createdAt).toLocaleDateString()}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ minWidth: 200 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, }}>
                                            {getStatusIcon(order?.status)}
                                            <Chip
                                                label={order?.status.charAt(0).toUpperCase() + order?.status.slice(1)}
                                                color={getStatusColor(order?.status)}
                                                sx={{ ml: 1, fontFamily: theme.palette.typography.fontFamily, backgroundColor: getStatusColor(order?.status), color: '#fff' }}
                                            />
                                        </Box>
                                        <LinearProgress variant="determinate" value={getOrderProgress(order?.status)} sx={{ height: 6, borderRadius: 3 }} />
                                    </Box>

                                    <Box sx={{ minWidth: 100 }}>
                                        <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }} variant="h6">
                                            ₹{order?.total.toFixed(2)}
                                        </Typography>
                                        <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }} variant="body2">
                                            {order?.orderItems?.length} item{order?.orderItems?.length > 1 ? 's' : ''}
                                        </Typography>
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
                                        {order?.orderItems?.map((item, index) => (
                                            <Box key={item.id}>
                                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', py: 1, flexWrap: 'wrap' }}>
                                                    <Avatar src={item?.images[0]?.url} variant="rounded" sx={{ width: 60, height: 60 }} />
                                                    <Box sx={{ flex: 1, minWidth: 200 }}>
                                                        <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }} variant="subtitle1">
                                                            {item?.productName}
                                                        </Typography>
                                                        <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }} variant="body2">
                                                            Quantity: {item?.quantity}
                                                        </Typography>
                                                    </Box>
                                                    <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }} variant="subtitle1">
                                                        ₹{(item?.price * item?.quantity).toFixed(2)}
                                                    </Typography>
                                                </Box>
                                                {index < order?.orderItems?.length - 1 && <Divider sx={{ my: 1 }} />}
                                            </Box>
                                        ))}

                                        {order?.trackingNumber && (
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
