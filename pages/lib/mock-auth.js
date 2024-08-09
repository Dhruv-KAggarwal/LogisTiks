// lib/mock-auth.js
export function setMockAuthToken(res) {
    // Simulate setting an auth token cookie
    res.setHeader('Set-Cookie', 'authToken=mock-token; HttpOnly; Path=/');
  }
  