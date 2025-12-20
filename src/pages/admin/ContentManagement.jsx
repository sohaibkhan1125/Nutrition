import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import QuillEditor from '../../components/QuillEditor';

const ContentManagement = () => {
	const [content, setContent] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		loadContent();
	}, []);

	const loadContent = async () => {
		try {
			// Using channel to listen for realtime updates if needed, 
			// but for now just fetching initial state.
			const { data, error } = await supabase
				.from('website_content')
				.select('content')
				.eq('id', 1)
				.single();

			if (error) {
				if (error.code === 'PGRST116') {
					console.log('No content found yet, starting with empty content');
					setContent('');
				} else {
					throw error;
				}
			} else if (data) {
				setContent(data.content || '');
			}
		} catch (error) {
			console.error('Error loading content:', error);
			setError('Failed to load content: ' + error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleSave = async (newContent) => {
		// This function is called by QuillEditor's Save button
		try {
			const { error } = await supabase
				.from('website_content')
				.upsert({
					id: 1,
					slug: 'homepage',
					content: newContent,
					updated_at: new Date().toISOString()
				}, {
					onConflict: 'id'
				});

			if (error) {
				throw error;
			}

			// Dispatch event for real-time UI updates mostly for other components listening
			window.dispatchEvent(new CustomEvent('contentUpdated', { detail: { content: newContent } }));

		} catch (error) {
			console.error('Error saving content:', error);
			throw error; // Re-throw to let QuillEditor handle the error toast
		}
	};

	if (loading) {
		return <div className="p-6 text-center text-gray-500">Loading editor content...</div>;
	}

	return (
		<div className="bg-white rounded-lg shadow-lg p-6">
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-gray-900 mb-2">Content Management</h2>
				<p className="text-gray-600">Create and manage content that will be displayed above the FAQ section on your website.</p>
			</div>

			{error && (
				<div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
					{error}
				</div>
			)}

			<div className="main-container">
				{/* Render QuillEditor only after loading is done to ensure initialContent is correct */}
				<QuillEditor
					initialContent={content}
					onSave={handleSave}
				/>
			</div>
		</div>
	);
};

export default ContentManagement;


