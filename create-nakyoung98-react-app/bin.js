#!/usr/bin/env node

import { execSync } from "child_process";

const projectName = process.argv[2] || "my-app";

console.log(`🌟 새 React 프로젝트를 생성합니다.`);
console.log(`💠 프로젝트명: ${projectName}`);

try {
  console.log(`\n📦 React + TypeScript 프로젝트를 생성중...`);
  execSync(`npm create vite@latest ${projectName} -- --template react-ts`, {
    stdio: "inherit",
  });
  console.log("✅ React 프로젝트 생성 완료!");
} catch (error) {
  console.error("❎ 프로젝트 생성 실패");
  console.group("❔상세 에러 메시지");
  console.error(error);
  console.groupEnd();

  process.exit(1);
}
