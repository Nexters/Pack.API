# Pack.API
## 모델링
* [Model](./wiki/Data-Model)

## 관리툴
* 몽고디비 어드민 맥용 - [Robomongo](http://robomongo.org )

## 아키텍쳐
* 일단 웹/앱 서버는 동일한 서버에서 돌림 - 나중에 분리

## API 대략 내용
- 로그인 (POST /login)

```
  curl http://127.0.0.1:3000/login -X POST -d "email=rangken@gmail.com&password=[filter]" -H "User-Agent: Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/1A542a Safari/419.3"
```

- 유저 정보 가져오기 (GET /users/:_id)

```
  curl http://127.0.0.1:3000/users/53c3880b70cdb40e6bf3ed03 -H "x-pack-email: rangken@gmail.com" -H "x-pack-token: 0TdediQ5fxvLgHHBg2jjUQ=="
```

## API 공통
* User-Agent 모바일 구분 테스트할때는 테스트용 헤더 넣어줘야됨
  - curl URL  -H "User-Agent: Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/1A542a Safari/419.3"
* Token 인증 x-pack-username, x-pack-token 헤더로 인증함
  - curl URL -H "x-pack-username: rangken@gmail.com" -H "x-pack-token: asfasf"
* 언어코드 보내주면 에러메세지 해당 내용으로 전송? 아직 안쓰고 나중위해서 , 기본 ko 로 되어있음
  - curl URL?local=en/kr
* {"status": "0", "msg": "에러내용", "data": "api 내용"} 으로 통일

## TEST
### Mocha 사용
  - grunt mochaTest
  - grunt mochaTest:src // 전부다
  - grunt mochaTest:user //유저관련

## TODO
* angular - [ ]
* moongoose - [ ]
* Cap - [x]
* ~~Docker~~
* Chef - [ ]
* Code Coverage - [ ]
* Mocha - [x]

## 배포
### 설치하기
===

1. gem install -g capistrano
2. gem install capistrano-node-deploy

===
### 실행하기
* cap deploy : 깃헙에 있는거 당겨서 노드 재실행
* cap node:start : 그냥 노드만 시작
* cap node:stop
* cap node:restart

## 참고라이브러리
- 테스트
	- *Should* : [https://github.com/visionmedia/should.js](https://github.com/visionmedia/should.js/)
 	- *SupperTest* : [https://github.com/visionmedia/supertest](https://github.com/visionmedia/supertest)
 	
- 배포
	- *capistrano* : [https://github.com/capistrano/capistrano](https://github.com/capistrano/capistrano)
	- *capistrano-node-deploy* : [https://github.com/loopj/capistrano-node-deploy](https://github.com/loopj/capistrano-node-deploy)