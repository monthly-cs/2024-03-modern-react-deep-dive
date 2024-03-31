## 스터디 4회차 메모

> [!WARNING]
> 정리 안 한 생생한 메모 🐙

### 3장

- 리액트에서 쓰이는 훅
  - useState
    - 비구조화 할당
    - setState을 사용해야 하는 이유 ⇒ state는 closure
  - lazy initialization 써야 할까?
    - 초기값에 함수를 넣는다면, 초기값에만 전달 되지만 ⇒ 매 랜더링마다 실행된다! (무거운 연산일 시, 성능 저하)
  - useEffect
    - deps가 1개 이상 변경되었을 때, 랜더링 시 setup 함수가 실행된다 ⇒ reactive한 값
    - clean-up
      - 다음 랜더링, 실행되기 전
      - 선언되었던 값을 기반으로 실행
    - 브라우저 페인팅 이후에 실행됨을 최대한 보장한다.
    - deps 룰을 지키지 않을 시에… 인자로 받은 setup함수와 실제 실행 여부에 대한 연결점이 사라진다.
    - 콜백함수에 직접 사용은x
      내부에서 async를 사용 시, 의도한대로 동작 안할 수 있음
  - useLayoutEffect
    - 신중하게 사용하기
  - useRef: callback ref
    - 콜백함수를 ref에 주입해서 돔 요소 관리
    - input auto focus
    ```tsx
    show && <input ref={(el) => el?.focus()} />;
    ```
  - context
    - 공용 컴포넌트
  - **useImperativeHandle**
    - (리액트)state 기반의 UI 변경 ↔ ref기반의 명령형 프로그래밍
  - HOC
    - 하위 컴포넌트 로직이 먼저 실행되고, 이후 결과를 기반으로 컴포넌트 랜더링
    - 부수 효과 없게!
  ### 질문
  - 모달
    - (히스토리) 주소값 변경
    - (사례) 자식 모달이 켜졌을 때, 부모 모달 닫기 (display: none)
      - 전역 스토어 (스택 구조)
      - jotai v2에서는 지역별 Provider 가능
    - 모달 내 유기적 흐름이 다수일 때 ⇒ 페이지가 UX적으로 좋을 것 같다.
  - (질문) useReducer에 lazy initialization 써보신 분?
  - (질문) useDebugValue 써보신 분?
  - useEffect + API 패칭은?
    - useEffect 내에서 비동기 요청 시, 의도한대로 동작 안 할 수 있음
    - Tanstack이나 SWR로 대체
  - 랜더링 이전에 → 기존 랜더 트리 이펙트
    - 브라우저 랜더링
    - 커밋 페이즈가 진행되는 과정에 랜더링 트리거
      - 이펙트를 소모할 수 있고, 클린업만 실행될 수도 있고 상황에 따라 다르다 → 확인 필요
  - context와 커스텀 hook: 역할이 다름
    - 훅 ⇒ 로직
    - context ⇒ 값 주입
    - (예시) PopOverContext ⇒ memo로 감싸서 주입
  - useLayoutEffect
    - 리스크는? 리랜더링 유발 & 소요
    - 돔 제어 ⇒ 쓰기 좋은 상황

### 5장

- api 만료시간
  - 유저 정보 / 만료시간 infinite ⇒ 로그아웃 시 invalidate
  - stale시 확인
- 유저 데이터
- 다국어, 다크/라이트
  - i18next.language
    - ko
      - translate.json
    - en
      - translate.json
  - message.alert
    - 노션 api ⇒ json
    - 네이밍 컨벤션 ⇒
- (라이브러리 선택)
  - zustand
    - atom ⇒ 상태의 파편화
    - 중앙 스토어
  - date-fns
  - npm i react-calendar
  - date-picker
- 디자인 시스템?
  - 만들어져 있음 - 유지보수 2
  - 만들고 있다 1
  - 만들고 싶다 2
  - 유지보수
    - UI적인 이슈: 브라우저 호환성, 테이블 정렬, 아바타 preload
    - popover
