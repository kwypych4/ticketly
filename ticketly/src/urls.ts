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
    base: 'auth',
    pages: {
      login: 'login',
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
};

const url = (base: string) => (details?: string | number) => `${base}${details ? `/${details}` : ''}`;

export const apiUrls = {
  tickets: {
    index: url('tickets'),
    details: url('tickets'),
  },
};
