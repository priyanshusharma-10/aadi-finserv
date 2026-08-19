export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  highlight?: string;
}

export const services: ServiceItem[] = [
  {
    id: 'personal',
    icon: 'User',
    title: 'Personal Loan',
    description:
      'Quick, unsecured personal loans for medical emergencies, weddings, travel, or any personal need. Minimal documentation, competitive rates, fast approval.',
    highlight: 'Up to ₹40 Lakhs',
  },
  {
    id: 'salaried',
    icon: 'Briefcase',
    title: 'Salaried Loan',
    description:
      'Exclusive low-interest loan products for salaried professionals and government employees, with flexible tenures aligned to your monthly cash flow.',
    highlight: 'From 10.5% p.a.',
  },
  {
    id: 'business',
    icon: 'TrendingUp',
    title: 'Unsecured Business Loan',
    description:
      'Grow your enterprise without collateral. Fast, high-value unsecured business loans for SMEs, startups, and established businesses across Madhya Pradesh.',
    highlight: 'No Collateral',
  },
  {
    id: 'professional',
    icon: 'Stethoscope',
    title: 'Professional & Doctors Loan',
    description:
      'High-limit unsecured loans tailored for doctors, CAs, architects, and qualified professionals. We understand the unique cash flow of professional practices.',
    highlight: 'High Limits',
  },
  {
    id: 'home',
    icon: 'Home',
    title: 'Home Loan',
    description:
      'Make your dream home a reality with competitive home loan rates, flexible tenures up to 30 years, and dedicated assistance with builder tie-ups and legalities.',
    highlight: 'From 8.5% p.a.',
  },
  {
    id: 'lap',
    icon: 'Building',
    title: 'Loan Against Property',
    description:
      'Unlock the value of your residential or commercial property for business expansion, debt consolidation, or major milestones at lower rates than unsecured loans.',
    highlight: 'Up to 75% LTV',
  },
  {
    id: 'land',
    icon: 'MapPin',
    title: 'Loan Against Land / Plot',
    description:
      'Secure substantial funding against vacant residential or commercial plots. Hassle-free valuation, maximum loan-to-value, and quick disbursal timelines.',
    highlight: 'Quick Disbursal',
  },
  {
    id: 'warehouse',
    icon: 'Warehouse',
    title: 'Loan Against Warehouses',
    description:
      'Specialized industrial financing for logistics companies and manufacturers holding warehouse or godown properties in Madhya Pradesh\'s industrial corridors.',
    highlight: 'Industrial Finance',
  },
  {
    id: 'channel',
    icon: 'Network',
    title: 'Channel Finance',
    description:
      'Working capital solutions and dealer financing for distributors and channel partners. Maintain seamless inventory flow without straining business reserves.',
    highlight: 'Working Capital',
  },
  {
    id: 'overdraft',
    icon: 'RefreshCw',
    title: 'Overdraft Limit',
    description:
      'Flexible revolving overdraft facilities to manage daily cash flow gaps efficiently. Pay interest only on the amount utilized — a cost-effective business tool.',
    highlight: 'Revolving Credit',
  },
  {
    id: 'dropline',
    icon: 'TrendingDown',
    title: 'Dropline Overdraft',
    description:
      'Structured overdraft limits that reduce over time per a pre-defined schedule. Ideal for project-based, seasonal, or contract-based funding needs.',
    highlight: 'Project Finance',
  },
  {
    id: 'vehicle',
    icon: 'Truck',
    title: 'Vehicle & Machinery Loan',
    description:
      'Comprehensive financing for commercial vehicles, construction equipment, and heavy machinery. Boost operational capacity with tailored asset financing.',
    highlight: 'Asset Finance',
  },
];
