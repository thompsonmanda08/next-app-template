
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


};


// const NRC_PASSPORT = /^(ZN[0-9]{6}|[0-9]{6}/[0-9]{2}/[1]{1})$/

// REGEX
export const MTN_NO = /^(?:\+?26|26)?0(96|76)\d{7}$/;
export const AIRTEL_NO = /^(?:\+?26|26)?0(97|77)\d{7}$/;
export const ZAMTEL_NO = /^(?:\+?26|26)?0(95|75)\d{7}$/;

export const PASSWORD_PATTERN =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
