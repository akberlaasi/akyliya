import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about Akyliya, our mission, values, and the team behind our success.',
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-blue-700 py-16 sm:py-24">
        <div className="absolute inset-0 overflow-hidden">
             {/* Abstract background pattern could go here */}
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            About Akyliya
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
            We are a team of passionate developers and digital strategists dedicated to transforming your online presence.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Our Mission</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Empowering Business Growth
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Our mission is to provide accessible, high-quality web solutions that enable businesses of all sizes to compete and thrive in the digital economy.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center mb-12">
                 <h2 className="text-3xl font-extrabold text-gray-900">Our Core Values</h2>
             </div>
             <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                 <div className="bg-white p-6 rounded-lg shadow text-center">
                     <div className="text-blue-600 mb-4">
                         {/* Icon */}
                         <svg className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                         </svg>
                     </div>
                     <h3 className="text-lg font-medium text-gray-900">Excellence</h3>
                     <p className="mt-2 text-gray-500">We strive for perfection in every line of code and every pixel of design.</p>
                 </div>
                 <div className="bg-white p-6 rounded-lg shadow text-center">
                     <div className="text-blue-600 mb-4">
                         {/* Icon */}
                         <svg className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                         </svg>
                     </div>
                     <h3 className="text-lg font-medium text-gray-900">Innovation</h3>
                     <p className="mt-2 text-gray-500">We stay ahead of the curve, adopting the latest technologies to give you an edge.</p>
                 </div>
                 <div className="bg-white p-6 rounded-lg shadow text-center">
                     <div className="text-blue-600 mb-4">
                         {/* Icon */}
                         <svg className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                         </svg>
                     </div>
                     <h3 className="text-lg font-medium text-gray-900">Customer Focus</h3>
                     <p className="mt-2 text-gray-500">Your success is our success. We work closely with you to understand your needs.</p>
                 </div>
             </div>
         </div>
      </div>

      {/* Team Section (Placeholder) */}
      <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Meet the Team</h2>
              <p className="mt-4 text-xl text-gray-500">
                  The talented individuals behind Akyliya.
              </p>
              <div className="mt-10">
                  {/* Team members grid would go here */}
                  <p className="text-gray-400 italic">Team profiles coming soon...</p>
              </div>
          </div>
      </div>
    </div>
  );
}
