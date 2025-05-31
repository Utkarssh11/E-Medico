import React, { useState } from 'react';

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  distance: string;
  isOpen: boolean;
  rating: number;
  deliveryAvailable: boolean;
}

const mockPharmacies: Pharmacy[] = [
  { id: 'p001', name: 'HealthFirst Pharmacy', address: '123 Main St, Anytown, USA', distance: '0.5 miles', isOpen: true, rating: 4.5, deliveryAvailable: true },
  { id: 'p002', name: 'WellCare Drugs', address: '456 Oak Ave, Anytown, USA', distance: '1.2 miles', isOpen: false, rating: 4.2, deliveryAvailable: true },
  { id: 'p003', name: 'Community Rx', address: '789 Pine Rd, Anytown, USA', distance: '2.0 miles', isOpen: true, rating: 4.8, deliveryAvailable: false },
  { id: 'p004', name: 'Speedy Meds', address: '101 Elm St, Anytown, USA', distance: '0.8 miles', isOpen: true, rating: 3.9, deliveryAvailable: true },
];

const PharmacyLocatorPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpenNow, setFilterOpenNow] = useState(false);
  const [filterDelivery, setFilterDelivery] = useState(false);

  // Placeholder: In a real app, this would use geolocation and filter based on actual data
  const filteredPharmacies = mockPharmacies.filter(pharmacy => {
    const matchesSearch = pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) || pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOpenNow = !filterOpenNow || pharmacy.isOpen;
    const matchesDelivery = !filterDelivery || pharmacy.deliveryAvailable;
    return matchesSearch && matchesOpenNow && matchesDelivery;
  });

  return (
    <div className="container mx-auto py-8 animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-2">Find a Pharmacy Near You</h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Locate pharmacies that stock your medicines for pickup or delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Filters and Search */}
        <div className="md:col-span-1 space-y-6 p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md h-fit sticky top-24">
          <h3 className="text-xl font-semibold text-slate-700 dark:text-white mb-4">Filter Options</h3>
          <div>
            <label htmlFor="search-pharmacy" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Search by Name or Address
            </label>
            <input
              type="text"
              id="search-pharmacy"
              placeholder="e.g., HealthFirst or Main St"
              className="input-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <input
              id="filter-open-now"
              type="checkbox"
              checked={filterOpenNow}
              onChange={(e) => setFilterOpenNow(e.target.checked)}
              className="h-4 w-4 text-primary-DEFAULT border-slate-300 dark:border-slate-600 rounded focus:ring-primary-DEFAULT"
            />
            <label htmlFor="filter-open-now" className="ml-2 block text-sm text-slate-700 dark:text-slate-300">
              Open Now
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="filter-delivery"
              type="checkbox"
              checked={filterDelivery}
              onChange={(e) => setFilterDelivery(e.target.checked)}
              className="h-4 w-4 text-primary-DEFAULT border-slate-300 dark:border-slate-600 rounded focus:ring-primary-DEFAULT"
            />
            <label htmlFor="filter-delivery" className="ml-2 block text-sm text-slate-700 dark:text-slate-300">
              Offers Delivery
            </label>
          </div>
          <button className="btn btn-primary w-full mt-2">Apply Filters</button>
        </div>

        {/* Map and Pharmacy List */}
        <div className="md:col-span-2 space-y-8">
          {/* Placeholder for Map */}
          <div className="h-80 bg-slate-200 dark:bg-slate-700 rounded-lg shadow-md flex items-center justify-center">
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m0 0l-3.75-3.75M9 15l3.75-3.75M15 19.5a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Map View Placeholder (Google Maps API integration needed)
            </p>
          </div>

          {/* Pharmacy List */}
          <div>
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4">Nearby Pharmacies ({filteredPharmacies.length})</h3>
            {filteredPharmacies.length > 0 ? (
              <div className="space-y-4">
                {filteredPharmacies.map(pharmacy => (
                  <div key={pharmacy.id} className="card p-4 flex flex-col sm:flex-row gap-4">
                    {/* Placeholder Pharmacy Image/Icon */}
                    <div className="w-full sm:w-20 h-20 bg-secondary-light dark:bg-secondary-dark rounded-md flex items-center justify-center text-white text-2xl font-bold">
                      Rx
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-lg font-semibold text-slate-800 dark:text-white">{pharmacy.name}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{pharmacy.address}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-500">Distance: {pharmacy.distance}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${pharmacy.isOpen ? 'bg-success-light text-success-dark dark:bg-success-dark dark:text-success-light' : 'bg-danger-light text-danger-dark dark:bg-danger-dark dark:text-danger-light'}`}>
                          {pharmacy.isOpen ? 'Open' : 'Closed'}
                        </span>
                        {pharmacy.deliveryAvailable && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100">Delivery</span>
                        )}
                        <span className="text-xs text-yellow-500 dark:text-yellow-400 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-0.5"><path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.39-3.423 3.352c-.57.562-.262 1.534.476 1.745l4.028 1.168 1.83 4.401c.321.772 1.415.772 1.736 0l1.83-4.401 4.753-.39 3.423-3.352c.57-.562.262-1.534-.476-1.745l-4.028-1.168-1.83-4.401z" clipRule="evenodd" /></svg>
                          {pharmacy.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <button className="btn btn-outline mt-2 sm:mt-0 sm:self-center">View Details</button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 dark:text-slate-400">No pharmacies match your current filters. Try adjusting your search.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyLocatorPage;
