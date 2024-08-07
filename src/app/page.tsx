"use client";

// Import necessary modules
import { signIn, signOut, useSession, SessionProvider } from "next-auth/react";

// Home component
const Home = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
        {sessionData && (
          <div className="flex flex-col items-center">
            {sessionData.user.image && (
              <img
                src={sessionData.user.image}
                width={320}
                height={320}
                alt="Profile picture"
              />
            )}
            <p className="text-xl text-white">{sessionData?.user.name}</p>
            <pre className="text-white">
              {JSON.stringify(sessionData, null, "\t")}
            </pre>
          </div>
        )}
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={
            sessionData ? () => void signOut() : () => void signIn()
          }
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </main>
    </>
  );
};

// HomePage component
export default function HomePage() {
  return (
    <>
      <SessionProvider>
        <Home />
      </SessionProvider>
    </>
  );
}