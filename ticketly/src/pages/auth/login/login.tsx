import { PageContent, PageItem, PageWrapper } from 'styles';

import { LoginForm } from '.';

export const LoginPage = () => {
  return (
    <PageWrapper>
      <PageContent>
        <PageItem width='320px'>
          <h2>Login to Ticketly</h2>
          <LoginForm />
        </PageItem>
      </PageContent>
    </PageWrapper>
  );
};
