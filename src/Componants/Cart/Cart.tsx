import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, CardMedia, Typography, IconButton, Box, CircularProgress } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import img1 from "../../Assests/pics/pic1.jpg"
import img2 from "../../Assests/pics/pic2.jpg"
import img3 from "../../Assests/pics/pic3.jpg"
import img4 from "../../Assests/pics/pic4.jpg"

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  let images = [img1 , img2 , img3 , img4]


  React.useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleRemove = (id: string) => {
    removeFromCart(id);
    toast.info("Item removed from cart.");
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity > 0) {
      updateQuantity(id, quantity);
      toast.success("Quantity updated.");
    }
  };

  return <>
    <ToastContainer />

    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign : "center" , fontWeight : "bold" , my : 4}}>Your Cart</Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
          <CircularProgress />
        </Box>
      ) : cartItems.length === 0 ? (
        <Typography variant="h6">Your cart is empty</Typography>
      ) : (
        <Box>
          {cartItems.map((item , index) => (
            <Card key={index} sx={{ display: "flex", marginBottom: "1rem" }}>
              <CardMedia
                component="img"
                sx={{ width: 150 }}
                image={images[index]}
                alt={item.name}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body1">Price: ${item.price}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", marginTop: "0.5rem" }}>
                  <IconButton onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                    <Remove />
                  </IconButton>
                  <Typography variant="body1">{item.quantity}</Typography>
                  <IconButton onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                    <Add />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleRemove(item.id)}>
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
          <Typography variant="h5" sx={{ marginTop: "1rem" }}>
            Total Price: ${getTotalPrice()}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate("/e-commerce/checkout")}
            sx={{ marginTop: "1rem" }}
          >
            Checkout
          </Button>
        </Box>
      )}
    </Box>
  </>
};

export default Cart;

