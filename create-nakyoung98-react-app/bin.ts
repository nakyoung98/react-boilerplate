#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let projectName = process.argv[2];
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(currentDir, ".."); //currentDir은 dist 폴더 내에 있음
const templateFolder = "template";

try {
  if (!projectName) {
    projectName = await new Promise((resolve) => {
      rl.question(`💠 프로젝트명: `, (answer) => {
        resolve(answer || "my-app");
      });
    });
  }

  console.log(`🌟 새 React 프로젝트를 생성합니다.`);

  console.log(`\n📦 React 프로젝트 생성중...`);
  // template 폴더 내의 파일들 내용 수정
  editFile(path.join(rootDir, templateFolder, "package.json"), [projectName]);
  editFile(path.join(rootDir, templateFolder, "package-lock.json"), [projectName, projectName]);
  editFile(path.join(rootDir, templateFolder, "index.html"), [projectName]);

  // 수정된 template 폴더를 projectName으로 복사
  fs.copySync(path.join(rootDir, templateFolder), projectName, { overwrite: false, errorOnExist: true });

  console.log("✅ React 프로젝트 생성 완료!");
} catch (error: any) {
  handleError(error);
}

try {
  process.chdir(projectName);
  console.log("\n📦 필요한 패키지를 설치합니다...");
  execSync("npm install", { stdio: "inherit" });
} catch (error) {
  handleError(error);
}

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

function handleError(error: any) {
  console.error("❎ 프로젝트 생성 실패");
  const 오류_원인 = error.message.split("\n")[0] || error.toString().split("\n")[0];
  console.error(`   ▪️ 오류 원인: ${오류_원인}`);

  process.exit(1);
}
