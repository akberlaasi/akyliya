'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const ContactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
  page_source: z.string().optional(),
});

export type ContactState = {
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    message?: string[];
  };
  message?: string;
  success?: boolean;
};

export async function submitContactForm(prevState: ContactState, formData: FormData) {
  const validatedFields = ContactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message'),
    page_source: formData.get('page_source'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Submit Contact Form.',
      success: false,
    };
  }

  const { name, email, phone, message, page_source } = validatedFields.data;

  try {
    await prisma.form.create({
      data: {
        name,
        email,
        phone: phone || null,
        message,
        page_source: page_source || 'Contact Page',
      },
    });
    
    // In a real app, you would send an email here using Resend, SendGrid, etc.

    return {
      message: 'Message sent successfully!',
      success: true,
    };
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Submit Contact Form.',
      success: false,
    };
  }
}
