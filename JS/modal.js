const openModal = () => {
    const modal = document.querySelector(".modal");
    modal.classList.remove("invisible");
}
const closeModal = () => {
    const modal = document.querySelector(".modal");
    modal.classList.add("invisible");
    modal.innerHTML = "";
}
//ModifyModal에서 날짜 입력 후 엔터시 이벤트
const modifyDateOnKeyUpHandle = (event) => {
    if(event.keyCode === 13) {
        const todoId = event.target.parentElement.getAttribute("value");
        modifyDate(todoId);
        closeModal();
    }

    //입력중 esc클릭시 취소
    if(event.keyCode === 27) {
        closeModal();
    }
}

const modifyDate = (id) => {
    const newTodoDate = document.querySelector(".modal-main .date-input").value;
    const todo = TodoListService.getInstance().getTodoById(id);
    //공백이거나 기존의값과 같을 때
    if(todo.createDate === newTodoDate || !newTodoDate) {
        alert("값을 올바르게 수정해주세요");
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
                    날짜 수정
                </h1>
            </header>
            <main class="modal-main" value="${todo.id}">
                <p class="modal-message">
                    원하는 날짜를 선택해주세요
                </p>
                <input type="date" class="date-input w-f" value="${todo.createDate}" onkeyup="modifyDateOnKeyUpHandle(event);">
            </main>
            <footer class="modal-footer">
                <button class="btn" onclick="modifyDate('${todo.id}'); closeModal();">확인</button>
                <button class="btn" onclick="closeModal();">닫기</button>
            </footer>
        </div>
    `;
}