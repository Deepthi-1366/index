const questions = [
  { text: "I enjoy hanging out and talking with new people.", trait: "social" },
  { text: "I feel nervous before social events, even if I know the people.", trait: "anxious" },
  { text: "I like to keep my space clean and organized.", trait: "organized" },
  { text: "I enjoy helping people, even if it's inconvenient.", trait: "empathetic" },
  { text: "I like doing creative things like painting, writing, or music.", trait: "creative" },
  { text: "I often feel down or unmotivated without a clear reason.", trait: "depressed" },
  { text: "I get excited to try new and unfamiliar experiences.", trait: "creative" },
  { text: "I often replay embarrassing moments in my head.", trait: "anxious" },
  { text: "I usually stick to a routine and plan things ahead.", trait: "organized" },
  { text: "I get emotional when I see others suffering.", trait: "empathetic" },
  { text: "I prefer spending time alone rather than with people.", trait: "depressed" },
  { text: "I feel confident speaking in front of groups.", trait: "social" },
  { text: "I feel drained after socializing, even if I had fun.", trait: "anxious" },
  { text: "I enjoy solving problems and thinking outside the box.", trait: "creative" },
  { text: "I often feel overwhelmed by everything I have to do.", trait: "depressed" },
  { text: "I can easily tell when someone is upset, even if they hide it.", trait: "empathetic" },
  { text: "I make to-do lists or use a planner regularly.", trait: "organized" },
  { text: "I like being the center of attention at parties.", trait: "social" },
  { text: "I often imagine worst-case scenarios.", trait: "anxious" },
  { text: "I’ve written songs, stories, or created art just for fun.", trait: "creative" },
  { text: "I often feel hopeless or like nothing matters.", trait: "depressed" },
  { text: "I enjoy checking in on people and making sure they’re okay.", trait: "empathetic" }
];

const options = [
  ["Absolutely, that's me!", 5],
  ["Yeah, kind of.", 4],
  ["I’m not sure.", 3],
  ["Hmm, not really.", 2],
  ["Nope, that's not me.", 1]
];

let currentQuestion = 0;
let scores = {};
let answers = [];

const container = document.getElementById("test-container");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const saveBtn = document.getElementById("save-btn");
const resultsArea = document.getElementById("results-area");

function showQuestion() {
  const q = questions[currentQuestion];
  let html = `<h2>Q${currentQuestion + 1} of ${questions.length}</h2>`;
  html += `<p>${q.text}</p><div class="options">`;

  options.forEach(([text], i) => {
    html += `
      <label>
        <input type="radio" name="answer" value="${i}"> ${text}
      </label>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

function showResults() {
  container.innerHTML = `<h2>🧠 Personality Summary</h2>`;
  const summary = interpretScores();
  const resultText = `Your Personality Type: ${summary}`;
  container.innerHTML += `<p class="result-text">${resultText}</p>`;
  resultsArea.value = `🧠 Personality Test Summary\n\n${resultText}`;
  resultsArea.style.display = "block";
  restartBtn.style.display = "inline-block";
  saveBtn.style.display = "inline-block";
  nextBtn.style.display = "none";
}

function interpretScores() {
  const traitLabels = {
    creative: "Creative",
    anxious: "Anxious",
    depressed: "Emotionally Sensitive",
    organized: "Organized",
    empathetic: "Empathetic",
    social: "Social"
  };

  const result = [];

  for (let trait in traitLabels) {
    if ((scores[trait] || 0) >= 12) {
      result.push(traitLabels[trait]);
    }
  }

  return result.length > 0 ? result.join(", ") : "Balanced";
}

function handleNext() {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) {
    alert("Please choose the option that best describes you.");
    return;
  }

  const score = options[selected.value][1];
  const trait = questions[currentQuestion].trait;

  scores[trait] = (scores[trait] || 0) + score;
  answers.push({ q: questions[currentQuestion].text, score });

  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function restartTest() {
  currentQuestion = 0;
  scores = {};
  answers = [];
  resultsArea.style.display = "none";
  restartBtn.style.display = "none";
  saveBtn.style.display = "none";
  nextBtn.style.display = "inline-block";
  showQuestion();
}

function saveResults() {
  const blob = new Blob([resultsArea.value], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "personality_results.txt";
  link.click();
}

nextBtn.addEventListener("click", handleNext);
restartBtn.addEventListener("click", restartTest);
saveBtn.addEventListener("click", saveResults);

showQuestion();
