const sidebarToggleButtonOnClickHandle = () => {
  const sidebar = document.querySelector(".sidebar");
  const sidebarToggleButton = document.querySelector(".sidebar-toggle-button");

  if(sidebar.classList.contains("isSidebarOpen")) { //열려있으면
      sidebar.classList.remove("isSidebarOpen"); //닫는다(삭제한다)
      sidebarToggleButton.innerHTML = '▶'; 
  } else{ //닫혀있으면
      sidebar.classList.add("isSidebarOpen"); //연다(추가한다)
      sidebarToggleButton.innerHTML = '◀';
  }
}

const sidebarMenuOnClickHandle = (target) => {
  switch(target.innerHTML) {
      case "시작하기" :
          Routes.getInstance().routeState = "welcome";
          break;
      case "TODOLIST":
          Routes.getInstance().routeState = "todolist";
          break;
  }

Routes.getInstance().show();
sidebarToggleButtonOnClickHandle();
}
