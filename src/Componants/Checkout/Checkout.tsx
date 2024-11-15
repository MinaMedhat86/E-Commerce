import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Box, Typography, Grid, Card, CardContent, Button, TextField, Alert } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ShippingInfo {
  name: string;
  address: string;
  phone: string;
}

const Checkout: React.FC = () => {
  const { cartItems, removeFromCart, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ShippingInfo>();
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const onSubmit = (data: ShippingInfo) => {
    setOrderSuccess(true);
    setIsOrderSubmitted(true);
    reset();
  };

  const handleRemove = (id: string) => {
    removeFromCart(id);
    toast.success('Item removed from cart');
  };

  const calculateTotal = (): number => {
    return getTotalPrice();
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty! Please add some items before checking out.");
      navigate("/e-commerce/cart");
    } else {
      navigate("/e-commerce/checkout");
    }
  };

  return <>
      <ToastContainer />

    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom sx={{my : 4 , textAlign : "center" , fontWeight : "bold"}}>Checkout</Typography>
      {cartItems.length === 0 ? (
        <Alert severity="warning">Your cart is empty! Please go back to the cart to add items before proceeding.</Alert>
      ) : (
        <>
          {isOrderSubmitted ? (
            <Alert severity={orderSuccess ? 'success' : 'error'}>
              {orderSuccess ? "Your order has been placed successfully!" : "Something went wrong with your order!"}
            </Alert>
          ) : (
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Typography variant="h5" sx={{mb : 3}}>Cart Items</Typography>
                {cartItems.map((item) => (
                  <Card key={item.id} sx={{ marginBottom: 2 }}>
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="h6">{item.name}</Typography>
                        <Typography>${item.price} x {item.quantity}</Typography>
                      </Box>
                      <Button variant="outlined" color="error" onClick={() => handleRemove(item.id)}>Remove</Button>
                    </CardContent>
                  </Card>
                ))}
                <Typography variant="h6">Total: ${calculateTotal()}</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h5" sx={{mb :3}}>Shipping Information</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    label="Name"
                    fullWidth
                    {...register('name', { required: 'Name is required' })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    label="Address"
                    fullWidth
                    {...register('address', { required: 'Address is required' })}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    label="Phone"
                    fullWidth
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9]{11}$/,
                        message: 'Phone number must be a valid 11-digit number',
                      }
                    })}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    sx={{ marginBottom: 2 }}
                  />
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Place Order
                  </Button>
                </form>
              </Grid>
            </Grid>
          )}
        </>
      )}
      <Button variant="contained" color="secondary" onClick={handleCheckout} sx={{ marginTop: 2 }}>
        Proceed to Checkout
      </Button>
    </Box>
  </>
};

export default Checkout;
