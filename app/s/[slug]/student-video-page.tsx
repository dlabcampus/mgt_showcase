"use client";

import { FormEvent, useMemo, useState, useSyncExternalStore } from "react";
import type { StudentVideoProfile } from "./student-videos";
import {
  buildAuthStorageKey,
  getLatestWeek,
  verifyStudentPin,
} from "./student-videos";

type StudentVideoPageProps = {
  student: StudentVideoProfile;
};

export default function StudentVideoPage({ student }: StudentVideoPageProps) {
  const latestWeek = useMemo(() => getLatestWeek(student), [student]);
  const [selectedWeekId, setSelectedWeekId] = useState(latestWeek?.id ?? "");
  const [pin, setPin] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSessionAuthenticated, setIsSessionAuthenticated] = useState(false);

  const storageKey = buildAuthStorageKey(student.slug);
  const hasStoredAuthentication = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange);
      return () => window.removeEventListener("storage", onStoreChange);
    },
    () => localStorage.getItem(storageKey) === "ok",
    () => false,
  );
  const isAuthenticated = isSessionAuthenticated || hasStoredAuthentication;
  const selectedWeek =
    student.weeks.find((week) => week.id === selectedWeekId) ?? latestWeek;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!verifyStudentPin(student, pin)) {
      setErrorMessage("PIN을 다시 확인해 주세요.");
      return;
    }

    localStorage.setItem(storageKey, "ok");
    setErrorMessage("");
    setIsSessionAuthenticated(true);
  }

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[#f7f7f7] px-5 py-8 text-[#222222]">
        <section className="w-full max-w-sm rounded-xl border border-[#dddddd] bg-white px-6 py-7 shadow-[0_14px_34px_rgba(0,0,0,0.06)]">
          <p className="text-sm font-semibold text-[#ff385c]">MGTLAB</p>
          <p className="mt-2 text-sm font-medium text-[#6a6a6a]">
            프로젝트반 보호자 기록
          </p>
          <h1 className="mt-3 text-2xl font-semibold leading-tight text-[#222222]">
            {student.displayName} 프로젝트 기록
          </h1>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-sm font-semibold text-[#222222]">PIN</span>
              <input
                inputMode="numeric"
                autoComplete="one-time-code"
                className="mt-2 h-14 w-full rounded-lg border border-[#c1c1c1] bg-white px-4 text-center text-2xl font-semibold text-[#222222] outline-none transition focus:border-[#ff385c] focus:ring-4 focus:ring-[#ff385c]/15"
                value={pin}
                onChange={(event) => setPin(event.target.value)}
                maxLength={6}
              />
            </label>

            {errorMessage ? (
              <p className="text-sm font-medium text-[#b42318]">
                {errorMessage}
              </p>
            ) : null}

            <button
              type="submit"
              className="h-14 w-full rounded-lg bg-[#ff385c] px-5 text-base font-semibold text-white transition hover:bg-[#e00b41] active:scale-[0.99]"
            >
              확인
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-white text-[#222222]">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-5 sm:px-6 sm:py-8">
        <header className="pt-2">
          <p className="text-sm font-semibold text-[#ff385c]">MGTLAB</p>
          <p className="mt-1 text-sm font-medium text-[#6a6a6a]">
            {student.cohortLabel} 보호자 기록
          </p>
          <div className="mt-2">
            <div>
              <h1 className="text-2xl font-semibold leading-tight sm:text-3xl">
                {student.displayName} 프로젝트 기록
              </h1>
            </div>
          </div>
        </header>

        <nav className="flex gap-2 overflow-x-auto pb-1" aria-label="주차 선택">
          {student.weeks.map((week) => {
            const isSelected = week.id === selectedWeek?.id;
            const isLatest = week.id === latestWeek?.id;
            return (
              <button
                key={week.id}
                type="button"
                className={[
                  "min-h-12 shrink-0 rounded-lg border px-4 text-center transition active:scale-[0.99]",
                  isSelected
                    ? "border-[#222222] bg-[#222222] text-white"
                    : isLatest
                      ? "border-[#222222] bg-white text-[#222222]"
                    : "border-[#dddddd] bg-white text-[#6a6a6a]",
                ].join(" ")}
                onClick={() => setSelectedWeekId(week.id)}
                aria-pressed={isSelected}
              >
                <span className="block text-sm font-semibold">{week.label}</span>
              </button>
            );
          })}
        </nav>

        {selectedWeek ? (
          <section className="overflow-hidden rounded-xl border border-[#dddddd] bg-white shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
            <video
              key={selectedWeek.videoPath}
              className="aspect-video w-full bg-black"
              controls
              playsInline
              preload="metadata"
              aria-label={`${student.displayName} 학생 ${selectedWeek.label} 영상`}
            >
              <source src={selectedWeek.videoPath} type="video/mp4" />
              브라우저가 영상 재생을 지원하지 않습니다.
            </video>

            <div className="space-y-4 px-5 py-5 sm:px-6">
              <div>
                <p className="text-sm font-semibold text-[#ff385c]">
                  {selectedWeek.dateLabel}
                </p>
                <h2 className="mt-1 text-xl font-semibold leading-tight">
                  {selectedWeek.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#6a6a6a]">
                  {selectedWeek.summary}
                </p>
              </div>

              <a
                className="flex h-14 w-full items-center justify-center rounded-lg border border-[#222222] bg-white px-5 text-base font-semibold text-[#222222] transition hover:bg-[#f7f7f7] active:scale-[0.99] sm:w-fit"
                href={selectedWeek.videoPath}
                download={selectedWeek.downloadName}
              >
                영상 다운로드
              </a>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
