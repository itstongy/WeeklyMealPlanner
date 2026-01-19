const STORAGE_KEY = "weekly-meal-planner-state";

const baseSuggestions = [
  "Miso salmon with rice",
  "Sheet-pan chicken & veggies",
  "Pesto pasta with tomatoes",
  "Veggie tacos + slaw",
  "Stir-fry tofu and broccoli",
  "Lentil soup and sourdough",
  "Shrimp fajitas",
  "Chickpea curry",
  "Baked sweet potatoes",
  "Turkey meatballs + orzo",
  "Caprese chicken",
  "Soba noodles with sesame",
  "Bibimbap bowls",
  "Greek salad with pita",
  "Sausage and peppers",
  "Butternut squash risotto",
  "Falafel wraps",
  "Beef bulgogi bowls",
  "Pan-seared cod + greens",
  "Veggie burgers",
];

const elements = {
  weekGrid: document.getElementById("week-grid"),
  personA: document.getElementById("person-a"),
  personB: document.getElementById("person-b"),
  suggestionsList: document.getElementById("suggestions-list"),
  refreshSuggestions: document.getElementById("refresh-suggestions"),
  targetDay: document.getElementById("target-day"),
  mealLibrary: document.getElementById("meal-library"),
  addMeal: document.getElementById("add-meal"),
  importMeals: document.getElementById("import-meals"),
  importButton: document.getElementById("import-button"),
  resetWeek: document.getElementById("reset-week"),
  exportJson: document.getElementById("export-json"),
  exportCsv: document.getElementById("export-csv"),
  exportIcs: document.getElementById("export-ics"),
  summary: document.getElementById("summary"),
  copySummary: document.getElementById("copy-summary"),
};

const defaultState = () => ({
  people: ["You", "Partner"],
  meals: [],
  library: [],
});

const state = loadState();
initializeDates();
renderAll();

elements.personA.addEventListener("input", () => updatePeople());
elements.personB.addEventListener("input", () => updatePeople());
elements.refreshSuggestions.addEventListener("click", () => renderSuggestions());
elements.addMeal.addEventListener("click", () => addMealToLibrary());
elements.importButton.addEventListener("click", () => importMeals());
elements.resetWeek.addEventListener("click", () => resetWeek());
elements.exportJson.addEventListener("click", () => exportJson());
elements.exportCsv.addEventListener("click", () => exportCsv());
elements.exportIcs.addEventListener("click", () => exportIcs());
elements.copySummary.addEventListener("click", () => copySummary());

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return defaultState();
  }
  try {
    return { ...defaultState(), ...JSON.parse(stored) };
  } catch (error) {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateSummary();
}

function initializeDates() {
  const today = new Date();
  const days = [];
  for (let i = 0; i < 7; i += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push({
      id: i,
      date,
      meal: "",
      servings: 2,
      atHome: [true, true],
      notes: "",
    });
  }

  if (!state.meals.length) {
    state.meals = days;
  } else {
    state.meals = days.map((day, index) => ({
      ...day,
      ...state.meals[index],
      date: day.date,
    }));
  }
}

function formatDay(date) {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
  });
}

