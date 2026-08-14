'use client';

import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {
  isEmergencyOpen: boolean;
  openEmergency: () => void;
  closeEmergency: () => void;

  isWhatsAppOpen: boolean;
  whatsAppContext: { message?: string; service?: string; city?: string };
  openWhatsApp: (context?: { message?: string; service?: string; city?: string }) => void;
  closeWhatsApp: () => void;

  isLeadDrawerOpen: boolean;
  leadDrawerContext: { title?: string; service?: string };
  openLeadDrawer: (context?: { title?: string; service?: string }) => void;
  closeLeadDrawer: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [whatsAppContext, setWhatsAppContext] = useState<{ message?: string; service?: string; city?: string }>({});
  const [isLeadDrawerOpen, setIsLeadDrawerOpen] = useState(false);
  const [leadDrawerContext, setLeadDrawerContext] = useState<{ title?: string; service?: string }>({});

  const openEmergency = () => setIsEmergencyOpen(true);
  const closeEmergency = () => setIsEmergencyOpen(false);

  const openWhatsApp = (ctx?: { message?: string; service?: string; city?: string }) => {
    setWhatsAppContext(ctx || {});
    setIsWhatsAppOpen(true);
  };
  const closeWhatsApp = () => setIsWhatsAppOpen(false);

  const openLeadDrawer = (ctx?: { title?: string; service?: string }) => {
    setLeadDrawerContext(ctx || {});
    setIsLeadDrawerOpen(true);
  };
  const closeLeadDrawer = () => setIsLeadDrawerOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isEmergencyOpen,
        openEmergency,
        closeEmergency,
        isWhatsAppOpen,
        whatsAppContext,
        openWhatsApp,
        closeWhatsApp,
        isLeadDrawerOpen,
        leadDrawerContext,
        openLeadDrawer,
        closeLeadDrawer,
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
