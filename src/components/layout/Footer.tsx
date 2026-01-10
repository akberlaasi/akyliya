import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <span className="font-bold text-2xl text-blue-500">Akyliya</span>
            <p className="mt-4 text-gray-400 text-sm">
              Empowering businesses with cutting-edge web solutions and SEO strategies.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Services</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/services" className="text-base text-gray-400 hover:text-white">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/services/web-development" className="text-base text-gray-400 hover:text-white">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services/seo" className="text-base text-gray-400 hover:text-white">
                  SEO Optimization
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/about" className="text-base text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-base text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-base text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Contact</h3>
            <ul className="mt-4 space-y-4">
              <li className="text-base text-gray-400">
                Email: contact@akyliya.com
              </li>
              <li className="text-base text-gray-400">
                Phone: +1 (555) 123-4567
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 flex justify-center">
          <p className="text-base text-gray-400">
            &copy; {new Date().getFullYear()} Akyliya Website. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
