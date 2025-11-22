import React, { useState, useEffect, useCallback } from 'react';

const DEFAULT_HERO_TITLE = 'NutriTrack';
const DEFAULT_HERO_DESCRIPTION =
	'Your smart nutrition companion for Chinese cuisine. Discover detailed nutritional facts, track calories, and make healthier dining choices with our comprehensive database.';

const HeroManagement = () => {
	const [title, setTitle] = useState(DEFAULT_HERO_TITLE);
	const [description, setDescription] = useState(DEFAULT_HERO_DESCRIPTION);
	const [isSaving, setIsSaving] = useState(false);
	const [successMessage, setSuccessMessage] = useState(null);

	const loadHeroContent = useCallback(() => {
		const storedTitle = localStorage.getItem('heroTitle');
		const storedDescription = localStorage.getItem('heroDescription');
		const fallbackTitle = localStorage.getItem('websiteTitle') || DEFAULT_HERO_TITLE;

		setTitle(storedTitle && storedTitle.trim() ? storedTitle : fallbackTitle);
		setDescription(
			storedDescription && storedDescription.trim() ? storedDescription : DEFAULT_HERO_DESCRIPTION
		);
	}, []);

	useEffect(() => {
		loadHeroContent();
	}, [loadHeroContent]);

	const persistHeroContent = (heroTitle, heroDescription) => {
		if (heroTitle && heroTitle.trim()) {
			localStorage.setItem('heroTitle', heroTitle);
		} else {
			localStorage.removeItem('heroTitle');
		}

		if (heroDescription && heroDescription.trim()) {
			localStorage.setItem('heroDescription', heroDescription);
		} else {
			localStorage.removeItem('heroDescription');
		}

		const payload = {
			title: heroTitle && heroTitle.trim() ? heroTitle : localStorage.getItem('websiteTitle') || DEFAULT_HERO_TITLE,
			description: heroDescription && heroDescription.trim() ? heroDescription : DEFAULT_HERO_DESCRIPTION
		};

		window.dispatchEvent(new CustomEvent('heroContentUpdated', { detail: payload }));
		window.dispatchEvent(new Event('storage'));
	};

	const handleSave = async () => {
		setIsSaving(true);
		setSuccessMessage(null);

		try {
			const normalizedTitle = title.trim();
			const normalizedDescription = description.trim();

			persistHeroContent(normalizedTitle, normalizedDescription);

			await new Promise((resolve) => setTimeout(resolve, 300));
			setSuccessMessage('Hero section updated successfully!');
			setTimeout(() => setSuccessMessage(null), 2500);
		} catch (error) {
			console.error('Error saving hero section:', error);
		} finally {
			setIsSaving(false);
		}
	};

	const handleResetToSaved = () => {
		loadHeroContent();
		setSuccessMessage(null);
	};

	const handleResetToDefaults = () => {
		setTitle(DEFAULT_HERO_TITLE);
		setDescription(DEFAULT_HERO_DESCRIPTION);
		setSuccessMessage(null);
	};

	return (
		<div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
			<div className="mb-4 sm:mb-6">
				<h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Hero Section Management</h1>
				<p className="text-sm sm:text-base text-gray-600">
					Update the hero section title and description that appear at the top of the website.
				</p>
			</div>

			{successMessage && (
				<div className="mb-4 sm:mb-6 bg-green-50 border border-green-200 text-green-700 px-3 sm:px-4 py-3 rounded-lg text-sm sm:text-base">
					{successMessage}
				</div>
			)}

			<div className="space-y-4 sm:space-y-6">
				<div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
					<label htmlFor="hero-title" className="block text-sm font-medium text-gray-700 mb-2">
						Hero Title
					</label>
					<input
						id="hero-title"
						type="text"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
						placeholder="Enter hero section title"
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base text-gray-900 placeholder-gray-500"
					/>
					<p className="text-xs text-gray-500 mt-2">
						This controls the main heading text displayed in the hero section.
					</p>
				</div>

				<div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
					<label htmlFor="hero-description" className="block text-sm font-medium text-gray-700 mb-2">
						Hero Description
					</label>
					<textarea
						id="hero-description"
						value={description}
						onChange={(event) => setDescription(event.target.value)}
						placeholder="Enter hero section description"
						rows={4}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base text-gray-900 placeholder-gray-500 resize-y"
					/>
					<p className="text-xs text-gray-500 mt-2">
						This controls the supporting description underneath the hero title.
					</p>
				</div>

				<div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-200">
					<h3 className="text-sm font-semibold text-blue-800 mb-2">Preview</h3>
					<div className="space-y-2">
						<h4 className="text-lg font-bold text-blue-900">{title || DEFAULT_HERO_TITLE}</h4>
						<p className="text-sm text-blue-700">
							{description || DEFAULT_HERO_DESCRIPTION}
						</p>
					</div>
				</div>

				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
					<button
						type="button"
						onClick={handleResetToSaved}
						className="w-full sm:w-auto px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base"
					>
						Revert to Saved
					</button>
					<button
						type="button"
						onClick={handleResetToDefaults}
						className="w-full sm:w-auto px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base"
					>
						Reset to Defaults
					</button>
					<button
						type="button"
						onClick={handleSave}
						disabled={isSaving}
						className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium"
					>
						{isSaving ? 'Saving...' : 'Save Hero Section'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default HeroManagement;

