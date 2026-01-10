import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore our wide range of web development and digital marketing services.',
};

async function getServices() {
  const services = await prisma.service.findMany({
    where: { status: 'active' },
    orderBy: { order: 'asc' },
  });
  return services;
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Services</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            We provide comprehensive solutions to help your business thrive online.
          </p>
        </div>
        
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.length > 0 ? (
                services.map((service) => (
                    <div key={service.id} className="pt-6">
                        <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                            <div className="-mt-6">
                                <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg">
                                    {/* Icon placeholder - could be dynamic based on service type */}
                                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{service.title}</h3>
                                <p className="mt-5 text-base text-gray-500">
                                    {service.description.substring(0, 150)}...
                                </p>
                                <div className="mt-6">
                                    <Link href={`/services/${service.slug}`} className="text-base font-medium text-blue-600 hover:text-blue-500">
                                        Learn more <span aria-hidden="true">&rarr;</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="col-span-3 text-center text-gray-500">
                    <p>No services listed yet.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
