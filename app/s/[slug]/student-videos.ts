export type StudentVideoWeek = {
  id: string;
  label: string;
  dateLabel: string;
  title: string;
  summary: string;
  videoPath: string;
  downloadName: string;
  isLatest?: boolean;
};

export type StudentVideoProfile = {
  slug: string;
  displayName: string;
  cohortLabel: string;
  pin: string;
  weeks: StudentVideoWeek[];
};

export const students = [
  {
    slug: "a8n4-river",
    displayName: "노아",
    cohortLabel: "MGTLAB 4쿼터 여름학기 토요일반",
    pin: "2140",
    weeks: [
      {
        id: "2026-summer-w1",
        label: "1주차",
        dateLabel: "2026 여름학기",
        title: "거짓말 탐지기 프로젝트 소개 영상",
        summary: "핀오키오 착각과 생체신호를 바탕으로 프로젝트 진행 내용을 설명합니다.",
        videoPath: "/videos/r7m4-canvas/p9w2-signal-record.mp4",
        downloadName: "mgtlab-noa-week-1.mp4",
      },
      {
        id: "2026-summer-w2",
        label: "2주차",
        dateLabel: "2026 여름학기",
        title: "거짓말 탐지기 프로젝트 소개 영상",
        summary: "2주차 프로젝트 진행 내용을 소개합니다.",
        videoPath: "/videos/m8v2-lumen/c4n7-field-note.mp4",
        downloadName: "mgtlab-noa-week-2.mp4",
        isLatest: true,
      },
    ],
  },
  {
    slug: "q5t9-paper",
    displayName: "세임",
    cohortLabel: "MGTLAB 4쿼터 여름학기 토요일반",
    pin: "2406",
    weeks: [
      {
        id: "2026-summer-w1",
        label: "1주차",
        dateLabel: "2026 여름학기",
        title: "거짓말 탐지기 프로젝트 소개 영상",
        summary: "이번 주 프로젝트 진행 내용과 직접 만든 결과물을 소개합니다.",
        videoPath: "/videos/k2d8-paper/f6q1-project-record.mp4",
        downloadName: "mgtlab-seim-week-1.mp4",
      },
      {
        id: "2026-summer-w2",
        label: "2주차",
        dateLabel: "2026 여름학기",
        title: "거짓말 탐지기 프로젝트 소개 영상",
        summary: "2주차 프로젝트 진행 내용을 소개합니다.",
        videoPath: "/videos/x3p9-quartz/v2r6-studio-note.mp4",
        downloadName: "mgtlab-seim-week-2.mp4",
        isLatest: true,
      },
    ],
  },
  {
    slug: "r3c7-stone",
    displayName: "재윤",
    cohortLabel: "MGTLAB 4쿼터 여름학기 토요일반",
    pin: "5042",
    weeks: [
      {
        id: "2026-summer-w1",
        label: "1주차",
        dateLabel: "2026 여름학기",
        title: "거짓말 탐지기 프로젝트 소개 영상",
        summary: "심박 센서와 대시보드 흐름을 연결해 프로젝트 결과를 설명합니다.",
        videoPath: "/videos/v5q1-archive/t8n3-dashboard-record.mp4",
        downloadName: "mgtlab-jaeyun-week-1.mp4",
      },
      {
        id: "2026-summer-w2",
        label: "2주차",
        dateLabel: "2026 여름학기",
        title: "거짓말 탐지기 프로젝트 소개 영상",
        summary: "2주차 프로젝트 진행 내용을 소개합니다.",
        videoPath: "/videos/b6t4-harbor/n9k5-build-note.mp4",
        downloadName: "mgtlab-jaeyun-week-2.mp4",
        isLatest: true,
      },
    ],
  },
] satisfies StudentVideoProfile[];

export function getStudentBySlug(slug: string) {
  return students.find((student) => student.slug === slug);
}

export function getLatestWeek(student: StudentVideoProfile | undefined) {
  if (!student) {
    return undefined;
  }

  return student.weeks.find((week) => week.isLatest) ?? student.weeks.at(-1);
}

export function buildAuthStorageKey(slug: string) {
  return `mgtlab-video-auth:${slug}`;
}

export function verifyStudentPin(
  student: StudentVideoProfile | undefined,
  pin: string,
) {
  return Boolean(student && pin.trim() === student.pin);
}
