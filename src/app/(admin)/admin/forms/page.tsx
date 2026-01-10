import { prisma } from '@/lib/prisma';
import { Mail } from 'lucide-react';

async function getForms() {
  return await prisma.form.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export default async function AdminFormsPage() {
  const forms = await getForms();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Form Submissions</h1>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {forms.length > 0 ? (
            forms.map((form) => (
              <li key={form.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Mail className="h-5 w-5 text-gray-400 mr-3" />
                        <p className="text-sm font-medium text-blue-600 truncate">{form.name}</p>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="text-sm text-gray-500">{form.email}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 line-clamp-2">{form.message}</p>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        Source: {form.page_source}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm sm:mt-0">
                      <p className="text-gray-500">
                        {new Date(form.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-4 sm:px-6 text-center text-gray-500">
              No form submissions yet.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
