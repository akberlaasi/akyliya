import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Edit, Trash, Eye } from 'lucide-react';

async function getBlogs() {
  return await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export default async function AdminBlogsPage() {
  const blogs = await getBlogs();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Blogs</h1>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          New Blog
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <li key={blog.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="truncate">
                      <p className="text-sm font-medium text-blue-600 truncate">{blog.title}</p>
                      <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                        /{blog.slug}
                      </p>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        blog.status === 'publish' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {blog.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        Created: {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm sm:mt-0 space-x-4">
                      {/* Actions would be client components or form actions */}
                      <Link href={`/blogs/${blog.slug}`} target="_blank" className="text-gray-400 hover:text-gray-600">
                         <Eye className="h-5 w-5" />
                      </Link>
                      <Link href={`/admin/blogs/${blog.id}`} className="text-blue-400 hover:text-blue-600">
                         <Edit className="h-5 w-5" />
                      </Link>
                      {/* Delete button would need a server action */}
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
              No blogs found. Create one to get started.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
