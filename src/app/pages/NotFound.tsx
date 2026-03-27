import { Link } from 'react-router';
import { Home, Search } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <Search className="h-24 w-24 text-gray-400 mx-auto mb-6" />
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
          <p className="text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link to="/">
            <Button size="lg" className="w-full">
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </Link>
          
          <div className="pt-6">
            <p className="text-sm text-gray-600 mb-4">You might be interested in:</p>
            <div className="space-y-2 text-sm">
              <Link to="/events" className="block text-[#0f3d5f] hover:underline">
                Browse Events
              </Link>
              <Link to="/membership" className="block text-[#0f3d5f] hover:underline">
                Become a Member
              </Link>
              <Link to="/contact" className="block text-[#0f3d5f] hover:underline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
