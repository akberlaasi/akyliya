import ContactForm from '@/components/forms/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Akyliya for your web development and SEO needs.',
};

export default function ContactPage() {
  return (
    <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
      <div className="relative max-w-xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Contact Us
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            We'd love to hear from you. Send us a message and we'll get back to you shortly.
          </p>
        </div>
        <div className="mt-12">
          <ContactForm />
        </div>
        
        {/* Map Section Placeholder */}
        <div className="mt-16 bg-gray-100 h-96 w-full rounded-lg flex items-center justify-center text-gray-400">
            <p>Interactive Map Component goes here</p>
        </div>
      </div>
    </div>
  );
}
