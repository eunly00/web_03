# 웹서비스설계 3차과제 사람인 크롤링링

## 프로젝트 설명
이 프로젝트는 채용 공고 관리, 사용자 활동 로깅, 공고 태그 관리 등을 포함한 API 서비스입니다.
사람인 크롤링을 통해 데이터베이스를 구성하였고 
 Express.js와 Sequelize를 사용하여 구현되었으며, Swagger를 사용해 API 문서를 제공합니다.

---

## 설치 및 실행 방법

### 1. 저장소 클론
```bash
$ git clone <repository-url>
$ cd <repository-name>
```

### 2. 의존성 설치
```bash
$ npm install
```

### 3. 환경 변수 설정
`.env` 파일을 생성하고 아래와 같이 환경 변수를 설정합니다.
```env
DB_HOST=<데이터베이스 호스트>
DB_PORT=<데이터베이스 포트>
DB_USER=<데이터베이스 사용자>
DB_PASSWORD=<데이터베이스 비밀번호>
DB_NAME=<데이터베이스 이름>
JWT_SECRET=<JWT 시크릿 키>
```

### 4. 데이터베이스 설정
#### 1) 마이그레이션 실행
```bash
$ npx sequelize-cli db:migrate
```

#### 2) 시드 데이터 추가 (선택 사항)
```bash
$ npx sequelize-cli db:seed:all
```

### 5. 서버 실행
#### 개발 모드
```bash
$ npm run dev
```

#### 프로덕션 모드
```bash
$ npm run build
$ npm start
```

---

## 빌드 및 배포

### 빌드 명령어
```bash
$ npm run build
```

### 배포 스크립트 (Docker)
```bash
$ docker build -t <image-name> .
$ docker run -d -p 3000:3000 --name <container-name> <image-name>
```

---

## API 문서
Swagger를 통해 API 문서를 확인할 수 있습니다.
### 로컬 실행
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 주요 기능

### 1. 채용 공고 관리
- 공고 등록, 조회, 수정, 삭제
- 공고 태그 관리
- 공고 조회수 증가 및 추천 공고 제공

### 2. 사용자 활동 로깅
- 로그인, 로그아웃 등의 사용자 활동 기록

### 3. 공지 및 알림
- 공지사항 관리
- 사용자 알림 관리

---

## 디렉토리 구조
```
<project-root>
├── routes/        # API 라우트 파일
├── models/        # Sequelize 데이터베이스 모델
├── config/        # 환경 설정 파일
├── public/        # 정적 파일
├── views/         # 뷰 템플릿 (EJS)
├── app.js         # Express 앱 설정
├── package.json   # 프로젝트 메타정보 및 의존성 목록
└── README.md      # 프로젝트 설명서
