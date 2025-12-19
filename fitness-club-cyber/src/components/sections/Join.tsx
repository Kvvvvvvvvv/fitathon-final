import { Instagram, Mail, MessageCircle, ArrowRight } from 'lucide-react';
import { Button, GlassCard, Section, SectionTitle } from '../ui';

const steps = [
  {
    number: '01',
    title: 'Connect with Us',
    description:
      'Register through our social media channels or email to start your journey.',
  },
  {
    number: '02',
    title: 'Attend Orientation',
    description:
      'Join our orientation session to learn about programs and meet members.',
  },
  {
    number: '03',
    title: 'Start Training',
    description:
      'Begin with beginner-friendly workouts and build advanced routines.',
  },
];

export const Join = () => {
  return (
    <Section id="join" className="bg-gradient-to-b from-transparent via-cyber-navy/20 to-transparent">
      <SectionTitle subtitle="No experience needed. Just bring your commitment.">
        Ready to <span className="gradient-text">Transform?</span>
      </SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {steps.map((step, index) => (
          <GlassCard key={index} className="text-center">
            <div className="text-5xl font-bold gradient-text mb-4">
              {step.number}
            </div>
            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
            <p className="text-gray-400">{step.description}</p>
          </GlassCard>
        ))}
      </div>

      <div className="max-w-2xl mx-auto text-center mb-12">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            href="https://chat.whatsapp.com/invite"
            size="lg"
            className="bg-gradient-to-r from-green-500 to-green-600 hover:shadow-[0_0_40px_rgba(34,197,94,0.6)]"
          >
            <MessageCircle className="w-5 h-5" />
            Join WhatsApp Group
          </Button>
          <Button
            href="https://www.instagram.com/fitnessclubvitc"
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-[0_0_40px_rgba(236,72,153,0.6)]"
          >
            <Instagram className="w-5 h-5" />
            Follow on Instagram
          </Button>
        </div>
      </div>

      <GlassCard className="max-w-3xl mx-auto text-center" hover={false}>
        <Mail className="w-12 h-12 text-cyber-purple mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-3">Have Questions?</h3>
        <p className="text-gray-400 mb-6">
          For more information, please contact us through our social media
          channels or email at{' '}
          <a
            href="mailto:fitness@vit.ac.in"
            className="text-cyber-purple hover:text-cyber-blue transition-colors"
          >
            fitness@vit.ac.in
          </a>
        </p>
        <Button href="mailto:fitness@vit.ac.in" variant="outline">
          Send Email
          <ArrowRight className="w-4 h-4" />
        </Button>
      </GlassCard>
    </Section>
  );
};
