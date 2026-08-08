import React, { createContext, useContext, useState, useEffect } from 'react';
import { LocationInfo, ClassType, SessionCount, LocationKey } from '../types';
import { LOCATIONS_DATA, COURSE_RATES } from '../data/aqualuxData';

const LOCAL_STORAGE_LOCATIONS_KEY = 'aqualux_locations_data_v1';
const LOCAL_STORAGE_RATES_KEY = 'aqualux_course_rates_v1';
const LOCAL_STORAGE_CONTACTS_KEY = 'aqualux_admin_contacts_v1';

export interface AdminContacts {
  faqihPhone: string;
  abedPhone: string;
}

interface AqualuxDataContextType {
  locations: Record<LocationKey, LocationInfo>;
  courseRates: Record<ClassType, Record<SessionCount, { price: number; perSession: number; discount?: string }>>;
  adminContacts: AdminContacts;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  updateLocation: (key: LocationKey, updated: Partial<LocationInfo>) => void;
  updateCourseRate: (classType: ClassType, sessions: SessionCount, price: number, discount?: string) => void;
  updateAdminContacts: (contacts: Partial<AdminContacts>) => void;
  resetToDefault: () => void;
}

const DEFAULT_CONTACTS: AdminContacts = {
  faqihPhone: '082142698440',
  abedPhone: '08995911927'
};

const AqualuxDataContext = createContext<AqualuxDataContextType | undefined>(undefined);

export const AqualuxDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Locations state
  const [locations, setLocations] = useState<Record<LocationKey, LocationInfo>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_LOCATIONS_KEY);
      return saved ? JSON.parse(saved) : LOCATIONS_DATA;
    } catch {
      return LOCATIONS_DATA;
    }
  });

  // Rates state
  const [courseRates, setCourseRates] = useState<Record<ClassType, Record<SessionCount, { price: number; perSession: number; discount?: string }>>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_RATES_KEY);
      return saved ? JSON.parse(saved) : COURSE_RATES;
    } catch {
      return COURSE_RATES;
    }
  });

  // Admin contacts state
  const [adminContacts, setAdminContacts] = useState<AdminContacts>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CONTACTS_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_CONTACTS;
    } catch {
      return DEFAULT_CONTACTS;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_LOCATIONS_KEY, JSON.stringify(locations));
    } catch (e) {
      console.error('Failed to save locations', e);
    }
  }, [locations]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_RATES_KEY, JSON.stringify(courseRates));
    } catch (e) {
      console.error('Failed to save rates', e);
    }
  }, [courseRates]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CONTACTS_KEY, JSON.stringify(adminContacts));
    } catch (e) {
      console.error('Failed to save contacts', e);
    }
  }, [adminContacts]);

  const updateLocation = (key: LocationKey, updated: Partial<LocationInfo>) => {
    setLocations(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        ...updated
      }
    }));
  };

  const updateCourseRate = (classType: ClassType, sessions: SessionCount, price: number, discount?: string) => {
    setCourseRates(prev => ({
      ...prev,
      [classType]: {
        ...prev[classType],
        [sessions]: {
          price,
          perSession: Math.round(price / sessions),
          discount: discount || undefined
        }
      }
    }));
  };

  const updateAdminContacts = (contacts: Partial<AdminContacts>) => {
    setAdminContacts(prev => ({ ...prev, ...contacts }));
  };

  const resetToDefault = () => {
    setLocations(LOCATIONS_DATA);
    setCourseRates(COURSE_RATES);
    setAdminContacts(DEFAULT_CONTACTS);
    localStorage.removeItem(LOCAL_STORAGE_LOCATIONS_KEY);
    localStorage.removeItem(LOCAL_STORAGE_RATES_KEY);
    localStorage.removeItem(LOCAL_STORAGE_CONTACTS_KEY);
  };

  return (
    <AqualuxDataContext.Provider
      value={{
        locations,
        courseRates,
        adminContacts,
        isAdminOpen,
        setIsAdminOpen,
        updateLocation,
        updateCourseRate,
        updateAdminContacts,
        resetToDefault
      }}
    >
      {children}
    </AqualuxDataContext.Provider>
  );
};

export const useAqualuxData = () => {
  const context = useContext(AqualuxDataContext);
  if (!context) {
    throw new Error('useAqualuxData must be used within AqualuxDataProvider');
  }
  return context;
};
