#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const projectName = process.argv[2] || "my-app";
const currentDir = path.dirname(fileURLToPath(import.meta.url));

console.log(`🌟 새 React 프로젝트를 생성합니다.`);
console.log(`💠 프로젝트명: ${projectName}`);

try {
  console.log(`\n📦 React 프로젝트 생성중...`);
  fs.copySync(path.join(currentDir, "template"), projectName, { overwrite: false, errorOnExist: true });
  console.log("✅ React 프로젝트 생성 완료!");
} catch (error) {
  console.error("❎ 프로젝트 생성 실패");
  const 오류_원인 = error.message.split('\n')[0] || error.toString().split('\n')[0];
  console.error(`   ▪️ 오류 원인: ${오류_원인}`);

  process.exit(1);
}

try {
  process.chdir(projectName);
  console.log("\n📦 필요한 패키지를 설치합니다...");
} catch (error) {}
