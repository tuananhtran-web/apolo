import { db } from './firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  addDoc,
  Timestamp 
} from 'firebase/firestore';

export interface UserPackage {
  name: string;
  expiryDate: number; // timestamp in milliseconds
  status: 'active' | 'expired' | 'pending';
}

export interface User {
  id: string;
  displayName: string;
  phoneNumber: string;
  avatar: string;
  isLocked: boolean;
  package: UserPackage;
}

const COLLECTION_NAME = 'users';

// Mock data for fallback when Firebase config is not valid
const MOCK_USERS: User[] = [
  {
    id: 'user1',
    displayName: 'Nguyễn Văn A',
    phoneNumber: '0901234567',
    avatar: '',
    isLocked: false,
    package: {
      name: 'Gói Tháng',
      expiryDate: Date.now() + 86400000 * 15, // 15 days left
      status: 'active'
    }
  },
  {
    id: 'user2',
    displayName: 'Trần Thị B',
    phoneNumber: '0909876543',
    avatar: '',
    isLocked: true,
    package: {
      name: 'Gói Năm',
      expiryDate: Date.now() - 86400000, // Expired yesterday
      status: 'expired'
    }
  },
  {
    id: 'user3',
    displayName: 'Lê Văn C',
    phoneNumber: '0912345678',
    avatar: '',
    isLocked: false,
    package: {
      name: 'Gói Cơ Bản',
      expiryDate: Date.now() + 86400000 * 30,
      status: 'pending'
    }
  }
];

// Helper to check if we are in "mock mode" (rudimentary check)
const isMockMode = () => {
  // In a real scenario, we might check if firebase app is properly initialized 
  // or if we have a specific env var. For this demo, we assume mock if key is placeholder.
  return true; // Force mock for demonstration since user doesn't have keys yet
};

// In-memory store for mock updates
let mockStore = [...MOCK_USERS];

export const UserService = {
  getAllUsers: async (): Promise<User[]> => {
    if (isMockMode()) {
      return new Promise(resolve => setTimeout(() => resolve([...mockStore]), 500));
    }
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
  },

  getUserById: async (id: string): Promise<User | null> => {
    if (isMockMode()) {
      return new Promise(resolve => {
        setTimeout(() => resolve(mockStore.find(u => u.id === id) || null), 300);
      });
    }
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as User;
    }
    return null;
  },

  updateUser: async (id: string, data: Partial<User>): Promise<void> => {
    if (isMockMode()) {
      mockStore = mockStore.map(u => u.id === id ? { ...u, ...data } : u);
      return Promise.resolve();
    }
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, data);
  },

  deleteUser: async (id: string): Promise<void> => {
    if (isMockMode()) {
      mockStore = mockStore.filter(u => u.id !== id);
      return Promise.resolve();
    }
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  },

  toggleLockUser: async (id: string, isLocked: boolean): Promise<void> => {
    return UserService.updateUser(id, { isLocked });
  },

  addBonusDays: async (id: string, days: number): Promise<void> => {
    const user = isMockMode() ? mockStore.find(u => u.id === id) : await UserService.getUserById(id);
    if (!user) throw new Error("User not found");

    const currentExpiry = user.package.expiryDate > Date.now() ? user.package.expiryDate : Date.now();
    const newExpiry = currentExpiry + (days * 86400000);
    
    // Also update status if it was expired
    const newStatus = user.package.status === 'expired' ? 'active' : user.package.status;

    return UserService.updateUser(id, {
      package: {
        ...user.package,
        expiryDate: newExpiry,
        status: newStatus
      }
    });
  },

  updatePackageStatus: async (id: string, status: UserPackage['status']): Promise<void> => {
     const user = isMockMode() ? mockStore.find(u => u.id === id) : await UserService.getUserById(id);
    if (!user) throw new Error("User not found");
    
    return UserService.updateUser(id, {
      package: {
        ...user.package,
        status
      }
    });
  }
};
