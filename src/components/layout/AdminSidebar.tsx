'use client';

import Link from 'next/link';
import { LayoutDashboard, FileText, Briefcase, MessageSquare, Settings, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Blogs', href: '/admin/blogs', icon: FileText },
  { name: 'Services', href: '/admin/services', icon: Briefcase },
  { name: 'Form Submissions', href: '/admin/forms', icon: MessageSquare },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-gray-900 h-screen fixed">
      <div className="flex items-center justify-center h-16 bg-gray-900 border-b border-gray-800">
        <span className="text-white text-xl font-bold">Akyliya Admin</span>
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                )}
              >
                <item.icon
                  className={clsx(
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-white',
                    'mr-3 flex-shrink-0 h-6 w-6'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex-shrink-0 flex bg-gray-800 p-4">
        <Link href="/" className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <div>
                <LogOut className="inline-block h-5 w-5 text-gray-400 group-hover:text-gray-300" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white group-hover:text-gray-200">
                  Back to Site
                </p>
              </div>
            </div>
        </Link>
      </div>
    </div>
  );
}
