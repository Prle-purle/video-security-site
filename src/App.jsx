import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import Products from './components/Products';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import HP2Specs from './components/HP2Specs';
import HP4Specs from './components/HP4Specs';

gsap.registerPlugin(ScrollTrigger);

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <Products />
      <ContactForm />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="relative w-full min-h-screen bg-background text-dark">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hp2-specs" element={<HP2Specs />} />
            <Route path="/hp4-specs" element={<HP4Specs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
