const openModal = () => {
    const modal = document.querySelector(".modal");
    modal.classList.remove("invisible");
}
const closeModal = () => {
    const modal = document.querySelector(".modal");
    modal.classList.add("invisible");
    modal.innerHTML = "";
}

const modifyDateSubmitButtonOnClick = (id) => {
    const newTodoDate = document.querySelector(".modal-main .date-input").value;
    
    const todo = TodoListService.getInstance().getTodoById(id);
    //공백이거나 기존의값과 같을 때
    console.log("todo.createDate : " + todo.createDate)
    console.log("newTodoDate : " + newTodoDate)
    if(todo.createDate === newTodoDate || !newTodoDate) {
        alert("바보");
    }
    const todoObj = {
        ...todo,
        createDate: newTodoDate
    }
    TodoListService.getInstance().setDate(todoObj);
}

const modifyModal = (todo) => {
    const modal = document.querySelector(".modal");
    modal.innerHTML = `
            <div class="modal-container ">
            <header class="modal-header">
                <h1 class="modal-title">
                    Todo 수정
                </h1>
            </header>
            <main class="modal-main">
                <p class="modal-message">
                    수정을 원하시는 날짜를 선택해주세요
                </p>
                <input type="date" class="date-input w-f" value="${todo.createDate}">
            </main>
            <footer class="modal-footer">
                <button class="btn" onclick="modifyDateSubmitButtonOnClick('${todo.id}'); closeModal();">확인</button>
                <button class="btn" onclick="closeModal();">닫기</button>
            </footer>
        </div>
    `;
}