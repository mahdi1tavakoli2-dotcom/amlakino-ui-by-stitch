import React from 'react';
import { useModals } from '../context/ModalContext';
import { useToast } from '../context/ToastContext';
import { useRouter } from '../router/RouterContext';

import { CallModal } from '../../components/CallModal';
import { SnoozeModal } from '../../components/SnoozeModal';
import { SharePropertyModal } from '../../components/SharePropertyModal';
import { MatchDetailsModal } from '../../components/MatchDetailsModal';
import { RouteModal } from '../../components/RouteModal';
import { ContractModal } from '../../components/ContractModal';
import { QuickAddModal } from '../../components/QuickAddModal';
import { AllFollowUpsDrawer } from '../../components/AllFollowUpsDrawer';
import { AllMatchesDrawer } from '../../components/AllMatchesDrawer';
import { NotificationsDrawer } from '../../components/NotificationsDrawer';
import { SearchModal } from '../../components/SearchModal';
import { AssistantModal } from '../../components/AssistantModal';

import { followUpsList, propertyMatchesList, schedulesList, urgentTaskData, FollowUpItem, ScheduleItem, PropertyMatch } from '../../data/mockData';

interface GlobalModalsProps {
  onClearNotifications?: () => void;
}

export const GlobalModals: React.FC<GlobalModalsProps> = ({ onClearNotifications }) => {
  const {
    callingContact,
    closeCall,
    openCall,
    snoozingTask,
    closeSnooze,
    sharingMatch,
    closeShare,
    openShare,
    viewingMatch,
    closeMatchDetails,
    openMatchDetails,
    navigatingSchedule,
    openRoute,
    closeRoute,
    viewingContract,
    closeContract,
    openContract,
    isQuickAddOpen,
    closeQuickAdd,
    isAllFollowUpsOpen,
    closeAllFollowUps,
    isAllMatchesOpen,
    closeAllMatches,
    isNotificationsOpen,
    closeNotifications,
    isSearchOpen,
    closeSearch,
    isAssistantOpen,
    closeAssistant,
  } = useModals();

  const { showToast } = useToast();
  const { navigate } = useRouter();

  const handleCallSuccess = (note: string) => {
    showToast(`یادداشت تماس ثبت گردید: ${note}`);
  };

  const handleConfirmSnooze = (taskId: string, durationText: string) => {
    closeSnooze();
    showToast(`پیگیری تماس به مدت ${durationText} به تعویق افتاد.`);
  };

  const handleShareSent = (channel: string) => {
    showToast(`فایل با موفقیت از طریق ${channel} ارسال شد.`);
  };

  const handleCallFollowUp = (item: FollowUpItem) => {
    openCall({
      contactName: item.name,
      phoneNumber: item.phone,
      subtitle: item.proposal,
    });
  };

  const handleCallSchedule = (item: ScheduleItem) => {
    openCall({
      contactName: item.subtitle,
      phoneNumber: item.phone || '۰۹۱۲۳۳۳۴۴۵۵',
      subtitle: item.title,
    });
  };

  return (
    <>
      {/* Active Call Modal */}
      {callingContact && (
        <CallModal
          contactName={callingContact.contactName}
          phoneNumber={callingContact.phoneNumber}
          subtitle={callingContact.subtitle}
          onClose={closeCall}
          onCallSuccess={handleCallSuccess}
        />
      )}

      {/* Snooze Modal */}
      {snoozingTask && (
        <SnoozeModal
          task={snoozingTask}
          onClose={closeSnooze}
          onConfirmSnooze={handleConfirmSnooze}
        />
      )}

      {/* Share Property Modal */}
      {sharingMatch && (
        <SharePropertyModal
          match={sharingMatch}
          onClose={closeShare}
          onSent={handleShareSent}
        />
      )}

      {/* Match Details Breakdown Modal */}
      {viewingMatch && (
        <MatchDetailsModal
          match={viewingMatch}
          onClose={closeMatchDetails}
          onShare={(m) => {
            closeMatchDetails();
            openShare(m);
          }}
        />
      )}

      {/* Navigation Route Modal */}
      {navigatingSchedule && (
        <RouteModal
          schedule={navigatingSchedule}
          onClose={closeRoute}
          onCall={handleCallSchedule}
        />
      )}

      {/* Contract Details Modal */}
      {viewingContract && (
        <ContractModal
          schedule={viewingContract}
          onClose={closeContract}
        />
      )}

      {/* Quick Add Bottom Sheet */}
      {isQuickAddOpen && (
        <QuickAddModal
          onClose={closeQuickAdd}
          onAdded={(msg) => showToast(msg)}
        />
      )}

      {/* All Follow-Ups Drawer */}
      {isAllFollowUpsOpen && (
        <AllFollowUpsDrawer
          items={followUpsList}
          onClose={closeAllFollowUps}
          onCall={(item) => {
            closeAllFollowUps();
            handleCallFollowUp(item);
          }}
        />
      )}

      {/* All High-Score Matches Drawer */}
      {isAllMatchesOpen && (
        <AllMatchesDrawer
          matches={propertyMatchesList}
          onClose={closeAllMatches}
          onSelectMatch={(m) => {
            closeAllMatches();
            openMatchDetails(m);
          }}
          onShare={(m) => {
            closeAllMatches();
            openShare(m);
          }}
        />
      )}

      {/* Notifications Drawer */}
      {isNotificationsOpen && (
        <NotificationsDrawer
          onClose={closeNotifications}
          onClear={() => {
            onClearNotifications?.();
            showToast('تمام اعلان‌ها بررسی و خوانده شدند.');
          }}
          onSelectUrgent={() =>
            openCall({
              contactName: urgentTaskData.name,
              phoneNumber: urgentTaskData.phone,
              subtitle: urgentTaskData.propertyInterest,
            })
          }
          onSelectMatch={() => openMatchDetails(propertyMatchesList[0])}
          onSelectMeeting={() => openContract(schedulesList[1])}
        />
      )}

      {/* Unified Search Modal */}
      {isSearchOpen && (
        <SearchModal
          onClose={closeSearch}
          onSelectProperty={(p) => openMatchDetails(p)}
          onSelectClient={(c) => handleCallFollowUp(c)}
          onSelectSchedule={(s) => {
            if (s.type === 'visit') openRoute(s);
            else openContract(s);
          }}
        />
      )}

      {/* Smart Assistant Diagnostic Modal */}
      {isAssistantOpen && (
        <AssistantModal onClose={closeAssistant} />
      )}
    </>
  );
};
