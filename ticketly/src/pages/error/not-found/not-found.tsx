import { useNavigate } from 'react-router-dom';
import { ErrorInfo, ErrorStatus, ErrorWrapper } from 'styles';
import { appRoutes } from 'urls';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <ErrorWrapper>
      <ErrorStatus>
        <p>404</p>
      </ErrorStatus>
      <ErrorInfo>
        <h1>Sorry, Page Not Found</h1>
        <h2>The page you requested could not be found</h2>
        <button onClick={() => navigate(appRoutes.app.homepage)}>GO BACK HOME</button>
      </ErrorInfo>
    </ErrorWrapper>
  );
};
