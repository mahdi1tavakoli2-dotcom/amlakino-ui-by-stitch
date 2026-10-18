import React, { createContext, useContext, useState, useCallback } from 'react';
import { UrgentTask, FollowUpItem, ScheduleItem, PropertyMatch } from '../../data/mockData';

export interface CallPayload {
  contactName: string;
  phoneNumber: string;
  subtitle?: string;
}

interface ModalContextType {
  // Call modal
  callingContact: CallPayload | null;
  openCall: (payload: CallPayload) => void;
  closeCall: () => void;

  // Snooze modal
  snoozingTask: UrgentTask | null;
  openSnooze: (task: UrgentTask) => void;
  closeSnooze: () => void;

  // Share Property modal
  sharingMatch: PropertyMatch | null;
  openShare: (match: PropertyMatch) => void;
  closeShare: () => void;

  // Match details modal
  viewingMatch: PropertyMatch | null;
  openMatchDetails: (match: PropertyMatch) => void;
  closeMatchDetails: () => void;

  // Route modal
  navigatingSchedule: ScheduleItem | null;
  openRoute: (schedule: ScheduleItem) => void;
  closeRoute: () => void;

  // Contract modal
  viewingContract: ScheduleItem | null;
  openContract: (schedule: ScheduleItem) => void;
  closeContract: () => void;

  // Drawers & auxiliary modals
  isQuickAddOpen: boolean;
  openQuickAdd: () => void;
  closeQuickAdd: () => void;

  isAllFollowUpsOpen: boolean;
  openAllFollowUps: () => void;
  closeAllFollowUps: () => void;

  isAllMatchesOpen: boolean;
  openAllMatches: () => void;
  closeAllMatches: () => void;

  isNotificationsOpen: boolean;
  openNotifications: () => void;
  closeNotifications: () => void;

  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  isAssistantOpen: boolean;
  openAssistant: () => void;
  closeAssistant: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [callingContact, setCallingContact] = useState<CallPayload | null>(null);
  const [snoozingTask, setSnoozingTask] = useState<UrgentTask | null>(null);
  const [sharingMatch, setSharingMatch] = useState<PropertyMatch | null>(null);
  const [viewingMatch, setViewingMatch] = useState<PropertyMatch | null>(null);
  const [navigatingSchedule, setNavigatingSchedule] = useState<ScheduleItem | null>(null);
  const [viewingContract, setViewingContract] = useState<ScheduleItem | null>(null);

  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isAllFollowUpsOpen, setIsAllFollowUpsOpen] = useState(false);
  const [isAllMatchesOpen, setIsAllMatchesOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const openCall = useCallback((p: CallPayload) => setCallingContact(p), []);
  const closeCall = useCallback(() => setCallingContact(null), []);

  const openSnooze = useCallback((t: UrgentTask) => setSnoozingTask(t), []);
  const closeSnooze = useCallback(() => setSnoozingTask(null), []);

  const openShare = useCallback((m: PropertyMatch) => setSharingMatch(m), []);
  const closeShare = useCallback(() => setSharingMatch(null), []);

  const openMatchDetails = useCallback((m: PropertyMatch) => setViewingMatch(m), []);
  const closeMatchDetails = useCallback(() => setViewingMatch(null), []);

  const openRoute = useCallback((s: ScheduleItem) => setNavigatingSchedule(s), []);
  const closeRoute = useCallback(() => setNavigatingSchedule(null), []);

  const openContract = useCallback((s: ScheduleItem) => setViewingContract(s), []);
  const closeContract = useCallback(() => setViewingContract(null), []);

  return (
    <ModalContext.Provider
      value={{
        callingContact,
        openCall,
        closeCall,
        snoozingTask,
        openSnooze,
        closeSnooze,
        sharingMatch,
        openShare,
        closeShare,
        viewingMatch,
        openMatchDetails,
        closeMatchDetails,
        navigatingSchedule,
        openRoute,
        closeRoute,
        viewingContract,
        openContract,
        closeContract,
        isQuickAddOpen,
        openQuickAdd: () => setIsQuickAddOpen(true),
        closeQuickAdd: () => setIsQuickAddOpen(false),
        isAllFollowUpsOpen,
        openAllFollowUps: () => setIsAllFollowUpsOpen(true),
        closeAllFollowUps: () => setIsAllFollowUpsOpen(false),
        isAllMatchesOpen,
        openAllMatches: () => setIsAllMatchesOpen(true),
        closeAllMatches: () => setIsAllMatchesOpen(false),
        isNotificationsOpen,
        openNotifications: () => setIsNotificationsOpen(true),
        closeNotifications: () => setIsNotificationsOpen(false),
        isSearchOpen,
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        isAssistantOpen,
        openAssistant: () => setIsAssistantOpen(true),
        closeAssistant: () => setIsAssistantOpen(false),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export function useModals(): ModalContextType {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModals must be used within a ModalProvider');
  }
  return context;
}
