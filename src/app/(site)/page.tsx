import Hero from '@/components/layout/Hero';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      
      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Services</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What We Offer
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Comprehensive digital solutions tailored to your business needs.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Service Card 1 */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Web Development</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Custom websites built with Next.js and React for speed and performance.
                  </p>
                </div>
              </div>

              {/* Service Card 2 */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">SEO Optimization</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Rank higher on search engines with our data-driven SEO strategies.
                  </p>
                </div>
              </div>

              {/* Service Card 3 */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">UI/UX Design</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Beautiful, user-friendly designs that convert visitors into customers.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 text-center">
                <Link href="/services" className="text-blue-600 font-medium hover:text-blue-500">
                    View all services &rarr;
                </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blogs Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">From the Blog</h2>
                <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                    Latest insights and trends in web development.
                </p>
            </div>
            <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
                {/* Blog Card 1 */}
                <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-blue-600">
                                <Link href="#" className="hover:underline">
                                    Technology
                                </Link>
                            </p>
                            <Link href="#" className="block mt-2">
                                <p className="text-xl font-semibold text-gray-900">
                                    The Future of Next.js
                                </p>
                                <p className="mt-3 text-base text-gray-500">
                                    Discover why Next.js is becoming the standard for modern web development...
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
                 {/* Blog Card 2 */}
                 <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-blue-600">
                                <Link href="#" className="hover:underline">
                                    SEO
                                </Link>
                            </p>
                            <Link href="#" className="block mt-2">
                                <p className="text-xl font-semibold text-gray-900">
                                    SEO Best Practices 2026
                                </p>
                                <p className="mt-3 text-base text-gray-500">
                                    Stay ahead of the curve with these essential SEO tips...
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
                 {/* Blog Card 3 */}
                 <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-blue-600">
                                <Link href="#" className="hover:underline">
                                    Design
                                </Link>
                            </p>
                            <Link href="#" className="block mt-2">
                                <p className="text-xl font-semibold text-gray-900">
                                    Designing for Conversion
                                </p>
                                <p className="mt-3 text-base text-gray-500">
                                    How to create layouts that drive user action...
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
             <div className="mt-10 text-center">
                <Link href="/blogs" className="text-blue-600 font-medium hover:text-blue-500">
                    Read all posts &rarr;
                </Link>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                <span className="block">Ready to dive in?</span>
                <span className="block">Start your project today.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-blue-200">
                Contact us to discuss your requirements and get a free quote.
            </p>
            <Link
                href="/contact"
                className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto"
            >
                Contact Us
            </Link>
        </div>
      </section>
    </div>
  );
}
