import React from 'react';
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
  FaTelegram
} from 'react-icons/fa';

const SocialIcons = ({ links = [], className = "" }) => {
  // Icon mapping for dynamic rendering
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

  if (!links || links.length === 0) {
    return null;
  }

  return (
    <div className={`flex space-x-4 ${className}`}>
      {links.map((link, index) => {
        const IconComponent = iconMap[link.icon];
        if (!IconComponent) return null;

        return (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-200"
            aria-label={link.platform}
          >
            <IconComponent className="w-5 h-5" />
          </a>
        );
      })}
    </div>
  );
};

export default SocialIcons;
