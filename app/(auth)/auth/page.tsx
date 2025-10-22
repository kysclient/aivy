import { AuthForm } from '@/components/auth/auth-form';

interface PageProps {
  searchParams: {
    mode?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const { mode } = await searchParams;
  return <AuthForm selectedMode={mode} />;
}
