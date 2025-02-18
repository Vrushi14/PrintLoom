import React from 'react';
import { Printer, Upload, Clock, Shield, FileText, Users, Settings, Bell } from 'lucide-react';

export const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-cover bg-center" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80")',
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-60">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-white text-center">
              <h1 className="text-5xl font-bold mb-4">About PrintLoom</h1>
              <p className="text-2xl">Revolutionizing campus printing with smart technology</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            PrintLoom aims to transform the campus printing experience by providing an efficient, 
            user-friendly, and sustainable printing solution. We understand the challenges students 
            and faculty face with traditional printing systems, which is why we've developed a 
            comprehensive platform that makes printing seamless and hassle-free.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Printer />}
              title="Smart Printing"
              description="Advanced printing options with support for various formats"
            />
            <FeatureCard
              icon={<Upload />}
              title="Easy Upload"
              description="Simple drag-and-drop interface for file uploads"
            />
            <FeatureCard
              icon={<Clock />}
              title="Queue Management"
              description="Efficient handling of print jobs with real-time status"
            />
            <FeatureCard
              icon={<Shield />}
              title="Secure Access"
              description="Protected printing environment with user authentication"
            />
            <FeatureCard
              icon={<FileText />}
              title="Document Management"
              description="Organize and track your printing history"
            />
            <FeatureCard
              icon={<Users />}
              title="Multi-user Support"
              description="Different access levels for students and faculty"
            />
            <FeatureCard
              icon={<Settings />}
              title="Print Settings"
              description="Customizable options for all your printing needs"
            />
            <FeatureCard
              icon={<Bell />}
              title="Notifications"
              description="Real-time alerts for print job status"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
      <div className="text-blue-600">{icon}</div>
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);