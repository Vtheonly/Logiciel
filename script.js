document.addEventListener("DOMContentLoaded", () => {
  const loginContainer = document.getElementById("login-container");
  const appContainer = document.getElementById("app-container");
  const loginButton = document.getElementById("login-button");
  const navButtons = document.querySelectorAll(".nav-btn");
  const panels = document.querySelectorAll(".panel");
  const addReminderBtn = document.getElementById("add-reminder-btn");
  const addReminderForm = document.getElementById("add-reminder-form");
  const saveReminderBtn = document.getElementById("save-reminder-btn");
  const reminderList = document.getElementById("reminder-list");
  const reminderDateInput = document.getElementById("reminder-date");
  const reminderTitleInput = document.getElementById("reminder-title");

  // --- Login Logic ---
  loginButton.addEventListener("click", () => {
    // In a real app, you'd have actual authentication
    loginContainer.classList.add("hidden");
    appContainer.classList.remove("hidden");
  });

  // --- Panel Navigation ---
  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Deactivate all buttons and panels
      navButtons.forEach((btn) => btn.classList.remove("active"));
      panels.forEach((panel) => panel.classList.remove("active"));

      // Activate the clicked button and corresponding panel
      button.classList.add("active");
      const panelId = button.getAttribute("data-panel");
      document.getElementById(panelId).classList.add("active");
    });
  });

  // --- Reminder Logic ---
  addReminderBtn.addEventListener("click", () => {
    addReminderForm.classList.toggle("hidden");
  });

  saveReminderBtn.addEventListener("click", () => {
    const date = new Date(reminderDateInput.value);
    const title = reminderTitleInput.value;

    if (title && !isNaN(date)) {
      const newReminder = document.createElement("li");
      const timeLeft = calculateTimeLeft(date);
      newReminder.innerHTML = `
                <span>${title}</span>
                <span class="time-left">${timeLeft}</span>
            `;
      reminderList.appendChild(newReminder);

      // Clear inputs and hide form
      reminderDateInput.value = "";
      reminderTitleInput.value = "";
      addReminderForm.classList.add("hidden");
    }
  });

  function calculateTimeLeft(date) {
    const now = new Date();
    const diff = date - now;

    if (diff <= 0) {
      return "Past due";
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""}`;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    }

    const minutes = Math.floor(diff / (1000 * 60));
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }
});
