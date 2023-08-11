// 엔터누르면 리스트 추가
const addTodoOnKeyUpHandle = (event) => {
    if (event.keyCode === 13) { //13 :ENTER
        generateTodoObj();
    }
}
//체크하면 *미완
const checkedOnChangeHandle = (target) => {
    TodoListService.getInstance().setCompletStatus(target.value, target.checked);

}

const removeTodoOnClickHandle = (target) => {
    // 아이콘을 클릭하면 부모요소의 value를 받아와 삭제
    TodoListService.getInstance().removeTodo(target.parentElement.getAttribute("value"));
}

const modifyTodoOnClickHandle =(target) => {
    openModal();
    //const modal = document.querySelector(".modal");
    modifyModal(TodoListService.getInstance().getTodoById(target.parentElement.getAttribute("value")));
}


//todo 객체 생성 후 addTodo()로 패스(=>ArrayList에 넣음)
const generateTodoObj = () => {
    const todoContent = document.querySelector(".todolist-header-items .text-input").value;

    const todoObj = {
        id: 0,
        todoContent: todoContent,
        createDate: DateUtils.toStringByFormatting(new Date()),
        completStatus: false
    };
    TodoListService.getInstance().addTodo(todoObj);
}

class TodoListService {
    //싱글톤
    static #instance = null;
    static getInstance() {
        if(this.#instance === null) {
            this.#instance = new TodoListService();
        }
        return this.#instance;
    }

    todoList = new Array();
    todoIndex = 1;
    
    //////// 생성자 + loadTodoList() ////////
    //Service.getInstance할때마다 나와서 todoList불러옴
    constructor() {
        this.loadTodoList();
    }

    loadTodoList() {
        /* 참고
        JSON.parse(Json문자열) : JSON'문자열' => 객체로 변환
        JSON.stringify(객체명) : 객체 -> 'JSON문자열' */

        //원리 확실히 알 것!
        //이중부정: 가져올 데이터가 있으면? (true)가지고 오고 / (false) 새 배열로 만든다
        this.todoList = !!localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : new Array();
       
        //this.todoList[this.todoList.length - 1]?.id : 배열의 마지막 id값.
        //!!을 붙임으로써, 해당 요소가 존재하지 않을 경우에도 에러를 발생시키지 않고 undefined를 반환
        //배열의 마지막 값이 있으면 (true): id값을 todoIndex에 대입,
        //(false = 아무 값도 없다 = 아무 todo가 없다): todoIndex에 1넣음
        this.todoIndex = !!this.todoList[this.todoList.length - 1]?.id ? this.todoList[this.todoList.length - 1].id + 1 : 1;

    }
    //////// 생성자 + loadTodoList() ////////

    //////// add, update 시작 ////////

    //todoObj받아와서 todoList에 추가함
    addTodo(todoObj) {
        //'todo'객체 만듬
        const todo = {
            ...todoObj, //깊은복사. todoObj의 함수 선언문 자체를 갖고온거랑 같음
            id: this.todoIndex
        }

        this.todoList.push(todo);
        this.saveLocalStorage();
        this.updateTodoList();
        this.todoIndex++;
    }

    //todoList값을 문자열로 변환해 로컬에 저장함(로컬은 문자열밖에 못받아서)
    saveLocalStorage() {
        console.log("세이브로컬까지 왔습니다");
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
        // 형태 : localStorage.setItem(Key, Value)
    }

    //todoList의 List를 innerHTML로 화면에 뿌림.
    updateTodoList() {
        console.log("업데이트까지 왔습니다");
        const todoListMainContainer = document.querySelector(".todolist-main-container");
        
        todoListMainContainer.innerHTML = this.todoList.map(todo => {
            return `
              <li class="todolist-items">
							<div class="item-left">
								<input type="checkbox" id="complet-chkbox${todo.id}" class="complet-chkboxs"
                                ${todo.completStatus ? "checked" : ""} value="${todo.id}" onchange="checkedOnChangeHandle(this);">
								<i class="fa-regular fa-square ${todo.id}"></i>
							</div>
							<div class="item-center">
								<pre class="todolist-content">${todo.todoContent}</pre>
                                <p class="todolist-date">${todo.createDate}</p>
                                <div class="edit-button" value="${todo.id}" > 
                                <i class="fa-solid fa-pen" onclick="modifyTodoOnClickHandle(this);"> </i> </div>
							</div>
							<div class="item-right">
								<div class="todolist-item-buttons">
									<div class="remove-button" value="${todo.id}">
                                    <i class="fa-solid fa-xmark" onclick="removeTodoOnClickHandle(this);"> </i> </div>
								</div>
							</div>
						</li>
                `;
        }).join("");
        const remainingTodoCount = this.todoList.filter(todo => !todo.completStatus).length;
        const remainingTodoElement = document.querySelector(".remaining-todo");
        remainingTodoElement.innerHTML = remainingTodoCount + " items lefts";

    }
    //////// add, update 끝 ////////

    //List 체크박스 * 미완
    setCompletStatus(id, status) {
        this.todoList.forEach((todo, index) => {
            if(todo.id === parseInt(id)) { //id = boolean이라, int로 변환 후 비교
                this.todoList[index].completStatus = status;
            }
        });

        this.saveLocalStorage();
    }

    //삭제하면 * 휴지통 이동 needed.
    removeTodo(id) {
        this.todoList = this.todoList.filter(todo => {
            return todo.id !== parseInt(id); //아이디랑 같지 않은것 만 배열에 담는다(같은건 지워야겠지?)
        });

        this.saveLocalStorage(); //저장
        this.updateTodoList(); //불러오기
    }

    getTodoById(id) {
        //필터 : 괄호 안의 조건에 맞는 녀석만 배열에 넣어줌, 조건에 맞는 놈이 하나니까 0번 인덱스를 참조.)

        console.log("gettodobyid" + this.todoList.filter(todo => todo.id === parseInt(id))[0]);
        
        return this.todoList.filter(todo => todo.id === parseInt(id))[0];
        
    }

    setTodo(todoObj) {
        for(let i = 0; i < this.todoList.length; i++) {
            if(this.todoList[i].id === todoObj.id) {
                this.todoList[i] = todoObj;
                break;
            }
        }
        this.saveLocalStorage();
        this.updateTodoList();
    }
}
