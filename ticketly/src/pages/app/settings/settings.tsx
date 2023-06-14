import { Form } from 'antd';
import { PageContent, PageItem, PageTitle, PageWrapper } from 'styles';

import { SettingsForm } from './components';

export const SettingsPage = () => {
  const [form] = Form.useForm();
  return (
    <PageWrapper>
      <PageTitle>
        <h2>Settings</h2>
      </PageTitle>
      <PageContent>
        <PageItem>
          <SettingsForm form={form} />
        </PageItem>
      </PageContent>
    </PageWrapper>
  );
};
