import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, canonical, keywords, ogImage, twitterImage }) => {
    const siteName = 'NutriTrack';
    const defaultDescription = 'Your smart nutrition companion for Chinese cuisine. Discover detailed nutritional facts, track calories, and make healthier dining choices.';
    const defaultCanonical = 'https://panda-express-nutrition.com/';

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title ? `${title} | ${siteName}` : siteName}</title>
            <meta name="description" content={description || defaultDescription} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={canonical || defaultCanonical} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonical || defaultCanonical} />
            <meta property="og:title" content={title ? `${title} | ${siteName}` : siteName} />
            <meta property="og:description" content={description || defaultDescription} />
            {ogImage && <meta property="og:image" content={ogImage} />}
            <meta property="og:site_name" content={siteName} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={canonical || defaultCanonical} />
            <meta property="twitter:title" content={title ? `${title} | ${siteName}` : siteName} />
            <meta property="twitter:description" content={description || defaultDescription} />
            {twitterImage && <meta property="twitter:image" content={twitterImage} />}
        </Helmet>
    );
};

export default SEO;
