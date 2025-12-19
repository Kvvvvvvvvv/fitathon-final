import { Trophy, Award, Medal, Crown } from 'lucide-react';
import { GlassCard, Section, SectionTitle } from '../ui';

const achievements = [
  {
    icon: Crown,
    title: 'Overall Club Leaders',
    winners: 'Vishnu Pandian and Shri Darshan',
    description: 'Outstanding contributions to club success and member growth',
    year: '2024',
  },
  {
    icon: Trophy,
    title: 'Best Transformation',
    winners: 'Team Alpha',
    description: 'Exceptional dedication and inspiring fitness transformation',
    year: '2024',
  },
  {
    icon: Medal,
    title: 'Outstanding Contribution',
    winners: 'Multiple Members',
    description: 'Special recognition for exceptional commitment and support',
    year: '2024',
  },
];

export const HallOfFame = () => {
  return (
    <Section id="hall-of-fame">
      <SectionTitle subtitle="Celebrating the achievements and contributions of our outstanding members">
        Hall of <span className="gradient-text">Fame</span>
      </SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;
          return (
            <GlassCard key={index} className="text-center group">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyber-purple to-cyber-blue flex items-center justify-center glow-effect group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-10 h-10 text-white" />
                </div>
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-cyber-purple/20 text-cyber-purple text-sm mb-4">
                {achievement.year}
              </span>
              <h3 className="text-xl font-bold mb-3">{achievement.title}</h3>
              <p className="text-gray-300 font-semibold mb-2">
                {achievement.winners}
              </p>
              <p className="text-gray-400 text-sm">{achievement.description}</p>
            </GlassCard>
          );
        })}
      </div>

      <GlassCard className="max-w-4xl mx-auto text-center" hover={false}>
        <div className="flex items-center justify-center gap-3 mb-6">
          <Award className="w-8 h-8 text-cyber-purple" />
          <h3 className="text-2xl font-bold gradient-text">
            Our Champions
          </h3>
        </div>
        <p className="text-gray-400 text-lg leading-relaxed">
          The Hall of Fame recognizes individuals and teams who have
          demonstrated exceptional dedication, skill, and contribution to the
          VIT Fitness Club community. Their achievements inspire current and
          future members to strive for excellence in their fitness journeys.
        </p>
      </GlassCard>
    </Section>
  );
};
