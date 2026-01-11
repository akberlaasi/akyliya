import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read our latest insights on web development and SEO.',
};

async function getBlogs() {
  const blogs = await prisma.blog.findMany({
    where: { status: 'publish' },
    orderBy: { createdAt: 'desc' },
  });
  return blogs;
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Latest Insights</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Stay updated with the latest trends and technologies.
          </p>
        </div>
        <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-600">
                      {blog.tags && blog.tags.length > 0 ? (
                         <span className="hover:underline">
                            {blog.tags[0]}
                         </span>
                      ) : 'General'}
                    </p>
                    <Link href={`/blogs/${blog.slug}`} className="block mt-2">
                      <p className="text-xl font-semibold text-gray-900">
                        {blog.title}
                      </p>
                      <p className="mt-3 text-base text-gray-500 line-clamp-3">
                         {/* Simple truncation for preview if description is missing. 
                             Ideally, use a summary field or strip HTML from content */}
                        {blog.seo_desc || "Read more about this topic..."}
                      </p>
                    </Link>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                       <span className="sr-only">Author</span>
                       {/* Placeholder for author image if added later */}
                    </div>
                    <div className="">
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <time dateTime={blog.createdAt.toISOString()}>
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500">
                <p>No blogs published yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
