import { Loading } from './loading';

export function PageLoading() {
  return (
    <div className="bg-background text-foreground flex w-full h-screen justify-center items-center flex-col gap-4">
      <h1 className="text-3xl font-kakao font-bold font-primary">aivy</h1>
      <Loading />
    </div>
  );
}
