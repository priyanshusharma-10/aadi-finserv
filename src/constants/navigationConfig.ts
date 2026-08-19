export interface NavItem {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
  isAnchor?: boolean;
}

export const mainNavItems: NavItem[] = [
  { id: 'services', label: 'Services', href: '/#services', isAnchor: true },
  { id: 'how-it-works', label: 'How it Works', href: '/#how-it-works', isAnchor: true },
  { id: 'about', label: 'About Us', href: '/#about', isAnchor: true },
  { id: 'rates', label: 'Rates', href: '/rates' },
  { id: 'documents', label: 'Documents', href: '/documents' },
  { id: 'faq', label: 'FAQ', href: '/faq' },
];

export const footerProductLinks: NavItem[] = [
  { id: 'personal', label: 'Personal Loan', href: '/#services', isAnchor: true },
  { id: 'business', label: 'Business Loan', href: '/#services', isAnchor: true },
  { id: 'home-loan', label: 'Home Loan', href: '/#services', isAnchor: true },
  { id: 'lap', label: 'Loan Against Property', href: '/#services', isAnchor: true },
  { id: 'rates', label: 'Interest Rates', href: '/rates' },
];

export const footerCompanyLinks: NavItem[] = [
  { id: 'about', label: 'About Us', href: '/#about', isAnchor: true },
  { id: 'contact', label: 'Contact Us', href: '/#contact', isAnchor: true },
  { id: 'service-areas', label: 'Service Areas', href: '/#service-areas', isAnchor: true },
  { id: 'apply', label: 'Apply Now', href: '/apply' },
];

export const footerLegalLinks: NavItem[] = [
  { id: 'privacy', label: 'Privacy Policy', href: '/privacy' },
  { id: 'terms', label: 'Terms of Use', href: '/terms' },
  { id: 'fair-practices', label: 'Fair Practices Code', href: '/fair-practices' },
  { id: 'grievance', label: 'Grievance Redressal', href: '/grievance' },
];
