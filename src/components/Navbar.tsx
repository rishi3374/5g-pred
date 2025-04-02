
import React from 'react';
import { Link } from 'react-router-dom';
import { Radio, WifiIcon, BarChart3, Layers, Settings } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center space-x-2">
          <Radio className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">5G Coverage Predictor</span>
        </div>
        
        <div className="hidden md:flex space-x-8">
          <NavLink to="/" icon={<WifiIcon className="h-4 w-4 mr-2" />} text="Dashboard" />
          <NavLink to="/model-comparison" icon={<BarChart3 className="h-4 w-4 mr-2" />} text="Model Comparison" />
          <NavLink to="/features" icon={<Layers className="h-4 w-4 mr-2" />} text="Features" />
          <NavLink to="/settings" icon={<Settings className="h-4 w-4 mr-2" />} text="Settings" />
        </div>
        
        <div className="md:hidden">
          <button className="p-2 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) => (
  <Link to={to} className="flex items-center text-gray-700 hover:text-primary transition-colors">
    {icon}
    <span>{text}</span>
  </Link>
);

export default Navbar;
