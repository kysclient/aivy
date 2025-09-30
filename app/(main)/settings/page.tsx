import SettingsMain from '@/components/settings/settings-main';
import { DefaultHeader } from '@/layouts/default-header';

export default function Page() {
  return (
    <>
      <DefaultHeader title="설정" />
      <SettingsMain />
    </>
  );
}
