import Link from 'next/link';
import { Mail, Twitter, Github, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const categories = [
    { name: 'Marketing', href: '/categories/marketing' },
    { name: 'Development', href: '/categories/development' },
    { name: 'Design', href: '/categories/design' },
    { name: 'Analytics', href: '/categories/analytics' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold text-gray-900">AI Dehko</span>
            </Link>
            <p className="text-gray-600 mb-6 max-w-md">
              Discover the future of AI tools. Compare, review, and find the perfect AI solution 
              for your business needs from our curated collection.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="mailto:hello@aidehko.com" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Categories Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-3">
              {categories.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Stay updated
            </h3>
            <p className="text-gray-600 mb-4">
              Get the latest AI tools and updates delivered to your inbox.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center text-sm text-gray-500 mb-4 md:mb-0">
            <span>© {currentYear} AI Dehko. Made with</span>
            <Heart className="h-4 w-4 text-red-500 mx-1" />
            <span>for the AI community.</span>
          </div>
          
          <div className="text-sm text-gray-500">
            <span>Discover • Compare • Choose</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
