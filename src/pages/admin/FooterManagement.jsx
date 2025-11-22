import React, { useState, useEffect } from 'react';
import { 
  FaFacebook, 
  FaInstagram, 
  FaYoutube, 
  FaLinkedin, 
  FaTwitter, 
  FaTiktok,
  FaPinterest,
  FaSnapchat,
  FaDiscord,
  FaReddit,
  FaWhatsapp,
  FaTelegram,
  FaTrash,
  FaPlus
} from 'react-icons/fa';

const FooterManagement = () => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [newPlatform, setNewPlatform] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Available social media platforms
  const platforms = [
    { value: 'Facebook', icon: 'FaFacebook', label: 'Facebook' },
    { value: 'Instagram', icon: 'FaInstagram', label: 'Instagram' },
    { value: 'YouTube', icon: 'FaYoutube', label: 'YouTube' },
    { value: 'LinkedIn', icon: 'FaLinkedin', label: 'LinkedIn' },
    { value: 'Twitter', icon: 'FaTwitter', label: 'Twitter/X' },
    { value: 'TikTok', icon: 'FaTiktok', label: 'TikTok' },
    { value: 'Pinterest', icon: 'FaPinterest', label: 'Pinterest' },
    { value: 'Snapchat', icon: 'FaSnapchat', label: 'Snapchat' },
    { value: 'Discord', icon: 'FaDiscord', label: 'Discord' },
    { value: 'Reddit', icon: 'FaReddit', label: 'Reddit' },
    { value: 'WhatsApp', icon: 'FaWhatsapp', label: 'WhatsApp' },
    { value: 'Telegram', icon: 'FaTelegram', label: 'Telegram' }
  ];

  // Icon mapping for display
  const iconMap = {
    FaFacebook: FaFacebook,
    FaInstagram: FaInstagram,
    FaYoutube: FaYoutube,
    FaLinkedin: FaLinkedin,
    FaTwitter: FaTwitter,
    FaTiktok: FaTiktok,
    FaPinterest: FaPinterest,
    FaSnapchat: FaSnapchat,
    FaDiscord: FaDiscord,
    FaReddit: FaReddit,
    FaWhatsapp: FaWhatsapp,
    FaTelegram: FaTelegram
  };

  // Load social links from localStorage on component mount
  useEffect(() => {
    const savedLinks = localStorage.getItem('footerLinks');
    if (savedLinks) {
      try {
        setSocialLinks(JSON.parse(savedLinks));
      } catch (error) {
        console.error('Error parsing saved links:', error);
      }
    }
  }, []);

  const handleAddLink = () => {
    if (!newPlatform || !newUrl.trim()) {
      alert('Please select a platform and enter a URL');
      return;
    }

    // Basic URL validation
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(newUrl.trim())) {
      alert('Please enter a valid URL');
      return;
    }

    // Check if platform already exists
    if (socialLinks.some(link => link.platform === newPlatform)) {
      alert('This platform is already added. Please choose a different one or delete the existing one first.');
      return;
    }

    const platformData = platforms.find(p => p.value === newPlatform);
    const newLink = {
      platform: newPlatform,
      icon: platformData.icon,
      url: newUrl.trim()
    };

    setSocialLinks([...socialLinks, newLink]);
    setNewPlatform('');
    setNewUrl('');
  };

  const handleDeleteLink = (index) => {
    const updatedLinks = socialLinks.filter((_, i) => i !== index);
    setSocialLinks(updatedLinks);
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    
    try {
      // Save to localStorage
      localStorage.setItem('footerLinks', JSON.stringify(socialLinks));
      
      // Dispatch storage event to notify other components
      window.dispatchEvent(new Event('storage'));
      
      // Simulate a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error) {
      console.error('Error saving footer links:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Manage Footer Social Links</h1>
        <p className="text-sm sm:text-base text-gray-600">Add, edit, or remove social media icons that appear in the website footer.</p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-4 sm:mb-6 bg-green-50 border border-green-200 text-green-700 px-3 sm:px-4 py-3 rounded-lg text-sm sm:text-base">
          <div className="flex items-center">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Footer updated successfully!
          </div>
        </div>
      )}

      <div className="space-y-4 sm:space-y-6">
        {/* Add New Link Section */}
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Add New Social Link</h3>
          
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            <div>
              <label htmlFor="platform-select" className="block text-sm font-medium text-gray-700 mb-2">
                Social Media Platform
              </label>
              <select
                id="platform-select"
                value={newPlatform}
                onChange={(e) => setNewPlatform(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
              >
                <option value="">Select Platform</option>
                {platforms.map((platform) => (
                  <option key={platform.value} value={platform.value}>
                    {platform.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 mb-2">
                Profile/Page URL
              </label>
              <input
                id="url-input"
                type="url"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://facebook.com/yourpage"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <button
                onClick={handleAddLink}
                className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 text-sm sm:text-base"
              >
                <FaPlus className="w-4 h-4 mr-2" />
                Add Link
              </button>
            </div>
          </div>
        </div>

        {/* Current Links List */}
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Current Social Links</h3>
          
          {socialLinks.length === 0 ? (
            <div className="text-center py-6 sm:py-8 text-gray-500">
              <svg className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <p className="text-sm sm:text-base">No social links added yet</p>
              <p className="text-xs sm:text-sm">Add your first social media link above</p>
            </div>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              {socialLinks.map((link, index) => {
                const IconComponent = iconMap[link.icon];
                return (
                  <div key={index} className="flex items-center justify-between bg-white p-2 sm:p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                      {IconComponent && <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" />}
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{link.platform}</p>
                        <p className="text-xs sm:text-sm text-gray-500 truncate">{link.url}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteLink(index)}
                      className="p-1.5 sm:p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200 flex-shrink-0"
                      title="Delete link"
                    >
                      <FaTrash className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveChanges}
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
              'Save Changes'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterManagement;
