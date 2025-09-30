import { Fallback } from '@/components/fallback';

/**
 * Profile page for a specific user.
 *
 * @param props - The URL parameters (nickname).
 * @returns The profile page component.
 */
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  if (!id) {
    return <Fallback />;
  }

  return <></>;
}
