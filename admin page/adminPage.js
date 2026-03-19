document.addEventListener("DOMContentLoaded", () => {
    const eventForm = document.getElementById("eventCreationForm");

    if (eventForm) {
        eventForm.onsubmit = function(e) {
            e.preventDefault();

            // Create event object
            const newEvent = {
                id: Date.now(), // Unique ID
                name: document.getElementById("eventName").value,
                location: document.getElementById("location").value,
                datetime: document.getElementById("timeDate").value.replace('T', ' '),
                shortdesc: document.getElementById("shortDesc").value,
                description: document.getElementById("fullDesc").value,
                image: "images/event1.jpg", // Default placeholder
                attendees: []
            };

            // Get existing events from localStorage or empty array
            const storedEvents = JSON.parse(localStorage.getItem("customEvents")) || [];
            
            // Add new event to the list
            storedEvents.push(newEvent);
            
            // Save back to localStorage
            localStorage.setItem("customEvents", JSON.stringify(storedEvents));

            alert(`Event "${newEvent.name}" has been published!`);
            eventForm.reset();
        };
    }
});