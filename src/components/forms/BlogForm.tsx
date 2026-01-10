'use client';

import { useActionState } from 'react';
import { createBlog, BlogState } from '@/actions/blog';
import clsx from 'clsx';
import Link from 'next/link';

export default function BlogForm() {
  const initialState: BlogState = { message: '', errors: {} };
  const [state, formAction, isPending] = useActionState(createBlog, initialState);

  return (
    <form action={formAction} className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            
            {/* Title */}
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                />
              </div>
              {state.errors?.title && (
                <p className="mt-2 text-sm text-red-600">{state.errors.title.join(', ')}</p>
              )}
            </div>

            {/* Slug */}
            <div className="sm:col-span-4">
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                Slug
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="slug"
                  id="slug"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                  placeholder="my-blog-post-slug"
                />
              </div>
              {state.errors?.slug && (
                <p className="mt-2 text-sm text-red-600">{state.errors.slug.join(', ')}</p>
              )}
            </div>

            {/* Status */}
            <div className="sm:col-span-3">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <div className="mt-1">
                <select
                  id="status"
                  name="status"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                >
                  <option value="draft">Draft</option>
                  <option value="publish">Publish</option>
                </select>
              </div>
            </div>

            {/* Tags */}
            <div className="sm:col-span-6">
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                Tags (comma separated)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="tags"
                  id="tags"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                  placeholder="React, Next.js, SEO"
                />
              </div>
            </div>

            {/* Content (Rich Text placeholder) */}
            <div className="sm:col-span-6">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content (HTML allowed)
              </label>
              <div className="mt-1">
                <textarea
                  id="content"
                  name="content"
                  rows={10}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                For a real app, integrate a rich text editor like Tiptap or Quill here.
              </p>
              {state.errors?.content && (
                <p className="mt-2 text-sm text-red-600">{state.errors.content.join(', ')}</p>
              )}
            </div>

            {/* SEO Section */}
            <div className="sm:col-span-6 pt-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">SEO Settings</h3>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="seo_title" className="block text-sm font-medium text-gray-700">
                SEO Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="seo_title"
                  id="seo_title"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="seo_description" className="block text-sm font-medium text-gray-700">
                SEO Description
              </label>
              <div className="mt-1">
                <textarea
                  id="seo_description"
                  name="seo_description"
                  rows={3}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="pt-5">
        {state.message && (
             <div className="rounded-md bg-red-50 p-4 mb-4">
                 <div className="flex">
                     <div className="ml-3">
                         <h3 className="text-sm font-medium text-red-800">{state.message}</h3>
                     </div>
                 </div>
             </div>
        )}
        <div className="flex justify-end">
          <Link
            href="/admin/blogs"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className={clsx(
                "ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                isPending && "opacity-50 cursor-not-allowed"
            )}
          >
            {isPending ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </form>
  );
}
