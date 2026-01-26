import { db } from './firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  addDoc 
} from 'firebase/firestore';

export interface PackageCategory {
  id: string;
  name: string;
}

export interface Package {
  id: string;
  categoryId: string;
  name: string;
  durationMonths: number;
  originalPrice: number;
  currentPrice: number;
  image: string;
  banner?: string;
  description?: string;
  isHot?: boolean;
  saleBadge?: string; // e.g. "50%"
}

const COLLECTION_NAME = 'packages';

// Mock Data
const MOCK_CATEGORIES: PackageCategory[] = [
  { id: 'gym', name: 'Gym' },
  { id: 'groupx', name: 'GroupX' },
  { id: 'yoga', name: 'Yoga' },
  { id: 'boxing', name: 'Boxing' }
];

const MOCK_PACKAGES: Package[] = [
  {
    id: 'pkg1',
    categoryId: 'gym',
    name: 'Gói Gym 1 Tháng',
    durationMonths: 1,
    originalPrice: 500000,
    currentPrice: 350000,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    saleBadge: '30%',
    isHot: false
  },
  {
    id: 'pkg2',
    categoryId: 'gym',
    name: 'Gói Gym 1 Năm (Siêu Tiết Kiệm)',
    durationMonths: 12,
    originalPrice: 6000000,
    currentPrice: 3000000,
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    banner: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    saleBadge: '50%',
    isHot: true,
    description: 'Tặng thêm 2 tháng khi đăng ký ngay hôm nay'
  },
  {
    id: 'pkg3',
    categoryId: 'yoga',
    name: 'Yoga Trị Liệu 3 Tháng',
    durationMonths: 3,
    originalPrice: 2000000,
    currentPrice: 1800000,
    image: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    saleBadge: '10%'
  }
];

// Helper to check mock mode
const isMockMode = () => true;

let mockPackages = [...MOCK_PACKAGES];

export const PackageService = {
  getCategories: async (): Promise<PackageCategory[]> => {
    return Promise.resolve(MOCK_CATEGORIES);
  },

  getAllPackages: async (): Promise<Package[]> => {
    if (isMockMode()) {
      return new Promise(resolve => setTimeout(() => resolve([...mockPackages]), 500));
    }
    // Implement Firestore getDocs here
    return [];
  },

  getPackageById: async (id: string): Promise<Package | null> => {
    if (isMockMode()) {
      return new Promise(resolve => setTimeout(() => resolve(mockPackages.find(p => p.id === id) || null), 300));
    }
    return null;
  },

  createPackage: async (pkg: Omit<Package, 'id'>): Promise<void> => {
    if (isMockMode()) {
      const newPkg = { ...pkg, id: Math.random().toString(36).substr(2, 9) };
      mockPackages.push(newPkg);
      return Promise.resolve();
    }
  },

  updatePackage: async (id: string, data: Partial<Package>): Promise<void> => {
    if (isMockMode()) {
      mockPackages = mockPackages.map(p => p.id === id ? { ...p, ...data } : p);
      return Promise.resolve();
    }
  },

  deletePackage: async (id: string): Promise<void> => {
    if (isMockMode()) {
      mockPackages = mockPackages.filter(p => p.id !== id);
      return Promise.resolve();
    }
  }
};
