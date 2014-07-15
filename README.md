# Pack.API
## 모델링
* [Model](./wiki/Data-Model)

## 관리툴
* 몽고디비 어드민 맥용 - [Robomongo](http://robomongo.org )

## 아키텍쳐
* 일단 웹/앱 서버는 동일한 서버에서 돌림 - 나중에 분리
*
## API
* 로그인 (POST /login)
  - curl http://127.0.0.1:3000/login -X POST -d "email=rangken@gmail.com&password=[filter]"
## API 공통
* Content-Type 으로 모바일 웹 구분? User-Agent 로 해도 될듯?
  - curl URL -H "Content-Type: application/json"
* Token 인증 x-pack-username, x-pack-token 헤더로 인증함
  - curl URL -H "Content-Type: application/json" -H "x-pack-username: rangken@gmail.com" -H "x-pack-token: asfasf"
* 언어코드 보내주면 에러메세지 해당 내용으로 전송? 아직 안쓰고 나중위해서 , 기본 ko 로 되어있음
  - curl URL?local=en/kr

* {"status": "0", "msg": "에러내용", "data": "api 내용"} 으로 통일

## TODO
* 아직할일없음 angular moongoose 공부나
* Cap, Docker 설정?
