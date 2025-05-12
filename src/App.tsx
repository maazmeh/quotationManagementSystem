import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login';
import InputPage from './components/InputPage';
import Dashboard from './components/Dashboard';
import QuotationPageWrapper from './components/QuotationPageWrapper';
import ProductsPage from './components/ProductsPage';
import ClientsPage from './components/ClientsPage';
import DrawerNavigation from './components/DrawerNavigation';
import PrivateRoute from './components/Auth/PrivateRoute';
import { AuthProvider } from './components/Auth/AuthContext';
import './styles.css';
import UsersPage from './components/UsersPage';
import QuotationsList from './components/QuotationsList';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/input" element={<PrivateRoute><InputPage /></PrivateRoute>} />
          <Route path="/quotation" element={<PrivateRoute><QuotationPageWrapper /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/products" element={<PrivateRoute><ProductsPage /></PrivateRoute>} />
          <Route path="/clients" element={<PrivateRoute><ClientsPage /></PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute><UsersPage /></PrivateRoute>} />
          <Route path="/quotationsList" element={<PrivateRoute><QuotationsList /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;