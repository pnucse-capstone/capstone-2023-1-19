## 부산대학교 2023년 전기 졸업과제 19번 - CloudChain팀  
프라이빗 클라우드 플랫폼 및 허가형 블록체인을 활용한 클라우드 네이티브 중고차 안전 거래 시스템

### 1. 프로젝트 소개

최근 신차 출고 기간이 늘어나며, 인기 차종은 1년 이상 기다려야 하는 문제점이 존재하여 중고차를 구매하는 현상이 늘어나고 있다. 국토교통부에서 조사한 중고차 시장 전망치에 따르면 21년부터 26년까지 꾸준히 성장할 것으로 보고 있다. 중고차 시장 규모가 커짐에 따라 자동차 중고차 거래 애플리케이션이 활발하게 운영되고 있다.

중고차 거래 애플리케이션은 변화에 따른 요구사항을 반영하기 위해 확및 유연성이 요구된다. 이는 서비스 제공에 미치는 영향 없이 시스템을 즉각적으로 변경할 수 있도록 구성해야 하며, 시장이 변화함에 따라 유연하게 반영할 수 있는 구조를 가져야 한다는 점을 의미한다. 

또한, 중고차 거래 피해가 지속적으로 발생함에 따라 정보의 신뢰성이 필요하다. 피해 중 대부분은 중고차 딜러나 판매자가 중고차의 성능과 상태를 고의적으로 숨기고 포장하여 구매자로부터 부당한 이익을 얻으려고 하는 사례이다. 이는 정보의 비대칭성 즉, 중고차 딜러나 판매자가 구매자보다 많은 정보를 가지고 있어 발생한다. 따라서 이와 같은 정보의 비대칭성으로 생겨나는 피해를 해결하기 위한 방안이 필요하다. 

따라서, 본 과제에서는 앞서 제시한 필요성에 따라 클라우드 환경에서 마이크로서비스 아키텍처 기반의 애플리케이션을 블록체인과 상호 연동한 중고차 안전 거래 시스템을 제안한다. 블록체인에 정보가 저장되기 때문에 위/변조가 불가능하여 데이터의 신뢰성을 보장한다. 뿐만 아니라 저장된 데이터의 투명성으로 인해 정보의 비대칭성을 해결할 수 있다. 그리고 클라우드 환경에서 마이크로서비스 아키텍처를 도입함으로써 시스템에 영향을 주지 않고 개별적으로 배포/업데이트/확장/축소할 수 있어 확장성, 유연성, 가용성 측면에서 이점을 얻을 수 있다. 이러한 차세대 기술들을 융합한 시스템 개발을 통해 허위 매물의 피해 방지, 중고 차량의 데이터에 대한 무결성 및 투명성 보장, 중고차 매물 정보에 대한 신뢰성을 확보할 수 있다. 

### 2. 팀소개

