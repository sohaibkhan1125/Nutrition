import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from './Sidebar';
import GeneralSettings from './GeneralSettings';
import TitleManagement from './TitleManagement';
import FooterManagement from './FooterManagement';
import ContentManagement from './ContentManagement';
import HeroManagement from './HeroManagement';

const Dashboard = () => {
  const [activeOption, setActiveOption] = useState('general-settings');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeOption) {
      case 'general-settings':
        return <GeneralSettings />;
      case 'title-management':
        return <TitleManagement />;
      case 'footer-management':
        return <FooterManagement />;
      case 'hero-management':
        return <HeroManagement />;
      case 'content-management':
        return <ContentManagement />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        activeOption={activeOption} 
        setActiveOption={setActiveOption}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-full lg:max-w-none">
            {renderContent()}
          </div>
        </main>
      </div>
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-30 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
