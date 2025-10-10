import { Fallback } from '@/components/fallback';
import { Profile } from '@/components/profile/profile';

/**
 * Profile page for a specific user.
 *
 * @param props - The URL parameters (nickname).
 * @returns The profile page component.
 */
export default async function Page(props: { params: Promise<{ name: string }> }) {
  const params = await props.params;
  const { name } = params;

  if (!name) {
    return <Fallback />;
  }

  return <Profile name={name} />
}
