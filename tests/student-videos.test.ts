import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";

import {
  buildAuthStorageKey,
  getLatestWeek,
  getStudentBySlug,
  students,
  verifyStudentPin,
} from "../app/s/[slug]/student-videos.ts";

test("student video records expose random links, pins, and existing mp4 paths", () => {
  assert.ok(students.length >= 3);

  for (const student of students) {
    assert.match(student.slug, /^[a-z0-9-]+$/);
    assert.match(student.pin, /^\d{4,6}$/);
    assert.ok(student.weeks.length >= 3);
    assert.equal(student.weeks.filter((week) => week.isLatest).length, 1);
    assert.equal(getLatestWeek(student)?.id, student.weeks.at(-1)?.id);

    for (const week of student.weeks) {
      assert.match(week.videoPath, /^\/videos\/[a-z0-9-]+\/[a-z0-9-]+\.mp4$/);
      assert.equal(week.videoPath.includes(student.slug), false);
      assert.equal(week.videoPath.includes(student.displayName.toLowerCase()), false);
      assert.equal(existsSync(`public${week.videoPath}`), true);
    }
  }
});

test("student lookup, latest week, and pin checks are stable per slug", () => {
  const student = getStudentBySlug("a8n4-river");

  assert.equal(student?.displayName, "노아");
  assert.equal(verifyStudentPin(student, " 1234 "), true);
  assert.equal(verifyStudentPin(student, "1235"), false);
  assert.equal(getLatestWeek(student)?.id, "2026-summer-w5");
  assert.equal(buildAuthStorageKey(student.slug), "mgtlab-video-auth:a8n4-river");
});

test("student pins match the assigned parent access codes", () => {
  const assignedPins = new Map([
    ["노아", "1234"],
    ["세임", "2345"],
    ["재윤", "3456"],
  ]);

  for (const [displayName, pin] of assignedPins) {
    const student = students.find((candidate) => candidate.displayName === displayName);

    assert.ok(student, `${displayName} profile should exist`);
    assert.equal(verifyStudentPin(student, pin), true);
  }
});

test("weekly project titles and summaries match the actual class projects", () => {
  for (const student of students) {
    const [weekOne, weekTwo, weekThree] = student.weeks;

    assert.equal(weekOne.title, "펫 분류 프로젝트 소개 영상");
    assert.equal(
      weekOne.summary,
      "스위치 센서를 활용해 강아지와 고양이를 구분하는 펫 분류 프로젝트를 진행했습니다.",
    );
    assert.equal(weekTwo.title, "스마트 무드등 프로젝트 소개 영상");
    assert.equal(
      weekTwo.summary,
      "조도 센서, 스위치 센서, LED 조명을 연결하고 기상청 날씨 데이터를 활용해 현재 밝기에 따라 조명이 켜지는 스마트 무드등을 만들었습니다.",
    );
    assert.equal(weekThree.title, "월드타임 회전 시계 프로젝트 소개 영상");
    assert.equal(
      weekThree.summary,
      "TIME API로 여러 나라의 현재 시간을 확인하고, 지역 간 시간 차이만큼 회전 모터를 움직여 옛날 시계처럼 시간을 표현하는 프로젝트를 진행했습니다.",
    );

    const weekFour = student.weeks.find((week) => week.label === "4주차");
    if (weekFour) {
      assert.equal(weekFour.title, "OX 퀴즈 프로젝트 소개 영상");
      assert.equal(
        weekFour.summary,
        "소리 센서와 스위치 센서로 OX 퀴즈 게임을 만들었습니다. 퀴즈 API에서 받아온 문제를 보고 왼쪽 버튼은 O, 오른쪽 버튼은 X로 정답을 맞히고, 박수를 쳐서 소리 센서가 큰 소리를 감지하면 다음 문제로 넘어가도록 만들었습니다.",
      );
    }

    const weekFive = student.weeks.find((week) => week.label === "5주차");
    if (weekFive) {
      assert.equal(weekFive.title, "이름 통계 프로젝트 소개 영상");
      assert.equal(
        weekFive.summary,
        "이름 통계 API를 활용해 입력한 이름으로 평균 나이와 성별을 추측하고, 그 예측 결과에 따라 서보 모터가 다른 각도로 움직이도록 만들었습니다.",
      );
    }
  }
});
