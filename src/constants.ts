export const TOKEN_KEY = 'access_token';
export const apiUrl = '';
export const defaultDelay = 500;
export const defaultCurrentPage = 0;

export const laptopBreakPoint = 1024;
export const tabletBreakPoint = 768;
export const mobileBreakPoint = 500;

export const responsiveOptions = [
  {
    breakpoint: `${laptopBreakPoint}px`,
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: `${tabletBreakPoint}px`,
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: `${mobileBreakPoint}px`,
    numVisible: 1,
    numScroll: 1,
  },
];

export const adminRole = 'ADMIN_REALM';
export const moderatorRole = 'MODERATOR_REALM';
export const authorRole = 'AUTHOR_REALM';
export const journalistRole = 'JOURNALIST_REALM';
export const userRole = 'USER_REALM';

export const roleLabels = {
  moderatorRole: 'moderator',
  authorRole: 'author',
  userRole: 'user',
  adminRole: 'admin',
  journalistRole: 'journalist',
};

export const notFoundTextColor = 'black';
export const notFoundTitle = '404';
export const notFoundSubTitle = 'The page you’re looking for doesn’t exist.';
export const notFoundButtonText = 'Back Home';
