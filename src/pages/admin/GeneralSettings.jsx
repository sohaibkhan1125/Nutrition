import React, { useState, useEffect } from 'react';

const GeneralSettings = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load maintenance mode state from localStorage on component mount
  useEffect(() => {
    const savedMode = localStorage.getItem('maintenanceMode');
    if (savedMode === 'on') {
      setMaintenanceMode(true);
    } else {
      setMaintenanceMode(false);
    }
  }, []);

  const handleToggleChange = (e) => {
    setMaintenanceMode(e.target.checked);
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      if (maintenanceMode) {
        localStorage.setItem('maintenanceMode', 'on');
      } else {
        localStorage.setItem('maintenanceMode', 'off');
      }
      
      // Simulate a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Show success message (you could add a toast notification here)
      console.log('Settings saved successfully!');
      
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">General Settings</h1>
        <p className="text-sm sm:text-base text-gray-600">Manage your website's general configuration settings.</p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Maintenance Mode Toggle */}
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1 mb-3 sm:mb-0">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                Website Maintenance Mode
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                When enabled, visitors will see a maintenance page instead of the normal website content.
              </p>
            </div>
            
            <div className="sm:ml-6">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={maintenanceMode}
                  onChange={handleToggleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
          
          {maintenanceMode && (
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-xs sm:text-sm text-yellow-800 font-medium">
                  Maintenance mode is currently active. Visitors will see the maintenance page.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium rounded-lg shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </div>
            ) : (
              'Save Settings'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
