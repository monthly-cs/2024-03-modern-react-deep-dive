## 스터디 4회차 메모

> [!WARNING]
> 정리 안 한 생생한 메모 🐙

### 4장

- (윤지님) CRA을 쓰는게 좋을까요? SSR로 넘어가는 게 좋을까요?
  - 써야 하냐? 서비스에 따라 다름
  - 검색엔진 최적화는? 어느 서비스에나 중요
  - 경험치 측면에서는? SSR 써보면 좋음
  - CRA는? VITE로 대체
- next.config.js
  - swcMinify는 Next.js 13부터 기본값 true고 15에서 property가 없어진다

### 8장

- 프론트엔드 테스팅
  - FE 테스팅
    - e2e는? QA로 대체할 수 있다
      - 핵심 기능, 페이지 랜더
    - 유닛 테스트
      - 효율성
        - 고려할 유스케이스가 많다
        - 자잘한 FE 모든 요소에 테스트가 필요한가? 곤란함
      - 까다로운 상태 관리
        - 어디까지 모킹을 할 것인지? 할 수는 있는데 굳이?
      - 디자인 시스템 구축 시 사용할 수 있음
        - 유닛 테스트? 정해진 동작에 대한 테스트니까
        - 하지만 스토리북으로 대체할 수 있다
  - DX
    - 테스트를 위한 코드 작성: 주객전도
    - 내부 전략을 잘 짜야 한다
    - 프로덕션에 TDD 도입하기 쉽지 않다
- (광인님) 김밥 번들러 parser
  - https://github.com/danmooozi/kimbap.js/blob/main/src/parser/index.js
  - AST 다양하게 활용: 컴파일 기능 구현에 활용 가능!
- (광인님) renderToNodeStream은 deprecated다 [[링크]](https://react.dev/reference/react-dom/server/renderToNodeStream)
  - `renderToPipeableStream`
    > `renderToPipeableStream` renders a React tree to a pipeable [Node.js Stream.](https://nodejs.org/api/stream.html)
    - 종속성: express 라이브러리를 사용한다 (이 이유로 책에서 예제로 나오지 않은 것으로 추측)
    - onShellReady: initial 로딩이 끝나면 클라이언트에게 청크 단위로 전달
    - 클라이언트
      - 리액트의 워터풀 형식의 서스펜스를 원할하게 쓸 수 있음
      - https://react.dev/reference/react-dom/server/renderToPipeableStream
  - 예시: Next.js 이전에 SSR을 사용했던 케이스
    - renderToString을 EJS 템플릿 엔진에 삽입하는 전통적인 방식으로 구현하는 경우
- Next를 사용하지 않고 전통적으로 SSR를 사용했을 때?
  - 별도로 도입할만한 기술이 있다면 직접 커스텀이 가능하다
  - 다만 Next의 옵티마이제이션, 패칭을 캐싱 등을 포기해야함
    - 또한 신경써야할 포인트가 많다

---

- 블로그 재료
  - CRA는 왜 망했는가
