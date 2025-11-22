import React from 'react';

const Sidebar = ({ activeOption, setActiveOption, sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { id: 'general-settings', label: 'General Settings', icon: '⚙️' },
    { id: 'title-management', label: 'Title Management', icon: '📝' },
    { id: 'hero-management', label: 'Hero Section Management', icon: '🌟' },
    { id: 'footer-management', label: 'Footer Management', icon: '🔗' },
    { id: 'content-management', label: 'Content Management', icon: '📄' }
  ];

  return (
    <aside className={`
      fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0 lg:static lg:w-64 lg:shadow-md
    `}>
      <div className="p-4 h-full overflow-y-auto">
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 text-gray-600 hover:text-gray-800 rounded-md hover:bg-gray-100"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Desktop Header */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4 hidden lg:block">Admin Panel</h2>
        
        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveOption(item.id);
                setSidebarOpen(false); // Close mobile menu on selection
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activeOption === item.id
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
