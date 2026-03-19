document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("eventCreationForm");
    const adminList = document.getElementById("adminEventList");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // 1. Capture Data
        const newEvent = {
            id: Date.now(), // Unique ID
            name: document.getElementById("eventName").value,
            location: document.getElementById("location").value,
            datetime: document.getElementById("timeDate").value,
            shortdesc: document.getElementById("shortDescription").value,
            description: document.getElementById("fullDescription").value,
            image: "images/event1.jpg" // Placeholder
        };

        // 2. Save to LocalStorage for EventPage.html to see
        let storedEvents = JSON.parse(localStorage.getItem("customEvents")) || [];
        storedEvents.push(newEvent);
        localStorage.setItem("customEvents", JSON.stringify(storedEvents));

        // 3. Update Admin Sidebar View
        if (adminList.innerHTML.includes("No events posted")) adminList.innerHTML = "";
        
        const eventEntry = document.createElement("div");
        eventEntry.innerHTML = `
            <strong>${newEvent.name}</strong><br>
            <small>${newEvent.datetime}</small>
        `;
        adminList.prepend(eventEntry);

        // 4. Reset and Alert
        alert("Event successfully posted to the public Events page!");
        form.reset();
    });
});