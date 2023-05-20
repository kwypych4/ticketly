import { AuthLayout, ErrorLayout, LoggedLayout } from 'layouts';
import {
  ForbiddenPage,
  Homepage,
  LoginPage,
  NotFoundPage,
  SettingsPage,
  TicketsDetailsPage,
  TicketsPage,
  UsersPage,
} from 'pages';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { appRoutes } from 'urls';

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<LoggedLayout />}>
        <Route path={appRoutes.app.homepage} element={<Homepage />} />
        <Route path={appRoutes.app.tickets.index} element={<TicketsPage />} />
        <Route path={appRoutes.app.tickets.details} element={<TicketsDetailsPage />} />
        <Route path={appRoutes.app.users} element={<UsersPage />} />
        <Route path={appRoutes.app.settings} element={<SettingsPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path={appRoutes.auth.login} element={<LoginPage />} />
      </Route>
      <Route element={<ErrorLayout />}>
        <Route path={appRoutes.error.forbidden} element={<ForbiddenPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </>
  )
);
