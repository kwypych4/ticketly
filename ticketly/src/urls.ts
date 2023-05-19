export const appUrls = {
  app: {
    base: '',
    pages: {
      homepage: '',
      users: 'users',
      tickets: {
        base: 'tickets',
        details: 'tickets/:ticketId',
      },
      settings: 'settings',
    },
  },
  auth: {
    base: '',
    pages: {
      login: 'login',
    },
  },
  error: {
    base: '',
    pages: {
      notFound: '*',
      forbidden: 'forbidden',
    },
  },
};

export const appRoutes = {
  app: {
    homepage: `${appUrls.app.base}/${appUrls.app.pages.homepage}`,
    users: `${appUrls.app.base}/${appUrls.app.pages.users}`,
    tickets: {
      index: `${appUrls.app.base}/${appUrls.app.pages.tickets.base}`,
      details: `${appUrls.app.base}/${appUrls.app.pages.tickets.details}`,
    },
    settings: `${appUrls.app.base}/${appUrls.app.pages.settings}`,
  },
  auth: {
    login: `${appUrls.auth.base}/${appUrls.auth.pages.login}`,
  },
  error: {
    notFound: `${appUrls.error.base}/${appUrls.error.pages.notFound}`,
    forbidden: `${appUrls.error.base}/${appUrls.error.pages.forbidden}`,
  },
};

const baseURL = import.meta.env.DEV ? import.meta.env.VITE_APP_DEV_API_BASE : import.meta.env.VITE_APP_PROD_API_BASE;

const url = (base: string) => (details?: string | number) => `${baseURL}/${base}${details ? `/${details}` : ''}`;

export const apiUrls = {
  auth: {
    login: url('auth/login'),
    logout: url('auth/logout'),
    logoutAll: url('auth/logout_all'),
    accessToken: url('auth/access_token'),
  },
  tickets: {
    index: url('tickets'),
    details: url('tickets'),
    filters: url('tickets/filters'),
  },
  comments: {
    index: url('comments'),
  },
  attachments: {
    index: url('attachments'),
  },
  users: {
    index: url('users'),
    filters: url('users/filters'),
  },
};
