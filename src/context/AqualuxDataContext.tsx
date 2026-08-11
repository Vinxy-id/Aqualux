import React, { createContext, useContext, useState, useEffect } from 'react';
import { LocationInfo, ClassType, SessionCount, LocationKey } from '../types';
import { LOCATIONS_DATA, COURSE_RATES } from '../data/aqualuxData';

const LOCAL_STORAGE_LOCATIONS_KEY = 'aqualux_locations_data_v1';
const LOCAL_STORAGE_RATES_KEY = 'aqualux_course_rates_v1';
const LOCAL_STORAGE_CONTACTS_KEY = 'aqualux_admin_contacts_v1';
const LOCAL_STORAGE_LINKBIO_PROFILE_KEY = 'aqualux_linkbio_profile_v1';
const LOCAL_STORAGE_LINKBIO_ITEMS_KEY = 'aqualux_linkbio_items_v1';

export interface AdminContacts {
  faqihPhone: string;
  abedPhone: string;
}

export interface LinkBioProfile {
  title?: string;
  handle: string;
  bioText: string;
  instagramUrl: string;
}

export interface LinkBioItem {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  badge: string;
  iconName: string;
  enabled: boolean;
}

interface AqualuxDataContextType {
  locations: Record<LocationKey, LocationInfo>;
  courseRates: Record<ClassType, Record<SessionCount, { price: number; perSession: number; discount?: string }>>;
  adminContacts: AdminContacts;
  linkBioProfile: LinkBioProfile;
  linkBioItems: LinkBioItem[];
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isWaModalOpen: boolean;
  waModalMessage: string;
  openWaModal: (message?: string) => void;
  closeWaModal: () => void;
  updateLocation: (key: LocationKey, updated: Partial<LocationInfo>) => void;
  updateCourseRate: (classType: ClassType, sessions: SessionCount, price: number, discount?: string) => void;
  updateAdminContacts: (contacts: Partial<AdminContacts>) => void;
  updateLinkBioProfile: (profile: Partial<LinkBioProfile>) => void;
  addLinkBioItem: (item: Omit<LinkBioItem, 'id'>) => void;
  updateLinkBioItem: (id: string, item: Partial<LinkBioItem>) => void;
  deleteLinkBioItem: (id: string) => void;
  toggleLinkBioItem: (id: string) => void;
  resetToDefault: () => void;
}

const DEFAULT_CONTACTS: AdminContacts = {
  faqihPhone: '082142698440',
  abedPhone: '08995911927'
};

const DEFAULT_LINKBIO_PROFILE: LinkBioProfile = {
  title: 'Aqualux Swimming Course',
  handle: '@aqualux.swimcourse',
  bioText: 'Kursus Renang Privat 1-on-1 & Reguler di Malang, dibimbing oleh pelatih berlisensi.',
  instagramUrl: 'https://www.instagram.com/aqualux.swimcourse/'
};

const DEFAULT_LINKBIO_ITEMS: LinkBioItem[] = [
  {
    id: '1',
    title: 'Kunjungi Website Resmi Aqualux',
    subtitle: 'Landing Page & Informasi Lengkap',
    url: '/',
    badge: 'WEBSITE',
    iconName: 'Globe',
    enabled: true
  },
  {
    id: '2',
    title: 'Chat WA Admin 1 (Coach Faqih)',
    subtitle: 'Konsultasi Program & Pendaftaran',
    url: 'wa_admin1',
    badge: 'WHATSAPP',
    iconName: 'MessageCircle',
    enabled: true
  },
  {
    id: '3',
    title: 'Chat WA Admin 2 (Coach Abed)',
    subtitle: 'Konsultasi Program & Pendaftaran',
    url: 'wa_admin2',
    badge: 'WHATSAPP',
    iconName: 'MessageCircle',
    enabled: true
  },
  {
    id: '4',
    title: 'Instagram Resmi @aqualux.swimcourse',
    subtitle: 'Galeri Foto, Video Sesi & Info Terbaru',
    url: 'https://www.instagram.com/aqualux.swimcourse/',
    badge: 'INSTAGRAM',
    iconName: 'Instagram',
    enabled: true
  }
];

const AqualuxDataContext = createContext<AqualuxDataContextType | undefined>(undefined);

