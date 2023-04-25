import { LoggedLayout } from 'layouts';
import { Homepage } from 'pages';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { appRoutes } from 'urls';

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<LoggedLayout />}>
      <Route path={appRoutes.app.homepage} element={<Homepage />} />
    </Route>
  )
);
