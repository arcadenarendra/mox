import { Users, Award, Globe, Handshake, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';

const GOOGLE_FORM_URL = 'https://forms.google.com/your-form-link';

export default function Membership() {
  const benefits = [
    {
      icon: Users,
      title: 'Networking',
      description: 'Connect with professionals and industry leaders across the globe.',
    },
    {
      icon: Award,
      title: 'Professional Growth',
      description: 'Access workshops, seminars, and skill-building resources.',
    },
    {
      icon: Globe,
      title: 'Global Community',
      description: 'Be part of a diverse, international community of like-minded individuals.',
    },
    {
      icon: Handshake,
      title: 'Exclusive Events',
      description: 'Get priority access to member-only events and conferences.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0f3d5f] to-[#1a5a7f] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Become a Member</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">
            Join our community of professionals committed to excellence, innovation, and collaboration.
          </p>
          <Button
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-10 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            onClick={() => window.open(GOOGLE_FORM_URL, '_blank')}
          >
            Apply Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Why Join MoX?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="text-center p-6 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-[#0f3d5f]/20 transition-all"
              >
                <div className="mx-auto w-14 h-14 bg-[#0f3d5f]/10 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="h-7 w-7 text-[#0f3d5f]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Fill out our short application form and we'll get back to you soon.
          </p>
          <Button
            size="lg"
            className="bg-[#0f3d5f] hover:bg-[#0a2e4a] text-white text-lg px-10 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            onClick={() => window.open(GOOGLE_FORM_URL, '_blank')}
          >
            Apply Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
