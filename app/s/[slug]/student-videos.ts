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
    pin: "1234",
    weeks: [
      {
        id: "2026-summer-w1",
        label: "1주차",
        dateLabel: "2026 여름학기",
        title: "펫 분류 프로젝트 소개 영상",
        summary: "스위치 센서를 활용해 강아지와 고양이를 구분하는 펫 분류 프로젝트를 진행했습니다.",
        videoPath: "/videos/r7m4-canvas/p9w2-signal-record.mp4",
        downloadName: "mgtlab-noa-week-1.mp4",
      },
      {
        id: "2026-summer-w2",
        label: "2주차",
        dateLabel: "2026 여름학기",
        title: "스마트 무드등 프로젝트 소개 영상",
        summary: "조도 센서, 스위치 센서, LED 조명을 연결하고 기상청 날씨 데이터를 활용해 현재 밝기에 따라 조명이 켜지는 스마트 무드등을 만들었습니다.",
        videoPath: "/videos/m8v2-lumen/c4n7-field-note.mp4",
        downloadName: "mgtlab-noa-week-2.mp4",
      },
      {
        id: "2026-summer-w3",
        label: "3주차",
        dateLabel: "2026 여름학기",
        title: "월드타임 회전 시계 프로젝트 소개 영상",
        summary: "TIME API로 여러 나라의 현재 시간을 확인하고, 지역 간 시간 차이만큼 회전 모터를 움직여 옛날 시계처럼 시간을 표현하는 프로젝트를 진행했습니다.",
        videoPath: "/videos/t4m8-orbit/u7c2-time-note.mp4",
        downloadName: "mgtlab-noa-week-3.mp4",
        isLatest: true,
      },
    ],
  },
  {
    slug: "q5t9-paper",
    displayName: "세임",
    cohortLabel: "MGTLAB 4쿼터 여름학기 토요일반",
    pin: "2345",
    weeks: [
      {
        id: "2026-summer-w1",
        label: "1주차",
        dateLabel: "2026 여름학기",
        title: "펫 분류 프로젝트 소개 영상",
        summary: "스위치 센서를 활용해 강아지와 고양이를 구분하는 펫 분류 프로젝트를 진행했습니다.",
        videoPath: "/videos/k2d8-paper/f6q1-project-record.mp4",
        downloadName: "mgtlab-seim-week-1.mp4",
      },
      {
        id: "2026-summer-w2",
        label: "2주차",
        dateLabel: "2026 여름학기",
        title: "스마트 무드등 프로젝트 소개 영상",
        summary: "조도 센서, 스위치 센서, LED 조명을 연결하고 기상청 날씨 데이터를 활용해 현재 밝기에 따라 조명이 켜지는 스마트 무드등을 만들었습니다.",
        videoPath: "/videos/x3p9-quartz/v2r6-studio-note.mp4",
        downloadName: "mgtlab-seim-week-2.mp4",
      },
      {
        id: "2026-summer-w3",
        label: "3주차",
        dateLabel: "2026 여름학기",
        title: "월드타임 회전 시계 프로젝트 소개 영상",
        summary: "TIME API로 여러 나라의 현재 시간을 확인하고, 지역 간 시간 차이만큼 회전 모터를 움직여 옛날 시계처럼 시간을 표현하는 프로젝트를 진행했습니다.",
        videoPath: "/videos/h9v2-clock/m3d6-rotation-record.mp4",
        downloadName: "mgtlab-seim-week-3.mp4",
        isLatest: true,
      },
    ],
  },
  {
    slug: "r3c7-stone",
    displayName: "재윤",
    cohortLabel: "MGTLAB 4쿼터 여름학기 토요일반",
    pin: "3456",
    weeks: [
      {
        id: "2026-summer-w1",
        label: "1주차",
        dateLabel: "2026 여름학기",
        title: "펫 분류 프로젝트 소개 영상",
        summary: "스위치 센서를 활용해 강아지와 고양이를 구분하는 펫 분류 프로젝트를 진행했습니다.",
        videoPath: "/videos/v5q1-archive/t8n3-dashboard-record.mp4",
        downloadName: "mgtlab-jaeyun-week-1.mp4",
      },
      {
        id: "2026-summer-w2",
        label: "2주차",
        dateLabel: "2026 여름학기",
        title: "스마트 무드등 프로젝트 소개 영상",
        summary: "조도 센서, 스위치 센서, LED 조명을 연결하고 기상청 날씨 데이터를 활용해 현재 밝기에 따라 조명이 켜지는 스마트 무드등을 만들었습니다.",
        videoPath: "/videos/b6t4-harbor/n9k5-build-note.mp4",
        downloadName: "mgtlab-jaeyun-week-2.mp4",
      },
      {
        id: "2026-summer-w3",
        label: "3주차",
        dateLabel: "2026 여름학기",
        title: "월드타임 회전 시계 프로젝트 소개 영상",
        summary: "TIME API로 여러 나라의 현재 시간을 확인하고, 지역 간 시간 차이만큼 회전 모터를 움직여 옛날 시계처럼 시간을 표현하는 프로젝트를 진행했습니다.",
        videoPath: "/videos/z6p1-pulse/c8q4-time-record.mp4",
        downloadName: "mgtlab-jaeyun-week-3.mp4",
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
