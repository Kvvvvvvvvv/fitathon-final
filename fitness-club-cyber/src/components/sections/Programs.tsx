import { Dumbbell, Activity, Apple, Users2 } from 'lucide-react';
import { GlassCard, Section, SectionTitle } from '../ui';

const programs = [
  {
    icon: Dumbbell,
    title: 'Guided Strength Training',
    description:
      'Access to structured strength training 6 days/week with certified trainers',
    features: [
      'Beginner to Advanced Levels',
      'Personalized Training Plans',
      'Form Correction Guidance',
    ],
  },
  {
    icon: Activity,
    title: 'Cardio & Sports',
    description:
      'Basketball, badminton, swimming sessions and cardio workshops',
    features: [
      'Sports Leagues',
      'Individual Cardio Sessions',
      'Endurance Development',
    ],
  },
  {
    icon: Apple,
    title: 'Nutrition Guidance',
    description:
      'Personalized nutrition plans and healthy meal prep workshops',
    features: [
      'Meal Planning Support',
      'Supplement Guidance',
      'Healthy Cooking Workshops',
    ],
  },
  {
    icon: Users2,
    title: 'Community Events',
    description:
      'Monthly fitness challenges, outdoor adventures, and social meetups',
    features: [
      'Monthly Challenges',
      'Outdoor Adventures',
      'Social Networking',
    ],
  },
];

export const Programs = () => {
  return (
    <Section id="programs">
      <SectionTitle subtitle="Comprehensive programs designed to help you achieve your fitness goals">
        What We <span className="gradient-text">Offer</span>
      </SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {programs.map((program, index) => {
          const Icon = program.icon;
          return (
            <GlassCard key={index} className="group">
              <div className="mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyber-purple to-cyber-blue flex items-center justify-center glow-effect mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{program.title}</h3>
                <p className="text-gray-400 mb-6">{program.description}</p>
              </div>

              <div className="space-y-2">
                {program.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-gray-300"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyber-purple to-cyber-blue" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          );
        })}
      </div>
    </Section>
  );
};
