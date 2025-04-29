import { Link } from "@remix-run/react";

export default function Finish() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center text-slate-950 dark:text-slate-50">
      <p className="mx-auto px-36 text-center text-4xl font-bold ">
        🎉 Thank you for playing our game! 🎉
      </p>
      <Link
        to="/"
        className="mt-8 text-2xl font-bold underline hover:text-indigo-600"
      >
        Go back to the start
      </Link>
    </div>
  );
}
