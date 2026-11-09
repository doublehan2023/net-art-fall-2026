const messages = [
  "You make the world a little brighter just by being here. ♡",
  "A little reminder: you are doing better than you think. 🌷",
  "Something lovely might happen today. Keep your heart open! ✨",
  "You deserve the same kindness you give to others. 💌",
  "It's okay to rest. Even flowers need time to bloom. 🌸",
  "Sending you a tiny virtual hug! 🧸",
  "You are someone's favorite part of the day. 🎀",
  "Small steps still count. I'm proud of you! ⭐",
];

const button = document.getElementById("dispenseButton");
const message = document.getElementById("message");

function dispenseHappiness() {
  const randomIndex = Math.floor(Math.random() * messages.length);
  message.textContent = messages[randomIndex];
}

button.addEventListener("click", dispenseHappiness);
