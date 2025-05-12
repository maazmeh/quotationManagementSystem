import React, { useEffect } from 'react';
import DrawerNavigation from './DrawerNavigation';
import { Container, Typography } from '@mui/material';
import { useAuth } from './Auth/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  useEffect(() => {
    console.log("user from Dashboard =>", user);
  },[])
  
  return (
    <DrawerNavigation>
      <Container>
        <Typography variant="h4" gutterBottom>
          Welcome to the Dashboard
        </Typography>
        <Typography variant="body1">
          This is a simple dashboard layout. Use the navigation drawer to switch between pages.
        </Typography>
      </Container>
    </DrawerNavigation>
  );
};

export default Dashboard;