import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

async function getBlog(slug: string) {
  const blog = await prisma.blog.findUnique({
    where: { slug },
  });
  return blog;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: 'Blog Not Found',
    };
  }

  return {
    title: blog.seo_title || blog.title,
    description: blog.seo_desc || `Read about ${blog.title}`,
    openGraph: {
        title: blog.seo_title || blog.title,
        description: blog.seo_desc || `Read about ${blog.title}`,
        type: 'article',
        publishedTime: blog.createdAt.toISOString(),
        authors: ['Akyliya Team'], 
    }
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog || blog.status !== 'publish') {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-10 text-center">
         {blog.tags && blog.tags.length > 0 && (
             <div className="flex justify-center gap-2 mb-4">
                 {blog.tags.map(tag => (
                     <span key={tag} className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                         {tag}
                     </span>
                 ))}
             </div>
         )}
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">{blog.title}</h1>
        <div className="mt-4 text-gray-500">
           Published on {new Date(blog.createdAt).toLocaleDateString()}
        </div>
      </header>
      
      {/* 
        In a real application, you would use a library like 'dompurify' or 'rehype' 
        to sanitize and render the rich text content safely. 
        For now, we will render it as is, assuming trusted admin input.
      */}
      <div 
        className="prose prose-blue prose-lg mx-auto"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
}
