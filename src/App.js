import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import LiveQuiz from './pages/LiveQuiz';
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import PaymentModal from './components/PaymentModal';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);

  // Mock user data - replace with actual authentication
  useEffect(() => {
    const mockUser = {
      id: 'user123',
      name: 'Test User',
      email: 'test@example.com',
      phone: '9876543210',
      paytmId: 'testuser@paytm',
      quizHistory: [],
      wallet: 100 // Starting balance
    };
    setUser(mockUser);
    setWalletBalance(mockUser.wallet);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const initiatePayment = (quiz) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setPaymentDetails(quiz);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (amount) => {
    setWalletBalance(prev => prev - amount);
    // In a real app, you would update the backend here
  };

  return (
    <Router>
      <div className="app">
        <Navbar 
          user={user} 
          walletBalance={walletBalance}
          onLoginClick={() => setShowAuthModal(true)} 
          onLogoutClick={handleLogout} 
        />
        
        <Routes>
          <Route path="/" element={<Home user={user} initiatePayment={initiatePayment} />} />
          <Route path="/quiz/:id" element={<LiveQuiz user={user} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/wallet" element={<Wallet user={user} balance={walletBalance} />} />
        </Routes>
        
        <AuthModal 
          show={showAuthModal} 
          onHide={() => setShowAuthModal(false)} 
          onLogin={handleLogin} 
        />
        
        <PaymentModal 
          show={showPaymentModal} 
          onHide={() => setShowPaymentModal(false)} 
          quiz={paymentDetails} 
          user={user}
          onPaymentSuccess={handlePaymentSuccess}
        />
        
        <ToastContainer position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;
Add App.js
