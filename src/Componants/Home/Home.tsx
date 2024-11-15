import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchFeaturedProducts } from '../../services/firebase'; 
import Countdown from './Countdown';

import img1 from "../../Assests/pics/pic1.jpg"
import img2 from "../../Assests/pics/pic2.jpg"
import img3 from "../../Assests/pics/pic3.jpg"
import img4 from "../../Assests/pics/pic4.jpg"


const Home: React.FC = () => {

  let images = [img1 , img2 , img3 , img4]

  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);



  useEffect(() => {
    const getFeaturedProducts = async () => {
      const products = await fetchFeaturedProducts();
      setFeaturedProducts(products);
    };



    getFeaturedProducts();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          padding: 4,
          borderRadius: 2,
          marginBottom: 4,
          textAlign: 'center',
        }}
      >
        <Box>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Our Shop
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Discover the latest trends and exclusive offers on top products.
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/e-commerce/products">
            Shop Now
          </Button>
        </Box>
      </Box>

      {/* Featured Products Section */}
      <Typography variant="h4" gutterBottom>
        Featured Products
      </Typography>
      <Grid container spacing={4} sx={{ marginBottom: 4 }}>
        {featuredProducts.length > 0 ? (
          featuredProducts.map((product , index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={images[index]}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${product.price}
                  </Typography>
                  <Button variant="contained" fullWidth sx={{ marginTop: 1 }} color="secondary">
                    <Link to={`/e-commerce/productdetails/${product.id}`} style={{ color: 'white', textDecoration: 'none' }}>
                      View Details
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No featured products available at the moment.</Typography>
        )}
      </Grid>

      {/* Category Section */}
      <Typography variant="h4" gutterBottom>
        Shop by Category
      </Typography>
      <Grid container spacing={4} sx={{ marginBottom: 4 }}>
        {['Electronics', 'Clothing', 'Home', 'Beauty'].map((category) => (
          <Grid item xs={12} sm={6} md={3} key={category}>
            <Card
              sx={{
                textAlign: 'center',
                padding: 2,
                '&:hover': { backgroundColor: '#e0e0e0' },
              }}
            >
              <Typography variant="h5">{category}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Promotional Section */}
      <Box
        sx={{
          backgroundColor: '#1976d2',
          color: 'white',
          padding: 4,
          borderRadius: 2,
          textAlign: 'center',
          marginBottom: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Limited Time Offer!
        </Typography>
        <Typography variant="h6" paragraph>
          Save up to 50% on selected items. Hurry, while stocks last!
        </Typography>
        <Countdown targetDate="2024-12-31T23:59:59"/>
        <Button variant="contained" color="secondary" component={Link} to="/e-commerce/products">
          Explore Deals
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