function formatDate(date) {
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function updatePeople() {
  state.people = [elements.personA.value || "Person A", elements.personB.value || "Person B"];
  renderWeek();
  renderSuggestions();
  saveState();
}

function renderAll() {
  elements.personA.value = state.people[0];
  elements.personB.value = state.people[1];
  renderTargetDays();
  renderWeek();
  renderSuggestions();
  renderLibrary();
  updateSummary();
}

function renderTargetDays() {
  elements.targetDay.innerHTML = "";
  state.meals.forEach((day, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${formatDay(day.date)} (${formatDate(day.date)})`;
    elements.targetDay.appendChild(option);
  });
}

function renderWeek(activeIndex = Number(elements.targetDay.value || 0)) {
  elements.weekGrid.innerHTML = "";
  state.meals.forEach((day, index) => {
    const card = document.createElement("article");
    card.className = `day-card${index === activeIndex ? " active" : ""}`;
    card.addEventListener("click", () => {
      elements.targetDay.value = String(index);
      renderWeek(index);
    });

    const header = document.createElement("div");
    header.className = "day-header";
    header.innerHTML = `<h3>${formatDay(day.date)}</h3><span>${formatDate(day.date)}</span>`;

    const toggleGroup = document.createElement("div");
    toggleGroup.className = "toggle-group";
    state.people.forEach((person, personIndex) => {
      const toggle = document.createElement("label");
      toggle.className = "toggle";
      toggle.addEventListener("click", (event) => {
        event.stopPropagation();
      });
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = day.atHome[personIndex];
      checkbox.addEventListener("click", (event) => {
        event.stopPropagation();
      });
      checkbox.addEventListener("change", (event) => {
        day.atHome[personIndex] = event.target.checked;
        renderWeek(index);
        saveState();
      });
      toggle.appendChild(checkbox);
      toggle.appendChild(document.createTextNode(`${person} home`));
      toggleGroup.appendChild(toggle);
    });

    const mealRow = document.createElement("div");
    mealRow.className = "field-row";
    const mealLabel = document.createElement("label");
    mealLabel.textContent = "Dinner";
    const mealInput = document.createElement("input");
    mealInput.type = "text";
    mealInput.value = day.meal || "";
    mealInput.placeholder = "Add meal";
    mealInput.addEventListener("input", (event) => {
      day.meal = event.target.value;
      saveState();
      updateSummary();
    });
    mealRow.appendChild(mealLabel);
    mealRow.appendChild(mealInput);

    const servingsRow = document.createElement("div");
    servingsRow.className = "field-row";
    const servingsLabel = document.createElement("label");
    servingsLabel.textContent = "Servings";
    const servingsInput = document.createElement("input");
    servingsInput.type = "number";
    servingsInput.min = "1";
    servingsInput.max = "8";
    servingsInput.value = day.servings;
    servingsInput.className = "servings";
    servingsInput.addEventListener("input", (event) => {
      day.servings = Number(event.target.value) || 2;
      saveState();
    });
    servingsRow.appendChild(servingsLabel);
    servingsRow.appendChild(servingsInput);

    const leftoverBlock = document.createElement("div");
    const leftovers = getLeftoversForDay(index);
    if (leftovers.length) {
      leftoverBlock.className = "leftover";
      leftoverBlock.textContent = leftovers.join(" ");
    }

    card.appendChild(header);
    card.appendChild(toggleGroup);
    card.appendChild(mealRow);
    card.appendChild(servingsRow);
    if (leftovers.length) {
      card.appendChild(leftoverBlock);
    }

    elements.weekGrid.appendChild(card);
  });
}

function getLeftoversForDay(dayIndex) {
  const day = state.meals[dayIndex];
  const messages = [];
  day.atHome.forEach((isHome, personIndex) => {
    if (!isHome) {
      const fallbackMeal = findPreviousMeal(dayIndex);
      const mealName = fallbackMeal ? fallbackMeal.meal : "Leftovers";
      messages.push(`${state.people[personIndex]} away: leftovers from ${mealName}.`);
    }
  });
  return messages;
}

function findPreviousMeal(dayIndex) {
  for (let i = dayIndex - 1; i >= 0; i -= 1) {
    if (state.meals[i].meal) {
      return state.meals[i];
    }
  }
  return null;
}

function renderSuggestions() {
  const suggestions = pickSuggestions(5);
  elements.suggestionsList.innerHTML = "";
  suggestions.forEach((meal) => {
    const item = document.createElement("li");
    item.className = "list-item";
    item.innerHTML = `<span>${meal}</span>`;
    const button = document.createElement("button");
    button.textContent = "Use";
    button.addEventListener("click", () => applyMealToTarget(meal));
    item.appendChild(button);
    elements.suggestionsList.appendChild(item);
  });
}

function pickSuggestions(count) {
  const pool = [...baseSuggestions, ...state.library];
  const shuffled = pool.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function applyMealToTarget(meal) {
  const index = Number(elements.targetDay.value || 0);
  state.meals[index].meal = meal;
  renderWeek(index);
  saveState();
}

function renderLibrary() {
  elements.mealLibrary.innerHTML = "";
  if (!state.library.length) {
    const empty = document.createElement("div");
    empty.className = "list-item";
    empty.innerHTML = "<small>No saved meals yet.</small>";
    elements.mealLibrary.appendChild(empty);
    return;
  }
  state.library.forEach((meal, index) => {
    const item = document.createElement("div");
    item.className = "list-item";
    const text = document.createElement("span");
    text.textContent = meal;
    const useButton = document.createElement("button");
    useButton.textContent = "Use";
    useButton.addEventListener("click", () => applyMealToTarget(meal));
    const removeButton = document.createElement("button");
    removeButton.className = "ghost";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      state.library.splice(index, 1);
      renderLibrary();
      saveState();
    });
    item.appendChild(text);
    item.appendChild(useButton);
    item.appendChild(removeButton);
    elements.mealLibrary.appendChild(item);
  });
}

function addMealToLibrary() {
  const name = prompt("Meal name");
  if (!name) {
    return;
  }
  const trimmed = name.trim();
  if (!trimmed) {
    return;
  }
  if (!state.library.includes(trimmed)) {
    state.library.unshift(trimmed);
  }
  renderLibrary();
  saveState();
}

function importMeals() {
  const lines = elements.importMeals.value.split("\n");
  const added = [];
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !state.library.includes(trimmed)) {
      added.push(trimmed);
    }
  });
  if (added.length) {
    state.library = [...added, ...state.library];
    renderLibrary();
    saveState();
  }
  elements.importMeals.value = "";
}


function updateSummary() {
  const lines = state.meals.map((day, index) => {
    const meal = day.meal || "TBD";
    const dateLabel = `${formatDay(day.date)} ${formatDate(day.date)}`;
    const home = day.atHome
      .map((isHome, personIndex) => `${state.people[personIndex]} ${isHome ? "home" : "away"}`)
      .join(", ");
    const leftovers = getLeftoversForDay(index).join(" ");
    return `${dateLabel}: ${meal} (${home})${leftovers ? ` | ${leftovers}` : ""}`;
  });
  elements.summary.value = lines.join("\n");
}

function resetWeek() {
  if (!confirm("Reset meals and attendance for the week?")) {
    return;
  }
  state.meals.forEach((day) => {
    day.meal = "";
    day.servings = 2;
    day.atHome = [true, true];
  });
  renderWeek();
  saveState();
}

function exportJson() {
  downloadFile("meal-plan.json", JSON.stringify(state, null, 2), "application/json");
}

function exportCsv() {
  const header = "Day,Date,Meal,Servings,Attendance,Leftovers\n";
  const rows = state.meals
    .map((day, index) => {
      const dayName = formatDay(day.date);
      const date = formatDate(day.date);
      const attendance = day.atHome
        .map((isHome, personIndex) => `${state.people[personIndex]}:${isHome ? "home" : "away"}`)
        .join(";");
      const leftovers = getLeftoversForDay(index).join(" ");
      const meal = day.meal || "";
      return `${dayName},${date},"${meal}",${day.servings},"${attendance}","${leftovers}"`;
    })
    .join("\n");
  downloadFile("meal-plan.csv", header + rows, "text/csv");
}

function exportIcs() {
  const events = state.meals
    .map((day) => {
      const start = formatIcsDate(day.date, 18);
      const end = formatIcsDate(day.date, 19);
      const summary = day.meal || "Dinner";
      return [
        "BEGIN:VEVENT",
        `UID:${day.id}-${day.date.getTime()}@mealplan`,
        `DTSTAMP:${formatIcsDate(new Date(), 0)}`,
        `DTSTART:${start}`,
        `DTEND:${end}`,
        `SUMMARY:${escapeIcs(summary)}`,
        "END:VEVENT",
      ].join("\n");
    })
    .join("\n");
  const content = ["BEGIN:VCALENDAR", "VERSION:2.0", events, "END:VCALENDAR"].join("\n");
  downloadFile("meal-plan.ics", content, "text/calendar");
}

function formatIcsDate(date, hour) {
  const utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), hour, 0, 0));
  return utc.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function escapeIcs(value) {
  return value.replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
}

function downloadFile(name, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}

function copySummary() {
  navigator.clipboard.writeText(elements.summary.value).catch(() => {
    alert("Copy failed. You can manually select the summary text.");
  });
}
