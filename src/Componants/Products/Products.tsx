import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../services/firebase';
import { useCart } from '../context/CartContext';
import { CircularProgress, Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

import img1 from "../../Assests/pics/pic1.jpg"
import img2 from "../../Assests/pics/pic2.jpg"
import img3 from "../../Assests/pics/pic3.jpg"
import img4 from "../../Assests/pics/pic4.jpg"


interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const Products: React.FC = () => {

  let images = [img1 , img2 , img3 , img4]

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };
    getProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: 1 });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div>
      <ToastContainer />
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress />
        </div>
      ) : (
        <div className=' container'>
          <Typography variant="h4" component="h2" gutterBottom 
          sx={{textAlign : 'center' , fontWeight : "bold" , my : 5}}>
            Product List
          </Typography>
          <Grid container spacing={3}>
            {products.map((product , index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="300"
                    image={images[index]}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ${product.price}
                    </Typography>
                  </CardContent>
                  <Button
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to={`/e-commerce/productdetails/${product.id}`}
                    style={{ margin: '10px' }}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddToCart(product)}
                    style={{ margin: '10px' }}
                  >
                    Add to Cart
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default Products;

