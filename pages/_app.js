// pages/_app.js

import './styles/global.css'; // Ensure this path is correct
import Navigation from './components/navigation'; // Ensure this path is correct
import Hero from './components/hero';
import Service from './components/service';
import Contact from './components/contact';
import { useRouter } from 'next/router';
import { AuthProvider } from './context/AuthContext';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <AuthProvider>
      <Navigation />
      {router.pathname === '/' && <Hero />}
      {router.pathname === '/' && <Service />}
      <Component {...pageProps} />
      {router.pathname === '/' && <Contact />}
    </AuthProvider>
  );
}

export default MyApp;
