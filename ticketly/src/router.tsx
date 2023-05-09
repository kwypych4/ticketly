import { AuthLayout, LoggedLayout } from 'layouts';
import { Homepage, LoginPage, TicketsDetailsPage, TicketsPage } from 'pages';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { appRoutes } from 'urls';

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<LoggedLayout />}>
        <Route path={appRoutes.app.homepage} element={<Homepage />} />
        <Route path={appRoutes.app.tickets.index} element={<TicketsPage />} />
        <Route path={appRoutes.app.tickets.details} element={<TicketsDetailsPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path={appRoutes.auth.login} element={<LoginPage />} />
      </Route>
    </>
  )
);
