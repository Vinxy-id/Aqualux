import React, { createContext, useContext, useState, useEffect } from 'react';
import { LocationInfo, ClassType, SessionCount, LocationKey, GalleryItem } from '../types';
import { LOCATIONS_DATA, COURSE_RATES, INITIAL_GALLERY_DATA } from '../data/aqualuxData';

const LOCAL_STORAGE_LOCATIONS_KEY = 'aqualux_locations_data_v2';
const LOCAL_STORAGE_RATES_KEY = 'aqualux_course_rates_v2';
const LOCAL_STORAGE_CONTACTS_KEY = 'aqualux_admin_contacts_v1';
const LOCAL_STORAGE_LINKBIO_PROFILE_KEY = 'aqualux_linkbio_profile_v1';
const LOCAL_STORAGE_LINKBIO_ITEMS_KEY = 'aqualux_linkbio_items_v2';
const LOCAL_STORAGE_GALLERY_KEY = 'aqualux_gallery_items_v1';

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
  galleryItems: GalleryItem[];
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
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;
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
    title: 'Chat WA Coach Faqih',
    subtitle: 'Konsultasi Program & Pendaftaran',
    url: 'wa_admin1',
    badge: 'WHATSAPP',
    iconName: 'MessageCircle',
    enabled: true
  },
  {
    id: '3',
    title: 'Chat WA Coach Abed',
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
  const [locations, setLocations] = useState<Record<LocationKey, LocationInfo>>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_LOCATIONS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return LOCATIONS_DATA;
      }
    }
    return LOCATIONS_DATA;
  });

  const [courseRates, setCourseRates] = useState<Record<ClassType, Record<SessionCount, { price: number; perSession: number; discount?: string }>>>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_RATES_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return COURSE_RATES;
      }
    }
    return COURSE_RATES;
  });

  const [adminContacts, setAdminContacts] = useState<AdminContacts>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_CONTACTS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_CONTACTS;
      }
    }
    return DEFAULT_CONTACTS;
  });

  const [linkBioProfile, setLinkBioProfile] = useState<LinkBioProfile>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_LINKBIO_PROFILE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_LINKBIO_PROFILE;
      }
    }
    return DEFAULT_LINKBIO_PROFILE;
  });

  const [linkBioItems, setLinkBioItems] = useState<LinkBioItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_LINKBIO_ITEMS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_LINKBIO_ITEMS;
      }
    }
    return DEFAULT_LINKBIO_ITEMS;
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_GALLERY_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_GALLERY_DATA;
      }
    }
    return INITIAL_GALLERY_DATA;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isWaModalOpen, setIsWaModalOpen] = useState(false);
  const [waModalMessage, setWaModalMessage] = useState('');

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_LOCATIONS_KEY, JSON.stringify(locations));
  }, [locations]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_RATES_KEY, JSON.stringify(courseRates));
  }, [courseRates]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CONTACTS_KEY, JSON.stringify(adminContacts));
  }, [adminContacts]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_LINKBIO_PROFILE_KEY, JSON.stringify(linkBioProfile));
  }, [linkBioProfile]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_LINKBIO_ITEMS_KEY, JSON.stringify(linkBioItems));
  }, [linkBioItems]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_GALLERY_KEY, JSON.stringify(galleryItems));
  }, [galleryItems]);

  const openWaModal = (message?: string) => {
    setWaModalMessage(message || '');
    setIsWaModalOpen(true);
  };

  const closeWaModal = () => {
    setIsWaModalOpen(false);
  };

  const updateLocation = (key: LocationKey, updated: Partial<LocationInfo>) => {
    setLocations(prev => ({
      ...prev,
      [key]: { ...prev[key], ...updated }
    }));
  };

  const updateCourseRate = (classType: ClassType, sessions: SessionCount, price: number, discount?: string) => {
    setCourseRates(prev => {
      const updatedClass = { ...prev[classType] };
      const currentObj = updatedClass[sessions];
      const perSession = Math.round(price / sessions);

      updatedClass[sessions] = {
        ...currentObj,
        price,
        perSession,
        discount
      };

      return {
        ...prev,
        [classType]: updatedClass
      };
    });
  };

  const updateAdminContacts = (updated: Partial<AdminContacts>) => {
    setAdminContacts(prev => ({ ...prev, ...updated }));
  };

  const updateLinkBioProfile = (updated: Partial<LinkBioProfile>) => {
    setLinkBioProfile(prev => ({ ...prev, ...updated }));
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

  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: 'gal-' + Date.now().toString()
    };
    setGalleryItems(prev => [newItem, ...prev]);
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryItems(prev => prev.filter(item => item.id !== id));
  };

  const resetToDefault = () => {
    setLocations(LOCATIONS_DATA);
    setCourseRates(COURSE_RATES);
    setAdminContacts(DEFAULT_CONTACTS);
    setLinkBioProfile(DEFAULT_LINKBIO_PROFILE);
    setLinkBioItems(DEFAULT_LINKBIO_ITEMS);
    setGalleryItems(INITIAL_GALLERY_DATA);
    localStorage.removeItem(LOCAL_STORAGE_LOCATIONS_KEY);
    localStorage.removeItem(LOCAL_STORAGE_RATES_KEY);
    localStorage.removeItem(LOCAL_STORAGE_CONTACTS_KEY);
    localStorage.removeItem(LOCAL_STORAGE_LINKBIO_PROFILE_KEY);
    localStorage.removeItem(LOCAL_STORAGE_LINKBIO_ITEMS_KEY);
    localStorage.removeItem(LOCAL_STORAGE_GALLERY_KEY);
  };

  return (
    <AqualuxDataContext.Provider
      value={{
        locations,
        courseRates,
        adminContacts,
        linkBioProfile,
        linkBioItems,
        galleryItems,
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
        addGalleryItem,
        deleteGalleryItem,
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
