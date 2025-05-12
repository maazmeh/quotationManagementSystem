import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import '../login.css';
import { useAuth } from './Auth/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate('/dashboard'); // Navigate to dashboard after successful login
    } catch (err) {
      console.log("Error while login:", err);
    }
  };

  const handleSignup = () => {
    alert(`Signed up with username: ${signupUsername}, email: ${signupEmail}`);
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="left-container">
          <img src="https://qms.dotnetiks.com/assets/QuotifyLogo1.png" alt="Quotify Logo" className="login-logo" />
          <Typography variant="h4" className="welcome-back">Quotify - A smart Quotation Management System</Typography>
          <Container maxWidth="xs" className="login-container">
            <Box className="login-box">
              <Typography variant="h5" component="h1" className="login-title">
                {isLogin ? 'Login' : 'Sign Up'}
              </Typography>
              <Typography variant="body2" className="login-subtitle">
                {isLogin ? 'Sign in to start your session' : 'Sign up to create an account'}
              </Typography>
              {isLogin ? (
                <>
                  <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                  />
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                  />
                  <Button
                    variant="contained"
                    onClick={handleLogin}
                    fullWidth
                    className="login-button"
                  >
                    Login
                  </Button>

                  <Typography variant="body2" className="toggle-link" onClick={() => setIsLogin(false)}>
                    Don't have an account? Sign Up
                  </Typography>
                </>
              ) : (
                <>
                  <TextField
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                    className="login-input"
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="login-input"
                  />
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="login-input"
                  />
                  <Button
                    variant="contained"
                    onClick={handleSignup}
                    fullWidth
                    className="login-button"
                  >
                    Sign Up
                  </Button>
                  <Typography variant="body2" className="toggle-link" onClick={() => setIsLogin(true)}>
                    Already have an account? Login
                  </Typography>
                </>
              )}
              <Typography variant="body2" className="toggle-link">
                By logging in, you agree to our <a href="/terms">Terms & Conditions</a>
              </Typography>
             
            </Box>
          </Container>
        </div>
        <div className="right-container">
          
        </div>
      </div>
    </div>
  );
};

export default LoginPage;