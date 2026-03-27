import { useState, useEffect } from 'react';
import { Download, Upload, FileText, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { api } from '../../lib/api';
import { toast } from 'sonner';

export default function Partnership() {
  const [brochureUrl, setBrochureUrl] = useState<string | null>(null);
  const [loadingBrochure, setLoadingBrochure] = useState(true);
  const [uploadingBrochure, setUploadingBrochure] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    loadBrochure();
  }, []);

  const loadBrochure = async () => {
    try {
      setLoadingBrochure(true);
      const response = await api.getBrochureUrl();
      setBrochureUrl(response.url);
    } catch (error: any) {
      console.error('Error loading brochure:', error);
      // Brochure not found is expected if not uploaded yet
      if (!error.message?.includes('404')) {
        toast.error('Failed to load brochure');
      }
    } finally {
      setLoadingBrochure(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Please select a PDF file');
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    try {
      setUploadingBrochure(true);
      await api.uploadBrochure(selectedFile);
      toast.success('Brochure uploaded successfully!');
      setSelectedFile(null);
      // Reload brochure URL
      await loadBrochure();
    } catch (error: any) {
      console.error('Error uploading brochure:', error);
      toast.error(error.message || 'Failed to upload brochure');
    } finally {
      setUploadingBrochure(false);
    }
  };

  const benefits = [
    {
      title: 'Brand Visibility',
      description: 'Increase your brand exposure to our extensive network of professionals.'
    },
    {
      title: 'Networking Opportunities',
      description: 'Connect with industry leaders and decision-makers at exclusive events.'
    },
    {
      title: 'Thought Leadership',
      description: 'Position your organization as an industry leader through our platforms.'
    },
    {
      title: 'Custom Solutions',
      description: 'Tailored partnership packages to meet your specific business objectives.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0f3d5f] to-[#1a5a7f] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Professional Partnership</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Partner with us to expand your reach, enhance your brand, and contribute to professional excellence.
          </p>
        </div>
      </section>

      {/* Partnership Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Why Partner With Us?</h2>
              <p className="text-gray-700 mb-6">
                Our association brings together over 5,000 professionals across Europe, creating 
                unparalleled opportunities for collaboration, innovation, and growth. As a partner, 
                you'll gain access to our extensive network and enhance your organization's visibility 
                in the professional community.
              </p>
              <p className="text-gray-700 mb-8">
                We offer flexible partnership packages designed to align with your business goals and 
                maximize your return on investment.
              </p>
              <div className="flex flex-wrap gap-4">
                {brochureUrl ? (
                  <a href={brochureUrl} download>
                    <Button size="lg">
                      <Download className="mr-2 h-5 w-5" />
                      Download Brochure
                    </Button>
                  </a>
                ) : (
                  <Button size="lg" disabled={loadingBrochure}>
                    {loadingBrochure ? 'Loading...' : 'Brochure Not Available'}
                  </Button>
                )}
                <a href="/contact">
                  <Button size="lg" variant="outline">
                    Contact Us
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <ImageWithFallback
                  src="/images/partnership.jpg"
                  alt="Partnership"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Partnership Benefits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-[#0f3d5f] rounded-full flex items-center justify-center mb-4">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Partnership Tiers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-shadow border-2">
              <CardHeader>
                <CardTitle className="text-xl text-center">Bronze Partner</CardTitle>
                <div className="text-center">
                  <span className="text-3xl font-bold text-[#0f3d5f]">€2,500</span>
                  <span className="text-gray-600">/year</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <span>Logo on website</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <span>Mention in newsletter</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <span>2 event registrations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow border-2 border-[#0f3d5f] transform scale-105">
              <CardHeader>
                <div className="absolute top-0 right-0 bg-[#0f3d5f] text-white px-3 py-1 text-xs rounded-bl">
                  POPULAR
                </div>
                <CardTitle className="text-xl text-center">Silver Partner</CardTitle>
                <div className="text-center">
                  <span className="text-3xl font-bold text-[#0f3d5f]">€5,000</span>
                  <span className="text-gray-600">/year</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <span>All Bronze benefits</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <span>Featured sponsor section</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <span>5 event registrations</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <span>Speaking opportunity</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow border-2">
              <CardHeader>
                <CardTitle className="text-xl text-center">Gold Partner</CardTitle>
                <div className="text-center">
                  <span className="text-3xl font-bold text-[#0f3d5f]">€10,000</span>
                  <span className="text-gray-600">/year</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <span>All Silver benefits</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <span>Premium branding</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <span>10 event registrations</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <span>Exclusive networking</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <span>Custom content</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Admin: Upload Brochure */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                Upload Partnership Brochure (Admin)
              </CardTitle>
              <CardDescription>
                Upload a PDF brochure for partners to download. Maximum file size: 10MB.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {brochureUrl && (
                <Alert>
                  <FileText className="h-4 w-4" />
                  <AlertDescription>
                    A brochure is currently available. Uploading a new one will replace it.
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="brochure">Select PDF File</Label>
                <Input
                  id="brochure"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  disabled={uploadingBrochure}
                />
                {selectedFile && (
                  <p className="text-sm text-gray-600">
                    Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>

              <Button 
                onClick={handleUpload} 
                disabled={!selectedFile || uploadingBrochure}
                className="w-full"
              >
                {uploadingBrochure ? 'Uploading...' : 'Upload Brochure'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}