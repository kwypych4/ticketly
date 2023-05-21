import { useUserStore } from 'store';
import { PageContent, PageItem, PageTitle, PageWrapper } from 'styles';

export const SettingsPage = () => {
  const handleChange = useUserStore((state) => state.changeTheme);
  return (
    <PageWrapper>
      <PageTitle>
        <h2>Settings</h2>
      </PageTitle>
      <PageContent>
        <PageItem>
          <h2>Work in progress</h2>
          <button onClick={handleChange}>CHange theme</button>
        </PageItem>
      </PageContent>
    </PageWrapper>
  );
};
