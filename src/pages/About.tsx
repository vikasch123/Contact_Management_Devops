import React from 'react';
import { Info } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-indigo-100 p-3 rounded-full">
          <Info className="h-8 w-8 text-indigo-600" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">About Contact Keeper</h1>
      <div className="space-y-4 text-gray-600">
        <p>
          Contact Keeper is a simple, intuitive application designed to help you manage your personal and professional contacts.
        </p>
        <p>
          This application was built with React and TypeScript, featuring a clean, modern UI with Tailwind CSS.
        </p>
        <p>
          <strong>Version:</strong> 1.0.0
        </p>
        <div className="pt-4 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Features</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Add, edit, and delete contacts</li>
            <li>Categorize contacts as personal or professional</li>
            <li>Filter contacts by name, email, or phone</li>
            <li>Responsive design for all devices</li>
            <li>Data persistence using local storage</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;