export const AqualuxDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isWaModalOpen, setIsWaModalOpen] = useState(false);
  const [waModalMessage, setWaModalMessage] = useState('');

  const openWaModal = (message?: string) => {
    setWaModalMessage(message || 'Halo Admin Aqualux, saya mau tanya-tanya informasi kursus renang privat/reguler di Malang.');
    setIsWaModalOpen(true);
  };

  const closeWaModal = () => {
    setIsWaModalOpen(false);
  };

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

  // LinkBio Profile state
  const [linkBioProfile, setLinkBioProfile] = useState<LinkBioProfile>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_LINKBIO_PROFILE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        parsed.title = 'Aqualux Swimming Course';
        parsed.handle = '@aqualux.swimcourse';
        parsed.bioText = 'Kursus Renang Privat 1-on-1 & Reguler di Malang, dibimbing oleh pelatih berlisensi.';
        parsed.instagramUrl = 'https://www.instagram.com/aqualux.swimcourse/';
        return parsed;
      }
      return DEFAULT_LINKBIO_PROFILE;
    } catch {
      return DEFAULT_LINKBIO_PROFILE;
    }
  });

  // LinkBio Items state
  const [linkBioItems, setLinkBioItems] = useState<LinkBioItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_LINKBIO_ITEMS_KEY);
      if (saved) {
        const parsed: LinkBioItem[] = JSON.parse(saved);
        parsed.forEach(item => {
          if (item.url === 'wa_admin1' || item.url === 'wa_admin2') {
            item.subtitle = 'Konsultasi Program & Pendaftaran';
          }
          if (item.iconName === 'Instagram' || item.url.includes('instagram.com')) {
            item.title = 'Instagram Resmi @aqualux.swimcourse';
            item.subtitle = 'Galeri Foto, Video Sesi & Info Terbaru';
            item.url = 'https://www.instagram.com/aqualux.swimcourse/';
          }
        });
        const hasIg = parsed.some(item => item.iconName === 'Instagram' || item.url.includes('instagram.com'));
        if (!hasIg) {
          parsed.push(DEFAULT_LINKBIO_ITEMS[3]);
        }
        return parsed;
      }
      return DEFAULT_LINKBIO_ITEMS;
    } catch {
      return DEFAULT_LINKBIO_ITEMS;
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

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_LINKBIO_PROFILE_KEY, JSON.stringify(linkBioProfile));
    } catch (e) {
      console.error('Failed to save linkBioProfile', e);
    }
  }, [linkBioProfile]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_LINKBIO_ITEMS_KEY, JSON.stringify(linkBioItems));
    } catch (e) {
      console.error('Failed to save linkBioItems', e);
    }
  }, [linkBioItems]);

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

  const updateLinkBioProfile = (profile: Partial<LinkBioProfile>) => {
    setLinkBioProfile(prev => ({ ...prev, ...profile }));
  };

  const addLinkBioItem = (item: Omit<LinkBioItem, 'id'>) => {
    const newItem: LinkBioItem = {
      ...item,
      id: Date.now().toString()
    };
    setLinkBioItems(prev => [...prev, newItem]);
  };

  const updateLinkBioItem = (id: string, updated: Partial<LinkBioItem>) => {
    setLinkBioItems(prev => prev.map(item => item.id === id ? { ...item, ...updated } : item));
  };

  const deleteLinkBioItem = (id: string) => {
    setLinkBioItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleLinkBioItem = (id: string) => {
    setLinkBioItems(prev => prev.map(item => item.id === id ? { ...item, enabled: !item.enabled } : item));
  };

  const resetToDefault = () => {
    setLocations(LOCATIONS_DATA);
    setCourseRates(COURSE_RATES);
    setAdminContacts(DEFAULT_CONTACTS);
    setLinkBioProfile(DEFAULT_LINKBIO_PROFILE);
    setLinkBioItems(DEFAULT_LINKBIO_ITEMS);
    localStorage.removeItem(LOCAL_STORAGE_LOCATIONS_KEY);
    localStorage.removeItem(LOCAL_STORAGE_RATES_KEY);
    localStorage.removeItem(LOCAL_STORAGE_CONTACTS_KEY);
    localStorage.removeItem(LOCAL_STORAGE_LINKBIO_PROFILE_KEY);
    localStorage.removeItem(LOCAL_STORAGE_LINKBIO_ITEMS_KEY);
  };

  return (
    <AqualuxDataContext.Provider
      value={{
        locations,
        courseRates,
        adminContacts,
        linkBioProfile,
        linkBioItems,
        isAdminOpen,
        setIsAdminOpen,
        isWaModalOpen,
        waModalMessage,
        openWaModal,
        closeWaModal,
        updateLocation,
        updateCourseRate,
        updateAdminContacts,
        updateLinkBioProfile,
        addLinkBioItem,
        updateLinkBioItem,
        deleteLinkBioItem,
        toggleLinkBioItem,
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
