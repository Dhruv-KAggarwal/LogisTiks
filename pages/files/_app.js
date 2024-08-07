// pages/_app.js
import '../styles/global.css';
import Navigation from './components/navigation.js'; // Ensure this path is correct
import Hero from './components/hero.js';
import Service from './components/service.js';

import Contact from './components/contact.js';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  return (
    <>
      <Navigation />
      {router.pathname === '/' && <Hero />}
      {router.pathname === '/' && <Service />}
      <Component {...pageProps} />
     
      {router.pathname === '/' && <Contact />}
    </>
  );
}

export default MyApp;
