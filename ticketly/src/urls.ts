export const appUrls = {
  app: {
    base: '/',
    pages: {
      homepage: '',
      users: 'users',
      tickets: 'tickets',
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
    tickets: `${appUrls.app.base}/${appUrls.app.pages.tickets}`,
    settings: `${appUrls.app.base}/${appUrls.app.pages.settings}`,
  },
};
