# Pack.API
## 모델링
* [Model](https://github.com/Nexters/Pack.API/wiki/Modeling)
* [API](https://github.com/Nexters/Pack.API/wiki/API)

## 관리툴
* 몽고디비 어드민 맥용 - [Robomongo](http://robomongo.org )

## 아키텍쳐
* 일단 웹/앱 서버는 동일한 서버에서 돌림 - 나중에 분리


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
