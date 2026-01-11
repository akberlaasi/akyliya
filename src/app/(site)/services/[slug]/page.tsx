import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';

type Props = {
  params: Promise<{ slug: string }>;
};

async function getService(slug: string) {
  const service = await prisma.service.findUnique({
    where: { slug },
  });
  return service;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: service.seo_title || service.title,
    description: service.seo_desc || `Learn about our ${service.title} service.`,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service || service.status !== 'active') {
    notFound();
  }

  // Parse features safely if it exists and is a JSON array
  let featuresList: string[] = [];
  try {
      if (service.features && Array.isArray(service.features)) {
          featuresList = service.features as string[];
      }
  } catch (e) {
      console.error("Error parsing features JSON", e);
  }


  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            {service.title}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
             Professional {service.title} services tailored to your needs.
          </p>
        </div>

        <div className="mt-16">
             <div className="prose prose-blue prose-lg mx-auto text-gray-500">
                 <p>{service.description}</p>
                 
                 {featuresList.length > 0 && (
                     <div className="mt-10">
                         <h3 className="text-2xl font-bold text-gray-900">Key Features</h3>
                         <ul className="mt-4 space-y-4">
                             {featuresList.map((feature, index) => (
                                 <li key={index} className="flex items-start">
                                     <div className="flex-shrink-0">
                                         <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                         </svg>
                                     </div>
                                     <p className="ml-3 text-lg text-gray-500">{feature}</p>
                                 </li>
                             ))}
                         </ul>
                     </div>
                 )}
             </div>
        </div>

        <div className="mt-16 text-center">
             <h3 className="text-2xl font-bold text-gray-900">Ready to get started?</h3>
             <div className="mt-8 flex justify-center">
                <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                >
                    Contact Us Today
                </Link>
             </div>
        </div>
      </div>
    </div>
  );
}
