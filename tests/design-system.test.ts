import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("design source of truth defines the parent video page direction", () => {
  const design = readFileSync("DESIGN.md", "utf8");

  assert.match(design, /Airbnb-inspired/);
  assert.match(design, /video-first/);
  assert.match(design, /Parent Trust \+ Academy Record/);
  assert.match(design, /project record/);
});

test("parent video UI uses a neutral parent-trust palette", () => {
  const home = readFileSync("app/page.tsx", "utf8");
  const player = readFileSync("app/s/[slug]/student-video-page.tsx", "utf8");
  const source = `${home}\n${player}`;

  assert.doesNotMatch(source, /bg-\[#0f172a\]/);
  assert.doesNotMatch(source, /#e8f7ff|#ffb703|#2ec4b6|#fff7d6|#fffdf7/);
  assert.match(source, /bg-white|bg-\[#f7f7f7\]/);
  assert.match(source, /border-\[#dddddd\]|border-\[#222222\]/);
  assert.match(source, /#ff385c/);
  assert.match(source, /프로젝트 기록/);
  assert.match(source, /보호자 기록/);
});
