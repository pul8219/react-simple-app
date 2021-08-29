# react-simple-app

로그인, 글 작성, 글 조회를 구현한 리액트 서비스입니다.

# 1. 요구사항

Facebook Feed처럼 글을 올리고 그 글에 댓글을 달아 사용자간 소통이 가능한 소셜피드 서비스를 구현하고자 한다.

- [x] 사용자는 첫 진입 시 ID/Password를 입력하여 접속할 수 있다.
- [x] 피드화면 상단에 글을 입력해 포스트 할 수 있다.
- [x] 글 입력 부분 아래는 작성한 글의 카드가 나열된다.
- [ ] 각 글카드에는 댓글을 달 수 있다.
- [ ] 글카드에는 글과 댓글 수가 표기되고 카드 하단에 댓글이 나열된다.

# 2. 개발 환경

## Frontend

- React

## Backend

- NodeJS
- ExpressJS
- mongoDB
  - mongoDB 설치시 자동으로 설정되는 `localhost://27017`의 `testdb`(데이터베이스명)를 사용하도록 코드를 작성하였습니다.

## 2.1 폴더 구조

```
│
└─client/
│   └─public/
│   │   └─index.html
│   └─src/
│       └─_actions
│       │   └─types.js      # action에 사용될 type을 정의해놓은 파일
│       │   └─user_action.js
│       └─_reducers
│       │   └─index.js      # 여러 reducer들을 모아주는 파일
│       │   └─user_reducer.js
│       └─components/views/
│       │   └─LoginPage/
│       │       └─LoginPage.js
│       │   └─RegisterPage/
│       │       └─RegisterPage.js
│       │   └─FeedPage/
│       │       └─ItemTemplate.js
│       │       └─ItemList.js
│       │       └─Item.js
│       │       └─ItemInput.js
│       └─hoc/
│       │   └─auth.js       # 페이지 접근 권한 확인
│       └─App.js
│       └─App.css
│       └─index.js
│       └─setupProxy.js     # CORS 에러를 해결하기 위한 프록싱
│
│
└─server/
    ├─middleware/
    │   └─auth.js       # 권한 확인하는 미들웨어
    └─models
    │   └─User.js       # 사용자의 데이터와 관련된 스키마 포함
    │   └─Board.js      # 게시글 데이터와 관련된 스키마 포함
    └─index.js      # 백엔드 entry 파일(route, api end point, mongodb 설정 등 포함)
```

# 3. 설치, 실행방법

## Backend

- NodeJS가 설치된 환경이어야 합니다.
- 운영체제에 맞게 mongoDB가 설치되어있어야합니다. https://www.mongodb.com/try/download/community

```shell
# install dependency
$ npm install

# start server
$ npm run start
```

## Frontend

```shell
# 프로젝트의 루트 경로에서 client 폴더로 이동
$ cd ./client

# install dependency
$ npm install

# start server. `http://localhost:3000/`으로 접속
$ npm run start

```

# 4. Dependency

## Backend

- mongoose
- express
- cookie-parser
- jsonwebtoken

## Frontend

- react
- react-dom
- react-router-dom
- axios
- http-proxy-middleware
- redux
- react-redux
- redux-promise
- redux-thunk

# 5. 문제 해결 전략

서비스의 첫 화면은 로그인 페이지 입니다. 회원가입 페이지에서 아이디와 비밀번호를 등록한 후 로그인 페이지에서 해당 아이디, 비밀번호로 로그인하면 게시글 목록이 보이는 피드 페이지로 진입할 수 있습니다. 게시글은 글을 작성한 사용자의 아이디로 구분됩니다.

## 메인 페이지의 컴포넌트 구조

로그인 후 접근 가능한 피드 화면(FeedPage)에는 사용자들이 작성한 글이 나열됩니다. 피드 화면과 관련된 컴포넌트는 다음과 같은 구조로 작성했습니다. 게시글과 관련된 상태(State)는 ItemTemplate 컴포넌트에서 관리되게 하였습니다.

```
<FeedPage>      # 로그인 하면 접근할 수 있는 피드 화면
    <ItemTemplate>      # 글과 관련된 컴포넌트들을 관리하는 상위 컴포넌트

        <ItemInput />       # 글 입력

        <ItemList>      # 글 목록
            <Item />
            <Item />
            <Item />
            <Item />
            ...     # 개별 글
        </ItemList>

    </ItemTemplate>
</FeedPage>
```

## 로그인 유지, 페이지에 대한 접근 제어

사용자가 로그인할 경우, 로그아웃 하기 전까지 로그인 상태를 유지시키기 위해서 쿠키를 사용했습니다. 사용자가 로그인하면 해당 사용자의 `_id`(mongoDB 데이터에 자동 생성)데이터를 이용해 token을 생성한 뒤 이를 쿠키와 데이터베이스의 해당 사용자의 데이터에 저장합니다. 로그아웃시에는 이 토큰값이 빈 값으로 초기화되도록 구현했습니다.

또한 다음과 같이 사용자에 따라 페이지 접근을 제한했습니다.

- 로그인 한 사용자의 경우: 로그인, 회원가입 페이지 접근 불가능
- 로그인하지 않은 사용자의 경우: 메인 페이지(글 피드 페이지) 접근 불가능

모든 페이지에 접근할 때 쿠키에 저장된 토큰을 이용해 사용자가 로그인 한 유저인지 하지 않은 유저인지 확인하여 페이지 접근을 허용하거나 막습니다. 이를 위해 `server/middleware/auth.js`라는 미들웨어를 작성하였습니다. auth 미들웨어는 사용자가 로그아웃할 때도 사용됩니다.

## Redux를 이용한 상태관리

user(사용자)와 관련된 기능(로그인, 회원가입)에 Redux를 사용하여 State가 관리되도록 구현했습니다. Redux 관련 코드의 동작과정은 다음과 같습니다.

컴포넌트에서 dispatch 호출 -> `_action`에서 어떤 작업이 이루어지는지 명시됩니다(axios 요청) -> `_reducer`에서 `_action`을 받아 State를 갱신합니다. -> State는 Store에서 관리됩니다.

## CORS 에러 해결

React는 3000번 포트를 사용하고, 백엔드인 Express는 5000번 포트를 사용하기 때문에 두 출처의 origin이 달라 구현 과정에서 CORS에러가 발생했습니다. 이를 해결하기 위해서 `http-proxy-middleware`라는 모듈을 사용했습니다. (로컬환경에서 CORS를 해결할 수 있는 방법 중 하나입니다.) 이 모듈을 사용하면 예를 들어 `http://localhost:3000/`으로 시작되는 요청을 `http://localhost:5000`으로 변환하여 요청할 수 있어 CORS 에러가 발생하지 않습니다.
