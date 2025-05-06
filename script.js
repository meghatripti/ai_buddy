const apiKey = 'AIzaSyBARnAk_KSFIV46Mf5ADhw8N6xlUNq-TK4';

async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatArea = document.getElementById("chatArea");
  const userText = input.value.trim();
  if (!userText) return;

  // Add user bubble
  const userBubble = document.createElement("div");
  userBubble.className = "bubble user";
  userBubble.innerText = userText;
  chatArea.appendChild(userBubble);

  input.value = "";

  // Scroll to bottom
  chatArea.scrollTop = chatArea.scrollHeight;

  // Thinking bubble
  const aiBubble = document.createElement("div");
  aiBubble.className = "bubble ai";
  aiBubble.innerText = "Thinking...";
  chatArea.appendChild(aiBubble);

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userText }] }]
      })
    });

    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
    aiBubble.innerText = reply;
  } catch (err) {
    aiBubble.innerText = "Error: " + err.message;
  }

  chatArea.scrollTop = chatArea.scrollHeight;
}
