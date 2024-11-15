import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../services/firebase';
import { Card, CardContent, CardMedia, Grid, Button, Typography, CircularProgress } from '@mui/material';
import { useCart } from '../context/CartContext'; 
import { toast, ToastContainer } from 'react-toastify';

import img from "../../Assests/pics/one.jpg"

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  quantity: number; 
}

const ProductDetail: React.FC = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { addToCart } = useCart(); 

  useEffect(() => {
    const getProductDetail = async () => {
      if (id) {
        const productData = await fetchProductById(id);
        setProduct(productData);
        setLoading(false);
      }
    };
    getProductDetail();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      const cartItem: CartItem = {
        ...product,
        quantity: 1,
      };
      addToCart(cartItem); 
      toast.success(`${product.name} has been added to your cart!`); 
    }
  };

  return (
    <div className="container">
          <ToastContainer/>

      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <CircularProgress />
        </div>
      ) : product ? (
        <Grid container spacing={3} sx={{ marginTop: 4 }}>
          <Grid item md={4} xs={12}>
            <Card>
              <CardMedia
                component="img"
                image={img}
                alt={product.name}
                sx={{ width : "100%", objectFit: 'contain' }}
              />
            </Card>
          </Grid>
          <Grid item md={8} xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body1" paragraph>
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  ${product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h6" color="error">Product not found</Typography>
      )}
    </div>
  );
};

export default ProductDetail;
