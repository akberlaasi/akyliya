import BlogForm from '@/components/forms/BlogForm';

export default function NewBlogPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Blog Post</h1>
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <BlogForm />
      </div>
    </div>
  );
}
