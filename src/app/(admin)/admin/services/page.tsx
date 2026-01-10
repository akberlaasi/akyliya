import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Edit, Trash, Eye } from 'lucide-react';

async function getServices() {
  return await prisma.service.findMany({
    orderBy: { order: 'asc' },
  });
}

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Services</h1>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          New Service
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {services.length > 0 ? (
            services.map((service) => (
              <li key={service.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="truncate">
                      <p className="text-sm font-medium text-blue-600 truncate">{service.title}</p>
                      <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                        Order: {service.order}
                      </p>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {service.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        Slug: /{service.slug}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm sm:mt-0 space-x-4">
                      <Link href={`/services/${service.slug}`} target="_blank" className="text-gray-400 hover:text-gray-600">
                         <Eye className="h-5 w-5" />
                      </Link>
                      <Link href={`/admin/services/${service.id}`} className="text-blue-400 hover:text-blue-600">
                         <Edit className="h-5 w-5" />
                      </Link>
                      <button className="text-red-400 hover:text-red-600">
                         <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-4 sm:px-6 text-center text-gray-500">
              No services found. Add one to get started.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
