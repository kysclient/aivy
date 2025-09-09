import { Loading } from './loading'

export function PageLoading() {
  return (
    <div className="bg-background text-foreground flex w-full h-screen justify-center items-center flex-col gap-4">
      <h1 className="font-serif text-3xl sm:text-5xl italic text-foreground">Aivy</h1>
      <Loading />
    </div>
  )
}
