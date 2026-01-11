'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const ServiceSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  slug: z.string().min(3, { message: 'Slug must be at least 3 characters.' })
         .regex(/^[a-z0-9-]+$/, { message: 'Slug can only contain lowercase letters, numbers, and dashes.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  features: z.string().optional(), // Comma separated list of features
  feature_image_url: z.string().optional(),
  seo_title: z.string().optional(),
  seo_desc: z.string().optional(),
  status: z.enum(['active', 'inactive']),
  order: z.coerce.number().int().default(0),
});

export type ServiceState = {
  errors?: {
    title?: string[];
    slug?: string[];
    description?: string[];
    features?: string[];
    feature_image_url?: string[];
    seo_title?: string[];
    seo_desc?: string[];
    status?: string[];
    order?: string[];
  };
  message?: string;
};

export async function createService(prevState: ServiceState, formData: FormData) {
  const validatedFields = ServiceSchema.safeParse({
    title: formData.get('title'),
    slug: formData.get('slug'),
    description: formData.get('description'),
    features: formData.get('features'),
    feature_image_url: formData.get('feature_image_url'),
    seo_title: formData.get('seo_title'),
    seo_desc: formData.get('seo_desc'),
    status: formData.get('status'),
    order: formData.get('order'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Service.',
    };
  }

  const { title, slug, description, features, feature_image_url, seo_title, seo_desc, status, order } = validatedFields.data;
  
  const featuresArray = features ? features.split(',').map(f => f.trim()).filter(f => f !== '') : [];

  try {
    await prisma.service.create({
      data: {
        title,
        slug,
        description,
        features: featuresArray, // Prisma handles Json type automatically
        feature_image_url,
        seo_title,
        seo_desc,
        status,
        order,
      },
    });
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Create Service. Slug might already be in use.',
    };
  }

  revalidatePath('/admin/services');
  revalidatePath('/services');
  redirect('/admin/services');
}
