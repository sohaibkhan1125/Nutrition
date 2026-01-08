import React, { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import SEO from './components/SEO';
import NutritionTable from './components/NutritionTable';
import Footer from './components/Footer';
import CustomContentSection from './components/CustomContentSection';
import ProtectedRoute from './components/ProtectedRoute';
import { nutritionData, categories } from './data/nutritionData';

// Lazy load pages for better performance
const Login = lazy(() => import('./pages/admin/Login'));
const Signup = lazy(() => import('./pages/admin/Signup'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));

// Maintenance Page Component
function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-yellow-100 to-yellow-200 mb-6">
            <svg className="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Website Under Maintenance
          </h1>

          <p className="text-gray-600 mb-6">
            We're currently performing scheduled maintenance to improve your experience.
            Please check back soon.
          </p>

          <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
            <p className="text-sm text-red-800">
              <strong>NutriTrack</strong> will be back online shortly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Nutrition Calculator Component
function NutritionCalculator() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

  // Filter data based on search term and selected category
  const filteredData = useMemo(() => {
    let filtered = nutritionData;

    // Filter by category
    if (selectedCategory !== 'All' && selectedCategory !== 'All Allergens') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower) ||
        item.allergens.toLowerCase().includes(searchLower)
      );
    }

    // Special handling for "All Allergens" filter
    if (selectedCategory === 'All Allergens') {
      filtered = filtered.filter(item => item.allergens !== 'None');
    }

    return filtered;
  }, [searchTerm, selectedCategory]);

  // Check for maintenance mode on component mount
  useEffect(() => {
    const checkMaintenanceMode = () => {
      const maintenanceMode = localStorage.getItem('maintenanceMode');
      setIsMaintenanceMode(maintenanceMode === 'on');
    };

    checkMaintenanceMode();

    // Listen for storage changes (when admin updates maintenance mode)
    const handleStorageChange = (e) => {
      if (e.key === 'maintenanceMode') {
        setIsMaintenanceMode(e.newValue === 'on');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also check periodically in case localStorage is updated from same tab
    const interval = setInterval(checkMaintenanceMode, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // If maintenance mode is on, show maintenance page
  if (isMaintenanceMode) {
    return <MaintenancePage />;
  }

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleClearAll = () => {
    setSearchTerm('');
    setSelectedCategory('All');
  };

  const noResults = filteredData.length === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Smart Chinese Cuisine Nutrition Calculator"
        description="Your smart nutrition companion for Chinese cuisine. Discover detailed nutritional facts, track calories, and make healthier dining choices with our comprehensive database."
        keywords="chinese cuisine nutrition, chinese food calories, chinese menu, nutrition facts, food calculator, restaurant nutrition, chinese food nutrition, chinese food allergens, healthy eating, nutrition tracker"
        canonical="https://panda-express-nutrition.com/"
      />
      <Header
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        onClearAll={handleClearAll}
      />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8" role="main" aria-label="Nutrition Information">
        <header className="mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 sm:mb-6">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Complete Nutrition Information
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Comprehensive nutritional breakdown with calories, protein, carbohydrates, total fat, sugars, and allergen information for all menu items. Make informed dining choices with our detailed nutrition calculator.
              </p>
            </div>
            <div className="lg:mt-0">
              <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-3 sm:p-4 border border-red-200">
                <div className="text-xs sm:text-sm font-semibold text-red-800 mb-1">
                  Results Summary
                </div>
                <div className="text-base sm:text-lg font-bold text-red-600">
                  {filteredData.length} of {nutritionData.length} dishes
                </div>
              </div>
            </div>
          </div>
        </header>

        <div>
          {(searchTerm || selectedCategory !== 'All') && (
            <div className="flex flex-wrap gap-2 mb-4">
              {searchTerm && (
                <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-800">
                  Search: "{searchTerm.length > 20 ? searchTerm.substring(0, 20) + '...' : searchTerm}"
                  <button
                    onClick={() => setSearchTerm('')}
                    className="ml-1 sm:ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-red-100 text-red-800">
                  Category: {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="ml-1 sm:ml-2 text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Nutritional Legend */}
        <section className="mb-4 sm:mb-6 bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200" aria-labelledby="nutrition-guide">
          <h2 id="nutrition-guide" className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">Nutritional Values Guide</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-100 rounded-full border-2 border-red-600 flex-shrink-0"></div>
              <span className="text-xs text-gray-600">Calories</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-100 rounded-full border-2 border-blue-600 flex-shrink-0"></div>
              <span className="text-xs text-gray-600">Protein</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-orange-100 rounded-full border-2 border-orange-600 flex-shrink-0"></div>
              <span className="text-xs text-gray-600">Carbs</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-purple-100 rounded-full border-2 border-purple-600 flex-shrink-0"></div>
              <span className="text-xs text-gray-600">Fat</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-100 rounded-full border-2 border-yellow-600 flex-shrink-0"></div>
              <span className="text-xs text-gray-600">Sugars</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-100 rounded-full border-2 border-green-600 flex-shrink-0"></div>
              <span className="text-xs text-gray-600">No Allergens</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-100 rounded-full border-2 border-gray-600 flex-shrink-0"></div>
              <span className="text-xs text-gray-600">Not Specified</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-100 rounded-full border-2 border-red-600 flex-shrink-0"></div>
              <span className="text-xs text-gray-600">Allergens</span>
            </div>
          </div>
        </section>

        <NutritionTable
          data={filteredData}
          noResults={noResults}
        />
      </main>

      <CustomContentSection />

      <Footer />
    </div>
  );
}

// Main App Component with Router
function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        }>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/signup" element={<Signup />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Main App Route */}
            <Route path="/" element={<NutritionCalculator />} />

            {/* Redirect any unmatched routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
