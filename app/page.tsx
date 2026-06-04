import Link from "next/link";

import { students } from "./s/[slug]/student-videos";

export default function Home() {
  return (
    <main className="min-h-dvh bg-white px-5 py-8 text-[#222222]">
      <section className="mx-auto w-full max-w-2xl">
        <p className="text-sm font-semibold text-[#ff385c]">MGTLAB</p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight">
          프로젝트 기록
        </h1>

        <div className="mt-7 grid gap-3">
          {students.map((student) => (
            <Link
              key={student.slug}
              className="rounded-xl border border-[#dddddd] bg-white px-5 py-4 transition hover:bg-[#f7f7f7] active:scale-[0.99]"
              href={`/s/${student.slug}`}
            >
              <span className="block text-base font-medium">
                {student.displayName} 프로젝트 기록
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
