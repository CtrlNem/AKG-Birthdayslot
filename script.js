const symbols = ["7", "✦", "♛", "♦", "♥", "★"];
const spinBtn = document.getElementById("spinBtn");
const againBtn = document.getElementById("againBtn");
const statusText = document.getElementById("status");
const spinCount = document.getElementById("spinCount");
const meterFill = document.getElementById("meterFill");
const result = document.getElementById("result");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");
const rewardImage = document.getElementById("rewardImage");
const saveBtn = document.getElementById("saveBtn");
const reels = [document.getElementById("reel1"), document.getElementById("reel2"), document.getElementById("reel3")];

let spins = 0;
let finished = false;
let busy = false;

function randomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}
function setSymbols(values) {
  reels.forEach((reel, index) => reel.textContent = values[index]);
}
function chooseRarity() {
  const roll = Math.random();
  if (roll < 0.70) return "normal";
  if (roll < 0.95) return "rare";
  return "premium";
}
function showReward(rarity) {
  const rewards = {
    normal: { title: "NORMAL BONUS!", text: "バースデー記念画像をGET！", src: "images/reward-normal.svg", filename: "wen-birthday-normal.svg" },
    rare: { title: "RARE BONUS!", text: "レア演出成功！特別画像をGET！", src: "images/reward-rare.svg", filename: "wen-birthday-rare.svg" },
    premium: { title: "PREMIUM BONUS!", text: "プレミア演出！特別な画像をGET！", src: "images/reward-premium.svg", filename: "wen-birthday-premium.svg" }
  };
  const reward = rewards[rarity];
  resultTitle.textContent = reward.title;
  resultText.textContent = reward.text;
  rewardImage.src = reward.src;
  rewardImage.alt = reward.title + " 記念画像";
  saveBtn.href = reward.src;
  saveBtn.download = reward.filename;
  result.classList.remove("hidden");
  result.scrollIntoView({ behavior: "smooth", block: "start" });
}
function spin() {
  if (busy || finished) return;
  busy = true;
  spinBtn.disabled = true;
  spins++;
  spinCount.textContent = String(spins);
  meterFill.style.width = `${spins * 10}%`;
  statusText.textContent = "リール回転中…！";
  reels.forEach(reel => reel.classList.add("spinning"));

  window.setTimeout(() => {
    const isHit = spins === 10 || Math.random() < 0.20;
    if (isHit) {
      setSymbols(["7", "7", "7"]);
      reels.forEach(reel => reel.classList.remove("spinning"));
      statusText.textContent = spins === 10 ? "ラストスピン！ボーナス確定！！" : "大当たり！！";
      finished = true;
      busy = false;
      showReward(chooseRarity());
      spinBtn.textContent = "BONUS GET!";
      return;
    }
    setSymbols([randomSymbol(), randomSymbol(), randomSymbol()]);
    reels.forEach(reel => reel.classList.remove("spinning"));
    statusText.textContent = spins < 10 ? "残念！次のSPINでチャンス！" : "ボーナス確定！";
    busy = false;
    spinBtn.disabled = false;
  }, 850);
}
function resetGame() {
  spins = 0;
  finished = false;
  busy = false;
  spinCount.textContent = "0";
  meterFill.style.width = "0%";
  statusText.textContent = "SPINを押してゲームスタート！";
  setSymbols(["✦", "7", "✦"]);
  reels.forEach(reel => reel.classList.remove("spinning"));
  spinBtn.disabled = false;
  spinBtn.textContent = "SPIN";
  result.classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}
spinBtn.addEventListener("click", spin);
againBtn.addEventListener("click", resetGame);
