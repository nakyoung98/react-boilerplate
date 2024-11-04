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

  // package.json, index.html 파일 내용 변경
  editFile(path.join(currentDir, projectName, "package.json"), [projectName]);
  editFile(path.join(currentDir, projectName, "package-lock.json"), [projectName, projectName]);
  editFile(path.join(currentDir, projectName, "index.html"), [projectName]);

  console.log("✅ React 프로젝트 생성 완료!");
} catch (error: any) {
  console.error("❎ 프로젝트 생성 실패");
  const 오류_원인 = error.message.split("\n")[0] || error.toString().split("\n")[0];
  console.error(`   ▪️ 오류 원인: ${오류_원인}`);

  process.exit(1);
}

try {
  process.chdir(projectName);
  console.log("\n📦 필요한 패키지를 설치합니다...");
} catch (error) {}

function editFile(filePath: string, contents: string[]) {
  const templateWord = "#{TEMPLATE}#";

  let fileContent = fs.readFileSync(filePath, "utf-8");

  contents.forEach((content) => {
    fileContent = fileContent.replace(templateWord, content);
  });

  if (fileContent.includes(templateWord)) {
    throw new Error(
      `🚨 템플릿 치환 실패: 남은 템플릿 키워드(#{TEMPLATE}#)가 있습니다.\n` +
        `💡 제공된 contents 배열의 길이(${contents.length})가 ` +
        `파일 내의 템플릿 키워드 개수보다 적습니다.`
    );
  }

  fs.writeFileSync(filePath, fileContent);
}
