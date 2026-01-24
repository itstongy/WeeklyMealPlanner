const STORAGE_KEY = "weekly-meal-planner-state";

const baseSuggestions = [
  "Miso salmon with rice",
  "Sheet-pan chicken and veggies",
  "Pesto pasta with tomatoes",
  "Veggie tacos with slaw",
  "Stir-fry tofu and broccoli",
  "Lentil soup with sourdough",
  "Shrimp fajitas",
  "Chickpea curry",
  "Baked sweet potatoes",
  "Turkey meatballs with orzo",
  "Caprese chicken",
  "Soba noodles with sesame",
  "Bibimbap bowls",
  "Greek salad with pita",
  "Sausage and peppers",
  "Butternut squash risotto",
  "Falafel wraps",
  "Beef bulgogi bowls",
  "Pan-seared cod and greens",
  "Veggie burgers",
  "Chicken shawarma bowls",
  "Salmon poke bowls",
  "Teriyaki chicken rice bowls",
  "Thai basil beef",
  "Coconut shrimp curry",
  "Lemon garlic tilapia",
  "Honey mustard chicken",
  "BBQ pulled pork sandwiches",
  "Tuna melts",
  "Grilled chicken Caesar wraps",
  "BLT sandwiches with avocado",
  "Italian hoagies",
  "Turkey pesto paninis",
  "Tomato basil grilled cheese",
  "Eggplant parmesan",
  "Chicken parmesan",
  "Spaghetti and meat sauce",
  "Bolognese over rigatoni",
  "Pasta primavera",
  "Pasta with lemon and peas",
  "Cacio e pepe",
  "Gnocchi with pesto",
  "Ravioli with brown butter",
  "Lasagna with spinach",
  "Stuffed shells",
  "Mac and cheese with broccoli",
  "Baked ziti",
  "Chicken Alfredo",
  "Shrimp scampi",
  "Clam linguine",
  "Mushroom stroganoff",
  "Beef stroganoff",
  "Beef and broccoli",
  "Orange chicken",
  "General tso chicken",
  "Kung pao chicken",
  "Mapo tofu",
  "Hot pot leftovers bowl",
  "Ramen with soft eggs",
  "Udon with mushrooms",
  "Pho with brisket",
  "Chicken noodle soup",
  "Tomato soup and grilled cheese",
  "Minestrone",
  "White bean and kale soup",
  "Chili with cornbread",
  "Turkey chili",
  "Black bean soup",
  "Split pea soup",
  "Chicken tortilla soup",
  "Pozole",
  "Enchiladas verdes",
  "Chicken enchiladas",
  "Beef tacos",
  "Fish tacos",
  "Carnitas tacos",
  "Barbacoa bowls",
  "Burrito bowls",
  "Quesadillas with salsa",
  "Nachos with beans",
  "Stuffed peppers",
  "Stuffed zucchini boats",
  "Shepherds pie",
  "Cottage pie",
  "Meatloaf with mashed potatoes",
  "Roast chicken with carrots",
  "Pot roast with veggies",
  "Beef stew",
  "Chicken pot pie",
  "Salisbury steak",
  "Pork chops with apples",
  "Honey garlic pork chops",
  "Pork tenderloin with rosemary",
  "Korean pork bowls",
  "Katsu curry",
  "Chicken katsu",
  "Chicken fried rice",
  "Veggie fried rice",
  "Shrimp fried rice",
  "Fried rice with kimchi",
  "Pad thai",
  "Pad see ew",
  "Drunken noodles",
  "Green curry",
  "Red curry",
  "Massaman curry",
  "Butter chicken",
  "Chicken tikka masala",
  "Palak paneer",
  "Chana masala",
  "Dal with rice",
  "Naan and kebabs",
  "Gyro plates",
  "Lamb kofta bowls",
  "Shakshuka with bread",
  "Mediterranean grain bowls",
  "Quinoa bowls with roasted veg",
  "Farro bowls with feta",
  "Cobb salads",
  "Spinach strawberry salads",
  "Kale Caesar salads",
  "Southwest chicken salads",
  "Nicoise salads",
  "Poke salads",
  "Sushi bowls",
  "Salmon with asparagus",
  "Garlic butter shrimp",
  "Seared scallops with risotto",
  "Crab cakes with slaw",
  "Fish and chips",
  "Seafood paella",
  "Jambalaya",
  "Gumbo",
  "Red beans and rice",
  "Cajun chicken pasta",
  "Baked chicken thighs",
  "Lemon herb chicken",
  "Greek lemon chicken",
  "Chicken and rice",
  "Chicken and dumplings",
  "Chicken lettuce wraps",
  "Turkey lettuce wraps",
  "Taco lettuce wraps",
  "Banh mi bowls",
  "Vietnamese vermicelli bowls",
  "Spring rolls with peanut sauce",
  "Bibim guksu",
  "Japchae",
  "Korean beef tacos",
  "Bulgogi wraps",
  "Korean fried chicken",
  "Hawaiian plate lunch",
  "Teriyaki salmon",
  "Soy ginger tofu",
  "Sesame ginger noodles",
  "Miso ramen",
  "Curry udon",
  "Pesto salmon",
  "Lemon butter pasta",
  "Roasted veggie sandwiches",
  "Hummus and veggie wraps",
  "Grain bowls with tahini",
  "Cauliflower tacos",
  "Sweet potato black bean bowls",
  "Zucchini noodles with pesto",
  "Stuffed sweet potatoes",
  "Veggie stir fry with cashews",
  "Paneer bowls with rice",
  "Tofu tikka masala",
  "Tofu banh mi",
  "Mushroom tacos",
  "Black bean burgers",
  "Veggie chili",
  "Mushroom barley soup",
  "Lentil bolognese",
  "Ricotta gnocchi",
  "Prosciutto and arugula pizza",
  "Margherita pizza",
  "BBQ chicken pizza",
  "Flatbreads with goat cheese",
  "Pita pizzas",
  "Breakfast for dinner",
  "Waffles with bacon",
  "Pancakes and fruit",
  "Omelet bar night",
  "Breakfast burritos",
  "Huevos rancheros",
  "Shakshuka with feta",
  "Frittata with veggies",
  "Burrata with tomatoes",
  "Charcuterie and salads",
  "Sheet-pan kielbasa and potatoes",
  "Roasted sausage and fennel",
  "Salmon with dill yogurt",
  "Cod with lemon caper sauce",
  "Tuna poke with avocado",
  "Seared ahi bowls",
  "Veggie sushi rolls",
  "Chicken satay with cucumber salad",
  "Peanut noodles with chicken",
  "Thai larb bowls",
  "Beef tacos with corn salsa",
  "Steak fajitas",
  "Chicken fajitas",
  "Cheesesteak sandwiches",
  "Sloppy joes",
  "Baked meatballs and garlic bread",
  "Stuffed acorn squash",
  "Curry roasted cauliflower",
  "Roasted tomato soup with basil",
  "Pork and cabbage stir fry",
  "Mongolian beef",
  "Beef kebabs with rice",
  "Chicken kebabs with tzatziki",
  "Grilled salmon with quinoa",
  "Roasted trout with lemon",
  "Smoked sausage and beans",
  "Chicken and veggie skewers",
  "Grain bowls with roasted chickpeas",
  "Lemongrass chicken bowls",
  "Chicken marsala",
  "Chicken piccata",
  "Tuscan white bean stew",
  "Sausage kale pasta",
  "Broccoli cheddar soup",
  "Loaded baked potatoes",
  "Stuffed baked potatoes",
  "Corn chowder",
  "Chicken corn chowder",
  "Italian wedding soup",
  "Sushi bake bowls",
  "Baja shrimp bowls",
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
  exportTime: document.getElementById("export-time"),
  summary: document.getElementById("summary"),
  copySummary: document.getElementById("copy-summary"),
};

