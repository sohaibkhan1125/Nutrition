import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const CustomContentSection = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    // Load content from Supabase on component mount
    loadContent();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('website_content_changes')
      .on('postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'website_content',
          filter: 'id=eq.1'
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          if (payload.new && payload.new.content !== undefined) {
            setContent(payload.new.content);
          }
        }
      )
      .subscribe();

    // Also listen for custom events from admin panel (same-tab updates)
    const handleContentUpdate = (event) => {
      if (event.detail && event.detail.content !== undefined) {
        setContent(event.detail.content);
      }
    };

    window.addEventListener('contentUpdated', handleContentUpdate);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('contentUpdated', handleContentUpdate);
    };
  }, []);

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from('website_content')
        .select('content')
        .eq('id', 1)
        .single();

      if (error) {
        // If no row exists yet, that's okay
        if (error.code === 'PGRST116') {
          console.log('No content found yet');
          setContent('');
          return;
        }
        throw error;
      }

      if (data) {
        setContent(data.content || '');
      }
    } catch (error) {
      console.error('Error loading content:', error);
    }
  };

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

