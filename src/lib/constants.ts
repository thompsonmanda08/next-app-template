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
  SETUP: 'setup',
};

// const NRC_PASSPORT = /^(ZN[0-9]{6}|[0-9]{6}/[0-9]{2}/[1]{1})$/

// REGEX
export const MTN_NO = /^(?:\+?26|26)?0(96|76)\d{7}$/;
export const AIRTEL_NO = /^(?:\+?26|26)?0(97|77)\d{7}$/;
export const ZAMTEL_NO = /^(?:\+?26|26)?0(95|75)\d{7}$/;

export const PASSWORD_PATTERN =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

// ANIMATION_VARIANTS
export const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      // staggerChildren: 0.25,
    },
  },
  exit: { opacity: 0 },
};

export const staggerContainerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      // staggerChildren: 0.25,
    },
  },
  exit: { opacity: 0 },
};

export const staggerContainerItemVariants = {
  hidden: { opacity: 0, y: -60 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 60 },
};

export const slideDownInView = {
  hidden: {
    opacity: 0,
    y: -100,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};
