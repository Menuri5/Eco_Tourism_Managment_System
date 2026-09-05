/**
 * StaysContext — Shared state for Stays & Dining data.
 * Provides CRUD operations so admin changes reflect on tourist pages.
 * Initialized from mock data; all mutations are in-memory (no backend).
 */
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { stays as initialStays } from '../data/stays';

const StaysContext = createContext(null);

const getInitialState = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage`, error);
    return fallback;
  }
};

export function StaysProvider({ children }) {
  const [stays, setStays] = useState(() => getInitialState('ecolanka_stays', initialStays));

  useEffect(() => {
    localStorage.setItem('ecolanka_stays', JSON.stringify(stays));
  }, [stays]);

  /** Add a new stay/dining place */
  const addStay = useCallback((newStay) => {
    const id = Math.max(0, ...stays.map((s) => s.id)) + 1;
    const stay = {
      ...newStay,
      id,
      rating: 0,
      reviewCount: 0,
      reviews: [],
      images: newStay.images || [newStay.image],
    };
    setStays((prev) => [...prev, stay]);
    return stay;
  }, [stays]);

  /** Update an existing place by id */
  const updateStay = useCallback((id, updates) => {
    setStays((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  }, []);

  /** Delete a place by id */
  const deleteStay = useCallback((id) => {
    setStays((prev) => prev.filter((s) => s.id !== id));
  }, []);

  /** Get a single place by id */
  const getStay = useCallback(
    (id) => stays.find((s) => s.id === Number(id)),
    [stays]
  );

  return (
    <StaysContext.Provider value={{ stays, addStay, updateStay, deleteStay, getStay }}>
      {children}
    </StaysContext.Provider>
  );
}

export function useStays() {
  const context = useContext(StaysContext);
  if (!context) {
    throw new Error('useStays must be used within a StaysProvider');
  }
  return context;
}

export default StaysContext;
