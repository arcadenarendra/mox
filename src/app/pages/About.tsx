import { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { supabase } from '../../lib/supabase';
import { Skeleton } from '../components/ui/skeleton';
import { Alert, AlertDescription } from '../components/ui/alert';

interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  order: number;
}

export default function About() {
  const [members, setMembers] = useState<CommitteeMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCommitteeMembers();
  }, []);

  const loadCommitteeMembers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to fetch from Supabase
      const { data, error: fetchError } = await supabase
        .from('committee_members')
        .select('*')
        .order('order', { ascending: true });

      if (fetchError) {
        console.error('Error fetching committee members:', fetchError);
        // Use sample data as fallback
        setMembers(getSampleMembers());
      } else {
        setMembers(data || getSampleMembers());
      }
    } catch (err) {
      console.error('Error loading committee members:', err);
      setError('Unable to load committee members. Showing sample data.');
      setMembers(getSampleMembers());
    } finally {
      setLoading(false);
    }
  };

  const getSampleMembers = (): CommitteeMember[] => [
    {
      id: '1',
      name: 'Prakhar Tiwar',
      role: 'President',
      bio: '[Programme]',
      image_url: '/images/team/member-1.jpeg',
      order: 1
    },
    {
      id: '2',
      name: '[VP Name]',
      role: 'Vice President',
      bio: '[Programme]',
      image_url: '/images/team/member-2.jpeg',
      order: 2
    },
    {
      id: '3',
      name: '[External Relations Name]',
      role: 'External Relations & Sponsorship Manager',
      bio: '[Programme] - Building powerful partnerships between MoX and global companies.',
      image_url: '/images/team/member-3.jpeg',
      order: 3
    },
    {
      id: '4',
      name: '[Treasurer Name]',
      role: 'Treasurer',
      bio: '[Programme] - Managing club funds and ensuring financial sustainability.',
      image_url: '/images/team/member-4.jpeg',
      order: 4
    },
     {
      id: '5',
      name: 'Admin',
      role: 'Treasurer',
      bio: '[Programme] - Managing club funds and ensuring financial sustainability.',
      image_url: '/images/team/member-4.jpeg',
      order: 5
    }
  ];

  const coreValues = [
    {
      title: 'Excellence',
      description: 'Our students are selected from a global pool through one of the most rigorous academic selection processes in the world. We hold ourselves to the same standard in everything MoX does.'
    },
    {
      title: 'Integrity',
      description: 'We act as the trusted voice between Masters students and the school administration, always representing our community with full transparency and honesty.'
    },
    {
      title: 'Innovation',
      description: 'With programmes like ViCAI and DSAIB, our students are building the future of AI and data science. MoX reflects that same spirit of creative ambition.'
    },
    {
      title: 'Community',
      description: 'With 40+ nationalities in one cohort, MoX is one of the most internationally diverse student bodies in France. We celebrate and build on that richness every day.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0f3d5f] to-[#1a5a7f] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About MoX</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Learn about the association, our mission, and the team representing the MX community at École Polytechnique.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  MoX — the Masters Association of École Polytechnique (l'X) — is the permanent 
                  student body representing all students in the Masters of Science and Technology (MScT) programme.
                </p>
                <p>
                  Our community of ~300 students, growing to ~400, comes from over 40 countries and studies 
                  across some of the most specialised and competitive postgraduate programmes in Europe: 
                  from Visual & Creative AI (ViCAI) and Data Science & AI for Business (DSAIB) to energy 
                  transition, economics, and beyond.
                </p>
                <p>
                  We oversee all Masters student clubs (binets), fund their activities, and serve as the 
                  institutional representative of the MX community — engaging regularly with the school 
                  administration, including the Directrice Générale of École Polytechnique. We also play 
                  a key role in co-organising X-Forum, the school's prestigious annual career forum.
                </p>
                <p>
                  MoX is more than a student association — we are the permanent institutional body for the 
                  MX community at one of the world's most historically significant and selective engineering 
                  institutions, founded in 1794 by the French Republic and shaped by Napoleon.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <ImageWithFallback
                  src="/images/about-office.jpg"
                  alt="École Polytechnique campus"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-12 bg-[#0f3d5f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">300+</div>
              <div className="text-blue-200">Students (growing to 400+)</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">40+</div>
              <div className="text-blue-200">Nationalities</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-blue-200">Masters programmes</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">Top 10</div>
              <div className="text-blue-200">Global ranking (QS)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-[#0f3d5f]">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Committee Members */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Our Leadership Team</h2>
          
          {error && (
            <Alert className="mb-8 max-w-2xl mx-auto">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="w-full h-48 mb-4" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-16 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {members.map((member) => (
                <Card key={member.id} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="aspect-square overflow-hidden rounded-lg mb-4">
                      <ImageWithFallback
                        src={member.image_url}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription className="text-[#0f3d5f] font-semibold">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Find Us</h2>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Contact Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-[#0f3d5f] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Address</p>
                      <p className="text-gray-600">
                        École Polytechnique<br />
                        Route de Saclay<br />
                        91128 Palaiseau, Île-de-France<br />
                        France
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-[#0f3d5f] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <a href="mailto:mox@polytechnique.fr" className="text-gray-600 hover:text-[#0f3d5f]">
                        mox@polytechnique.fr
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="h-full">
                <CardContent className="p-0 h-full min-h-[400px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2633.203612502685!2d2.208462015668615!3d48.71343767927318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67f53f6c8d7b3%3A0x8e87491cf5480ba0!2s%C3%89cole%20Polytechnique!5e0!3m2!1sen!2sus!4v1689255555555!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office location map"
                    className="rounded-lg"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}