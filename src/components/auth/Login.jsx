import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';

const LoginContainer = styled.div`
  max-width: 500px;
  margin: 100px auto;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
  
  h1 {
    font-size: 1.8rem;
    color: #333;
  }
  
  p {
    color: #666;
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
//   const { currentUser, login, error } = useContext(AuthContext);
//   const navigate = useNavigate();
  
//   if (currentUser) {
//     return <Navigate to="/dashboard" />;
//   }
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     const success = await login(email, password);
//     setIsLoading(false);
    
//     if (success) {
//       navigate('/dashboard');
//     }
//   };
  
  return (
    <LoginContainer>
      <LoginHeader>
        <h1>Certificate Generator</h1>
        <p>Sign in to your account</p>
      </LoginHeader>
      
      {/* {error && <Alert variant="danger">{error}</Alert>} */}
      
      <Form >
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </Form.Group>
        
        <Button 
          variant="primary" 
          type="submit" 
          className="w-100"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
        
        <div className="text-center mt-3">
          <p>
            Don't have an account? 
            <a href="/register" className="ms-2">Register</a>
          </p>
        </div>
      </Form>
    </LoginContainer>
  );
};

export default Login;