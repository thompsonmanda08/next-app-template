
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL;

export const POCKET_BASE_URL =
  process.env.POCKET_BASE_URL || process.env.NEXT_PUBLIC_POCKET_BASE_URL;

export const BGS_SUPER_MERCHANT_ID = '2da3b36c-ef7f-4222-a5b1-59702109e576';

export const AUTH_SESSION = '__com.inter-webb__session';


export const placeHolderImage = '/images/placeholder-image.webp';
export const DefaultCover = '/images/profile-cover.jpg';

export const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const rowsPerPageOptions = [
  {
    ID: 5,
    label: '5',
  },
  {
    ID: 8,
    label: '8',
  },
  {
    ID: 10,
    label: '10',
  },
  {
    ID: 15,
    label: '15',
  },
  {
    ID: 20,
    label: '20',
  },
];

// QUERY KEYS
export const QUERY_KEYS = {
  configs: 'configs',
  WORKSPACE_MEMBERS: 'workspace_members',
  users: 'users',
  transactions: 'transactions',
  WORKSPACES: 'workspaces',
  SETUP: 'setup'
};


// const NRC_PASSPORT = /^(ZN[0-9]{6}|[0-9]{6}/[0-9]{2}/[1]{1})$/

// REGEX
export const MTN_NO = /^(?:\+?26|26)?0(96|76)\d{7}$/;
export const AIRTEL_NO = /^(?:\+?26|26)?0(97|77)\d{7}$/;
export const ZAMTEL_NO = /^(?:\+?26|26)?0(95|75)\d{7}$/;

export const PASSWORD_PATTERN =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

// Animation variants for Framer Motion
export const slideDownInView = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
  transition: { duration: 0.3 }
};

export const staggerContainerItemVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 20, opacity: 0 }
};

// Workspace types
export const WORKSPACE_TYPES = {
  PERSONAL: 'personal',
  BUSINESS: 'business',
  ENTERPRISE: 'enterprise'
};

// Color mappings for UI components
export const SERVICE_PROVIDER_COLOR_MAP = {
  MTN: 'yellow',
  AIRTEL: 'red', 
  ZAMTEL: 'green',
  VISA: 'blue',
  MASTERCARD: 'orange',
  DEFAULT: 'gray'
};

export const TRANSACTION_STATUS_COLOR_MAP = {
  pending: 'warning',
  completed: 'success',
  failed: 'danger',
  cancelled: 'default',
  processing: 'primary'
};

// Additional animation variants
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
