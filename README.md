# To Do List 웹서비스 개발

**산업대응특화훈련 AWS 기반 공공ㆍ빅데이터 활용 웹서비스 개발자 양성과정**에서

학습한 **HTML, CSS, JavaScript** 능력을 평가(시험)하기 위해

본인이 원하는 디자인의 **Todo** 웹 서비스를 제작하는 프로젝트입니다.



<img src="https://github.com/SeongGwangJu/AWS_Exam_Todolist_Project/assets/133538833/9f3dafba-69f5-498e-bd20-b89ec8db549d)" width="80%" height="50%"/>

	
---
## 사용한 스택들
<div>
		<h4>개발환경</h4>
<img src="https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<br>
		<h4>사용 언어</h4>
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<br>
</div>

---

## 개발 기간


2023.08.09(수) ~ 2023.08.16(수) (8일)

---



## 평가 기준

- 레이아웃 및 스타일 구현 능력 ✔️

#### 필수 구현 기능

  - 기본적인 To Do의 CRUD(추가, 조회, 수정, 삭제) 구현 ✔️
 
  - 복수의 메뉴를 가진 사이드바 ✔️
 
  - 복수의 페이지와 페이지 이동 기능 ✔️
  
  - 모달창 구현 ✔️

#### 추가 구현 기능(가산점)

  - 캘린더 추가 ✔️

  - 캘린더를 통한 날짜별 조회 ✔️

  - todo 상태(완료/미완료)에 따른 조회 및 상태 표시 ✔️
    
  - 완료된 일 전체 삭제 기능 ✔️

---

### 코드 미리보기

##### Todo Data를 화면에 출력하는 updateTodoList 메서드 
( 페이지 이동시 / todo 추가 후 / 날짜 또는 상태별 조회시)


```
updateTodoList() {
	this.updateInnerHTML(this.listFilter());
	this.updateRemainingStatus();
}

listFilter() {
	//(1)view-type에 따라 필터링
	switch (this.completStatusFilter) {
		case "all":
			this.viewTypeFilteredList = this.todoList;
			this.removeAllViewTypeStyle();
			document.querySelector(".view-all").classList.add("selected");
			break;
		case "active":
			this.viewTypeFilteredList = this.todoList.filter(
				(todo) => !todo.completStatus
			);
			....(중략 : 스타일 변경)
		case "completed":
			this.viewTypeFilteredList = this.todoList.filter(
				(todo) => !!todo.completStatus
			);
			...(중략 : 스타일 변경)
	}

	//(2)클릭한 날짜에 따라 필터링
	if (this.clickedDate == "") {
		//클릭된날짜가 없을때(기본값)
		return this.viewTypeFilteredList;
	} else {
		//클릭된날짜가 있으면
		return this.viewTypeFilteredList.filter(
			(todo) => todo.createDate === this.clickedDate
		);
	}
}
//Html요소를 바꿈 => 화면update.
updateInnerHTML(List) {
	const todoListMainContainer = document.querySelector(
		".todolist-main-container"
	);

	todoListMainContainer.innerHTML = List.map((todo) => {
		return `
	<li class="todolist-items">
						<div class="item-left">
							<input type="checkbox" id="complet-chkbox${todo.id}" class="complet-chkboxs"
			${todo.completStatus ? "checked" : ""} value="${
			todo.id
		......(중략 : todo 표시부 )
	}).join("");


```


```

```


```

```


```

```
