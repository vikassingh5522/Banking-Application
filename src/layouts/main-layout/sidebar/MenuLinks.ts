import { businessModules } from 'data/business-dashboard';

export interface MenuLinkType {
  id: number;
  title: string;
  link: string;
  icon: string;
}

export const menuLinks: MenuLinkType[] = [
  {
    id: 1,
    title: 'Dashboard',
    link: '/dashboard',
    icon: 'lucide:layout-dashboard',
  },
  ...businessModules.map((module, index) => ({
    id: index + 2,
    title: module.title,
    link: module.path,
    icon: module.icon,
  })),
];
