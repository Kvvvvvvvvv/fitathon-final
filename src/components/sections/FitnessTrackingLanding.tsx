import { useState } from 'react';
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  Dumbbell, 
  Scale, 
  Ruler, 
  Activity,
  ArrowRight,
  BarChart3,
  CalendarDays,
  User
} from 'lucide-react';
import { GlassCard, Section, SectionTitle } from '../ui';
import { Link } from 'react-router-dom';

export const FitnessTrackingLanding = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Progress Tracking',
      description: 'Visualize your fitness journey with interactive charts and graphs showing weight, measurements, and performance metrics.'
    },
    {
      icon: CalendarDays,
      title: 'Daily Workouts',
      description: 'Get personalized daily workout plans tailored to your fitness level and goals.'
    },
    {
      icon: User,
      title: 'Transformation Stories',
      description: 'See inspiring before-and-after stories from our community members.'
    }
  ];

  return (
    <Section id="fitness-tracking-landing" className="min-h-screen">
      <SectionTitle subtitle="Your personal fitness companion for tracking progress and achieving goals">
        Fitness <span className="gradient-text">Tracking Hub</span>
      </SectionTitle>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <GlassCard key={index} className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyber-purple to-cyber-blue flex items-center justify-center mx-auto mb-6 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </GlassCard>
          );
        })}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <GlassCard>
          <h3 className="text-xl font-bold mb-6">Why Track Your Fitness?</h3>
          <div className="space-y-4">
            {[
              'Stay motivated with visual progress indicators',
              'Identify patterns in your performance',
              'Adjust your routine based on real data',
              'Celebrate milestones and achievements',
              'Connect with our supportive community'
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyber-purple to-cyber-blue mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-xl font-bold mb-6">Getting Started</h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyber-purple/20 flex items-center justify-center">
                <span className="text-cyber-purple font-bold">1</span>
              </div>
              <div>
                <h4 className="font-bold mb-1">Create Your Profile</h4>
                <p className="text-gray-400 text-sm">Set your initial goals, measurements, and fitness level</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyber-purple/20 flex items-center justify-center">
                <span className="text-cyber-purple font-bold">2</span>
              </div>
              <div>
                <h4 className="font-bold mb-1">Log Your Activities</h4>
                <p className="text-gray-400 text-sm">Record workouts, nutrition, and daily activities</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyber-purple/20 flex items-center justify-center">
                <span className="text-cyber-purple font-bold">3</span>
              </div>
              <div>
                <h4 className="font-bold mb-1">Track & Transform</h4>
                <p className="text-gray-400 text-sm">Monitor your progress and adjust your plan as needed</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </Section>
  );
};