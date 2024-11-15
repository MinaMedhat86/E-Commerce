// src/pages/Profile.tsx
import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Grid, Avatar, CircularProgress, Divider } from '@mui/material';
import { CameraAlt, Edit, Lock } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/authServices';

const Profile: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState({
    name: 'Mina Medhat', 
    email: 'minamidhat15@gmail.com',
    phone: '+20 1125994899',
  });
  
  const navigate = useNavigate();

  // Log out the user
  const handleLogout = async () => {
    setLoading(true);
    await logout();
    navigate('/e-commerce');
  };

 
  const handleEdit = () => {
    console.log('User data saved!');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Card variant="outlined">
            <CardContent>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Avatar
                  alt={userData.name}
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 120, height: 120, marginRight: 2 }}
                />
                <div>
                  <Typography variant="h4">{userData.name}</Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<CameraAlt />}
                    sx={{ marginTop: 1 }}
                  >
                    Change Picture
                  </Button>
                </div>
              </div>
              <Divider sx={{ marginY: 2 }} />
              <Typography variant="h6">Personal Information</Typography>
              <form noValidate autoComplete="off" style={{ marginTop: '1rem' }}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  margin="normal"
                  disabled
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  margin="normal"
                />
              
              </form>
            </CardContent>
          </Card>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            sx={{ marginTop: 3 }}
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Log Out'}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
