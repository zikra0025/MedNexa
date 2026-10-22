
const analyzeBtn = document.getElementById("analyzeBtn");
const prescriptionInput = document.getElementById("prescription");
const analysisResult = document.getElementById("analysisResult");

const medicineForm = document.getElementById("medicineForm");
const medicineQuestion = document.getElementById("medicineQuestion");
const aiResponse = document.getElementById("aiResponse");

const reminderForm = document.getElementById("reminderForm");
const medicineName = document.getElementById("medicineName");
const medicineTime = document.getElementById("medicineTime");
const reminderList = document.getElementById("reminderList");

// Prescription image selection
analyzeBtn.addEventListener("click", () => {
  const file = prescriptionInput.files[0];

  if (!file) {
    analysisResult.textContent =
      "Please choose a prescription image first.";
    return;
  }

  if (!file.type.startsWith("image/")) {
    analysisResult.textContent =
      "Please select a valid image file.";
    return;
  }

  analysisResult.textContent =
    "Image selected successfully. Gemma AI integration is coming next. No prescription has been analyzed yet.";
});

// Medicine question form
medicineForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const question = medicineQuestion.value.trim();

  if (!question) {
    aiResponse.textContent = "Please enter a question.";
    return;
  }

  aiResponse.textContent =
    "The AI assistant is not connected yet. We will connect Gemma securely in the next steps.";
});

// Add medicine reminders
reminderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = medicineName.value.trim();
  const time = medicineTime.value;

  if (!name || !time) {
    return;
  }

  const item = document.createElement("li");
  const reminderText = document.createElement("span");

  reminderText.textContent = `${name} — ${time}`;
  item.appendChild(reminderText);

  reminderList.appendChild(item);

  reminderForm.reset();
});
