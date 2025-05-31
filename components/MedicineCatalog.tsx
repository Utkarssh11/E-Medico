import React, { useState, useMemo } from 'react';
import MedicineCard from './MedicineCard';
import { mockMedicines, Medicine } from '../data/medicines';
import SearchInput from './SearchInput'; // Import the new component

const MedicineCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name_asc'); // e.g., name_asc, name_desc, price_asc, price_desc

  const handleAddToCart = (medicine: Medicine) => {
    console.log(`Adding ${medicine.name} (ID: ${medicine.id}) to cart.`);
    alert(`${medicine.name} added to cart (simulated).`);
  };

  const categories = useMemo(() => 
    ['all', ...new Set(mockMedicines.map(m => m.category))]
  , [mockMedicines]);

  const filteredAndSortedMedicines = useMemo(() => {
    let medicines = mockMedicines
      .filter(med => med.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(med => selectedCategory === 'all' || med.category === selectedCategory);

    switch (sortBy) {
      case 'name_asc':
        medicines.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        medicines.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price_asc':
        medicines.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        medicines.sort((a, b) => b.price - a.price);
        break;
    }
    return medicines;
  }, [searchTerm, selectedCategory, sortBy, mockMedicines]);

  return (
    <section className="animate-fade-in" aria-labelledby="catalog-heading">
      <div className="text-center mb-10">
        <h2 id="catalog-heading" className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-2">
          Browse Our Medicines
        </h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Find all your health needs in one place. Use the filters below to narrow down your search.
        </p>
      </div>

      {/* Filters and Search Bar */}
      <div className="mb-8 p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label htmlFor="search-medicine" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Search by Name
            </label>
            <SearchInput
              id="search-medicine"
              placeholder="e.g., Paracetamol"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search medicines in catalog"
            />
          </div>
          <div>
            <label htmlFor="filter-category" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Filter by Category
            </label>
            <select
              id="filter-category"
              className="input-field" // Standard select styling
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sort-by" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Sort By
            </label>
            <select
              id="sort-by"
              className="input-field" // Standard select styling
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name_asc">Name (A-Z)</option>
              <option value="name_desc">Name (Z-A)</option>
              <option value="price_asc">Price (Low to High)</option>
              <option value="price_desc">Price (High to Low)</option>
            </select>
          </div>
        </div>
      </div>

      {filteredAndSortedMedicines.length === 0 ? (
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-slate-400 dark:text-slate-500 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 13.5h-6" />
          </svg>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            No medicines found matching your criteria.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedMedicines.map((medicine: Medicine) => (
            <MedicineCard key={medicine.id} medicine={medicine} onAddToCart={handleAddToCart} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MedicineCatalog;
