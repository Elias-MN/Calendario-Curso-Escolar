let mainElement = document.querySelector('main');
let schoolYearElement = document.getElementById("schoolYear");
let inputYearElement = document.getElementById("inputYear");
let goodMoodElement = document.getElementById("goodMood");
let regularMoodElement = document.getElementById("regularMood");
let badMoodElement = document.getElementById("badMood");

const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const daysOfWeek = ["L", "M", "X", "J", "V", "S", "D"];

let monthCounter = 9;
let yearCounter = 2023;

schoolYearElement.innerText = `${yearCounter}/${yearCounter + 1}`

let currentDate = new Date(`${yearCounter}-${monthCounter}-1`); //Año-Mes-Día
let monthsOfCalendar = 9;

let currentColorPencil = "";
let activatePencil = false;

inputYearElement.addEventListener('change', setCalendar);
goodMoodElement.addEventListener('click', () => setPencilColor("Good"));
regularMoodElement.addEventListener('click', () => setPencilColor("Regular"));
badMoodElement.addEventListener('click', () => setPencilColor("Bad"));

printCalendar();

function setPencilColor(mood) {
  // Activar o desactivar lapiz
  activatePencil = activatePencil ? false : true;

  switch (mood) {
    case "Good":
      currentColorPencil = "rgb(78, 199, 78)";
      break;
    case "Regular":
      currentColorPencil = "rgb(240, 197, 55)";
      break;
    case "Bad":
      currentColorPencil = "rgb(233, 47, 47)";
      break
  }

}

function setDayColor(event) {
  // event.target equivale al elemento que ha producido el evento
  event.target.style.backgroundColor = currentColorPencil;
}

function setCalendar() {
  mainElement.innerText = "";
  yearCounter = Number(inputYearElement.value);
  monthCounter = 9;
  currentDate = new Date(`${yearCounter}-${monthCounter}-1`);
  schoolYearElement.innerText = `${yearCounter}/${yearCounter + 1}`
  printCalendar();
}

function printCalendar() {
  for (let index = 0; index <= monthsOfCalendar; index++) {
    addMonth();
    monthCounter++;
    if (monthCounter === 13) {
      monthCounter = 1;
      yearCounter++;
    }
    currentDate = new Date(`${yearCounter}-${monthCounter}-1`);
  }
}

function addMonth() {

  let monthElement = document.createElement("div");
  monthElement.classList.toggle("month");

  let titleMonthElement = document.createElement("h4");
  titleMonthElement.innerText = monthNames[monthCounter - 1];
  monthElement.appendChild(titleMonthElement);

  let daysElement = document.createElement("div");
  daysElement.classList.toggle("days");

  // INSERTAR PRIMERA FILA: L ... D
  daysOfWeek.forEach(day => {
    let dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.innerText = day;
    daysElement.appendChild(dayElement);
  });

  // INSERTAR HUECOS VACÍOS
  // Obtenemos el día de la semana para sacar los huecos
  let gaps = currentDate.getDay();
  // getDay() del domingo devuelve 0, si lo queremos poner al final, cambiamos esto a mano
  if (gaps === 0) {
    gaps = 7;
  }
  for (let gap = 1; gap < gaps; gap++) {
    let dayElement = document.createElement("div");
    daysElement.appendChild(dayElement);
  }

  // INSERTAR DÍAS DEL MES
  //El primer parámetro indica el mes de forma natural -> 1 enero, 2 febrero...
  let numDaysMonth = getDaysInMonth(currentDate.getMonth() + 1, currentDate.getFullYear());
  for (let day = 1; day <= numDaysMonth; day++) {
    let dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.innerText = day;
    dayElement.addEventListener('click', setDayColor)
    daysElement.appendChild(dayElement);
  }

  monthElement.appendChild(daysElement);
  mainElement.appendChild(monthElement);
}

function getDaysInMonth(month, year) {
  //El día 0 es el último día del anterior mes
  return new Date(year, month, 0).getDate();
}

