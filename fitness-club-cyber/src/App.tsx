import { ParticlesBackground } from './components/ParticlesBackground';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero, About, Programs, Events, HallOfFame, Join } from './components/sections';

function App() {
  return (
    <div className="relative min-h-screen">
      <ParticlesBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Programs />
        <Events />
        <HallOfFame />
        <Join />
      </main>
      <Footer />
    </div>
  );
}

export default App;
