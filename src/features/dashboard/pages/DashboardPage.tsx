import React, { useState } from 'react';
import { HeroGreeting } from '@/src/components/HeroGreeting';
import { UrgentTaskCard } from '@/src/components/UrgentTaskCard';
import { FollowUpSection } from '@/src/components/FollowUpSection';
import { PropertyMatchSection } from '@/src/components/PropertyMatchSection';
import { ScheduleSection } from '@/src/components/ScheduleSection';
import { StatsGrid } from '@/src/components/StatsGrid';
import { RecentActivitySection } from '@/src/components/RecentActivitySection';

import { useModals } from '@/src/app/context/ModalContext';
import { useRouter } from '@/src/app/router/RouterContext';
import { useToast } from '@/src/app/context/ToastContext';
import { useProperties } from '@/src/features/properties/hooks/useProperties';
import { toPersianDigits } from '@/src/core/utils/persianNumbers';

import {
  urgentTaskData,
  followUpsList,
  propertyMatchesList,
  schedulesList,
  recentActivities,
  FollowUpItem,
  ScheduleItem,
} from '@/src/data/mockData';

export const DashboardPage: React.FC = () => {
  const {
    openCall,
    openSnooze,
    openShare,
    openMatchDetails,
    openRoute,
    openContract,
    openAllFollowUps,
    openAllMatches,
    openAssistant,
  } = useModals();

  const { navigate } = useRouter();
  const { showToast } = useToast();
  const { totalCount: activePropertiesCount } = useProperties();
  const [isUrgentDismissed, setIsUrgentDismissed] = useState(false);

  // Dynamic stats combining real property count with existing KPIs
  const currentStats = {
    activeFiles: toPersianDigits(activePropertiesCount || 24),
    activeClients: '۱۸',
    newMatches: '۴',
    todayFollowUps: '۵',
  };

  const handleCallUrgent = () => {
    openCall({
      contactName: urgentTaskData.name,
      phoneNumber: urgentTaskData.phone,
      subtitle: urgentTaskData.propertyInterest,
    });
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
    <div className="animate-fade-in pb-6">
      {/* Hero Greeting */}
      <HeroGreeting onAssistantClick={openAssistant} />

      {/* Urgent Priority Task Card */}
      {!isUrgentDismissed && (
        <UrgentTaskCard
          task={urgentTaskData}
          onCall={handleCallUrgent}
          onSnooze={(t) => openSnooze(t)}
          onCardClick={handleCallUrgent}
        />
      )}

      {/* Today's Follow-ups */}
      <FollowUpSection
        primaryItem={followUpsList[0]}
        totalCount={followUpsList.length}
        onViewAll={openAllFollowUps}
        onCall={handleCallFollowUp}
        onCardClick={handleCallFollowUp}
      />

      {/* New High-Score Matches */}
      <PropertyMatchSection
        match={propertyMatchesList[0]}
        totalMatches={propertyMatchesList.length}
        onViewAllMatches={openAllMatches}
        onShare={(m) => openShare(m)}
        onViewDetails={(m) => openMatchDetails(m)}
      />

      {/* Today's Schedule & Visits */}
      <ScheduleSection
        schedules={schedulesList}
        onOpenRoute={(s) => openRoute(s)}
        onCall={handleCallSchedule}
        onOpenContract={(s) => openContract(s)}
        onItemClick={(s) => {
          if (s.type === 'visit') openRoute(s);
          else openContract(s);
        }}
      />

      {/* Performance Summary (Stats Grid) */}
      <StatsGrid
        stats={currentStats}
        onStatClick={(statType) => {
          if (statType === 'files') navigate('properties');
          else if (statType === 'clients') navigate('clients');
          else if (statType === 'matches') openAllMatches();
          else if (statType === 'followups') openAllFollowUps();
        }}
      />

      {/* Recent Activities */}
      <RecentActivitySection
        activities={recentActivities}
        onActivityClick={(act) => {
          showToast(`جزئیات: ${act.title}`);
        }}
      />
    </div>
  );
};
