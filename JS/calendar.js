const calendarBody = document.getElementById("calendar-body");
const monthDisplay = document.querySelector(".calendar-month");

// 현재 날짜와 시간
let calendarDate = new Date();


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
        //날짜클릭시 이벤트 실행
        contentText.addEventListener("click", () => {
            handleDateClick(currentDate.getDate());
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

//날짜를 눌렀을 때
function handleDateClick(date) {
}

// 이전 달 버튼에 클릭 이벤트 추가
document.getElementById("beforebtn").addEventListener("click", beforeMonth);

// 현재 날짜의 달에 -1한 후 출력
function beforeMonth() {
    calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, calendarDate.getDate());
    showCalendar();
}

document.getElementById("nextbtn").addEventListener("click", nextMonth);
function nextMonth() {
    calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, calendarDate.getDate());
    showCalendar();
}


showCalendar();