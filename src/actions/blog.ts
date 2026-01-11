'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const BlogSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  slug: z.string().min(3, { message: 'Slug must be at least 3 characters.' })
         .regex(/^[a-z0-9-]+$/, { message: 'Slug can only contain lowercase letters, numbers, and dashes.' }),
  content: z.string().min(10, { message: 'Content must be at least 10 characters.' }),
  feature_image_url: z.string().optional(),
  seo_title: z.string().optional(),
  seo_desc: z.string().optional(),
  status: z.enum(['draft', 'publish']),
  tags: z.string().optional(), // We'll parse this from a comma-separated string
});

export type BlogState = {
  errors?: {
    title?: string[];
    slug?: string[];
    content?: string[];
    feature_image_url?: string[];
    seo_title?: string[];
    seo_desc?: string[];
    status?: string[];
    tags?: string[];
  };
  message?: string;
};

export async function createBlog(prevState: BlogState, formData: FormData) {
  const validatedFields = BlogSchema.safeParse({
    title: formData.get('title'),
    slug: formData.get('slug'),
    content: formData.get('content'),
    feature_image_url: formData.get('feature_image_url'),
    seo_title: formData.get('seo_title'),
    seo_desc: formData.get('seo_desc'),
    status: formData.get('status'),
    tags: formData.get('tags'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Blog.',
    };
  }

  const { title, slug, content, feature_image_url, seo_title, seo_desc, status, tags } = validatedFields.data;
  
  const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') : [];

  try {
    await prisma.blog.create({
      data: {
        title,
        slug,
        content,
        feature_image_url,
        seo_title,
        seo_desc,
        status,
        tags: tagsArray,
      },
    });
  } catch (error) {
    console.error('Database Error:', error);
    // Basic error handling for unique constraint violation on slug
    return {
      message: 'Database Error: Failed to Create Blog. Slug might already be in use.',
    };
  }

  revalidatePath('/admin/blogs');
  revalidatePath('/blogs');
  redirect('/admin/blogs');
}
