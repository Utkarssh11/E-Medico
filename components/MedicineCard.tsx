import React from 'react';
import { Medicine } from '../data/medicines';

interface MedicineCardProps {
  medicine: Medicine;
  onAddToCart: (medicine: Medicine) => void;
}

const MedicineCard: React.FC<MedicineCardProps> = ({ medicine, onAddToCart }) => {
  return (
    <article 
      className="card flex flex-col h-full overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-out animate-fade-in"
      aria-labelledby={`med-name-${medicine.id}`}
    >
      <div className="relative w-full aspect-[3/2] bg-slate-200 dark:bg-slate-700">
        <img 
          src={medicine.imageUrl || `https://via.placeholder.com/300x200/E0E7FF/1D4ED8?Text=${encodeURIComponent(medicine.name)}`} 
          alt={`Image of ${medicine.name}`} 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        {medicine.requiresPrescription && (
          <span 
            className="absolute top-2 right-2 bg-danger-DEFAULT text-white text-xs font-semibold px-2 py-1 rounded-full shadow"
            aria-label="Requires prescription"
          >
            Rx
          </span>
        )}
      </div>
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <h3 id={`med-name-${medicine.id}`} className="text-lg font-semibold text-slate-800 dark:text-white mb-1 truncate" title={medicine.name}>
          {medicine.name}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">Brand: {medicine.brand}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Category: {medicine.category}</p>
        
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 text-ellipsis overflow-hidden line-clamp-3 h-[3.75em]">
          {medicine.description}
        </p>

        <div className="mt-auto">
          <div className="flex justify-between items-center mb-3">
            <p className="text-xl font-bold text-success-DEFAULT">
              {medicine.currency} {medicine.price.toFixed(2)}
            </p>
            <p className={`text-sm font-medium ${medicine.availability ? 'text-success-DEFAULT' : 'text-danger-DEFAULT'}`}>
              {medicine.availability ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>
          <button
            className={`btn w-full ${medicine.availability ? 'btn-primary' : 'bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed'}`}
            onClick={() => medicine.availability && onAddToCart(medicine)}
            disabled={!medicine.availability}
            aria-label={`Add ${medicine.name} to cart`}
          >
            {medicine.availability ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default MedicineCard;
