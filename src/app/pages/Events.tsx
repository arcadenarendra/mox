import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Skeleton } from '../components/ui/skeleton';
import { Alert, AlertDescription } from '../components/ui/alert';
import { supabase } from '../../lib/supabase';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image_url: string;
  category: string;
  status: 'upcoming' | 'past';
  price: number;
  max_attendees: number;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEvents();

    // Set up real-time subscription for events changes
    const channel = supabase
      .channel('events-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'events',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            // Add new event to the list
            setEvents((prevEvents) => [payload.new as Event, ...prevEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
          } else if (payload.eventType === 'UPDATE') {
            // Update existing event
            setEvents((prevEvents) =>
              prevEvents.map((e) => (e.id === payload.new.id ? (payload.new as Event) : e)).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            );
          } else if (payload.eventType === 'DELETE') {
            // Remove deleted event
            setEvents((prevEvents) => prevEvents.filter((e) => e.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      // Clean up subscription on unmount
      supabase.removeChannel(channel);
    };
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (fetchError) {
        console.error('Error fetching events:', fetchError);
        setError('Unable to load events from database. Showing sample data.');
        setEvents(getSampleEvents());
      } else {
        setEvents(data && data.length > 0 ? data : getSampleEvents());
      }
    } catch (err) {
      console.error('Error loading events:', err);
      setError('Unable to load events. Showing sample data.');
      setEvents(getSampleEvents());
    } finally {
      setLoading(false);
    }
  };

  const getSampleEvents = (): Event[] => [
    {
      id: '1',
      title: 'Annual Business Summit 2026',
      description: 'Join industry leaders for our flagship annual event featuring keynote speakers, panel discussions, and networking opportunities.',
      date: '2026-04-15',
      time: '09:00',
      location: 'Brussels Convention Center',
      image_url: '/images/events/event-1.jpg',
      category: 'Conference',
      status: 'upcoming',
      price: 150,
      max_attendees: 500
    },
    {
      id: '2',
      title: 'Professional Development Workshop',
      description: 'Enhance your skills with expert-led training sessions covering the latest industry trends and best practices.',
      date: '2026-04-22',
      time: '14:00',
      location: 'Association Headquarters',
      image_url: '/images/events/event-2.jpg',
      category: 'Workshop',
      status: 'upcoming',
      price: 75,
      max_attendees: 50
    },
    {
      id: '3',
      title: 'Networking Mixer',
      description: 'Connect with fellow professionals in a relaxed setting. Includes refreshments and interactive activities.',
      date: '2026-05-10',
      time: '18:00',
      location: 'The Grand Hotel Brussels',
      image_url: '/images/events/event-3.jpg',
      category: 'Networking',
      status: 'upcoming',
      price: 0,
      max_attendees: 100
    },
    {
      id: '4',
      title: 'Innovation Summit 2026',
      description: 'Explore cutting-edge innovations and technologies shaping the future of our industry.',
      date: '2026-06-05',
      time: '10:00',
      location: 'European Innovation Center',
      image_url: '/images/events/event-4.jpg',
      category: 'Conference',
      status: 'upcoming',
      price: 200,
      max_attendees: 300
    },
    {
      id: '5',
      title: 'Winter Gala 2025',
      description: 'Our annual celebration brought together members for an evening of recognition and celebration.',
      date: '2025-12-15',
      time: '19:00',
      location: 'Royal Palace Brussels',
      image_url: '/images/events/event-5.jpg',
      category: 'Social',
      status: 'past',
      price: 100,
      max_attendees: 200
    },
    {
      id: '6',
      title: 'Leadership Forum 2025',
      description: 'Past event featuring distinguished speakers sharing insights on effective leadership.',
      date: '2025-10-20',
      time: '09:00',
      location: 'Brussels Business Center',
      image_url: '/images/events/event-6.jpg',
      category: 'Conference',
      status: 'past',
      price: 125,
      max_attendees: 150
    }
  ];

  const upcomingEvents = events.filter(e => e.status === 'upcoming').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const pastEvents = events.filter(e => e.status === 'past').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const EventCard = ({ event }: { event: Event }) => (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
      <div className="aspect-[16/9] overflow-hidden">
        <ImageWithFallback
          src={event.image_url}
          alt={event.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <Badge variant={event.status === 'upcoming' ? 'default' : 'secondary'}>
            {event.category}
          </Badge>
          {event.price === 0 ? (
            <span className="text-sm font-semibold text-green-600">Free</span>
          ) : (
            <span className="text-sm font-semibold text-[#0f3d5f]">€{event.price}</span>
          )}
        </div>
        <CardTitle className="text-xl">{event.title}</CardTitle>
        <CardDescription className="line-clamp-2">{event.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-[#0f3d5f]" />
            <span>{new Date(event.date).toLocaleDateString('en-GB', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })} at {event.time}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-[#0f3d5f]" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-[#0f3d5f]" />
            <span>Max {event.max_attendees} attendees</span>
          </div>
        </div>
        <Link to={`/events/${event.id}`}>
          <Button className="w-full" variant={event.status === 'upcoming' ? 'default' : 'outline'}>
            {event.status === 'upcoming' ? 'Learn More & Register' : 'View Details'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0f3d5f] to-[#1a5a7f] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Events</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Discover our upcoming events and explore past activities. Join us for networking, 
            learning, and professional growth opportunities.
          </p>
        </div>
      </section>

      {/* Events Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <Alert className="mb-8">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <Skeleton className="w-full aspect-[16/9]" />
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-5/6" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-10 w-full" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : upcomingEvents.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {upcomingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Upcoming Events</h3>
                  <p className="text-gray-500">Check back soon for new events!</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past">
              {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <Skeleton className="w-full aspect-[16/9]" />
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-5/6" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-10 w-full" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : pastEvents.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pastEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Past Events</h3>
                  <p className="text-gray-500">Past events will appear here.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Don't Miss Out</h2>
          <p className="text-lg text-gray-700 mb-8">
            View all our events in the calendar or become a member to get exclusive access to member-only events.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/calendar">
              <Button size="lg">
                View Calendar
                <Calendar className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/membership">
              <Button size="lg" variant="outline">
                Become a Member
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}