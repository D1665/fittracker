import jwt from 'jsonwebtoken'

// Payload – data you want to include in the token
const payload = {
  id: 'dineshsirsiya',
  email: 'dineshsirsiya75@gmail.com',
  role: 'admin'
};

// Secret – used to sign the token (keep this secret!)
const secret = 'sirsiya9040';

// Options – optional settings (like expiry)
const options = {
  expiresIn: '1h' // Token valid for 1 hour
};

// Generate token
const token = jwt.sign(payload, secret, options);

console.log('Generated JWT:', token);
