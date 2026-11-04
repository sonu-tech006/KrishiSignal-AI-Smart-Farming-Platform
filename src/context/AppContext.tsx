import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  FarmerProfile, 
  Farm, 
  CropCycle, 
  Language, 
  FarmActivity, 
  ExpenseRecord,
  AgriculturalProduct,
  MandiRecord
} from '../types';
import { 
  DEMO_FARMERS, 
  INITIAL_FARMS, 
  INITIAL_CROPS, 
  VERIFIED_MANDI_DATA, 
  AGRICULTURAL_PRODUCTS_CATALOG 
} from '../data/mockData';
import { fetchLiveWeatherData, WeatherDataPayload, getFallbackWeatherData } from '../services/weatherService';

interface AppContextType {
  user: FarmerProfile;
  isAuthenticated: boolean;
  language: Language;
  setLanguage: (lang: Language) => void;
  activeFarm: Farm;
  setActiveFarm: (farm: Farm) => void;
  farms: Farm[];
  addFarm: (farm: Omit<Farm, 'id' | 'createdAt' | 'ownerId'>) => void;
  deleteFarm: (id: string) => void;
  activeCrop: CropCycle;
  setActiveCrop: (crop: CropCycle) => void;
  cropCycles: CropCycle[];
  weather: WeatherDataPayload;
  isLoadingWeather: boolean;
  refreshWeather: (lat?: number, lng?: number) => Promise<void>;
  isOffline: boolean;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  activities: FarmActivity[];
  addActivity: (activity: Omit<FarmActivity, 'id'>) => void;
  expenses: ExpenseRecord[];
  addExpense: (expense: Omit<ExpenseRecord, 'id'>) => void;
  loginAs: (farmerId: string) => void;
  logout: () => void;
  savedProducts: string[];
  toggleSaveProduct: (productId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FarmerProfile>(DEMO_FARMERS[0]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [language, setLanguage] = useState<Language>('en'); // Primarily English as requested
  const [farms, setFarms] = useState<Farm[]>(INITIAL_FARMS);
  const [activeFarm, setActiveFarm] = useState<Farm>(INITIAL_FARMS[0]);
  const [cropCycles, setCropCycles] = useState<CropCycle[]>(INITIAL_CROPS);
  const [activeCrop, setActiveCrop] = useState<CropCycle>(INITIAL_CROPS[0]);
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [weather, setWeather] = useState<WeatherDataPayload>(getFallbackWeatherData());
  const [isLoadingWeather, setIsLoadingWeather] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(typeof navigator !== 'undefined' ? !navigator.onLine : false);
  const [savedProducts, setSavedProducts] = useState<string[]>(['prod-wheat-hd2967', 'prod-fertilizer-nanourea']);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [activities, setActivities] = useState<FarmActivity[]>([
    {
      id: 'act-1',
      farmId: 'farm-1',
      activityType: 'Sowing',
      activityDate: '2024-11-10',
      description: 'Sown HD-2967 Certified seed @ 40kg/acre with seed-cum-fertilizer drill.',
      cost: 6500,
      quantity: 180,
      unit: 'kg'
    },
    {
      id: 'act-2',
      farmId: 'farm-1',
      activityType: 'Irrigation',
      activityDate: '2024-12-05',
      description: 'First irrigation at Crown Root Initiation (CRI) stage using tube-well.',
      cost: 1200,
      notes: 'Applied top-dress urea 45kg after irrigation.'
    }
  ]);

  const [expenses, setExpenses] = useState<ExpenseRecord[]>([
    {
      id: 'exp-1',
      farmId: 'farm-1',
      category: 'Seeds',
      title: 'HD-2967 Certified Wheat Seed (180 kg)',
      amount: 6840,
      date: '2024-11-08'
    },
    {
      id: 'exp-2',
      farmId: 'farm-1',
      category: 'Fertilizers',
      title: 'DAP 4 Bags + MOP Potash 2 Bags',
      amount: 7200,
      date: '2024-11-09'
    },
    {
      id: 'exp-3',
      farmId: 'farm-1',
      category: 'Diesel & Machinery',
      title: 'Tractor Field Tillage & Rotavator (3 Passes)',
      amount: 4500,
      date: '2024-11-09'
    },
    {
      id: 'exp-4',
      farmId: 'farm-1',
      category: 'Electricity & Water',
      title: 'Tube-well electricity charges for 1st irrigation',
      amount: 1200,
      date: '2024-12-05'
    }
  ]);

  // Online / offline listeners
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Fetch real-time weather on farm change
  const refreshWeather = async (lat?: number, lng?: number) => {
    setIsLoadingWeather(true);
    const targetLat = lat ?? activeFarm.coordinates.lat;
    const targetLng = lng ?? activeFarm.coordinates.lng;
    try {
      const data = await fetchLiveWeatherData(targetLat, targetLng);
      setWeather(data);
    } catch (e) {
      console.warn('Weather refresh failed, fallback used');
    } finally {
      setIsLoadingWeather(false);
    }
  };

  useEffect(() => {
    refreshWeather(activeFarm.coordinates.lat, activeFarm.coordinates.lng);
  }, [activeFarm.id]);

  const addFarm = (newFarmData: Omit<Farm, 'id' | 'createdAt' | 'ownerId'>) => {
    const created: Farm = {
      ...newFarmData,
      id: `farm-${Date.now()}`,
      ownerId: currentUser.id,
      createdAt: new Date().toISOString()
    };
    setFarms(prev => [...prev, created]);
    setActiveFarm(created);
  };

  const deleteFarm = (id: string) => {
    const remaining = farms.filter(f => f.id !== id);
    if (remaining.length > 0) {
      setFarms(remaining);
      setActiveFarm(remaining[0]);
    }
  };

  const addActivity = (act: Omit<FarmActivity, 'id'>) => {
    const created: FarmActivity = {
      ...act,
      id: `act-${Date.now()}`
    };
    setActivities(prev => [created, ...prev]);
  };

  const addExpense = (exp: Omit<ExpenseRecord, 'id'>) => {
    const created: ExpenseRecord = {
      ...exp,
      id: `exp-${Date.now()}`
    };
    setExpenses(prev => [created, ...prev]);
  };

  const loginAs = (farmerId: string) => {
    const found = DEMO_FARMERS.find(f => f.id === farmerId);
    if (found) {
      setCurrentUser(found);
      setIsAuthenticated(true);
      setLanguage(found.preferredLanguage);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentTab('landing');
  };

  const toggleSaveProduct = (productId: string) => {
    setSavedProducts(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  return (
    <AppContext.Provider
      value={{
        user: currentUser,
        isAuthenticated,
        language,
        setLanguage,
        activeFarm,
        setActiveFarm,
        farms,
        addFarm,
        deleteFarm,
        activeCrop,
        setActiveCrop,
        cropCycles,
        weather,
        isLoadingWeather,
        refreshWeather,
        isOffline,
        currentTab,
        setCurrentTab,
        activities,
        addActivity,
        expenses,
        addExpense,
        loginAs,
        logout,
        savedProducts,
        toggleSaveProduct,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
