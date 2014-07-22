# Pack.API
## 모델링
* [Model](https://github.com/Nexters/Pack.API/wiki/Modeling)
* [API](https://github.com/Nexters/Pack.API/wiki/API)

## TODO
### 7월 4주차
#### 재영
* - [x] Station near api
* - [x] Station 모델링
* - [x] Station show index API 작성
* - [x] Mongoose Guide
* - [ ] Mongoose API
* - [ ] MongoDB
* - [x] CSV 임포터

#### 문규
* - [ ] Place 모델링
* - [ ] Place API 작성
* - [ ] Place Test 작성

## TEST
### Mocha 사용
  - grunt mochaTest
  - grunt mochaTest:src // 전부다
  - grunt mochaTest:user //유저관련
  
  
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

## 관리툴
* 몽고디비 어드민 맥용 - [Robomongo](http://robomongo.org )



## 참고라이브러리
- Node.js
	- *Mongoose Guide* [http://mongoosejs.com/docs/guide.html](http://mongoosejs.com/docs/guide.html)
	- *Mongoose API* [http://mongoosejs.com/docs/api.html](http://mongoosejs.com/docs/api.html)
	- *Mongodb* [http://docs.mongodb.org/manual/core/crud-introduction/](http://docs.mongodb.org/manual/core/crud-introduction/)
	
- 테스트
	- *Should* : [https://github.com/visionmedia/should.js](https://github.com/visionmedia/should.js/)
 	- *SupperTest* : [https://github.com/visionmedia/supertest](https://github.com/visionmedia/supertest)

- 배포
	- *capistrano* : [https://github.com/capistrano/capistrano](https://github.com/capistrano/capistrano)
	- *capistrano-node-deploy* : [https://github.com/loopj/capistrano-node-deploy](https://github.com/loopj/capistrano-node-deploy)
