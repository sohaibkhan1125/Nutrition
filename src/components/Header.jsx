import React, { useState, useEffect, useCallback } from 'react';

const DEFAULT_HERO_TITLE = 'NutriTrack';
const DEFAULT_HERO_DESCRIPTION =
  'Your smart nutrition companion. Discover detailed nutritional facts, track calories, and make healthier dining choices with our comprehensive database.';

const Header = ({ searchTerm, onSearchChange }) => {
  const [heroContent, setHeroContent] = useState({
    title: DEFAULT_HERO_TITLE,
    description: DEFAULT_HERO_DESCRIPTION
  });

  const loadHeroContent = useCallback(() => {
    const storedHeroTitle = localStorage.getItem('heroTitle');
    const storedHeroDescription = localStorage.getItem('heroDescription');
    const websiteTitle = localStorage.getItem('websiteTitle') || DEFAULT_HERO_TITLE;

    setHeroContent({
      title: storedHeroTitle && storedHeroTitle.trim() ? storedHeroTitle : websiteTitle,
      description:
        storedHeroDescription && storedHeroDescription.trim()
          ? storedHeroDescription
          : DEFAULT_HERO_DESCRIPTION
    });
  }, []);

  useEffect(() => {
    loadHeroContent();

    const handleHeroUpdate = (event) => {
      const { title, description } = event.detail || {};
      setHeroContent({
        title: title && title.trim() ? title : localStorage.getItem('websiteTitle') || DEFAULT_HERO_TITLE,
        description:
          description && description.trim() ? description : DEFAULT_HERO_DESCRIPTION
      });
    };

    const handleStorageChange = (event) => {
      if (!event || ['heroTitle', 'heroDescription', 'websiteTitle'].includes(event.key)) {
        loadHeroContent();
      }
    };

    const interval = setInterval(loadHeroContent, 1000);

    window.addEventListener('heroContentUpdated', handleHeroUpdate);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('heroContentUpdated', handleHeroUpdate);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [loadHeroContent]);

  return (
    <header className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-6 sm:py-8 md:py-12 px-4 relative overflow-hidden" role="banner">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <div className="inline-block bg-white bg-opacity-20 rounded-full p-2 sm:p-3 mb-4 sm:mb-6" aria-hidden="true">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent leading-tight">
            {heroContent.title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-red-100 max-w-4xl mx-auto leading-relaxed px-2">
            {heroContent.description}
          </p>
        </div>

        <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-3xl mx-auto">
          <label htmlFor="search-dishes" className="sr-only">Search dishes</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              id="search-dishes"
              type="search"
              placeholder="Search dishes, categories, or allergens..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 sm:pr-6 py-3 sm:py-4 text-sm sm:text-base md:text-lg text-gray-900 placeholder-gray-500 rounded-xl sm:rounded-2xl border-0 focus:ring-2 sm:focus:ring-4 focus:ring-white focus:ring-opacity-30 focus:outline-none shadow-xl sm:shadow-2xl bg-white bg-opacity-95 backdrop-blur-sm"
              aria-label="Search dishes by name, category, or allergens"
              autoComplete="off"
            />
            <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center">
              <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full hidden sm:block" aria-hidden="true">
                {searchTerm.length > 0 ? `${searchTerm.length}` : 'Search'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
