import React, { useState, useEffect } from 'react';
import SocialIcons from './SocialIcons';

const Footer = () => {
  const [title, setTitle] = useState('NutriTrack');
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    // Load title from localStorage
    const savedTitle = localStorage.getItem('websiteTitle') || 'NutriTrack';
    setTitle(savedTitle);

    // Load social links from localStorage
    const savedLinks = localStorage.getItem('footerLinks');
    if (savedLinks) {
      try {
        setSocialLinks(JSON.parse(savedLinks));
      } catch (error) {
        console.error('Error parsing saved social links:', error);
      }
    }

    // Listen for storage changes
    const handleStorageChange = () => {
      const newTitle = localStorage.getItem('websiteTitle') || 'NutriTrack';
      setTitle(newTitle);

      const newLinks = localStorage.getItem('footerLinks');
      if (newLinks) {
        try {
          setSocialLinks(JSON.parse(newLinks));
        } catch (error) {
          console.error('Error parsing saved social links:', error);
        }
      } else {
        setSocialLinks([]);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically in case localStorage is updated from same tab
    const interval = setInterval(() => {
      const currentTitle = localStorage.getItem('websiteTitle') || 'NutriTrack';
      if (currentTitle !== title) {
        setTitle(currentTitle);
      }

      const currentLinks = localStorage.getItem('footerLinks');
      if (currentLinks) {
        try {
          const parsedLinks = JSON.parse(currentLinks);
          if (JSON.stringify(parsedLinks) !== JSON.stringify(socialLinks)) {
            setSocialLinks(parsedLinks);
          }
        } catch (error) {
          console.error('Error parsing saved social links:', error);
        }
      } else if (socialLinks.length > 0) {
        setSocialLinks([]);
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [title, socialLinks]);

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold">{title}</h3>
            </div>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              Your smart nutrition companion for Chinese cuisine. Discover detailed nutritional facts, track calories, and make healthier dining choices with our comprehensive database.
            </p>
            <SocialIcons links={socialLinks} />
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#chicken" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Chicken Dishes
                </a>
              </li>
              <li>
                <a href="#beef" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Beef Dishes
                </a>
              </li>
              <li>
                <a href="#seafood" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Seafood
                </a>
              </li>
              <li>
                <a href="#vegetables" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Vegetables
                </a>
              </li>
              <li>
                <a href="#sides" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Sides & Rice
                </a>
              </li>
              <li>
                <a href="#appetizers" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Appetizers
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Categories</h4>
            <ul className="space-y-3">
              <li>
                <a href="#beverages" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Beverages
                </a>
              </li>
              <li>
                <a href="#soup" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Soup
                </a>
              </li>
              <li>
                <a href="#cub-meals" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Cub Meals
                </a>
              </li>
              <li>
                <a href="#chicken-breast" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Chicken Breast
                </a>
              </li>
              <li>
                <a href="#specialty" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Specialty Items
                </a>
              </li>
              <li>
                <a href="#allergens" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Allergen Info
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact & Info</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <svg className="w-4 h-4 text-red-400 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                <p className="text-gray-300 text-sm">
                  Find Panda Express locations nationwide
                </p>
              </div>
              <div className="flex items-start">
                <svg className="w-4 h-4 text-red-400 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
                <p className="text-gray-300 text-sm">
                  Nutrition data updated regularly
                </p>
              </div>
              <div className="flex items-start">
                <svg className="w-4 h-4 text-red-400 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0-3.172-2.556-5.75-5.75-5.75a5.75 5.75 0 00-5.75 5.75c0 3.172 2.556 5.75 5.75 5.75s5.75-2.578 5.75-5.75zM10 7a3 3 0 100 6 3 3 0 000-6z" clipRule="evenodd"/>
                </svg>
                <p className="text-gray-300 text-sm">
                  Mobile-friendly design
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2025 {title}. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-400">
              <a href="#privacy" className="hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#disclaimer" className="hover:text-white transition-colors duration-200">
                Disclaimer
              </a>
              <a href="#contact" className="hover:text-white transition-colors duration-200">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
