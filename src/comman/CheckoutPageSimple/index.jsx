import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Stepper,
    Step,
    StepLabel,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Divider,
    Avatar,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Alert,
    useTheme,
} from '@mui/material';
import {
    ExpandMore,
    CreditCard,
    AccountBalanceWallet,
    Security,
    CheckCircle,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import CommonHeading from '../CommonHeading';

const CheckoutPageSimple = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [shippingMethod, setShippingMethod] = useState('standard');
    const [paymentMethod, setPaymentMethod] = useState('card');

    const [shippingForm, setShippingForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
    });

    const [paymentForm, setPaymentForm] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: '',
    });

    const steps = ['Shipping Information', 'Payment Method', 'Review Order'];

    const orderItems = [
        { id: 1, name: 'Premium Wireless Headphones', price: 199.99, quantity: 1, image: '/placeholder.svg' },
        { id: 2, name: 'Smart Fitness Watch', price: 299.99, quantity: 2, image: '/placeholder.svg' },
    ];

    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingCost = shippingMethod === 'express' ? 19.99 : shippingMethod === 'standard' ? 9.99 : 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shippingCost + tax;

    const handlePlaceOrder = () => {
        const orderData = {
            shippingForm,
            paymentForm,
            shippingMethod,
            paymentMethod,
            orderItems,
            subtotal,
            shippingCost,
            tax,
            total,
        };

        console.log("Final Order Data:", orderData);

        // 👉 aa jagya ae tame API call kari sako cho
        // axios.post("/api/orders", orderData)
        //   .then(() => navigate("/orders"))
        //   .catch(err => console.error(err));

        navigate('/orders'); // temp navigation
    };

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1);
        } else {
            // ✅ last step -> place order
            handlePlaceOrder();
        }
    };


    const handleBack = () => setActiveStep(activeStep - 1);

    const renderShippingForm = () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField
                    required label="First Name"
                    value={shippingForm.firstName}
                    onChange={(e) => setShippingForm({ ...shippingForm, firstName: e.target.value })}
                    sx={{ flex: 1, minWidth: 200, fontFamily: theme.palette.typography.fontFamily }}
                />
                <TextField
                    required label="Last Name"
                    value={shippingForm.lastName}
                    onChange={(e) => setShippingForm({ ...shippingForm, lastName: e.target.value })}
                    sx={{ flex: 1, minWidth: 200, fontFamily: theme.palette.typography.fontFamily }}
                />
            </Box>

            <TextField required fullWidth label="Email Address" type="email"
                value={shippingForm.email}
                onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                sx={{ fontFamily: theme.palette.typography.fontFamily }}
            />

            <TextField required fullWidth label="Phone Number"
                value={shippingForm.phone}
                onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                sx={{ fontFamily: theme.palette.typography.fontFamily }}
            />

            <TextField required fullWidth label="Address"
                value={shippingForm.address}
                onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                sx={{ fontFamily: theme.palette.typography.fontFamily }}
            />

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField required label="City" value={shippingForm.city}
                    onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                    sx={{ flex: 2, minWidth: 200, fontFamily: theme.palette.typography.fontFamily }}
                />
                <TextField required label="State" value={shippingForm.state}
                    onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                    sx={{ flex: 1, minWidth: 120, fontFamily: theme.palette.typography.fontFamily }}
                />
                <TextField required label="ZIP Code" value={shippingForm.zipCode}
                    onChange={(e) => setShippingForm({ ...shippingForm, zipCode: e.target.value })}
                    sx={{ flex: 1, minWidth: 120, fontFamily: theme.palette.typography.fontFamily }}
                />
            </Box>

            <FormControl component="fieldset" sx={{ mt: 2 }}>
                <FormLabel sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                    Shipping Method
                </FormLabel>
                <RadioGroup value={shippingMethod} onChange={(e) => setShippingMethod(e.target.value)}>
                    <FormControlLabel value="free" control={<Radio />}
                        label={
                            <Box>
                                <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>Free Shipping (7-10 business days)</Typography>
                                <Typography variant="body2" color="text.secondary">Free</Typography>
                            </Box>
                        }
                    />
                    <FormControlLabel value="standard" control={<Radio />}
                        label={
                            <Box>
                                <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>Standard Shipping (3-5 business days)</Typography>
                                <Typography variant="body2" color="text.secondary">₹9.99</Typography>
                            </Box>
                        }
                    />
                    <FormControlLabel value="express" control={<Radio />}
                        label={
                            <Box>
                                <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>Express Shipping (1-2 business days)</Typography>
                                <Typography variant="body2" color="text.secondary">₹19.99</Typography>
                            </Box>
                        }
                    />
                </RadioGroup>
            </FormControl>
        </Box>
    );

    const renderPaymentForm = () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControl component="fieldset">
                <FormLabel sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                    Payment Method
                </FormLabel>
                <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                    <FormControlLabel value="card" control={<Radio />}
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CreditCard sx={{ mr: 1, color: theme.palette.primary.main }} />
                                <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>Credit/Debit Card</Typography>
                            </Box>
                        }
                    />
                    <FormControlLabel value="paypal" control={<Radio />}
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccountBalanceWallet sx={{ mr: 1, color: theme.palette.primary.main }} />
                                <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>PayPal</Typography>
                            </Box>
                        }
                    />
                </RadioGroup>
            </FormControl>

            {paymentMethod === 'card' && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField required fullWidth label="Card Number" placeholder="1234 5678 9012 3456"
                        value={paymentForm.cardNumber}
                        onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: e.target.value })}
                        sx={{ fontFamily: theme.palette.typography.fontFamily }}
                    />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField required label="Expiry Date" placeholder="MM/YY"
                            value={paymentForm.expiryDate}
                            onChange={(e) => setPaymentForm({ ...paymentForm, expiryDate: e.target.value })}
                            sx={{ flex: 1, fontFamily: theme.palette.typography.fontFamily }}
                        />
                        <TextField required label="CVV" placeholder="123"
                            value={paymentForm.cvv}
                            onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value })}
                            sx={{ flex: 1, fontFamily: theme.palette.typography.fontFamily }}
                        />
                    </Box>
                    <TextField required fullWidth label="Name on Card"
                        value={paymentForm.cardName}
                        onChange={(e) => setPaymentForm({ ...paymentForm, cardName: e.target.value })}
                        sx={{ fontFamily: theme.palette.typography.fontFamily }}
                    />
                </Box>
            )}

            <Alert severity="info" icon={<Security />}>
                <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                    Your payment information is encrypted and secure
                </Typography>
            </Alert>
        </Box>
    );

    const renderOrderReview = () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                Order Summary
            </Typography>
            {orderItems.map((item) => (
                <Box key={item.id} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Avatar src={item.image} variant="rounded" sx={{ width: 60, height: 60 }} />
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>{item.name}</Typography>
                            <Typography color="text.secondary" variant="body2" sx={{ fontFamily: theme.palette.typography.fontFamily }}>
                                Quantity: {item.quantity}
                            </Typography>
                        </Box>
                        <Typography variant="subtitle1" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                            ₹{(item.price * item.quantity).toFixed(2)}
                        </Typography>
                    </Box>
                    <Divider sx={{ mt: 1 }} />
                </Box>
            ))}

            <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                    Shipping Address
                </Typography>
                <Typography sx={{ fontFamily: theme.palette.typography.fontFamily }}>{shippingForm.firstName} {shippingForm.lastName}</Typography>
                <Typography sx={{ fontFamily: theme.palette.typography.fontFamily }}>{shippingForm.address}</Typography>
                <Typography sx={{ fontFamily: theme.palette.typography.fontFamily }}>
                    {shippingForm.city}, {shippingForm.state} {shippingForm.zipCode}
                </Typography>
                <Typography sx={{ fontFamily: theme.palette.typography.fontFamily }}>{shippingForm.email}</Typography>
            </Box>

            <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                    Payment Method
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {paymentMethod === 'card' ? <CreditCard sx={{ color: theme.palette.primary.main }} /> : <AccountBalanceWallet sx={{ color: theme.palette.primary.main }} />}
                    <Typography sx={{ ml: 1, fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                        {paymentMethod === 'card' ? `Card ending in ${paymentForm.cardNumber.slice(-4)}` : 'PayPal'}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );

    const getStepContent = (step) => {
        switch (step) {
            case 0: return renderShippingForm();
            case 1: return renderPaymentForm();
            case 2: return renderOrderReview();
            default: return 'Unknown step';
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <CommonHeading title="Checkout" lineWidth={100} align="center" />

            <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
                <Box sx={{ flex: 1 }}>
                    <Card>
                        <CardContent>
                            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel
                                            TypographyProps={{
                                                sx: { fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }
                                            }}
                                        >
                                            {label}
                                        </StepLabel>
                                    </Step>
                                ))}
                            </Stepper>

                            {getStepContent(activeStep)}

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                                <Button onClick={handleBack} disabled={activeStep === 0} sx={{ fontFamily: theme.palette.typography.fontFamily }}>
                                    Back
                                </Button>
                                <Button variant="contained" onClick={handleNext} sx={{ fontFamily: theme.palette.typography.fontFamily, color: "#fff" }}>
                                    {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                <Box sx={{ width: { xs: '100%', md: 400 } }}>
                    <Card sx={{ position: 'sticky', top: 20 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                                Order Total
                            </Typography>

                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMore sx={{ color: theme.palette.primary.main }} />}>
                                    <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                                        Order Items ({orderItems.length})
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {orderItems.map((item) => (
                                        <Box key={item.id} sx={{ mb: 1 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="body2" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                                                    {item.name} × {item.quantity}
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                                                    ₹{(item.price * item.quantity).toFixed(2)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </AccordionDetails>
                            </Accordion>

                            <Box sx={{ mt: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>Subtotal</Typography>
                                    <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>₹{subtotal.toFixed(2)}</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>Shipping</Typography>
                                    <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                                        {shippingCost === 0 ? 'Free' : `₹${shippingCost.toFixed(2)}`}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>Tax</Typography>
                                    <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>₹{tax.toFixed(2)}</Typography>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="h6" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>Total</Typography>
                                    <Typography variant="h6" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>₹{total.toFixed(2)}</Typography>
                                </Box>
                            </Box>

                            <Box sx={{ mt: 3, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CheckCircle sx={{ color: 'success.main', mr: 1 }} />
                                    <Typography variant="body2" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                                        30-day return policy
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Container>
    );
};

export default CheckoutPageSimple;
