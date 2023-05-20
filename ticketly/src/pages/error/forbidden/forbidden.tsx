import { useNavigate } from 'react-router-dom';
import { ErrorInfo, ErrorStatus, ErrorWrapper } from 'styles';
import { appRoutes } from 'urls';

export const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <ErrorWrapper>
      <ErrorStatus>
        <p>403</p>
      </ErrorStatus>
      <ErrorInfo>
        <h1>Access Denied/Forbidden</h1>
        <h2>The page you trying to reach is absolutely forbidden for some reason</h2>
        <button onClick={() => navigate(appRoutes.app.homepage)}>GO BACK HOME</button>
      </ErrorInfo>
    </ErrorWrapper>
  );
};
