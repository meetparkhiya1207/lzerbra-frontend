import React, { useState, useEffect } from 'react';
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
    Snackbar,
} from '@mui/material';
import {
    ExpandMore,
    CreditCard,
    AccountBalanceWallet,
    Security,
    CheckCircle,
    Error,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import CommonHeading from '../CommonHeading';
import { useDispatch, useSelector } from 'react-redux';
import { insertOrderDetails } from '../../hooks/useOrdera';
import { clearCart } from '../../features/cart/cartSlice';

const CheckoutPageSimple = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartProduct = useSelector((state) => state.cart.cartItems);

    // Load state from localStorage on component mount
    const [activeStep, setActiveStep] = useState(() => {
        const saved = localStorage.getItem('checkoutStep');
        return saved ? parseInt(saved) : 0;
    });

    const [shippingMethod, setShippingMethod] = useState(() => {
        const saved = localStorage.getItem('shippingMethod');
        return saved || 'standard';
    });

    const [paymentMethod, setPaymentMethod] = useState(() => {
        const saved = localStorage.getItem('paymentMethod');
        return saved || 'card';
    });

    const [shippingForm, setShippingForm] = useState(() => {
        const saved = localStorage.getItem('shippingForm');
        return saved ? JSON.parse(saved) : {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'United States',
        };
    });

    const [paymentForm, setPaymentForm] = useState(() => {
        const saved = localStorage.getItem('paymentForm');
        return saved ? JSON.parse(saved) : {
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            cardName: '',
        };
    });

    // Validation states
    const [shippingErrors, setShippingErrors] = useState({});
    const [paymentErrors, setPaymentErrors] = useState({});
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });

    const steps = ['Shipping Information', 'Payment Method', 'Review Order'];

    // Persist state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('checkoutStep', activeStep.toString());
    }, [activeStep]);

    useEffect(() => {
        localStorage.setItem('shippingMethod', shippingMethod);
    }, [shippingMethod]);

    useEffect(() => {
        localStorage.setItem('paymentMethod', paymentMethod);
    }, [paymentMethod]);

    useEffect(() => {
        localStorage.setItem('shippingForm', JSON.stringify(shippingForm));
    }, [shippingForm]);

    useEffect(() => {
        localStorage.setItem('paymentForm', JSON.stringify(paymentForm));
    }, [paymentForm]);

    useEffect(() => {
        return () => {
            // Only clear if we're not navigating to orders page
            if (!window.location.pathname.includes('/orders')) {
                // Keep the data for now, will be cleared after successful order
            }
        };
    }, []);

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    };

    const validateCardNumber = (cardNumber) => {
        const cleanNumber = cardNumber.replace(/\s/g, '');
        return /^\d{13,19}$/.test(cleanNumber);
    };

    const validateExpiryDate = (expiryDate) => {
        const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!regex.test(expiryDate)) return false;

        const [month, year] = expiryDate.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;

        const expYear = parseInt(year);
        const expMonth = parseInt(month);

        return expYear > currentYear || (expYear === currentYear && expMonth >= currentMonth);
    };

    const validateCVV = (cvv) => {
        return /^\d{3,4}$/.test(cvv);
    };

    const validateShippingForm = () => {
        const errors = {};

        if (!shippingForm.firstName.trim()) {
            errors.firstName = 'First name is required';
        }

        if (!shippingForm.lastName.trim()) {
            errors.lastName = 'Last name is required';
        }

        if (!shippingForm.email.trim()) {
            errors.email = 'Email is required';
        } else if (!validateEmail(shippingForm.email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!shippingForm.phone.trim()) {
            errors.phone = 'Phone number is required';
        } else if (!validatePhone(shippingForm.phone)) {
            errors.phone = 'Please enter a valid phone number';
        }

        if (!shippingForm.address.trim()) {
            errors.address = 'Address is required';
        }

        if (!shippingForm.city.trim()) {
            errors.city = 'City is required';
        }

        if (!shippingForm.state.trim()) {
            errors.state = 'State is required';
        }

        if (!shippingForm.zipCode.trim()) {
            errors.zipCode = 'ZIP code is required';
        } else if (!/^\d{5,6}$/.test(shippingForm.zipCode)) {
            errors.zipCode = 'Please enter a valid ZIP code';
        }

        setShippingErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validatePaymentForm = () => {
        if (paymentMethod === 'paypal') {
            setPaymentErrors({});
            return true;
        }

        const errors = {};

        if (!paymentForm.cardNumber.trim()) {
            errors.cardNumber = 'Card number is required';
        } else if (!validateCardNumber(paymentForm.cardNumber)) {
            errors.cardNumber = 'Please enter a valid card number';
        }

        if (!paymentForm.expiryDate.trim()) {
            errors.expiryDate = 'Expiry date is required';
        } else if (!validateExpiryDate(paymentForm.expiryDate)) {
            errors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
        }

        if (!paymentForm.cvv.trim()) {
            errors.cvv = 'CVV is required';
        } else if (!validateCVV(paymentForm.cvv)) {
            errors.cvv = 'Please enter a valid CVV';
        }

        if (!paymentForm.cardName.trim()) {
            errors.cardName = 'Name on card is required';
        }

        setPaymentErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const showSnackbar = (message, severity = 'error') => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const subtotal = cartProduct.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingCost = shippingMethod === 'express' ? 19.99 : shippingMethod === 'standard' ? 9.99 : 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shippingCost + tax;

    const handlePlaceOrder = async () => {
        try {
            const orderData = {
                shippingForm,
                paymentForm,
                shippingMethod,
                paymentMethod,
                orderItems: cartProduct,
                subtotal,
                shippingCost,
                tax,
                total,
            };

            showSnackbar('Processing your order...', 'info');

            try {
                try {
                    const response = await insertOrderDetails(orderData);
                    if (response && response.success) {
                        dispatch(clearCart());
                        localStorage.removeItem('checkoutStep');
                        localStorage.removeItem('shippingMethod');
                        localStorage.removeItem('paymentMethod');
                        localStorage.removeItem('shippingForm');
                        localStorage.removeItem('paymentForm');
                        navigate('/orders');
                        showSnackbar(response?.message, 'success');
                    } else {
                        throw new Error('Order creation failed');
                    }
                } catch (err) {
                    console.error("Error inserting order:", err);
                }
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
                showSnackbar('Failed to place order. Please try again.', 'error');
                return;
            }
        } catch (error) {
            console.error('Order placement failed:', error);
            showSnackbar('Failed to place order. Please try again.', 'error');
        }
    };

    const handleNext = () => {
        let isValid = true;

        if (activeStep === 0) {
            isValid = validateShippingForm();
            if (!isValid) {
                showSnackbar('Please fill in all required shipping information correctly.', 'error');
                return;
            }
        } else if (activeStep === 1) {
            isValid = validatePaymentForm();
            if (!isValid) {
                showSnackbar('Please fill in all required payment information correctly.', 'error');
                return;
            }
        }

        if (isValid) {
            if (activeStep < steps.length - 1) {
                setActiveStep(activeStep + 1);
            } else {
                // ✅ last step -> place order
                handlePlaceOrder();
            }
        }
    };


    const handleBack = () => setActiveStep(activeStep - 1);

    const renderShippingForm = () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField
                    required
                    label="First Name"
                    value={shippingForm.firstName}
                    onChange={(e) => {
                        setShippingForm({ ...shippingForm, firstName: e.target.value });
                        if (shippingErrors.firstName) {
                            setShippingErrors({ ...shippingErrors, firstName: '' });
                        }
                    }}
                    error={!!shippingErrors.firstName}
                    helperText={shippingErrors.firstName}
                    sx={{ flex: 1, minWidth: 200, fontFamily: theme.palette.typography.fontFamily }}
                />
                <TextField
                    required
                    label="Last Name"
                    value={shippingForm.lastName}
                    onChange={(e) => {
                        setShippingForm({ ...shippingForm, lastName: e.target.value });
                        if (shippingErrors.lastName) {
                            setShippingErrors({ ...shippingErrors, lastName: '' });
                        }
                    }}
                    error={!!shippingErrors.lastName}
                    helperText={shippingErrors.lastName}
                    sx={{ flex: 1, minWidth: 200, fontFamily: theme.palette.typography.fontFamily }}
                />
            </Box>

            <TextField
                required
                fullWidth
                label="Email Address"
                type="email"
                value={shippingForm.email}
                onChange={(e) => {
                    setShippingForm({ ...shippingForm, email: e.target.value });
                    if (shippingErrors.email) {
                        setShippingErrors({ ...shippingErrors, email: '' });
                    }
                }}
                error={!!shippingErrors.email}
                helperText={shippingErrors.email}
                sx={{ fontFamily: theme.palette.typography.fontFamily }}
            />

            <TextField
                required
                fullWidth
                label="Phone Number"
                value={shippingForm.phone}
                onChange={(e) => {
                    setShippingForm({ ...shippingForm, phone: e.target.value });
                    if (shippingErrors.phone) {
                        setShippingErrors({ ...shippingErrors, phone: '' });
                    }
                }}
                error={!!shippingErrors.phone}
                helperText={shippingErrors.phone}
                sx={{ fontFamily: theme.palette.typography.fontFamily }}
            />

            <TextField
                required
                fullWidth
                label="Address"
                value={shippingForm.address}
                onChange={(e) => {
                    setShippingForm({ ...shippingForm, address: e.target.value });
                    if (shippingErrors.address) {
                        setShippingErrors({ ...shippingErrors, address: '' });
                    }
                }}
                error={!!shippingErrors.address}
                helperText={shippingErrors.address}
                sx={{ fontFamily: theme.palette.typography.fontFamily }}
            />

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField
                    required
                    label="City"
                    value={shippingForm.city}
                    onChange={(e) => {
                        setShippingForm({ ...shippingForm, city: e.target.value });
                        if (shippingErrors.city) {
                            setShippingErrors({ ...shippingErrors, city: '' });
                        }
                    }}
                    error={!!shippingErrors.city}
                    helperText={shippingErrors.city}
                    sx={{ flex: 2, minWidth: 200, fontFamily: theme.palette.typography.fontFamily }}
                />
                <TextField
                    required
                    label="State"
                    value={shippingForm.state}
                    onChange={(e) => {
                        setShippingForm({ ...shippingForm, state: e.target.value });
                        if (shippingErrors.state) {
                            setShippingErrors({ ...shippingErrors, state: '' });
                        }
                    }}
                    error={!!shippingErrors.state}
                    helperText={shippingErrors.state}
                    sx={{ flex: 1, minWidth: 120, fontFamily: theme.palette.typography.fontFamily }}
                />
                <TextField
                    required
                    label="ZIP Code"
                    value={shippingForm.zipCode}
                    onChange={(e) => {
                        setShippingForm({ ...shippingForm, zipCode: e.target.value });
                        if (shippingErrors.zipCode) {
                            setShippingErrors({ ...shippingErrors, zipCode: '' });
                        }
                    }}
                    error={!!shippingErrors.zipCode}
                    helperText={shippingErrors.zipCode}
                    sx={{ flex: 1, minWidth: 120, fontFamily: theme.palette.typography.fontFamily }}
                />
            </Box>
            {/* 
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
            </FormControl> */}
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
                    <TextField
                        required
                        fullWidth
                        label="Card Number"
                        placeholder="1234 5678 9012 3456"
                        value={paymentForm.cardNumber}
                        onChange={(e) => {
                            setPaymentForm({ ...paymentForm, cardNumber: e.target.value });
                            if (paymentErrors.cardNumber) {
                                setPaymentErrors({ ...paymentErrors, cardNumber: '' });
                            }
                        }}
                        error={!!paymentErrors.cardNumber}
                        helperText={paymentErrors.cardNumber}
                        sx={{ fontFamily: theme.palette.typography.fontFamily }}
                    />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            required
                            label="Expiry Date"
                            placeholder="MM/YY"
                            value={paymentForm.expiryDate}
                            onChange={(e) => {
                                setPaymentForm({ ...paymentForm, expiryDate: e.target.value });
                                if (paymentErrors.expiryDate) {
                                    setPaymentErrors({ ...paymentErrors, expiryDate: '' });
                                }
                            }}
                            error={!!paymentErrors.expiryDate}
                            helperText={paymentErrors.expiryDate}
                            sx={{ flex: 1, fontFamily: theme.palette.typography.fontFamily }}
                        />
                        <TextField
                            required
                            label="CVV"
                            placeholder="123"
                            value={paymentForm.cvv}
                            onChange={(e) => {
                                setPaymentForm({ ...paymentForm, cvv: e.target.value });
                                if (paymentErrors.cvv) {
                                    setPaymentErrors({ ...paymentErrors, cvv: '' });
                                }
                            }}
                            error={!!paymentErrors.cvv}
                            helperText={paymentErrors.cvv}
                            sx={{ flex: 1, fontFamily: theme.palette.typography.fontFamily }}
                        />
                    </Box>
                    <TextField
                        required
                        fullWidth
                        label="Name on Card"
                        value={paymentForm.cardName}
                        onChange={(e) => {
                            setPaymentForm({ ...paymentForm, cardName: e.target.value });
                            if (paymentErrors.cardName) {
                                setPaymentErrors({ ...paymentErrors, cardName: '' });
                            }
                        }}
                        error={!!paymentErrors.cardName}
                        helperText={paymentErrors.cardName}
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
            {cartProduct.map((item) => (
                <Box key={item.id} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Avatar src={item.images[0]?.url} variant="rounded" sx={{ width: 60, height: 60 }} />
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>{item?.productName}</Typography>
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
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <CommonHeading title="Checkout" lineWidth={100} align="center" />

            <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
                <Box sx={{ flex: 1 }}>
                    <Card>
                        <CardContent>
                            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel
                                            sx={{
                                                "& .MuiStepLabel-label": {
                                                    fontFamily: theme.typography.fontFamily,
                                                    color: theme.palette.primary.main,
                                                },
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
                                        Order Items ({cartProduct?.length})
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {cartProduct?.map((item) => (
                                        <Box key={item.id} sx={{ mb: 1 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="body2" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                                                    {item.productName} × {item.quantity}
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
                            {/* 
                            <Box sx={{ mt: 3, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CheckCircle sx={{ color: 'success.main', mr: 1 }} />
                                    <Typography variant="body2" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                                        30-day return policy
                                    </Typography>
                                </Box>
                            </Box> */}
                            <Alert severity="info" icon={<CheckCircle />}>
                                <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                                    7-day return policy
                                </Typography>
                            </Alert>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default CheckoutPageSimple;
