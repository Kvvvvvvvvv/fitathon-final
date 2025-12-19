import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Dumbbell } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui';
import { Link } from 'react-router-dom';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Programs', href: '/#programs' },
  { name: 'Events', href: '/#events' },
  { name: 'Hall of Fame', href: '/#hall-of-fame' },
  { name: 'Fitness Tracking', href: '/fitness-tracking' },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(10, 10, 15, 0)', 'rgba(10, 10, 15, 0.8)']
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(20px)']
  );

  return (
    <motion.nav
      style={{ backgroundColor, backdropFilter: backdropBlur }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Dumbbell className="w-8 h-8 text-cyber-purple" />
            <span className="text-xl font-bold gradient-text">
              VIT FITNESS
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {link.href === '/' ? (
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyber-purple to-cyber-blue group-hover:w-full transition-all duration-300" />
                  </Link>
                ) : link.href.startsWith('/#') ? (
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyber-purple to-cyber-blue group-hover:w-full transition-all duration-300" />
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyber-purple to-cyber-blue group-hover:w-full transition-all duration-300" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:block"
          >
            <Link to="/fitness-tracking">
              <Button size="sm">
                Track Fitness
              </Button>
            </Link>
          </motion.div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-cyber-dark/95 backdrop-blur-xl border-t border-white/10"
        >
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.href === '/' ? (
                  <Link
                    to={link.href}
                    className="block text-gray-300 hover:text-white transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : link.href.startsWith('/#') ? (
                  <a
                    href={link.href}
                    className="block text-gray-300 hover:text-white transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className="block text-gray-300 hover:text-white transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            <Link to="/fitness-tracking" onClick={() => setMobileMenuOpen(false)}>
              <Button size="sm" className="w-full">
                Track Fitness
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};