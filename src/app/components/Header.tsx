import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Info, Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Events', href: '/events' },
  { name: 'Calendar', href: '/calendar' },
  { name: 'Partnership', href: '/partnership' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-[#0f3d5f] text-white sticky top-0 z-50 shadow-lg border-b border-white/20">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-12 flex items-center justify-center">
                <img src="/images/logo.png" alt="MoX Logo" className="h-10 w-auto rounded-sm" />
              </div>
            </Link>
          </div>

          {/* Center Navigation - visible on all screens */}
          <div className="hidden md:flex md:items-center md:space-x-1 flex-1 justify-center">
            {navigation.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(link.href)
                  ? 'bg-white/20 text-white'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side - Hamburger menu (mobile) and Info icon (desktop) */}
          <div className="flex items-center space-x-3">
            {/* Hamburger menu - visible on mobile only */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>

            {/* Info icon - visible on desktop only */}
            <button
              type="button"
              className="hidden md:inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Toggle info</span>
              <Info className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Mobile/Info Navigation */}
        {mobileMenuOpen && (
          <div className="pb-4 border-t border-white/10 pt-4">
            <div className="space-y-1">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium md:hidden ${isActive(link.href)
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* Info section content - visible on desktop only */}
              <div className="hidden md:block pt-4 mt-4 border-t border-white/10">
                <h3 className="px-3 text-sm font-semibold text-white/90 mb-3">Quick Info</h3>
                <div className="px-3 space-y-2 text-sm text-white/70">
                  <p>📧 Email: info@mox.org</p>
                  <p>📞 Phone: +32 123 456 789</p>
                  <p>📍 Brussels, Belgium</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}