import Link from "next/link";

import { students } from "./s/[slug]/student-videos";

const currentWeek = 3;
const totalWeeks = 11;
const classWeeks = Array.from({ length: totalWeeks }, (_, index) => index + 1);

export default function Home() {
  return (
    <main className="min-h-dvh bg-white px-5 py-8 text-[#222222]">
      <section className="mx-auto w-full max-w-2xl">
        <p className="text-sm font-semibold text-[#ff385c]">MGTLAB 4쿼터</p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight">
          프로젝트 소개 영상
        </h1>
        <p className="mt-4 text-[15px] font-semibold leading-6 text-[#3f3f3f]">
          여름학기 토요일반
        </p>
        <p className="mt-0.5 text-[15px] font-semibold leading-6 text-[#6a6a6a]">
          MGT-LAB 수업 · 16:00-18:00
        </p>

        <div className="mt-6 border-t border-[#dddddd] pt-4">
          <div className="mb-3 flex items-baseline justify-between gap-4">
            <p className="text-[13px] font-semibold text-[#6a6a6a]">
              수업 주차
            </p>
            <p className="text-[13px] font-bold text-[#222222]">
              {currentWeek} / {totalWeeks}
            </p>
          </div>
          <div
            className="grid grid-cols-11 gap-1"
            aria-label="수업 주차: 3주차 / 총 11주"
          >
            {classWeeks.map((week) => {
              const isPastWeek = week < currentWeek;
              const isCurrentWeek = week === currentWeek;

              return (
                <span
                  key={week}
                  className={[
                    "flex h-7 items-center justify-center rounded-full text-[11px] font-bold",
                    isPastWeek && "bg-[#222222] text-white",
                    isCurrentWeek && "bg-[#ff385c] text-white",
                    !isPastWeek &&
                      !isCurrentWeek &&
                      "bg-[#f0f0f0] text-[#8a8a8a]",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {week}
                </span>
              );
            })}
          </div>
        </div>

        <div className="mt-6" aria-label="학생 선택">
          <p className="mb-3 text-[13px] font-semibold text-[#6a6a6a]">
            학생 선택
          </p>
          <div className="grid grid-cols-3 gap-2.5">
            {students.map((student) => (
              <Link
                key={student.slug}
                className="flex h-14 items-center justify-center rounded-xl border border-[#dddddd] bg-white px-3 text-center transition hover:bg-[#f7f7f7] active:scale-[0.99]"
                href={`/s/${student.slug}`}
              >
                <span className="block text-base font-semibold">
                  {student.displayName}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
