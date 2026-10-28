import { useCallback, useState } from 'react';
import { Preloader } from './components/Preloader';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustedBy } from './components/TrustedBy';
import { About } from './components/About';
import { Stats } from './components/Stats';
import { Work } from './components/Work';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { Insights } from './components/Insights';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { useRevealObserver } from './hooks/useRevealObserver';

function App() {
  const [booted, setBooted] = useState(false);
  const handleBootDone = useCallback(() => {
    setBooted(true);
    // Deep links: the preloader's scroll-lock swallows the browser's initial
    // fragment jump, so re-apply it once the curtain lifts.
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'auto' });
      });
    }
  }, []);
  useRevealObserver();

  return (
    <div className="relative isolate min-h-screen bg-void text-ink">
      {/* Global ambient — soft aurora + film grain over the whole page */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute -top-40 left-[-10%] h-[540px] w-[620px] rounded-full opacity-25 blur-[130px]"
          style={{ background: 'radial-gradient(circle, rgba(134,59,255,0.5), transparent 65%)' }}
        />
        <div
          className="absolute right-[-12%] top-[38%] h-[520px] w-[600px] rounded-full opacity-20 blur-[140px]"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.4), transparent 65%)' }}
        />
        <div
          className="absolute bottom-[-10%] left-[28%] h-[480px] w-[640px] rounded-full opacity-20 blur-[150px]"
          style={{ background: 'radial-gradient(circle, rgba(76,29,149,0.55), transparent 65%)' }}
        />
        <div className="noise-overlay absolute inset-0 opacity-[0.05] mix-blend-overlay" />
      </div>

      <Preloader onDone={handleBootDone} />
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero booted={booted} />
        <TrustedBy />
        <About />
        <Stats />
        <Work />
        <Services />
        <Testimonials />
        <Insights />
        <Contact />
      </main>

      <Footer />
      <CustomCursor />
    </div>
  );
}

export default App;
