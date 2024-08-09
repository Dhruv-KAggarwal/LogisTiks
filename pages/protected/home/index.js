import Hero from './hero';
import Services from './service';  // Adjust the import path if needed
import Reviews from './review';    // Adjust the import path if needed
import Contact from './contact';    // Adjust the import path if needed

export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <Reviews />
      <Contact />
    </div>
  );
}