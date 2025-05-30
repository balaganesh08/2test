/**
 * MainLayout - The primary layout component for the application
 * Following the Single Responsibility Principle - this component only handles layout structure
 * Compatible with Next.js App Router
 */
'use client';

import React from 'react';
import Header from '@/components/ApplicationHeader';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header breadcrumbs={[{ label: 'Home' }]} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="py-6 bg-white border-t">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} GreenFortune. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

// Note: With App Router, metadata is now handled in layout.tsx files
// rather than using the Head component from next/head
