import { BookOpen, Users, RefreshCw, Zap } from 'lucide-react';
import { GlassCard, Section, SectionTitle } from '../ui';

const benefits = [
  {
    icon: BookOpen,
    title: 'Struggling with consistency',
    description:
      'Structured workout routines to build lasting fitness habits. Our programs ensure you stay committed and progressing.',
  },
  {
    icon: Users,
    title: 'Lack of motivation',
    description:
      'Peer-driven accountability groups to keep you consistent. Our community ensures you stay motivated and progressing.',
  },
  {
    icon: RefreshCw,
    title: 'Unbalanced lifestyle',
    description:
      'Holistic fitness approach combining physical and mental wellness. Develop discipline through structured fitness programs.',
  },
  {
    icon: Zap,
    title: 'Limited resources',
    description:
      'Access to professional trainers, equipment, and facilities. Everything you need to succeed in your fitness journey.',
  },
];

export const About = () => {
  return (
    <Section id="about" className="bg-gradient-to-b from-transparent via-cyber-navy/20 to-transparent">
      <SectionTitle subtitle="Your journey to a healthier, stronger you starts here">
        Why Join Our <span className="gradient-text">Community?</span>
      </SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <GlassCard key={index}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyber-purple to-cyber-blue flex items-center justify-center glow-effect">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { number: '01', text: 'Structured programs by certified trainers' },
          { number: '02', text: 'Supportive peer group that motivates' },
          { number: '03', text: 'Holistic physical and mental wellness' },
          { number: '04', text: 'Flexible scheduling for students' },
        ].map((item, index) => (
          <GlassCard key={index} className="text-center">
            <div className="text-4xl font-bold gradient-text mb-3">
              {item.number}
            </div>
            <p className="text-gray-300">{item.text}</p>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
};
