import { ParticlesBackground } from './components/ParticlesBackground';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ChatBot } from './components';
import { Hero, About, Programs, Events, HallOfFame, Join, FitnessTracking, FitnessTrackingLanding } from './components/sections';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        <ParticlesBackground />
        <Navbar />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <About />
                <Programs />
                <Events />
                <HallOfFame />
                <Join />
                <FitnessTrackingLanding />
              </>
            } />
            <Route path="/fitness-tracking" element={<FitnessTracking />} />
          </Routes>
        </main>
        <Footer />
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;