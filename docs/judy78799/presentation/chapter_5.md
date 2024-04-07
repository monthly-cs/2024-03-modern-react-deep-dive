# 모던 리액트 딥다이브 week5
# Presentation

|주차|DIL 범위|날짜|개인 진도|
|------|---|---|---|
| 5주차 |9장|2024-04-07|529-654p|

https://velog.io/@judy0465/%EB%AA%A8%EB%8D%98-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%94%A5%EB%8B%A4%EC%9D%B4%EB%B8%8C-5%EC%A3%BC%EC%B0%A8-%EB%B0%9C%ED%91%9C

# 9장 모던 리액트 개발 도구로 개발 및 배포환경 구축하기


## Next.Js로 리액트 개발 환경 구축하기


#### 애플리케이션 이해를 위해

- package.json 부터 시작해서 직접 설정해보기.
- 왜 이런 파일이 필요한지,
- 이 파일 내부에 어떤 설정이 필요한지 이해한다.

## 기본 패키지 설치

1. npm init 실행하여 package.json 파일을 만든다.
2. react, react-dom, next 설치 (Next.js 실행하는데 핵심 라이브러리)
  >  npm i react react-dom next
3. dependencies에 필요한 패키지를 설치.
  >   npm i @types/node @types/react @types/react-dom eslint eslint-donfig-next typescript --save-dev

필요한 라이브러리 설치 후 타입스크립트 코드를 작성하기 위한 준비를 한다.

## 타입스크립트 설정을 위한 tsConfig.json 작성하기

```
{
"$schema" : "https://json.schemastore.org/tsconfig.json" 
}
```

```
{
    "$schema": "https://json.schemastore.org/tsconfig.json",
    "compilerOptions": {
        "target":"es5",
        "lib":["dom","dom.iterable","esnext"],
        "allowJs":true,
        "skipLibCheck":true,
        "strict": true,
        "forceConsistentCasingInFileNames":true,
        "noEmit": true,
        "esModuleInterop":true,
        "module":"esnext",
        "moduleResoultion":"node",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "jsx":"preserve",
        "incremental": true,
        "baseUrl":"src",
        "paths": {
            "#pages/*":["pages/*"],
            "#hooks/*":["hooks/*"],
            "#types/*":["types/*"],
            "#components/*":["components/*"],
            "#utils/*":["utils/*"],
        },
        "styled-components": true,
    },
    "include": ["next-env.d.ts","**/*.ts","**/*.tsx"],
    "exclude": ["node_modules"],
}
```

#### tsConfig.json의 다양한 옵션들 중 strict 모드는 반드시 켜둘 것.

- strict 모드는 타입을 엄격히 지키는 것을 도와준다.
- 타입스크립트의 타입 시스템을 이해하는 데 많은 도움을 얻을 수 있다.
- Js -> Ts 과도기 과정이 아니라면 켜두도록 하자.

## Next.js 설정을 위한 next.config.js 작성하기

※ next.config.js는 버전 별로 제공하는 설정파일이 다르기 때문에, 깃허브 저장소를 방문하여 확인 가능하다.

``` jsx
/** @type {import ('next').NextConfig} */

const nextConfig = {
    reactStrictMode : true,
    poweredByHeader: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
    styledComponents: true
}

module.exports = nextConfig
```

- reactStrictMode: 리액트의 엄격 모드를 활성화.
- powerByHeader: 일반적으로 보완 취약점으로 취급되는 *X-powered-By 헤더를 제거한다.
- eslint.ignoreDuringBuilds: 빌드 시에 ESLint를 무시한다. 이후 ESLint는 CI과정에서 별도로 작동하게 만들어 빌드를 더욱 빠르게 만든다.

* X-powered-By 헤더: 웹 서버에서 사용하는 프로그램 엔진 정보가 노출될 수 있음/ 어떤 기술로 개발되었는지에 대한 정보를 가지고 있음.
  
### ESLint와 Prettier설정하기

- eslint-config-next에서 단순히 코드에 있을 잠재적인 문제를 확인할 뿐, 띄어쓰기나 줄바꿈 같이 코드의 스타일링을 정의해 주지 않으므로
- 추가적인 설치가 필요하다.
- 설치: npm i @titicaca/eslint-config-triple --save-dev

