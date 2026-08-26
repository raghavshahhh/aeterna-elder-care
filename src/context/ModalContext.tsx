'use client';

import React, { createContext, useContext, useState } from 'react';

export interface PropertyLeadContext {
  title?: string;
  unitId?: string;
  unitCode?: string;
  unitName?: string;
  unitType?: string;
  floorName?: string;
  floorLevel?: string;
  plotNumber?: string;
  plotBlock?: string;
  plotSize?: string;
  planName?: string;
  actionType?:
    | 'reserve-unit'
    | 'reserve-plot'
    | 'book-site-visit'
    | 'site_visit'
    | 'inquire-residence'
    | 'request-pricing'
    | 'request-trust-docs'
    | 'rental-plan'
    | 'general'
    | 'brochure';
  message?: string;
  city?: string;
}

export interface FloorPlanContext {
  floorPlanType?: 'residences' | 'stilt' | 'hospital-ground' | 'hospital-first' | 'hospital-second';
  unitId?: string;
  unitName?: string;
  unitType?: string;
  title?: string;
}

interface ModalContextType {
  isWhatsAppOpen: boolean;
  whatsAppContext: PropertyLeadContext;
  openWhatsApp: (context?: PropertyLeadContext) => void;
  closeWhatsApp: () => void;

  isLeadDrawerOpen: boolean;
  leadDrawerContext: PropertyLeadContext;
  openLeadDrawer: (context?: PropertyLeadContext) => void;
  closeLeadDrawer: () => void;

  isFloorPlanOpen: boolean;
  floorPlanContext: FloorPlanContext;
  openFloorPlan: (context?: FloorPlanContext) => void;
  openFloorPlanModal: (floorPlanType?: FloorPlanContext['floorPlanType']) => void;
  closeFloorPlan: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [whatsAppContext, setWhatsAppContext] = useState<PropertyLeadContext>({});
  const [isLeadDrawerOpen, setIsLeadDrawerOpen] = useState(false);
  const [leadDrawerContext, setLeadDrawerContext] = useState<PropertyLeadContext>({});

  const [isFloorPlanOpen, setIsFloorPlanOpen] = useState(false);
  const [floorPlanContext, setFloorPlanContext] = useState<FloorPlanContext>({});

  const openWhatsApp = (ctx?: PropertyLeadContext) => {
    setWhatsAppContext(ctx || {});
    setIsWhatsAppOpen(true);
  };
  const closeWhatsApp = () => setIsWhatsAppOpen(false);

  const openLeadDrawer = (ctx?: PropertyLeadContext) => {
    setLeadDrawerContext(ctx || {});
    setIsLeadDrawerOpen(true);
  };
  const closeLeadDrawer = () => setIsLeadDrawerOpen(false);

  const openFloorPlan = (ctx?: FloorPlanContext) => {
    setFloorPlanContext(ctx || {});
    setIsFloorPlanOpen(true);
  };
  const openFloorPlanModal = (floorPlanType?: FloorPlanContext['floorPlanType']) => {
    setFloorPlanContext({ floorPlanType: floorPlanType || 'residences' });
    setIsFloorPlanOpen(true);
  };
  const closeFloorPlan = () => setIsFloorPlanOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isWhatsAppOpen,
        whatsAppContext,
        openWhatsApp,
        closeWhatsApp,
        isLeadDrawerOpen,
        leadDrawerContext,
        openLeadDrawer,
        closeLeadDrawer,
        isFloorPlanOpen,
        floorPlanContext,
        openFloorPlan,
        openFloorPlanModal,
        closeFloorPlan,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

