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
    assert.equal(student.weeks.length, 2);
    assert.equal(student.weeks.filter((week) => week.isLatest).length, 1);
    assert.equal(getLatestWeek(student)?.label, "2주차");

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
  assert.equal(verifyStudentPin(student, " 2140 "), true);
  assert.equal(verifyStudentPin(student, "2141"), false);
  assert.equal(getLatestWeek(student)?.id, "2026-summer-w2");
  assert.equal(buildAuthStorageKey(student.slug), "mgtlab-video-auth:a8n4-river");
});

test("student pins match the assigned parent access codes", () => {
  const assignedPins = new Map([
    ["노아", "2140"],
    ["세임", "2406"],
    ["재윤", "5042"],
  ]);

  for (const [displayName, pin] of assignedPins) {
    const student = students.find((candidate) => candidate.displayName === displayName);

    assert.ok(student, `${displayName} profile should exist`);
    assert.equal(verifyStudentPin(student, pin), true);
  }
});

test("weekly project titles and summaries match the actual class projects", () => {
  for (const student of students) {
    const [weekOne, weekTwo] = student.weeks;

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
  }
});
