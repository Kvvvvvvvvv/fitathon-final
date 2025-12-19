import { Dumbbell, Instagram, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 bg-cyber-darker/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Dumbbell className="w-6 h-6 text-cyber-purple" />
              <span className="text-lg font-bold gradient-text">
                VIT FITNESS
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Transform your body and mind through structured fitness programs
              and a supportive community.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a
                  href="#programs"
                  className="hover:text-white transition-colors"
                >
                  Programs
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-white transition-colors">
                  Events
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Connect With Us</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/fitnessclubvitc"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:scale-110"
              >
                <Instagram className="w-5 h-5 text-cyber-purple" />
              </a>
              <a
                href="mailto:fitness@vit.ac.in"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:scale-110"
              >
                <Mail className="w-5 h-5 text-cyber-purple" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 VIT Chennai Fitness Club. Transform Your Body & Mind.
          </p>
        </div>
      </div>
    </footer>
  );
};
