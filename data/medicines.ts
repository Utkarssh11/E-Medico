export interface Medicine {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  currency: string;
  availability: boolean;
  imageUrl: string;
  description: string;
  requiresPrescription: boolean;
}

export const mockMedicines: Medicine[] = [
  {
    id: 'med001',
    name: 'Paracetamol 500mg Tablets',
    brand: 'PainRelief Co.',
    category: 'Pain Relief',
    price: 5.99,
    currency: 'USD',
    availability: true,
    imageUrl: 'https://via.placeholder.com/250x150/007bff/FFFFFF?Text=Paracetamol',
    description: 'Effective for relieving mild to moderate pain and reducing fever. Pack of 20 tablets.',
    requiresPrescription: false,
  },
  {
    id: 'med002',
    name: 'Amoxicillin 250mg Capsules',
    brand: 'Generic Health',
    category: 'Antibiotics',
    price: 12.50,
    currency: 'USD',
    availability: true,
    imageUrl: 'https://via.placeholder.com/250x150/28a745/FFFFFF?Text=Amoxicillin',
    description: 'Prescription antibiotic used to treat a variety of bacterial infections. Pack of 30 capsules.',
    requiresPrescription: true,
  },
  {
    id: 'med003',
    name: 'Vitamin C 1000mg Effervescent',
    brand: 'ImmunoBoost',
    category: 'Vitamins & Supplements',
    price: 8.75,
    currency: 'USD',
    availability: true,
    imageUrl: 'https://via.placeholder.com/250x150/ffc107/000000?Text=Vitamin+C',
    description: 'Supports immune system function. Orange flavor. 20 effervescent tablets.',
    requiresPrescription: false,
  },
  {
    id: 'med004',
    name: 'Ibuprofen 200mg Liquid Gels',
    brand: 'FastAct',
    category: 'Pain Relief',
    price: 7.20,
    currency: 'USD',
    availability: false,
    imageUrl: 'https://via.placeholder.com/250x150/dc3545/FFFFFF?Text=Ibuprofen',
    description: 'Rapidly absorbed liquid gels for fast pain relief. 24 count.',
    requiresPrescription: false,
  },
  {
    id: 'med005',
    name: 'Loratadine 10mg Antihistamine',
    brand: 'AllergyShield',
    category: 'Allergy Relief',
    price: 9.99,
    currency: 'USD',
    availability: true,
    imageUrl: 'https://via.placeholder.com/250x150/17a2b8/FFFFFF?Text=Loratadine',
    description: 'Non-drowsy allergy relief for hay fever and other upper respiratory allergies. 30 tablets.',
    requiresPrescription: false,
  },
];