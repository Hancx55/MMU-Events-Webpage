
let currentYear = 2026;
let currentMonth = 0;

const months = [
"Jan","Feb","Mar","Apr",
"May","Jun","Jul","Aug",
"Sep","Oct","Nov","Dec"
];

const datePicker = document.getElementById("datePicker");
const yearInput = document.getElementById("yearInput");
const monthSelect = document.getElementById("monthSelect");
const applyDate = document.getElementById("applyDate");

const monthTitle = document.getElementById("month");
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");
const datesContainer = document.querySelector(".dates");



function makeEditable(note, dayDiv, day) {
    note.addEventListener("click", () => {
        const input = document.createElement("input");
        input.type = "text";
        input.value = note.textContent;

        note.remove();
        dayDiv.appendChild(input);
        input.focus();

        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const newText = input.value;

                if (newText.trim() === "") return;

                const key = `${currentYear}-${currentMonth}-${day}`;
                localStorage.setItem(key, newText);

                input.remove();

                const newNote = document.createElement("div");
                newNote.textContent = newText;
                newNote.classList.add("note");

                dayDiv.appendChild(newNote);

                makeEditable(newNote, dayDiv, day);
            }
        });
    });
}


function generateCalendar() {

    monthTitle.textContent = `${months[currentMonth]} ${currentYear}`;
    datesContainer.innerHTML = "";

    let firstDay = new Date(currentYear, currentMonth, 1).getDay();
    firstDay = firstDay === 0 ? 6 : firstDay - 1;

    let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();


    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement("div");
        emptyDiv.classList.add("empty");
        datesContainer.appendChild(emptyDiv);
    }

    
    for (let day = 1; day <= daysInMonth; day++) {

        const dayDiv = document.createElement("div");
        dayDiv.textContent = day;
        dayDiv.classList.add("calendar-day");
        datesContainer.appendChild(dayDiv);

        const key = `${currentYear}-${currentMonth}-${day}`;
        const savedNote = localStorage.getItem(key);

        
        if (savedNote) {
            const note = document.createElement("div");
            note.textContent = savedNote;
            note.classList.add("note");

            dayDiv.appendChild(note);
            makeEditable(note, dayDiv, day);
        }

        
        dayDiv.addEventListener("click", () => {

            if (!dayDiv.querySelector("input")) {

                const input = document.createElement("input");
                input.type = "text";
                input.placeholder = "Add note...";
                input.classList.add("day-input");

                dayDiv.appendChild(input);
                input.focus();

                input.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") {

                        const text = input.value;
                        if (text.trim() === "") return;

                        localStorage.setItem(key, text);

                        input.remove();

                        const note = document.createElement("div");
                        note.textContent = text;
                        note.classList.add("note");

                        dayDiv.appendChild(note);
                        makeEditable(note, dayDiv, day);
                    }
                });
            }
        });
    }
}


rightBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar();
});

leftBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar();
});


monthTitle.addEventListener("click", () => {
    monthSelect.value = currentMonth;
    yearInput.value = currentYear;
    datePicker.classList.remove("hidden");
});



applyDate.addEventListener("click", () => {
    currentMonth = parseInt(monthSelect.value);
    currentYear = parseInt(yearInput.value);

    generateCalendar();
    datePicker.classList.add("hidden");
});

generateCalendar();
