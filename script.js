 const units = {
    miner: { count: 0, cost: 15, gps: 0.0000000000000000000000000000000001 },
    excavator: { count: 0, cost: 100, gps: 1 },
    drillbot: { count: 0, cost: 1100, gps: 8 }
  };

  let gold = 0;

  function collectGold() {
    if (isBoostActive) {
        gold+= 2;
    } else {
        gold += 1;
    }
    updateDisplay();
  }

  function buyUnit(type) {
    const unit = units[type];
    if (gold >= unit.cost) {
      gold -= unit.cost;
      unit.count += 1;
      unit.cost = Math.floor(unit.cost * 1.1);
      updateDisplay();
    }
  }

  function updateDisplay() {
    document.getElementById('yen-counter').innerHTML = `💰 Yen: ${Math.floor(gold)}`;
    document.getElementById('miner-count').innerText = units.miner.count;
    document.getElementById('excavator-count').innerText = units.excavator.count;
    document.getElementById('drillbot-count').innerText = units.drillbot.count;

    document.getElementById('miner-button').innerText = `Upgraden (${units.miner.cost} Yen)`;
    document.getElementById('excavator-button').innerText = `Upgraden (${units.excavator.cost} Yen)`;
    document.getElementById('drillbot-button').innerText = `Upgraden (${units.drillbot.cost} Yen)`;
  }

  function earnPassiveGold() {
    let gps = (
      units.miner.count * units.miner.gps +
      units.excavator.count * units.excavator.gps +
      units.drillbot.count * units.drillbot.gps
    );
    if (isBoostActive) {
        gps *= 2;
    }

    gold += gps / 10; 
    updateDisplay();
  }

  setInterval(earnPassiveGold, 100); 
  updateDisplay();

  document.getElementById("toggleMusic").onclick = function() {
    toggleMusic();
  };

  let musicPlaying = false;
const music = document.getElementById('bg-music');

function toggleMusic() {
  if (musicPlaying) {
    music.pause();
  } else {
    music.play();
  }
  musicPlaying = !musicPlaying;
}
let upgradesUnlocked = {
  1: false
};

/*function unlockUpgrade(id) {
  if (!upgradesUnlocked[id] && score >= 50) { 
    upgradesUnlocked[id] = true;
    
    document.getElementById(`upgrade${id}-img`).src = "real-upgrade.png";
    document.getElementById(`upgrade${id}-img`).classList.add("unlocked");
    document.getElementById(`upgrade${id}-btn`).innerText = "💥 Laser-Boost";
    
    activateUpgrade(id);
  }
}
*/

let isBoostActive = false;
let boostCooldown = false;

function activateDoubleBoost() {
  if (boostCooldown || isBoostActive) return;

  isBoostActive = true;
  boostCooldown = true;
  document.getElementById("double-boost-btn").disabled = true;
  document.getElementById("double-boost-btn").innerText = "Boost aktiv!";
  
  // Boost läuft 30 Sekunden
  setTimeout(() => {
    isBoostActive = false;
    document.getElementById("double-boost-btn").innerText = "Cooldown...";
  

  // Cooldown läuft 100 Sekunden
  let cooldown = 100;
  const timer = setInterval(() => {
    cooldown--;
    document.getElementById("cooldown-timer").innerText = ` (${cooldown}s)`;

    if (cooldown <= 0) {
      clearInterval(timer);
      boostCooldown = false;
      document.getElementById("double-boost-btn").disabled = false;
      document.getElementById("double-boost-btn").innerText = "Double Boost";
      document.getElementById("cooldown-timer").innerText = "";
    }
  }, 1000);
  }, 30000); // 30 Sekunden
}