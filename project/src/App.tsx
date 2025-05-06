import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FileText, PieChart, TrendingUp, ShieldAlert, Home } from 'lucide-react';
import FraudDetection from './components/FraudDetection';

function  
          </div>
        </nav>

        <
}

function HomePage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome to SmartBank Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       
        <FeatureCard
          icon={<ShieldAlert className="w-8 h-8" />}
          title="Fraud Detection"
          description="Advanced suspicious transaction detection"
          link="/fraud"
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, link }: { icon: React.ReactNode, title: string, description: string, link: string }) {
  return (
    <Link to={link} className="block">
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="text-indigo-600 mb-4">{icon}</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}

export default App;