const defaultState = () => ({
  people: ["You", "Partner"],
  meals: [],
  library: [],
  exportTime: "18:00",
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
elements.exportTime.addEventListener("change", () => updateExportTime());
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
  const dayOfWeek = today.getDay();
  const daysFromMonday = (dayOfWeek + 6) % 7;
  const monday = new Date(today);
  monday.setDate(today.getDate() - daysFromMonday);
  const days = [];
  for (let i = 0; i < 7; i += 1) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
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
  elements.exportTime.value = state.exportTime || "18:00";
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
    mealInput.addEventListener("click", (event) => {
      event.stopPropagation();
    });
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
    servingsInput.addEventListener("click", (event) => {
      event.stopPropagation();
    });
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
  const normalizedLibrary = new Set(state.library.map((meal) => meal.trim().toLowerCase()));
  const dedupedBase = baseSuggestions.filter(
    (meal) => !normalizedLibrary.has(meal.trim().toLowerCase()),
  );
  const pool = [...dedupedBase, ...state.library];
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

function exportIcs({ hour = 18, timeZone = getLocalTimeZone() } = {}) {
  const exportTime = state.exportTime || "18:00";
  const timeParts = parseTimeString(exportTime);
  const fallbackHour = Number.isFinite(timeParts.hour) ? timeParts.hour : hour;
  const fallbackMinute = Number.isFinite(timeParts.minute) ? timeParts.minute : 0;
  const events = state.meals
    .map((day) => {
      const startLocal = buildLocalDateTime(day.date, fallbackHour, fallbackMinute);
      const endLocal = new Date(startLocal);
      endLocal.setHours(startLocal.getHours() + 1);
      const summary = day.meal || "Dinner";
      return [
        "BEGIN:VEVENT",
        `UID:${day.id}-${day.date.getTime()}@mealplan`,
        `DTSTAMP:${formatIcsDateUtc(new Date())}`,
        `DTSTART;TZID=${timeZone}:${formatIcsDateParts(startLocal)}`,
        `DTEND;TZID=${timeZone}:${formatIcsDateParts(endLocal)}`,
        `SUMMARY:${escapeIcs(summary)}`,
        "END:VEVENT",
      ].join("\n");
    })
    .join("\n");
  const content = ["BEGIN:VCALENDAR", "VERSION:2.0", `X-WR-TIMEZONE:${timeZone}`, events, "END:VCALENDAR"].join("\n");
  downloadFile("meal-plan.ics", content, "text/calendar");
}

function formatIcsDateUtc(date) {
  const utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), 0, 0));
  return `${formatIcsDateParts(utc)}Z`;
}

function formatIcsDateParts(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}

function getLocalTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
}

function buildLocalDateTime(date, hour, minute) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, 0);
}

function parseTimeString(value) {
  if (typeof value !== "string") {
    return { hour: 18, minute: 0 };
  }
  const match = value.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) {
    return { hour: 18, minute: 0 };
  }
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    return { hour: 18, minute: 0 };
  }
  return {
    hour: Math.max(0, Math.min(23, hour)),
    minute: Math.max(0, Math.min(59, minute)),
  };
}

function updateExportTime() {
  state.exportTime = elements.exportTime.value || "18:00";
  saveState();
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
