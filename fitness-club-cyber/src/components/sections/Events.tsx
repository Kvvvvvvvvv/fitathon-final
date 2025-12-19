import { Calendar, Trophy, Lightbulb, Flame } from 'lucide-react';
import { GlassCard, Section, SectionTitle } from '../ui';

const events = [
  {
    title: 'FIT-A-THON',
    description:
      'Our biggest event of the year featuring competitions in strength, endurance, and team challenges. Show off your skills and compete with fellow fitness enthusiasts.',
    date: 'December 2025',
    type: 'Championship',
    icon: Trophy,
  },
  {
    title: 'Wellness Workshop Series',
    description:
      'Educational sessions on nutrition, mental health, and lifestyle balance. Learn from experts and develop skills for long-term wellness.',
    date: 'November 2025',
    type: 'Workshop',
    icon: Lightbulb,
  },
  {
    title: 'Team Building Challenge',
    description:
      'Intensive training sessions focused on building collaborative strength and problem-solving skills. Strengthen your bonds through fitness.',
    date: 'October 2025',
    type: 'Challenge',
    icon: Flame,
  },
];

const upcomingEvents = [
  { name: 'Strength Training Workshop', date: 'Dec 15, 6:00 AM' },
  { name: 'Fitness Challenge Registration', date: 'Dec 18–20' },
  { name: 'Mobility & Recovery Session', date: 'Dec 22, 7:00 AM' },
  { name: 'Physique Transformation Seminar', date: 'Dec 28, 4:00 PM' },
];

export const Events = () => {
  return (
    <Section id="events" className="bg-gradient-to-b from-transparent via-cyber-navy/20 to-transparent">
      <SectionTitle subtitle="Join our exciting events and challenges throughout the year">
        Recent <span className="gradient-text">Events</span>
      </SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
        {events.map((event, index) => {
          const Icon = event.icon;
          return (
            <GlassCard key={index} className="group">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyber-purple to-cyber-blue flex items-center justify-center glow-effect mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <span className="inline-block px-3 py-1 rounded-full bg-cyber-purple/20 text-cyber-purple text-sm mb-4">
                  {event.type}
                </span>
                <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                <p className="text-gray-400 mb-4">{event.description}</p>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{event.date}</span>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <GlassCard className="max-w-3xl mx-auto" hover={false}>
        <h3 className="text-2xl font-bold mb-6 text-center">
          <span className="gradient-text">Upcoming This Month</span>
        </h3>
        <div className="space-y-4">
          {upcomingEvents.map((event, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b border-white/10 last:border-0 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyber-purple to-cyber-blue group-hover:scale-150 transition-transform" />
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  {event.name}
                </span>
              </div>
              <span className="text-gray-500 text-sm">{event.date}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </Section>
  );
};
