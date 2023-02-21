import { avatarColors } from '@/utils/constants';

export const getFirstLetterFromName = (name: string) => name[0].toUpperCase();

export const getAvatarBackgroundColor = () => avatarColors[Math.floor(avatarColors.length * Math.random())];
