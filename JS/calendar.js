const calendarBody = document.getElementById("calendar-body");
const monthDisplay = document.querySelector(".calendar-month");

// 현재 날짜와 시간
let calendarDate = new Date();
let selectedDateElement = null;//이벤트때 클래스스타일지우는 용도

function showCalendar() {
    const firstDay = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1);
    const lastDay = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0);
    calendarBody.innerHTML = "";

    let currentDate = new Date(firstDay);
    let weekRow = document.createElement("tr");

    // 1일 전까지의 요일에는 빈 셀을 만듬
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyCell = document.createElement("td");
        weekRow.appendChild(emptyCell);
    }
    
    //1일부터 말일까지 반복돌며 셀 만들고 표시함.
    while (currentDate <= lastDay) {
        const cell = document.createElement("td");
        const content = document.createElement("div");
        const contentText = document.createElement("span");

        contentText.textContent = currentDate.getDate(); //1 ~ 말일
        //날짜클릭시 이벤트(한 셀마다 부여)
        contentText.addEventListener("click", (event) => {
            const clickDate = new Date(`${calendarDate.getFullYear()}-${calendarDate.getMonth() + 1}-${parseInt(contentText.textContent)}`);
            console.log("위 : "+ event);
            handleDateOnClickEvent(DateUtils.toStringByFormatting(clickDate,), event); // "yyyy-mm-dd" 형식으로 date보냄
        });

        content.appendChild(contentText); //content div에는 날짜를 넣
        cell.appendChild(content); //셀에는 content div를 넣
        weekRow.appendChild(cell);
        // 토요일 or 막날이면 다음 주로 넘김
        if (currentDate.getDay() === 6 || currentDate.getTime() === lastDay.getTime()) {
            calendarBody.appendChild(weekRow);
            weekRow = document.createElement("tr");
        }

        
        //Day++;
        currentDate.setDate(currentDate.getDate() + 1);

    }

    monthDisplay.textContent = `${calendarDate.getFullYear()}년 ${calendarDate.getMonth() + 1}월`;
}

//날짜를 눌렀을 때 이벤트
const handleDateOnClickEvent = (date, event) => {
    TodoListService.getInstance().viewTodoBySelectedDate(date); //날짜별조회메서드 실행
    if (selectedDateElement) {
        selectedDateElement.classList.remove("select");
    } else { //다른 클릭 요소 스타일들 지움
        document.querySelector(".fa-calendar").classList.remove("select");
    }
    event.target.classList.add("select"); //누른거엔 추가
    selectedDateElement = event.target; //다음 클릭시 이번에 누른건 지워지도록 저장
    
}

const viewAllPeriodOnClickHandle = (target) => {
    TodoListService.getInstance().viewAllPeriod();
    if (selectedDateElement) {
        selectedDateElement.classList.remove("select");
    }
    target.classList.add("select");
    selectedDateElement = target;

}

// 이전 달/다음달 버튼에 클릭 이벤트 추가
document.getElementById("beforebtn").addEventListener("click", beforeMonth);
function beforeMonth() { // 현재 날짜의 달에 -1한 후 출력
    calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, calendarDate.getDate());
    showCalendar();
}
document.getElementById("nextbtn").addEventListener("click", nextMonth);
function nextMonth() {
    calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, calendarDate.getDate());
    showCalendar();
}
showCalendar();

