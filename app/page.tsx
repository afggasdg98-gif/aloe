import { SignInForm } from "@/components/sign-in-form"
import { Logo } from "@/components/logo"

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] bg-blue-500/20 rounded-full blur-[120px] sm:blur-[150px] pointer-events-none" />

      <div className="absolute inset-0 bg-[#0a1929] -z-10" />

      <div className="absolute top-3 left-3 xs:top-4 xs:left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-10">
        <Logo />
      </div>

      <main className="flex items-center justify-center min-h-screen px-4 py-20 xs:py-24 sm:py-28">
        <SignInForm />
      </main>
    </div>
  )
}
