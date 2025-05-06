import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import profileImg from './../assets/profile-image.avif';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { t } = useTranslation();
  
  return (
    <nav className="bg-white shadow-orange-100 px-6 py-3 flex items-center justify-between">
      {/* Left: Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-800 tracking-wide">
        {t('navbar.title')}
      </Link>

      {/* Right: Language Switcher + Profile + Auth Toggle */}
      <div className="flex items-center space-x-4">
        <LanguageSwitcher />
        
        {/* Login / Signup Button */}
        <Link
          to="/login"
          className="bg-blue-500 text-white px-4 py-1.5 rounded-full font-medium hover:bg-blue-100 hover:text-blue-950 hover:border-2 transition"
        >
          {t('navbar.login')}
        </Link>
        
        {/* Profile Picture Placeholder */}
        <img
          src={profileImg}
          alt="profile"
          className="w-10 h-10 rounded-full border-2 border-black-300"
        />
      </div>
    </nav>
  );
};

export default Navbar;
