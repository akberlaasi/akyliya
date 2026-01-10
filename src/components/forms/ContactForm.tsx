'use client';

import { useActionState } from 'react';
import { submitContactForm, ContactState } from '@/actions/contact';
import clsx from 'clsx';

export default function ContactForm() {
  const initialState: ContactState = { message: '', errors: {} };
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  return (
    <form action={formAction} className="grid grid-cols-1 gap-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md border"
            placeholder="Your Name"
          />
        </div>
        {state.errors?.name && (
          <p className="mt-2 text-sm text-red-600" id="name-error">
            {state.errors.name.join(', ')}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md border"
            placeholder="you@example.com"
          />
        </div>
        {state.errors?.email && (
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {state.errors.email.join(', ')}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="phone"
            id="phone"
            autoComplete="tel"
            className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md border"
            placeholder="+1 (555) 987-6543"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <div className="mt-1">
          <textarea
            id="message"
            name="message"
            rows={4}
            className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md border"
            placeholder="How can we help you?"
          />
        </div>
        {state.errors?.message && (
          <p className="mt-2 text-sm text-red-600" id="message-error">
            {state.errors.message.join(', ')}
          </p>
        )}
      </div>

      <input type="hidden" name="page_source" value="Contact Page" />

      <div>
        <button
          type="submit"
          disabled={isPending}
          className={clsx(
            "w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors",
            isPending && "opacity-50 cursor-not-allowed"
          )}
        >
          {isPending ? 'Sending...' : 'Send Message'}
        </button>
      </div>
      
      {state.message && (
        <div className={clsx("rounded-md p-4", state.success ? "bg-green-50" : "bg-red-50")}>
          <div className="flex">
            <div className="ml-3">
              <p className={clsx("text-sm font-medium", state.success ? "text-green-800" : "text-red-800")}>
                {state.message}
              </p>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
