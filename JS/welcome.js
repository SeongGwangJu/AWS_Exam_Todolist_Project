const goToWriteOnClickHandle = () => {
  Routes.getInstance().routeState = "todolist";
  Routes.getInstance().show();
}