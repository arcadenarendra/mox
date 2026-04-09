import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Calendar, Megaphone, Briefcase, Handshake } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { supabase } from '../../lib/supabase';
import { Skeleton } from '../components/ui/skeleton';

interface Event {
  id: string;
  title: string;
  date: string;
  image_url: string;
  description: string;
}

export default function Home() {
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedEvents();
  }, []);

  const loadFeaturedEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('id, title, date, image_url, description')
        .eq('status', 'upcoming')
        .order('date', { ascending: true })
        .limit(2);

      if (error || !data || data.length === 0) {
        setFeaturedEvents(getSampleFeaturedEvents());
      } else {
        setFeaturedEvents(data);
      }
    } catch (err) {
      console.error('Error loading featured events:', err);
      setFeaturedEvents(getSampleFeaturedEvents());
    } finally {
      setLoading(false);
    }
  };

  const getSampleFeaturedEvents = (): Event[] => [
    {
      id: '1',
      title: 'MX Bloom',
      date: '2026-03-20',
      image_url: '/images/events/event-1.jpg',
      description: 'The annual celebration of the blooming MX community, featuring music, food, and incredible networking.'
    },
    {
      id: '2',
      title: 'Park Asterisk Trip',
      date: '2026-05-15',
      image_url: '/images/events/event-2.jpg',
      description: 'A thrilling day out for students to take a break from studies and enjoy the iconic Park Asterisk.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/images/hero-team.png')" }}
      >
        {/* Overlay to ensure text visibility */}
        <div className="absolute inset-0 bg-[#0f3d5f]/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight">
            The Voice of Masters Students at École Polytechnique
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto font-light leading-relaxed">
            MoX represents 350+ graduate students across AI, data science, finance, energy, and beyond - one of the world's most selective and internationally diverse academic communities.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">What is MoX?</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            MoX is the official student body for all Masters of Science and Technology (MScT) students at École Polytechnique or l'X. We represent ~350 students from over 40 countries, studying across specialised programmes in AI, data science, energy transition, visual computing, and more.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            We oversee all Masters student clubs (binets), manage their budgets, and organise major events like MX Bloom, Trip to Park Asterisk and much more. Throughout the year, we also serve as the institutional bridge between students and the school administration - including regular engagement with the Directrice Générale of École Polytechnique.
          </p>
          <p className="text-lg text-gray-900 font-medium leading-relaxed">
            MoX is not a club. We are the student body for the entire MX community.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">What MoX Does</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-[#0f3d5f] rounded-full flex items-center justify-center mb-4">
                  <Megaphone className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Represent</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We are the official institutional voice of all Masters students, engaging directly with school leadership on social and pedagogical matters.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-[#0f3d5f] rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Organise</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  From X Got Talent and the MScT Gala to hiking trips, company cocktails, career events, and Bloom X - we create the social and cultural life of the MX community.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-[#0f3d5f] rounded-full flex items-center justify-center mb-4">
                  <Handshake className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We fund and oversee all Masters student clubs (binets), giving them the resources to run their events, projects, and initiatives throughout the year.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-[#0f3d5f] rounded-full flex items-center justify-center mb-4">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Connect</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We bridge students and companies through partnerships, sponsorships, and career events. MoX co-organises X-Forum, École Polytechnique's prestigious annual career forum.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Events</h2>
            <Link to="/events">
              <Button variant="outline">
                View All Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          {loading ? (
            <div className="grid md:grid-cols-2 gap-8">
              <Skeleton className="aspect-[16/9] w-full" />
              <Skeleton className="aspect-[16/9] w-full" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {featuredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-[16/9] overflow-hidden">
                    <ImageWithFallback
                      src={event.image_url}
                      alt={event.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="text-sm text-[#0f3d5f] font-semibold mb-2">
                      {new Date(event.date).toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to={`/events/${event.id}`}>
                      <Button variant="link" className="p-0 h-auto text-[#0f3d5f]">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Ready to Partner with MoX?</h2>
          <p className="text-lg text-gray-700 mb-8">
            Connect with 300+ of the world's most talented Masters students at École Polytechnique.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/partnership-deck.pdf" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                Download Partnership Deck
              </Button>
            </a>
            <Link to="/contact">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}