/**
 * GlobalDataContext - Shared state for Destinations, Categories, Guides, and Campaigns.
 * Provides CRUD operations so admin changes reflect instantly on tourist pages.
 * Initialized from mock data; all mutations are in-memory (no backend).
 */
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { destinations as initialDestinations } from '../data/destinations';
import { categories as initialCategories } from '../data/categories';
import { guides as initialGuides } from '../data/guides';
import { campaigns as initialCampaigns } from '../data/campaigns';

const GlobalDataContext = createContext(null);

// Helper to init state from localStorage
const getInitialState = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage`, error);
    return fallback;
  }
};

export function GlobalDataProvider({ children }) {
  // ─── State ───
  const [destinations, setDestinations] = useState(() => getInitialState('ecolanka_destinations', initialDestinations));
  const [categories, setCategories] = useState(() => {
    const saved = getInitialState('ecolanka_categories', null);
    if (!saved) return initialCategories;
    // Always use the latest image imports from source code
    return saved.map(cat => {
      const initialCat = initialCategories.find(c => c.id === cat.id);
      return initialCat ? { ...cat, image: initialCat.image } : cat;
    });
  });
  const [guides, setGuides] = useState(() => getInitialState('ecolanka_guides', initialGuides));
  const [campaigns, setCampaigns] = useState(() => getInitialState('ecolanka_campaigns', initialCampaigns));

  // Sync state to localStorage whenever it changes
  useEffect(() => { localStorage.setItem('ecolanka_destinations', JSON.stringify(destinations)); }, [destinations]);
  useEffect(() => { localStorage.setItem('ecolanka_categories', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem('ecolanka_guides', JSON.stringify(guides)); }, [guides]);
  useEffect(() => { localStorage.setItem('ecolanka_campaigns', JSON.stringify(campaigns)); }, [campaigns]);

  // ─── Destinations CRUD ───
  const addDestination = useCallback((newItem) => {
    const id = Math.max(0, ...destinations.map(d => d.id)) + 1;
    const item = { ...newItem, id, rating: 0, reviewCount: 0 };
    setDestinations(prev => [...prev, item]);
    return item;
  }, [destinations]);

  const updateDestination = useCallback((id, updates) => {
    setDestinations(prev => prev.map(d => (d.id === id ? { ...d, ...updates } : d)));
  }, []);

  const deleteDestination = useCallback((id) => {
    setDestinations(prev => prev.filter(d => d.id !== id));
  }, []);

  const getDestination = useCallback((id) => destinations.find(d => d.id === Number(id)), [destinations]);

  // ─── Categories CRUD ───
  const addCategory = useCallback((newItem) => {
    const id = Math.max(0, ...categories.map(c => c.id)) + 1;
    const item = { ...newItem, id, count: 0 };
    setCategories(prev => [...prev, item]);
    return item;
  }, [categories]);

  const updateCategory = useCallback((id, updates) => {
    setCategories(prev => prev.map(c => (c.id === id ? { ...c, ...updates } : c)));
  }, []);

  const deleteCategory = useCallback((id) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  }, []);

  // ─── Guides CRUD ───
  const addGuide = useCallback((newItem) => {
    const id = Math.max(0, ...guides.map(g => g.id)) + 1;
    const item = { ...newItem, id, rating: 0, reviewCount: 0 };
    setGuides(prev => [...prev, item]);
    return item;
  }, [guides]);

  const updateGuide = useCallback((id, updates) => {
    setGuides(prev => prev.map(g => (g.id === id ? { ...g, ...updates } : g)));
  }, []);

  const deleteGuide = useCallback((id) => {
    setGuides(prev => prev.filter(g => g.id !== id));
  }, []);

  // ─── Campaigns CRUD ───
  const addCampaign = useCallback((newItem) => {
    const id = Math.max(0, ...campaigns.map(c => c.id)) + 1;
    const item = { ...newItem, id, raised: 0, donors: 0, updates: [] };
    setCampaigns(prev => [...prev, item]);
    return item;
  }, [campaigns]);

  const updateCampaign = useCallback((id, updates) => {
    setCampaigns(prev => prev.map(c => (c.id === id ? { ...c, ...updates } : c)));
  }, []);

  const deleteCampaign = useCallback((id) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
  }, []);

  const getCampaign = useCallback((id) => campaigns.find(c => c.id === Number(id)), [campaigns]);

  const value = {
    destinations, addDestination, updateDestination, deleteDestination, getDestination,
    categories, addCategory, updateCategory, deleteCategory,
    guides, addGuide, updateGuide, deleteGuide,
    campaigns, addCampaign, updateCampaign, deleteCampaign, getCampaign
  };

  return (
    <GlobalDataContext.Provider value={value}>
      {children}
    </GlobalDataContext.Provider>
  );
}

// ─── Hooks ───
export function useDestinations() {
  const context = useContext(GlobalDataContext);
  if (!context) throw new Error('useDestinations must be used within GlobalDataProvider');
  return { 
    destinations: context.destinations, 
    addDestination: context.addDestination, 
    updateDestination: context.updateDestination, 
    deleteDestination: context.deleteDestination, 
    getDestination: context.getDestination 
  };
}

export function useCategories() {
  const context = useContext(GlobalDataContext);
  if (!context) throw new Error('useCategories must be used within GlobalDataProvider');
  return { 
    categories: context.categories, 
    addCategory: context.addCategory, 
    updateCategory: context.updateCategory, 
    deleteCategory: context.deleteCategory 
  };
}

export function useGuides() {
  const context = useContext(GlobalDataContext);
  if (!context) throw new Error('useGuides must be used within GlobalDataProvider');
  return { 
    guides: context.guides, 
    addGuide: context.addGuide, 
    updateGuide: context.updateGuide, 
    deleteGuide: context.deleteGuide 
  };
}

export function useCampaigns() {
  const context = useContext(GlobalDataContext);
  if (!context) throw new Error('useCampaigns must be used within GlobalDataProvider');
  return { 
    campaigns: context.campaigns, 
    addCampaign: context.addCampaign, 
    updateCampaign: context.updateCampaign, 
    deleteCampaign: context.deleteCampaign, 
    getCampaign: context.getCampaign 
  };
}
