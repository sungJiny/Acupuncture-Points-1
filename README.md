# 빅데이터 청년인재 13조 - 손을 주시오, 혈을 잡겠오

## 프로젝트 소개
  <img width="640" alt="cover" src="https://user-images.githubusercontent.com/63584973/91730400-d1021e00-ebe0-11ea-94f9-1766a5ae8cee.png">
  
  1. 프로젝트 명: 손을 주시오, 혈을 잡겠오  
  2. 조원: 김성진, 김재원, 김정규, 정지우, 최선  
  3. 프로젝트 소개: 손, 발, 얼굴 등 사진을 찍었을때 해당하는 주치에 해당하는 혈자리들을 짚어주는 이미지 학습 모델링을 만들기 위함  
  4. 개발기간: 2020.07.06 ~ 2020.08.31   


  
## Repository 구조

    1. CV_DeepLearning 
        : 딥러닝 기술(ResNet-Coordinate Regressor)을 활용한 신체 경혈점 예측
    2. EDA 
        : 이미지 데이터와 그에 관한 정보를 탐색하여 유의미한 관계가 있는지 검토
    3. HospitalGeo 
        : 주변 병원을 검색
    4. Image-Preprocess 
        : 이미지 태깅, 이미지 데이터 Transformation & Augmentation, json 데이터 추합 등
    5. Login 
        : 개인화를 위한 로그인
    6. Text-Searching 
        : inverted index 기반 정보검색을 활용한 사용자 입력 기반 혈자리, 음식 및 약재 추천
    7. webapp 
        : 서비스 화면 웹앱(flask) 구현
    
  
## COMMIT/공유사항 등의 작성방법
    1. COMMIT : 코드 push 시에 현재 본인이 작업중이거나/업데이트한 작업에 대해서 최대한 자세히 적는다.
        - (ex: [UPDATE]Image Tagger - 혈점 저장 버그 고침)

    2. 공유사항 : 프로젝트를 진행하면서 일어날 수 있는 모든 일/업데이트사항/버그 등에 대해서 작성한다.
        - 작성시 분류방법 : 제목앞에 []로 표시하되 TODO/ISSUE/개발 등 으로 구분하여 작성
          - (ex: [TODD]AR/VR 구현을 위한 자료 조사)

        - 2.1 버그 : 현재 찾아낸 버그에 대해서 코드상에 주석형태로 날짜, 본인이름, 버그형태 순으로 작성한다.
          - (ex: # 2020/07/30 by 재원, 새로운 혈자리 추가시 index out of range 버그 고침)
