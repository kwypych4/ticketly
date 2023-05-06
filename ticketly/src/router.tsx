import { LoggedLayout } from 'layouts';
import { Homepage, TicketsDetailsPage, TicketsPage } from 'pages';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { appRoutes } from 'urls';

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<LoggedLayout />}>
      <Route path={appRoutes.app.homepage} element={<Homepage />} />
      <Route path={appRoutes.app.tickets.index} element={<TicketsPage />} />
      <Route path={appRoutes.app.tickets.details} element={<TicketsDetailsPage />} />
    </Route>
  )
);
