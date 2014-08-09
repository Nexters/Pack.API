# Pack.API

## 모델링
* [Model](https://github.com/Nexters/Pack.API/wiki/Modeling)
* [API](https://github.com/Nexters/Pack.API/wiki/API)

## TODO
### 7월 5주차
#### 문규
* - [ ] Bootstrap 프론트 엔드 조금봐!
* - [x] GuestHouse 모델링
* - [ ] 기획 확정 전체 모델링
* - [ ] API 설계

#### 재영
* - [x] 유저 카카오 인증
* - [x] 카카오 프로필 업로드
* - [ ] 기획 확정 전체 모델링
* - [x] GCM 푸시

### 7월 4주차
#### 재영
* - [x] Station near api
* - [x] Station 모델링
* - [x] Station show index API 작성
* - [x] Mongoose Guide
* - [ ] Mongoose API
* - [ ] MongoDB
* - [x] CSV 임포터
* - [x] 유저가입 실패 상세 에러 메세지 fail 함수 메세지 전송할수 있도록
* - [ ] 400 500 에러 처리
* - [x] nested parameter 처리
* - [ ] NGINX 세팅 , 이미지 서비스

#### 문규

* - [x] Station 관리자 페이지 완성
* - [x] Place 모델링
* - [x] Place API 작성
* - [x] Place Test 작성

## CSV 임포터
- node scripts/importer.js <모델명>
-  node scripts/importer.js Station # data/station.csv 파일을 읽어온다.

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
