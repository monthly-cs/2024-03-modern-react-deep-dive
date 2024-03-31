### 스터디 4회차 메모

> [!WARNING]
> 정리 안 한 생생한 메모 🐙

### 6장

- \__WEBPACK_DEFAULT_EXPORT_
  - 예제 코드대로 안되는 경우 있음
- 컴포넌트 기명함수 (memo, forwardedRef etc) → 디버깅 vs DX..?
  - 네이밍 여부 > 일단 취향
  - useEffect가 많은 경우 > 기명함수가 디버깅에 용이
  - you don’t know JS 강의
    - 함수를 naming하는 이유
      - self documenting
      - stack chase
      - recursive
- devtool → 최적화 사례
  - element 보기
    - shift + cmd + c
  - network
    - websocket debugging
  - 메모리 확인 > 비디오 재생
  - 메모리 터지는 서비스인 경우 > 메모리 탭 많이 볼 수 있음
    - worker로 뺀다
    - VM 따로 표기
    - 대시보드
      - 데이터를 압축해서 보내서 FE에서 디프레싱
      - JSON flatten
  - 메모리 추적-파코?
- 크롬 devtool
  - 페인트 플래시
- RN
  - expo는 지원 안하는 게 많음
    - cli 개발하기
    - expo ⇒ cli 마이그레이션
  - iOS, android 이슈
    - 서드파티 라이브러리 의존성
  - RN 디버깅이 힘듦
    - 코틀린, 플러터 렛츠고

### 7장

- 크롬 개발자 도구
- source
  - dev: 파일별 소스
  - prod: 번들링된 하나의 파일, 혹은 chunk로 쪼개진 파일
- network
  - 많이 씀
    - ws 웹소켓 디버깅
    - 스크린샷 > 타임라인별 스크린
  - 압축: 사용자의 네트워크 비용
- 이미지 용량 최적화
  - lambda, sharp
  - (질문) 외부 이미지 링크인 경우?
    - next 이미지
  - 스토리지에 저장된 이미지
    - lambda 엣지
      - cloudfront CDN 요청
      - 리소스 init 트리거
  - picture 태그
    - 이미지 크기별 url
  - 이미지 최적화
    - SVG는 어디에?
      - S3에 저장하냐
      - 앱에 저장하냐
    - 비용절감
      - S3가 CDN보다 싸다
    - sharp: 전략에 따라 이미지 처리
      - 이미지 줄이기(래스터라이즈드 이미지) + 확장자 포맷 + 사이즈 크롭
    - NextJS Image는 기본적으로 Squoosh를 쓴다
      - NextJS에서도 sharp를 권장한다
      - sharp는 C++를 노드 위에서 돌리는 것이므로 30% 쯤 더 빠름
      - attension > 인물 크롭
        - 크롭 모드
    - 서버리스하게 쓰자!
  - 이커머스 → 이미지 최적화가 생명
- 메모리
  - 버그 케이스 / 프리징
  - VM 인스턴스 선택
    - 현재 탭
      - worker
      - (독립적인 실행) 채널톡
  - 스냅샷
    - 현재 애플리케이션의 생성자간의 메모리 현황을 도표로 보여준다
    - (이거 빠트림) 스냅샷 1에서 2사이에 할당된 객체
    - 유지된 사이즈: 객체 내부의 또다른 객체 ⇒ 얕은 객체는 작아도 하위의 객체가 클 수 있다
  - 할당 계측 탭 / 할당 샘플링
    - (관측) 연속적으로 변경사항을 추적함 / 메모리 변화를 가시적으로 확인
    - 전역 객체로 저장 ⇒ 목적: 객체의 속성 / 프로토타입 확인
  - 메모리 관련 태스크
- NextJS
  - ab 오픈소스로 요청을 보낼 수 있다
- 메모리 탭 활용 예시
  - 메모이제이션 적용 여부를 확인하기 위해서 스냅샷 확인
    - 재생성 여부
  - 메모리 상태 추적
  - jotai의 weak map 구현 확인
  - allocation > 퍼포먼스 레코딩
    - 자원을 얼마나 먹고 있냐
