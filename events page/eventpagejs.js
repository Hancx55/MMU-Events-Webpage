//inserts nav bar to all pages
document.addEventListener("DOMContentLoaded", () => {
  fetch("/components/navigation.html")
    .then(response => response.text())
    .then(html => {
      document.getElementById("navbar").innerHTML = html;
    });
});
//inserts footer to all pages
document.addEventListener("DOMContentLoaded", () => {
  fetch("/components/footer.html")
    .then(response => response.text())
    .then(html => {
      document.getElementById("footer").innerHTML = html;
    });
});

//render on load
document.addEventListener("DOMContentLoaded", render);

//example events to input for now
const modal = document.getElementById("event-details");
const eventTitle = document.getElementById("event-name");
const eventDate = document.getElementById("event-date");
const eventDesc = document.getElementById("event-description");
const bookBtn = document.getElementById("bookevent");
const bookingStatus = document.getElementById("bookingStatus");
const closeBtn = document.getElementById("close-event");

let selectedEvent = null;

const events = Array.from({ length:32 }, (_, i) => ({
    id: i+1,
    name: `Event ${i+1}`,
    shortdesc: 'short desc goes here',
    description: 'full desc goes here',
    datetime: "2026-05-05 10:47",
    image: `images/event${(i % 5) + 1}.jpg`,
    attendees: []
}))

//switch content between pages
let current=1;
const PerPage = 10;

document.getElementById("prev-page").onclick = () => {
    if (current>1) {
        current--;
        render();
    }
}

document.getElementById("next-page").onclick = () => {
    if (current< Math.ceil(events.length/PerPage)) {
        current++;
        render();
    }
}

function render() {
    const start = (current - 1) * PerPage;
    const pageEvents = events.slice(start, start + PerPage);

    for (let i = 0; i < 10; i++) {
        const box = document.getElementById(`e${i + 1}`);
        const event = pageEvents[i];

        if (!event) {
            box.style.display = "none";
            continue;
        }

        box.style.display = "block";
        box.innerHTML = `
            <h3>${event.name}</h3>
            <p>${event.shortdesc}</p>
            <p><strong>${event.datetime}</strong></p>
        `;

        box.onclick = () => openevent(event);
    }

    document.getElementById("page-info").textContent = `Page ${current}`;
}

function openevent(event) {
    selectedEvent = event;
    eventTitle.textContent = event.name;
    eventDesc.textContent = event.description;
    eventDate.textContent = "Date/Time: " + event.datetime;
    bookingStatus.textContent = "";
    modal.style.display = "flex";
}

bookBtn.onclick = () => {
    selectedEvent.attendees.push("Username");
    bookingStatus.textContent = "You have booked this event!";
    bookingStatus.style.color = "green";
};

closeBtn.onclick = () => {
    modal.style.display = "none";
};

