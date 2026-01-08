import React, { useState, useEffect } from 'react';

const TitleManagement = () => {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load title from localStorage on component mount
  useEffect(() => {
    const savedTitle = localStorage.getItem('websiteTitle') || 'Panda Express Nutrition Calculator';
    setTitle(savedTitle);
  }, []);

  const handleSave = async () => {
    setIsLoading(true);

    try {
      // Save to localStorage
      localStorage.setItem('websiteTitle', title);

      // Update document title immediately
      document.title = title || 'Panda Express Nutrition Calculator';

      // Simulate a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
      console.error('Error saving title:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Website Title Management</h1>
        <p className="text-sm sm:text-base text-gray-600">Update the website title that appears in the browser tab, navbar, and footer.</p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Title Input */}
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
          <label htmlFor="website-title" className="block text-sm font-medium text-gray-700 mb-2">
            Website Title
          </label>
          <input
            id="website-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Panda Express Nutrition Calculator"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-500 text-sm sm:text-base"
          />
          <p className="text-xs text-gray-500 mt-2">
            This title will appear in the browser tab, main navigation, and footer.
          </p>
        </div>

        {/* Current Title Preview */}
        <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-200">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">Preview</h3>
          <div className="text-xs sm:text-sm text-blue-700 space-y-1">
            <p><strong>Browser Tab:</strong> {title || 'Panda Express Nutrition Calculator'}</p>
            <p><strong>Navbar Title:</strong> {title || 'Panda Express Nutrition Calculator'}</p>
            <p><strong>Footer Title:</strong> {title || 'Panda Express Nutrition Calculator'}</p>
          </div>
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
              'Save Title'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TitleManagement;
