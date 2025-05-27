import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom/client';

// Import new page components
import HomePage from './components/HomePage';
import MedicineCatalog from './components/MedicineCatalog';
import UploadPrescriptionPage from './components/UploadPrescriptionPage';
import CartPage from './components/CartPage';
import PharmacyLocatorPage from './components/PharmacyLocatorPage';
import CheckoutPage from './components/CheckoutPage';
import AuthPage from './components/AuthPage';
import ThemeToggle from './components/ThemeToggle';
import ChatbotWidget from './components/ChatbotWidget';

// Import global styles (Tailwind will be main styling)
import './index.css';

type Page = 'home' | 'catalog' | 'upload' | 'cart' | 'pharmacies' | 'checkout' | 'auth' | 'profile';

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') {
    return 'light'; // Default for SSR or non-browser environments
  }
  // This function is called once for useState initialization.
  // The script in index.html has already run, set the class on <html>,
  // and updated localStorage. We primarily trust localStorage here.
  const storedTheme = localStorage.getItem('eMedicoTheme');
  if (storedTheme === 'dark') {
    return 'dark';
  }
  // If localStorage is 'light', or null/invalid (after initial script), default to 'light'.
  // The initial script in index.html already handles prefers-color-scheme as a fallback for the very first load.
  return 'light'; 
};


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top on page change
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const newThemeIsDark = theme === 'dark';

    // Update DOM class
    if (newThemeIsDark) {
      if (!root.classList.contains('dark')) {
        root.classList.add('dark');
      }
    } else { // theme is 'light'
      if (root.classList.contains('dark')) {
        root.classList.remove('dark');
      }
    }
    
    // Update localStorage if it's different from the current React theme state
    try {
      if (localStorage.getItem('eMedicoTheme') !== theme) {
        localStorage.setItem('eMedicoTheme', theme);
      }
    } catch (e) { 
      console.warn("E-Medico: Could not save theme to localStorage.", e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigateTo} />;
      case 'catalog':
        return <MedicineCatalog />;
      case 'upload':
        return <UploadPrescriptionPage />;
      case 'cart':
        return <CartPage onNavigate={navigateTo} />;
      case 'pharmacies':
        return <PharmacyLocatorPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'auth':
        return <AuthPage onNavigate={navigateTo} />;
      // case 'profile': return <ProfilePage />; // Placeholder for future
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  const navLinkBaseClasses = "text-slate-600 dark:text-slate-300 hover:text-primary-DEFAULT dark:hover:text-primary-light font-medium pb-1 border-b-2 border-transparent transition-colors duration-200";
  const navLinkActiveClasses = "text-primary-DEFAULT dark:text-primary-light border-primary-DEFAULT dark:border-primary-light";
  
  const mobileNavLinkBaseClasses = "text-sm text-slate-600 dark:text-slate-300 hover:text-primary-DEFAULT dark:hover:text-primary-light font-medium py-1 transition-colors duration-200";
  const mobileNavLinkActiveClasses = "text-primary-DEFAULT dark:text-primary-light font-semibold";

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-md" role="banner">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div 
              className="text-2xl font-bold text-primary-DEFAULT dark:text-primary-light cursor-pointer"
              onClick={() => navigateTo('home')}
              aria-label="E-Medico Home"
            >
              <span role="img" aria-label="medical symbol" className="mr-2">⚕️</span>E-Medico
            </div>
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6" aria-label="Main navigation">
              <a href="#home" onClick={(e) => { e.preventDefault(); navigateTo('home');}} className={`${navLinkBaseClasses} ${currentPage === 'home' ? navLinkActiveClasses : ''}`}>Home</a>
              <a href="#catalog" onClick={(e) => { e.preventDefault(); navigateTo('catalog');}} className={`${navLinkBaseClasses} ${currentPage === 'catalog' ? navLinkActiveClasses : ''}`}>Catalog</a>
              <a href="#upload" onClick={(e) => { e.preventDefault(); navigateTo('upload');}} className={`${navLinkBaseClasses} ${currentPage === 'upload' ? navLinkActiveClasses : ''}`}>Upload Rx</a>
              <a href="#pharmacies" onClick={(e) => { e.preventDefault(); navigateTo('pharmacies');}} className={`${navLinkBaseClasses} ${currentPage === 'pharmacies' ? navLinkActiveClasses : ''}`}>Pharmacies</a>
              {/* <a href="#profile" onClick={(e) => { e.preventDefault(); navigateTo('profile');}} className={`${navLinkBaseClasses} ${currentPage === 'profile' ? navLinkActiveClasses : ''}`}>Profile</a> */}
            </nav>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => navigateTo('cart')} 
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="View Cart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </button>
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              <button 
                onClick={() => navigateTo('auth')} 
                className="btn btn-outline hidden sm:inline-flex"
                aria-label="Login or Sign Up"
              >
                Login / Sign Up
              </button>
               <button 
                onClick={() => navigateTo('auth')} 
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors sm:hidden"
                aria-label="Login or Sign Up"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </button>
            </div>
          </div>
           {/* Mobile Navigation */}
          <nav className="md:hidden flex items-center justify-around py-2 border-t border-slate-200 dark:border-slate-700" aria-label="Mobile navigation">
              <a href="#home" onClick={(e) => { e.preventDefault(); navigateTo('home');}} className={`${mobileNavLinkBaseClasses} ${currentPage === 'home' ? mobileNavLinkActiveClasses : ''}`}>Home</a>
              <a href="#catalog" onClick={(e) => { e.preventDefault(); navigateTo('catalog');}} className={`${mobileNavLinkBaseClasses} ${currentPage === 'catalog' ? mobileNavLinkActiveClasses : ''}`}>Catalog</a>
              <a href="#upload" onClick={(e) => { e.preventDefault(); navigateTo('upload');}} className={`${mobileNavLinkBaseClasses} ${currentPage === 'upload' ? mobileNavLinkActiveClasses : ''}`}>Upload Rx</a>
              <a href="#pharmacies" onClick={(e) => { e.preventDefault(); navigateTo('pharmacies');}} className={`${mobileNavLinkBaseClasses} ${currentPage === 'pharmacies' ? mobileNavLinkActiveClasses : ''}`}>Find Rx</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
        {renderPage()}
      </main>
      
      <ChatbotWidget />

      <footer className="bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-8 text-center" role="contentinfo">
        <div className="container mx-auto px-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            &copy; {new Date().getFullYear()} E-Medico. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
            Your health, our priority. Always consult your doctor for medical advice.
          </p>
          {/* Add links like Privacy Policy, Terms of Service here */}
        </div>
      </footer>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element. E-Medico app cannot be mounted.');
}