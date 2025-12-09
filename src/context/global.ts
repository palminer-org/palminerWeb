import { createContext } from 'react';

export interface UserInfo  {
  basePoints?: number;
  multiplier?: number;
  maxScore?: number;
  inviteCode?: string;
  referCode?: string;
  keyCounts?: number;
  inviteFriendsTask?: {
    levelInviteCounts: number;
    levelMultiplier: number;
    inviteFriendsTask: number;
    invitedCounts: number;
  },
  followTwitterTask?: {
    basePoints: number;
    completed: boolean;
  },
  joinTGTask?: {
    basePoints: number;
    completed: boolean;
  }
}

export const GlobalContext = createContext({
  userInfo: {} as UserInfo,
  setUserInfo: (info: UserInfo) => {
    console.log('setUserInfo', info);
  },
});
