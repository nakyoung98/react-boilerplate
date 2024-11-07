/**
 *
 * @routes: 라우팅 설정을 관리하는 폴더입니다.
 *
 * [index.tsx]
 *
 * 라우트 설정을 관리합니다.
 * - 라우트 정의
 * - 라우트 설정
 * - 중첩 라우팅
 *
 */

import Home from "@pages/Home";
import { createBrowserRouter } from "react-router-dom";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

export default Router;