## 스타일 설정하기

#### Next.js에 styled-component를 적용해보자.

```
npm i styled-components
```

```
npm i @types/styled-components --save-dev
```

#### swc에 styled-components를 사용한다는 것을 알리기 위해 next.config.js에 코드 추가하기

```
"styled-components": true,
```

~~여기까지 Next.js 프로젝트 구축을 위한 준비를 마친 상태이다.


## 애플리케이션 코드 작성

### src 폴더 내부 하위 폴더 목록
- pages: 하위 내용은 모두 실제 라우터가 된다.
- components: 컴포넌트 폴더
- hooks: 직접 만든 훅을 모아둔 폴더
- types: 서버 응답 타입, 공통으로 사용하는 타입을 모아둔 폴더
- utils: 애플리케이션 전역에서 공동으로 사용하는 파일을 모아둔 폴더

#### 폴더 구조엔 정답이 없다.
- Next.js 파일의 폴더 구조는 src/pages 하단에 실제 페이지 라우팅과 관련된 파일을 기재해야 한다는 컨벤션만 지키면 됨.
-  코드 내에서 가독성 확보: 모든 폴더에 tsconfig.json을 활용해 적절한 경로 별칭을 적용.

##### create-next-app은 편리하지만 전체적인 프로젝트 구성에 필요한 내용을 놓치기 쉽다. 

#### 대다수의 서비스가 마이크로 프런트엔드를 지향: 프로젝트 구축하는 일이 잦다.
#### 문제점: 프로젝트를 새로 만들 때 마다 똑같은 설정을 매번 반복하는 것은 비효율적이다.

#### 해결방법 1 : 템플릿 저장소 만들어두기

- 다른 저장소를 생성했을 때 해당 내용을 모두 복사해서 생성할 수 있다.
- 'generated from'이라는 메시지로 어떤 템플릿에서 만들어진 저장소인지 확인할 수 있다.
- 1. 보일러플레이트로 프로젝트를 만든다.
  2. Template repository 옵션을 체크.


#### 해결방법 2 : 나만의 create-***-app 만들기
- 조직 내에 마이크로 서비스를 지향하고 있거나, 앞으로 생성해야 할 프로젝트가 많다면 추천.
- CLI 패키지로 만들어, 사용자의 입력을 받아 서로 다른 패키지를 만들 수 있다.

===

## 깃허브 100% 활용하기

깃허브에서 제공하는 서비스를 십분 활용하여 프런트엔드 개발에 어떤 도움을 줄 수 있는지 살펴보자.

### 깃허브 엑션으로 CI 환경 구축하기

