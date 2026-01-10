import { prisma } from '@/lib/prisma';
import { FileText, Briefcase, MessageSquare, Users } from 'lucide-react';

async function getStats() {
  const [blogsCount, servicesCount, formsCount] = await Promise.all([
    prisma.blog.count(),
    prisma.service.count(),
    prisma.form.count(),
  ]);

  return {
    blogs: blogsCount,
    services: servicesCount,
    forms: formsCount,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Form Submissions */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MessageSquare className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Inquiries</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{stats.forms}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="/admin/forms" className="font-medium text-blue-700 hover:text-blue-900">
                View all
              </a>
            </div>
          </div>
        </div>

        {/* Card 2: Blogs */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Blogs</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{stats.blogs}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="/admin/blogs" className="font-medium text-blue-700 hover:text-blue-900">
                Manage blogs
              </a>
            </div>
          </div>
        </div>

        {/* Card 3: Services */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Briefcase className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Services</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{stats.services}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="/admin/services" className="font-medium text-blue-700 hover:text-blue-900">
                Manage services
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
