import React from 'react';
import SearchInput from './SearchInput'; // Import the new component

interface HomePageProps {
  onNavigate: (page: 'catalog' | 'upload' | 'pharmacies' | 'auth') => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [homeSearchTerm, setHomeSearchTerm] = React.useState('');

  return (
    <div className="animate-fade-in space-y-12 md:space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 bg-gradient-to-br from-primary-light via-primary-DEFAULT to-primary-dark dark:from-primary-dark dark:via-slate-800 dark:to-slate-900 rounded-xl shadow-2xl text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 animate-slide-up" style={{animationDelay: '0.1s'}}>
            Welcome to E-Medico
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90 animate-slide-up" style={{animationDelay: '0.2s'}}>
            Your trusted partner for easy and fast online medicine ordering.
          </p>
          <div className="max-w-xl mx-auto animate-slide-up" style={{animationDelay: '0.3s'}}>
            <SearchInput
              placeholder="Search medicines, symptoms, brands..."
              aria-label="Search medicines"
              value={homeSearchTerm}
              onChange={(e) => setHomeSearchTerm(e.target.value)}
              // Increased padding for hero search
              className="text-md [&_input]:py-3.5" 
            />
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="container mx-auto px-4 animate-slide-up" style={{animationDelay: '0.4s'}}>
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-slate-800 dark:text-white">
          How can we help you today?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <ActionCard
            title="Browse Medicines"
            description="Explore our extensive catalog of medications and health products."
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" /></svg>}
            onClick={() => onNavigate('catalog')}
            color="primary"
          />
          <ActionCard
            title="Upload Prescription"
            description="Easily upload your doctor's prescription and let us handle the rest."
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3v11.25" /></svg>}
            onClick={() => onNavigate('upload')}
            color="secondary"
          />
          <ActionCard
            title="Find Nearby Pharmacies"
            description="Locate pharmacies near you for pickup or fast delivery options."
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>}
            onClick={() => onNavigate('pharmacies')}
            color="success"
          />
        </div>
      </section>

      {/* How It Works Section (Optional) */}
      {/* Placeholder for a "How E-Medico Works" section */}

      {/* Featured Products/Categories (Optional) */}
      {/* Placeholder for featured products or categories */}
    </div>
  );
};

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  color: 'primary' | 'secondary' | 'success';
}

const ActionCard: React.FC<ActionCardProps> = ({ title, description, icon, onClick, color }) => {
  const colorClasses = {
    primary: 'bg-primary-DEFAULT hover:bg-primary-dark text-white',
    secondary: 'bg-secondary-DEFAULT hover:bg-secondary-dark text-white',
    success: 'bg-success-DEFAULT hover:bg-success-dark text-white',
  };

  return (
    <button
      onClick={onClick}
      className={`p-6 rounded-lg shadow-lg text-left transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${colorClasses[color]} focus:ring-${color}-light`}
      aria-label={title}
    >
      <div className={`mb-4 inline-block p-3 rounded-full bg-white/20`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm opacity-90">{description}</p>
    </button>
  );
};

export default HomePage;