|이름|이메일|역할|
|---|---|------|
|[201824494 변재한](https://github.com/jaehanbyun)|whqdudn55@gmail.com|클라우드(Openstack) 개발|
|[201824479 박재현](https://github.com/wogusqkr0515)|wogusqkr0515@gmail.com|백엔드(Spring Boot) 개발 & 프론트엔드(React) 개발|
|[201824557 이제호](https://github.com/jhl8109)|jhl81094@gmail.com|블록체인(Hyperledger Fabric) 개발 & 프론트엔드(React) 개발|



### 3. 시스템 구성도

#### 전체 구성도
<img width="608" alt="스크린샷 2023-10-19 오후 8 31 32" src="https://github.com/pnucse-capstone/capstone-2023-1-19/assets/78259314/ee65ecda-835e-4c12-838b-1d4b69578233">

#### 마이크로서비스 구성도
<img width="470" alt="스크린샷 2023-10-19 오후 8 31 40" src="https://github.com/pnucse-capstone/capstone-2023-1-19/assets/78259314/008558a7-8710-43ff-92bb-c5b9610b3568">

#### 블록체인 구성도
<img width="501" alt="스크린샷 2023-10-19 오후 8 31 49" src="https://github.com/pnucse-capstone/capstone-2023-1-19/assets/78259314/dfd7c2df-f8da-4781-b6a8-757c991553eb">


### 4. 소개 및 시연 영상
[![챗봇 시연영상](http://img.youtube.com/vi/LFCMHcWW1qI/0.jpg)](https://www.youtube.com/watch?v=LFCMHcWW1qI)

### 5. 설치 및 사용법

### 인프라 관리 시스템

#### 프론트(React)
---
인프라 관리 시스템의 프론트엔드 사이드는 React Framework를 기반으로 설계되었습니다.

#### 1. Clone Project
``` shell
$ git clone https://github.com/pnucse-capstone/capstone-2023-1-19.git
$ cd ./capstone-2023-1-19/infra-repo/frontend
```
#### 2. Install dependencies in package.json
``` shell
$ npm install
```

#### 3. Run Project
``` shell
$ npm run start
```

### 백엔드(Go)
---
인프라 관리 시스템의 백엔드 사이드는 Go Language를 기반으로 설계되었습니다.
#### 0. Dependencies
|Name|Version|
|----|-------:|
|Openstack|2023.2|
|Go|1.21.3|
|Docker|20.10.18|
|Docker-Compose|3.8|
|Jenkins|2.428|
|Terraform|0.14|

#### 1. Clone Project
``` shell
$ git clone https://github.com/pnucse-capstone/capstone-2023-1-19.git
$ cd ./capstone-2023-1-19/infra-repo/backend
```
#### 2. Setup DB 
``` shell
$ docker-compose -d up
```
#### 3. Setup Pipeline
> Jenkins Container 구동 후 "createCluster" 이름의 Pipeline을 생성합니다.
```
# 1. Jenkins Container 구동
$ docker run --name jenkins -d -p 9090:8080 -v ~/jenkins:/var/jenkins_home -u root jenkins/jenkins:latest

# 2. capstone-2023-1-19/infra-repo/JenkinsfileCreate 파일 이용 pipeline 생성
```

#### 3. Run Go 
``` shell
$ go run main.go
```

### 중고차 거래 시스템

### 프론트(리액트)
---
중고차 거래 시스템의 프론트엔드 사이드는 React Framework를 기반으로 설계되었습니다.

#### 1. Clone Project
``` shell
$ git clone https://github.com/pnucse-capstone/capstone-2023-1-19.git
$ cd ./capstone-2023-1-19/front-repo
```

#### 2. Install dependencies in package.json
``` shell
$ npm install
```

#### 3. Run Project
``` shell
$ npm run start
```
### 백엔드(SpringBoot, CICD)
---
#### 0. Dependencies
|Name|Version|
|----|-------:|
|Java|OpenJDK 11.0.15|
|Springboot|2.7.1|
|Docker|20.10.18|
|kubernetes|1.24.0|

#### 1. Clone project
``` shell
$ git clone https://github.com/pnucse-capstone/capstone-2023-1-19.git
```

#### 2. Deploy Manifests
> Kubernetes의 Argocd를 사용해 중고차 거래 시스템 Manifests를 배포합니다.
``` shell
# capstone-2023-1-19/back-repo/manifests/app-of-apps 파일을 사용하여 중고차 거래 시스템을 배포
```
<img width="613" alt="image" src="https://github.com/pnucse-capstone/capstone-2023-1-19/assets/80397512/010cb2d7-58e5-4d7c-8830-6aebc25a483c">

#### 3. Check your argoCD

<img width="356" alt="image" src="https://github.com/pnucse-capstone/capstone-2023-1-19/assets/80397512/80c7d798-2c3c-43a1-bafa-978b23bc60fd">



### 블록체인(HyperledgerFabric)
---

#### 0. Dependencies
|Name|Version|
|----|-------:|
|OS|Ubuntu 20.04|
|Go|1.18.9|
|Hyperledger Fabric|2.4.7|
|Hyperledger Fabric-CA|1.5.7|
|Docker|24.0.6|
|Docker Compose|1.28.2|

#### 1. 프로젝트 파일 준비
``` shell
$ git clone https://github.com/pnucse-capstone/Capstone-2023-1-19.git
$ cd ./Capstone-2023-1-19/cloud_chain
```
#### 2. 블록체인 네트워크 구동
``` shell
$ ./cloudchain.sh up -ca -s couchdb
```
#### 3. 채널 생성 및 채널 가입
``` shell
$ ./cloudchain.sh set
```
#### 4. 체인코드 설치
``` shell
$ ./cloudchain.sh install
```
#### 5. 체인코드 배포
``` shell
$ ./cloudchain.sh commit
```
#### 5. 인터페이스 서버 실행
``` shell
$ cd ../interface
$ go run main.go
```