![image](https://github.com/monthly-cs/2024-03-modern-react-deep-dive/assets/116958681/d23f30c8-2e90-4a7c-927c-8b12872976db)

#### CI(Continuous Integration)란?: 코드의 변화를 모으고 관리하는 코드 중앙 저장소에서 여러 개발자가 기여한 코드를 지속적으로 빌드/ 테스트 해 코드의 정합성(논리적 모순이 없음)을 확인하는 과정.

- Code-Build-Test 단계에 해당.
- 지속적 통합은 모든 코드 변화를 하나의 리포지토리에서 관리하는 것 부터 시작한다.
- 여러 명의 개발자들이 쉽게 코드의 변화(보완이슈, 에러 등)를 확인할 수 있다.
- 개발팀은 각자 개발한 코드를 이른 시점에 자주 합치고 테스트해 볼 수 있다.
- 

#### 깃허브 액션은 깃허브 저장소에서만 사용가능하다. (제한적 무료 서비스.)

![image](https://github.com/monthly-cs/2024-03-modern-react-deep-dive/assets/116958681/ba139460-67d3-4380-a4f4-40d583ab02d3) <br>
<img width="424" alt="image" src="https://github.com/monthly-cs/2024-03-modern-react-deep-dive/assets/116958681/7f1ec751-13e8-46f2-920f-be451c332203"> 


## 깃허브 액션의 기본개념

> 스텝 > 잡(병렬실행) > 액션 > 러너(실행 서버)

- 러너: 파일로 작성된 깃허브 액션이 실행되는 서버를 의미함.
- 액션: 러너에서 실행되는 하나의 작업단위.
- 이벤트: 깃허브 액션의 실행을 일으키는 이벤트.
- 잡: 하나의 러너에서 실행되는 여러 스텝의 모음. (병렬O)
- 워크플로우: 하나 이상의 작업을 포함할 수 있고, push or pull 요청과 같은 이벤트에 의해 트리거 됨. 가장 최상위 개념으로 .yaml로 작성됨.
- 스텝: 잡 내부에서 일어나는 하나하나의 작업. (병렬X)


## 깃허브 액션 작성하기

- 저장소 루트: ./github/workflows 폴더 생성
- yaml 파일 작성을 위해 .yml, .yaml 확장자 사용.
- 저장소에 prettier가 설치되어 있다면 yaml 파일도 함께 포함시켜 코드 스타일 유지하는 것이 좋음.


### yaml 파일 내에서 액션은 어떻게 작성되었을까?

- name: 액션의 이름.
- run-name: 액션이 실행될 때 구별할 수 있는 타이틀 명. (필수X)
- on: 언제 이 액션을 실행할 지를 정의. (필수O)
- jobs: 필수 값. 해당 액션에서 수행할 잡을 의미. (필수O) / 한 개 이상인 경우, 병렬로 실행.


### 액션 작성의 장점

- Next.js 프로젝트를 빌드하는 CI를 작성할 수 있다.
- 젠킨스를 처음부터 구축하여 사용하는 것 보다 손 쉽게 CI 구축이 가능하다. 
- 저장소에 yaml 파일 하나만 추가하여 CI 구축 가능.
- Github actions 를 적절히 활용하여 다양한 작업을 할 수 있다.


## 직접 작성하지 않고 유용한 액션과 깃허브 앱 가져다 쓰기.
### 깃허브에서 제공하는 기본 엑션

- actions/ checkout: 깃허브 저장소를 체크아웃하는 액션./ 저장소를 기반으로 작업할 경우 반드시 필요.
- actions/ setup-node: Node.js 설치하는 액션.
- actions/ github-script: Github API가 제공하는 기능을 사용할 수 있도록 도와주는 액션.
- actions/ stale: 오래된 이슈, PR을 자동으로 닫거나 더 이상 커뮤니케이션 하지 못하도록 닫는다.
- actions/ dependency-review-action: 의존성 그래프에 대한 변경되었을 때 실행되는 액션.
- github/codeql-action: 깃허브의 코드 분석 솔루션인 code-ql을 활용해 저장소 내 코드의 취약점을 분석해준다.
- 이외에도, Marketplace라는 서비스를 제공하여 여러 사용자가 만들어 놓은 액션을 손쉽게 가져다 쓸 수 있다.


### 저장소에 포함되어 있는 "이미지 최적화 액션": calibreapp/image-actions 

- PR로 올라온 이미지를 sharp 패키지를 이용하여 거의 무손실로 압축해서 다시 커밋해주는 기능을 가지고 있다.
- 저장소 자체의 이미지 크기를 줄인다면 풀(pull) 할 때 부담을 덜 수 있는 것이 특징이다.

### 해당 웹사이트에 라이브러리 취약점이 존재하는 지 확인하는 액션: lirantal/is-website-vulnerable 

- is-website-vulnerable를 기반으로 작동하는 액선으로, 프로젝트가 배포된 웹사이트를 주기적으로 스캔하여 취약점이 있는지 확인한다.
- 특별한 이상이 없다면 단순히 액션이 실행되지만, 취약점이 발견되면 액션은 실패한다. (이메일을 통해 알 수 있다.)
- 이미 배포된 라이브러리가 이후에 보완 취약점이 발생되어 보안 솔루션에서 뒤늦게 발견되는 경우도 많다.
- main push가 일어나는 경우에 확인 보다는 needs: *** 구문을 추가하여 배포 잡이 끝난 이후에 실행. / on.workflow_run으로 실행.
  
### Lighthouse CI

- 구글에서 제공하는 액션
- 웹 성능 지표인 라이트 하우스를 CI 기반으로 실행할 수 있도록 도와주는 도구.
- 프로젝트의 URL을 방문하여 라이트 하우스 검사 실행 > 머지 예정인 웹사이트의 성능 지표를 측정할 수 있음.



## 깃허브 Dependabot으로 보안 취약점 해결하기


### package.json의 dependencies 이해하기
의존성 문제를 해결하기에 앞서 의존성과 버전에 대해 알아보자.

### package.json의 버전
#### 유의적 버전의 정의

- 기존 버전과 호환되지 않게 API가 바뀌면 "주 버전"을 올리고
- 기존 버전과 호환되면서 새로운 기능을 추가할 때는 "부 버전"을 올리고
- 기존 버전과 호환되면서 버그를 수정한 것이라면 "수 버전"을 올린다.

#### npm 버전 규칙 정의

- react@16.0.0: 버전 앞에 특수기호 없는 경우, 해당 버전에 대해서만 의존하고 있다.
- react@^16.0.0: 16.0.0과 호환되는 버전. / ex. 16.0.0부터 17.0.0 미만의 모든 버전
- react@~16.0.0: 패치 버전에 대해서만 호한되는 버전을 의미. / ex. 16.0.0부터 16.1.0 미만의 모든 버전

※ 유의적 버전은 개발자들간의 암묵적인 약속일 뿐, 해당 API의 버전이 유의적 버전에 맞춰 규현되어 있는지 알 수 없음을 유의. 
/colors.js 라이브러리 사건: 작동 불가능한 패키지를 배포함. 모든 프로젝트에 에러 발생..

### package.json의 의존성

- package.json에서 dependencies란: 프로젝트를 운영하는 데 필요한 자신 외의 npm 라이브러리를 정의해 둔 목록.
- JSON 형식으로 작성되어 있음.  
- 주로 dependency와 dependencies로 구성되어 있음.


- dependencies: 프로젝트를 실행하는데 꼭 필요한 패키지. npm install
- devDependencies: 개발 단계에서 필요한 패키지들을 선언. npm install --save-dev
- peerDependencies: 서비스 보다 라이브러리와 패키지에서 자주 쓰이는 단위./ 직접적으로 require, import 하진 않지만 호환성으로 인해 필요한 경우.

===

## Dependabot으로 취약점 해결하기

실습을 위해 npm 버전 8.14 이상 준비.
> 프로젝트 생성 > 원격 저장소에 push > package.json 작성 (책 내용대로)

```jsx
{
  "name": "vulnerability",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "axios": "^0.19.0",
    "mobx": "^5.11.0",
    "mobx-react-lite": "^1.4.1",
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-router-dom": "^5.0.1",
    "react-scripts": "^3.4.1",
    "react-swipeable-views": "^0.13.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

### github에서 제공하는 강력한 기능, Dependabot!

> 의존성에 문제가 있다면 관련 문제를 알려주고, 해결할 수 있는 풀 리퀘스트까지 열어준다.
> 취약성의 정도를 Critical > High > Moderate > Low의단계로 분류.
> 대부분의 의존성은 package-lock.json에 숨어있는 경우가 많다.

## github의 Dependabot 사용법
![image](https://github.com/monthly-cs/2024-03-modern-react-deep-dive/assets/116958681/e7965777-0e80-40fa-a5ae-68382213cd40)
- repository > Setting > Code security and analysis 탭에서 Enable 가능하다.

![image](https://github.com/monthly-cs/2024-03-modern-react-deep-dive/assets/116958681/d92f0998-dde1-42fb-bf77-3fb34bd38384)


![image](https://github.com/monthly-cs/2024-03-modern-react-deep-dive/assets/116958681/15513a6c-e0a3-4294-a02b-e113a35998fe)
![image](https://github.com/monthly-cs/2024-03-modern-react-deep-dive/assets/116958681/0daf6123-a970-4a2d-9133-46992fa80e04)


===

### Dependabot의 문제확인 과정

- 문제가 무엇인지 확인. (Dependabot - Dependabot alerts에서 확인)
- 패키지가 어디에서 설치됐는지 확인.(명령어 입력 : npm ls [찾고싶은 파일이름] )
- 해당 패키지의 버전 확인 / 고정된 버전을 사용하고 있을 경우, 의존성을 업데이트해서는 해결되지 않는다.
- 마지막으로 해당 패키지를 어떻게 사용하고 있는지 확인한다.

### 취약점 해결하는 과정

- 모든 취약점이 실제 서비스의 보안 취약점으로 연결되는 것은 아니다.
- 취약점이 발생하는 시나리오를 건드리지만 않는다면 크게 문제 되지 않을 수 있다.
- 가장 먼저 위험하다고 판단되는 취약점을 조치하자.

#### 해결방법1 : 깃허브 Dependabot이 풀 리퀘스트를 열어준 경우

- 이미 취약점을 해결한 패치가 존재한다는 뜻.
- 릴리스 노트(깃허브 저장소): 변경사항을 쉽게 확인해볼 수 있음.
- 해결예시) Mergy하는 즉시 보안 경고가 사라지고 해당 버전으로 업데이트 된다.

#### 해결방법2 : 풀 리퀘스트로 손쉽게 해결할 수 없는 경우 

- 마찬가지로 명령어를 입력하여 의존성을 확인한다 : npm ls 찾고싶은 파일이름
  > 문제점: 대부분의 패키지에서와 다르게 한 곳에서만(recursive-readdir) 3.0.4 버전을 사용하고 있었음.<br>
  > 해결방법: 3.0.4로 지정되어 있는 버전 표현식의 수 버전을 올려서 대응한다.<br>
  > npm이 제공하는 overrides를 사용하여 패키지 내부에 선언된 의존성을 강제로 올린다(덮어쓴다).
  
```jsx
{
  "overrides": {
    "minimatch" : "^3.0.5"
  }
}
```

※ 깃허브 Dependabot이 취약점 수정을 위해 제안하는 풀 리퀘스트는 실제 라이브러리를 사용하는 데 많은 변경이 있을 수 있기 때문에 무작정 머지해서는 안된다.

---

## 리액트 애플리케이션 배포하기

#### 가장 쉽고 빠르면서도 안정적인 방법으로 배포할 수 있는 몇가지 SaaS 서비스를 알아보자. (개인 프로젝트 X.)

- Netlify, Vercel, DigitalOcean 등이 있다.
- 서비스 별로 제공하는 기능은 일부를 제외하면 비슷하다.
- 대부분 3~4 단계 내로 웹 서비스 배포와 관련된 사전지식이 많지 않더라도 배포를 쉽고 빠르게 할 수 있다.
- 현재 개발 중인 웹 개수 등을 고려 후 판단하여 사용하면 된다. (서비스 이동은 생각보다 쉽지 않기 때문에 신중하게 선택하기.)

## Netlify

- 웹 애플리케이션을 배포할 수 있도록 도와주는 클라우드 컴퓨팅 서비스.
- 역사가 오래됨 / 어느정도 무료

### Netlify create-react-app으로 생성한 앱 배포하기

- 가입 후 팀(서비스의 기본 단위)을 생성 - Start for Free
- import an existing project를 눌러 저장소를 불러온다.
- 저장소: 레포지토리 이름 작성.
- 빌드 및 배포 관련 설정을 추가.
- > Branch to deploy: Merge가 일어났을 때 자동으로 배포가 수행되는 타깃 브랜치를 명시.
  > Base directory: 배포 명령어를 실행할 기본 디렉터리.
  > Build Command: 빌드 명령어.
  > Publish directory: 실제 서빗에 필요한 정적인 리소스가 위치한 디렉터리.
  
※Add environment variables 버튼을 눌러 프로젝트에 필요한 환경변수 지정가능.

### create-next-app으로 생성한 앱 배포하기 - 약간의 설정이 필요.

서버 사이드 애플리케이션을 서비스하므로 추가적인 설정이 필요.
- Next.js 애플리케이션 루트에 netlyfy.toml 파일을 생성한다.
- @netlify/plugin-nextjs 플러그앤은 Next.js 기반 애플리케이션을 배포하는데 도움을 준다.
- 동일한 배포설정을 위해 publish directory에 /.next로 지정해준다.

```jsx
[[plugins]]
package = "@netlify/plugin-nextjs"
```

### 사용시 주의사항

- 대역폭 월 100GB
- 빌드시간 최대 300분
- 동시 빌드 X 순차적으로 빌드해야 함.


## Vercel
Netlify와 비슷한 클라우드 서비스


### create-next-app으로 생성한 앱 배포하기
Netlify와는 다르게 Next.js 서비스를 별도의 설정 없이 배포할 수 있다.


### 추가기능

- 알림
- Serverless Function
- 다양한 템플릿
- 도메인 연결: 별도로 구매한 도메인을 연결.



## DigitalOcean

- 저장소를 바탕으로 바로 배포할 수 있는 서비스를 제공.
- 다른 업체와 다르게 Github Student Pack에 포함.
- 다양한 리소스에 대해 문서화가 상세하게 되어있음.
- 자체 블로그 운영.


### 추가기능

- 알림
- 컨테이너에 직접 접근
- 마켓플레이스
- 도메인 연결


## 리액트 애플리케이션 도커라이즈 하기

- 본격적으로 사용자에게 서비스하기 위한 웹 애플리케이션을 서비스하기에는 적절하지 않다.
- 자유롭게 커스터마이징하는 데 제약이 있다.
- 과거와 다르게 애플리케이션을 한의 컨테이너로 만들어 빠르게 배초한다.
  
### 도커란?

- 개발자가 모던 애플리케이션을 구축, 공유, 실행하는 것을 도와줄 수 있도록 설계된 플랫폼이다.
- 애플리케이션을 컨테이너 단위로 패키징한다.
- 컨테이너를 바탕으로 독립된 환경에서 애플리케이션이 항상 일관되게 실행할 수 있도록 보장해줌.

### 도커용어

Dockerfile에 필요한 것을 모아 빌드하면 "이미지". <br>
해당 이미지를 실행시키면 "컨테이너(가상화 환경)". <br>
이미지를 식별할 수 있는 레이블 값이 "태그", <br>
이미지를 모아두는 장소가 "리포지터리", <br>
다양한 리포지토리에 접근할 수 있도록 하는 서비스가 "레지스트리" 이다. <br>


### create-react-app을 도커 이미지로 만들어보기

1. 도커 설치
2. Dockerfile 작성하기
3. 작성한 도커 이미지를 빌드
4. 애플리케이션 실행을 위해 Dockerfile에 내용 추가

### create-next-app을 도커 이미지로 만들어보기

1. 프로젝트의 루트에 Dockerfile 생성
2. 프로젝트 빌드에 필요한 package.json, package-lock.json을 설치하여 node_modules를 생성
3. build 단게에서 deps에서 생성한 node_modules를 복사하여 사용. /프로젝트 빌드.
4. 빌드한 이미지를 실행할 준비: next.config.js에 내용추가
   > output: Next.js에서 빌드를 위해 제공하는 기능.
5. 마지막으로 runner 단계를 만들어서 standalone으로 만들어진 Next.js를 실행.
6. 사용해야 할 포트를 EXPOSE로 설정, ENTRYPOINT로 node server.js를 실행. 


### 도커로 만든 이미지 배포하기

- "도커 허브"라는 공간에 업로드 가능
- 도커 데스크 톱을 이용한다면 쉽게 업로드가 가능하다.

  1. 저장소 생성
  2. 저장소에 이미지 푸쉬(이미지 태그명이 사용자명/저장소명: 태그명) 형식으로 일치해야 함.
  3. Push to Hub을 눌러 도커 허브로 배포.


### 도커 이미지 실행하기

- GCP 가입
- 사용자의 기기에서 GCP를 제어할 수 있는 gcloud cli를 설치.
- gcloud 명령어를 사용하기 위해 명령어로 로그인: gcloud auth login
- 앞서 만든 프로젝트를 기본 프로젝트로 지정.
- 빌드된 도커 이미지를 준비
- 구글 클라우드 플랫폼의 콘솔에 접속
- Artifact Registry를 찾아 서비스에 접속
- 페이지 상단의 저장소 만들기를 눌러 저장소를 만든다.
- 만들어진 빈 저장소의 주소 확인.(푸쉬할 이미지의 이름)
- 이미지를 푸쉬하기 위해 앞의 주소가 GCP를 향하는 것으로 도커에 설정해야 함.
- Cloud Run에서 이미지를 실행한다.
  > 지속적으로 새 버전을 배포하기 위해 '소스 저장소에서 지속적으로 새 버전 배포'를 선택한다.
