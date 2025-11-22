import React, { useState, useEffect } from 'react';

const CustomContentSection = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    // Load content from localStorage on component mount
    const loadContent = () => {
      const savedContent = localStorage.getItem('customContent');
      if (savedContent) {
        setContent(savedContent);
      } else {
        setContent('');
      }
    };

    loadContent();

    // Listen for content updates from admin panel
    const handleContentUpdate = (event) => {
      if (event.detail && event.detail.content !== undefined) {
        setContent(event.detail.content);
      }
    };

    // Listen for storage changes (cross-tab updates)
    const handleStorageChange = (e) => {
      if (e.key === 'customContent') {
        const newContent = e.newValue || '';
        setContent(newContent);
      }
    };

    window.addEventListener('contentUpdated', handleContentUpdate);
    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically in case localStorage is updated from same tab
    const interval = setInterval(() => {
      const currentContent = localStorage.getItem('customContent') || '';
      if (currentContent !== content) {
        setContent(currentContent);
      }
    }, 1000);

    return () => {
      window.removeEventListener('contentUpdated', handleContentUpdate);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [content]);

  // Don't render anything if no content
  if (!content || content.trim() === '') {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
};

export default CustomContentSection;
