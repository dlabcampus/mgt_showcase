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
