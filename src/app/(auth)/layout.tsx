import { Mail, UserCheck2 } from 'lucide-react';
import type React from 'react';
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // return
  return (
    <div className="h-screen w-screen bg-background flex flex-row">
      {/* Left Panel - Auth Forms */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        {children}
      </div>

      {/* Right Panel - Illustration */}
      <div
        className="hidden lg:flex flex-1 items-center justify-center"
        style={{
          background:
            'linear-gradient(135deg, #111827 0%, #374151 50%, #000000 100%)',
        }}
      >
        <div className="h-full flex items-center justify-center p-8 relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-80 h-80 bg-gradient-to-br from-gray-800 to-black rounded-3xl shadow-2xl flex items-center justify-center transform rotate-12 hover:rotate-6 transition-transform duration-500">
              <div className="w-64 h-64 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl shadow-inner flex items-center justify-center">
                <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <UserCheck2 className="w-16 h-16 text-black" />
                </div>
              </div>
            </div>
          </div>

          {/* Background Elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-10 w-24 h-24 bg-white/20 rounded-full blur-lg"></div>
        </div>
      </div>
    </div>
  );
}
