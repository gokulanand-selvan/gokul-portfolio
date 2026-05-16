(() => {
  const ROOT_ID = "codex-pet-root";

  if (document.getElementById(ROOT_ID)) {
    return;
  }

  const runtime = typeof chrome !== "undefined" && chrome.runtime;
  const storage =
    typeof chrome !== "undefined" && chrome.storage?.local
      ? chrome.storage.local
      : null;
  const spriteSource = runtime
    ? chrome.runtime.getURL("/pet/assets/dog_idle.png")
    : "/pet/assets/dog_idle.png";

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(max-width: 768px)").matches;

  const state = {
    x: Math.max(24, window.innerWidth - 172),
    y: isMobile ? 180 : 96,
    sleeping: false,
    following: false,
    menuOpen: false,
    lastInteraction: Date.now(),
    mouseX: null,
    mouseY: null,
    driftTimer: null,
    idleTimer: null,
    sleepTimer: null,
    thoughtTimer: null,
    saveTimer: null,
  };

  const softLines = [
    "still here.",
    "small company.",
    "quiet paws.",
    "resting nearby.",
    "warm little pause.",
    "keeping you company.",
  ];

  const petLines = ["that was nice.", "tiny wag.", "thank you.", "i'm here."];

  const snackLines = ["small snack.", "quiet cronch.", "thank you."];

  const playLines = ["a little bounce.", "soft zoom.", "tiny play."];

  const root = document.createElement("div");
  root.id = ROOT_ID;
  root.setAttribute("aria-hidden", "false");

  const pet = document.createElement("button");
  pet.className = "codex-pet";
  pet.type = "button";
  pet.setAttribute("aria-label", "Codex pet dog");

  const tail = document.createElement("span");
  tail.className = "codex-pet__tail";
  tail.setAttribute("aria-hidden", "true");

  const img = document.createElement("img");
  img.className = "codex-pet__sprite";
  img.alt = "";
  img.decoding = "async";
  img.draggable = false;
  img.src = spriteSource;

  const shadow = document.createElement("span");
  shadow.className = "codex-pet__shadow";
  shadow.setAttribute("aria-hidden", "true");

  const thought = document.createElement("div");
  thought.className = "codex-pet__thought";
  thought.setAttribute("role", "status");

  const menu = document.createElement("div");
  menu.className = "codex-pet__menu";
  menu.setAttribute("aria-label", "Codex pet controls");
  menu.innerHTML = `
    <button type="button" data-action="snack" data-tooltip="Snack" title="Snack" aria-label="Snack">🦴</button>
    <button type="button" data-action="play" data-tooltip="Play" title="Play" aria-label="Play">🐕</button>
    <button type="button" data-action="nap" data-tooltip="Nap" title="Nap" aria-label="Nap">💤</button>
    <button type="button" data-action="follow" data-tooltip="Follow mouse" title="Follow mouse" aria-label="Follow mouse" aria-pressed="false">🐾🐕</button>
    <button type="button" data-action="veni" data-tooltip="For Veni" title="For Veni" aria-label="For Veni">🐶❤️</button>
    <button type="button" data-action="reset" data-tooltip="Reset" title="Reset" aria-label="Reset">↺</button>
  `;

  pet.append(tail, img);
  root.append(pet, shadow, thought, menu);
  document.documentElement.append(root);

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function choose(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function updateMenuPosition() {
    const menuWidth = menu.offsetWidth || 0;
    const menuHeight = menu.offsetHeight || 0;
    const menuLeft = clamp(
      state.x - 34,
      8,
      Math.max(8, window.innerWidth - menuWidth - 8),
    );
    const menuTop = clamp(
      state.y - 48,
      8,
      Math.max(8, window.innerHeight - menuHeight - 8),
    );

    root.style.setProperty("--menu-left", `${menuLeft}px`);
    root.style.setProperty("--menu-top", `${menuTop}px`);
  }

  function updatePosition({ drifting = false } = {}) {
    const maxX = Math.max(16, window.innerWidth - pet.offsetWidth - 16);
    const maxY = Math.max(16, window.innerHeight - pet.offsetHeight - 16);
    state.x = clamp(state.x, 16, maxX);
    state.y = clamp(state.y, 16, maxY);

    pet.classList.toggle("is-drifting", drifting);
    root.style.setProperty("--pet-left", `${state.x}px`);
    root.style.setProperty("--pet-top", `${state.y}px`);
    updateMenuPosition();
    scheduleSave();
  }

  function scheduleSave() {
    clearTimeout(state.saveTimer);
    state.saveTimer = setTimeout(() => {
      if (storage) {
        storage.set({
          codexPetPosition: {
            x: state.x,
            y: state.y,
          },
        });
      }
    }, 500);
  }

  function showThought(text, duration = 2400) {
    clearTimeout(state.thoughtTimer);
    thought.textContent = text;
    thought.classList.add("is-visible");
    state.thoughtTimer = setTimeout(() => {
      thought.classList.remove("is-visible");
    }, duration);
  }

  function hideThought() {
    clearTimeout(state.thoughtTimer);
    thought.classList.remove("is-visible");
  }

  function burst(count = 4) {
    for (let index = 0; index < count; index += 1) {
      const sparkle = document.createElement("span");
      sparkle.className = "codex-pet__sparkle";
      sparkle.style.setProperty(
        "--sparkle-left",
        `${state.x + 26 + Math.random() * 76}px`,
      );
      sparkle.style.setProperty(
        "--sparkle-top",
        `${state.y + 8 + Math.random() * 44}px`,
      );
      root.append(sparkle);
      sparkle.addEventListener("animationend", () => sparkle.remove(), {
        once: true,
      });
    }
  }

  function makeTransparentSprite() {
    const source = new Image();
    source.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d", { willReadFrequently: true });
      canvas.width = source.naturalWidth;
      canvas.height = source.naturalHeight;
      context.drawImage(source, 0, 0);

      const frame = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = frame.data;
      const bg = [data[0], data[1], data[2]];

      for (let index = 0; index < data.length; index += 4) {
        const distance =
          Math.abs(data[index] - bg[0]) +
          Math.abs(data[index + 1] - bg[1]) +
          Math.abs(data[index + 2] - bg[2]);

        if (distance < 76) {
          data[index + 3] = 0;
        }
      }

      context.putImageData(frame, 0, 0);
      const transparentSprite = canvas.toDataURL("image/png");
      img.src = transparentSprite;
      tail.style.backgroundImage = `url("${transparentSprite}")`;
    };
    source.src = spriteSource;
  }

  function wakeSoftly() {
    state.sleeping = false;
    pet.classList.remove("is-sleeping");
  }

  function restNaturally() {
    if (state.menuOpen) {
      return;
    }
    state.following = false;
    pet.classList.remove("is-following");
    updateFollowButton();
    state.sleeping = true;
    pet.classList.add("is-sleeping");
    showThought("resting.", 1800);
  }

  function reactGently() {
    state.lastInteraction = Date.now();
    wakeSoftly();
    pet.classList.add("is-petted");
    burst(3);
    showThought(choose(petLines), 1900);
    setTimeout(() => pet.classList.remove("is-petted"), 850);
    scheduleSleep();
  }

  function giveSnack() {
    state.lastInteraction = Date.now();
    wakeSoftly();
    pet.classList.add("is-petted");
    burst(4);
    showThought(choose(snackLines), 1900);
    setTimeout(() => pet.classList.remove("is-petted"), 850);
    scheduleSleep();
  }

  function playSoftly() {
    state.lastInteraction = Date.now();
    wakeSoftly();
    pet.classList.remove("is-playing");
    requestAnimationFrame(() => pet.classList.add("is-playing"));
    burst(5);
    showThought(choose(playLines), 1900);
    setTimeout(() => pet.classList.remove("is-playing"), 1150);
    scheduleSleep();
  }

  function drift() {
    if (state.following || state.menuOpen || state.sleeping) {
      scheduleDrift();
      return;
    }

    const nearbyX = state.x + (Math.random() - 0.5) * 130;
    const nearbyY = state.y + (Math.random() - 0.5) * 70;
    state.x = nearbyX;
    state.y = nearbyY;
    updatePosition({ drifting: true });

    if (Math.random() > 0.64) {
      pet.classList.add("is-curious");
      setTimeout(() => pet.classList.remove("is-curious"), 1600);
    }

    scheduleDrift();
  }

  function quietIdle() {
    if (!state.following && !state.menuOpen && Math.random() > 0.42) {
      showThought(choose(softLines), 2200);
    }
    scheduleIdle();
  }

  function scheduleDrift() {
    clearTimeout(state.driftTimer);
    state.driftTimer = setTimeout(drift, 18000 + Math.random() * 26000);
  }

  function scheduleIdle() {
    clearTimeout(state.idleTimer);
    state.idleTimer = setTimeout(quietIdle, 36000 + Math.random() * 52000);
  }

  function scheduleSleep() {
    clearTimeout(state.sleepTimer);
    state.sleepTimer = setTimeout(restNaturally, 90000 + Math.random() * 90000);
  }

  function toggleMenu() {
    state.menuOpen = !state.menuOpen;
    menu.classList.toggle("is-visible", state.menuOpen);
  }

  function updateFollowButton() {
    const followButton = menu.querySelector('[data-action="follow"]');
    if (followButton) {
      followButton.setAttribute("aria-pressed", String(state.following));
    }
  }

  function stopFollowing({ quiet = false } = {}) {
    if (!state.following) {
      return;
    }

    state.following = false;
    pet.classList.remove("is-following");
    updateFollowButton();

    if (!quiet) {
      showThought("i'll settle here.", 1700);
    }

    scheduleSleep();
  }

  function resetToCorner() {
    state.following = false;
    state.menuOpen = false;
    state.sleeping = true;
    pet.classList.remove(
      "is-drifting",
      "is-following",
      "is-playing",
      "is-petted",
    );
    pet.classList.add("is-sleeping");
    menu.classList.remove("is-visible");
    updateFollowButton();
    hideThought();
    state.x = Math.max(16, window.innerWidth - pet.offsetWidth - 16);
    state.y = isMobile ? 180 : 96;
    updatePosition();
  }

  function followMouse(event) {
    state.mouseX = event.clientX;
    state.mouseY = event.clientY;

    if (!state.following || state.sleeping || state.menuOpen) {
      return;
    }

    pet.classList.remove("is-drifting");
    pet.classList.add("is-following");
    state.x = event.clientX - pet.offsetWidth / 2;
    state.y = event.clientY + 22;
    updatePosition();
  }

  function toggleFollow() {
    if (state.following) {
      stopFollowing();
      return;
    }

    state.following = true;
    wakeSoftly();
    pet.classList.toggle("is-following", state.following);
    updateFollowButton();

    showThought("i'll follow softly.", 1900);
    if (Number.isFinite(state.mouseX) && Number.isFinite(state.mouseY)) {
      state.x = state.mouseX - pet.offsetWidth / 2;
      state.y = state.mouseY + 22;
      updatePosition();
    }
  }

  pet.addEventListener("click", () => {
    wakeSoftly();
    toggleMenu();
  });

  pet.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    toggleMenu();
  });

  menu.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) {
      return;
    }

    const action = button.dataset.action;

    state.menuOpen = false;
    menu.classList.remove("is-visible");

    if (action === "snack") {
      giveSnack();
    }

    if (action === "play") {
      playSoftly();
    }

    if (action === "nap") {
      if (state.sleeping) {
        wakeSoftly();
        showThought("awake.", 1500);
        scheduleSleep();
      } else {
        restNaturally();
      }
    }

    if (action === "follow") {
      toggleFollow();
    }

    if (action === "veni") {
      wakeSoftly();
      showThought("😘😘😘", 1900);
      scheduleSleep();
    }

    if (action === "reset") {
      resetToCorner();
    }
  });

  // Tooltip support for pointer and touch devices
  menu.addEventListener("pointerenter", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    // compute if tooltip would overflow and flip if needed
    if (e.pointerType !== "touch") {
      b.classList.add("show-tooltip");
    }

    try {
      const rect = b.getBoundingClientRect();
      const tooltipMax = 120; // matches CSS max-width
      const half = rect.width / 2;
      const leftPos = rect.left + half - tooltipMax / 2;
      const rightPos = rect.left + half + tooltipMax / 2;
      b.classList.remove("tooltip-flip-left", "tooltip-flip-right");
      if (leftPos < 8) {
        b.classList.add("tooltip-flip-left");
      } else if (rightPos > window.innerWidth - 8) {
        b.classList.add("tooltip-flip-right");
      }
    } catch (err) {
      /* ignore layout errors */
    }
  });

  menu.addEventListener("pointerleave", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    if (e.pointerType !== "touch") b.classList.remove("show-tooltip");
    b.classList.remove("tooltip-flip-left", "tooltip-flip-right");
  });

  menu.addEventListener("pointerdown", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    // On touch, show a short-lived tooltip so taps reveal the label
    if (e.pointerType === "touch") {
      b.classList.add("show-tooltip");
      try {
        const rect = b.getBoundingClientRect();
        const tooltipMax = 120;
        const half = rect.width / 2;
        const leftPos = rect.left + half - tooltipMax / 2;
        const rightPos = rect.left + half + tooltipMax / 2;
        b.classList.remove("tooltip-flip-left", "tooltip-flip-right");
        if (leftPos < 8) {
          b.classList.add("tooltip-flip-left");
        } else if (rightPos > window.innerWidth - 8) {
          b.classList.add("tooltip-flip-right");
        }
      } catch (err) {}
      setTimeout(
        () =>
          b.classList.remove(
            "show-tooltip",
            "tooltip-flip-left",
            "tooltip-flip-right",
          ),
        1400,
      );
    }
  });

  document.addEventListener("pointermove", followMouse, { passive: true });

  document.addEventListener(
    "click",
    (event) => {
      if (state.following && !root.contains(event.target)) {
        stopFollowing({ quiet: true });
      }

      if (!state.menuOpen || root.contains(event.target)) {
        return;
      }

      state.menuOpen = false;
      menu.classList.remove("is-visible");
    },
    true,
  );

  window.addEventListener("resize", () => updatePosition());

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      restNaturally();
    } else {
      wakeSoftly();
      scheduleSleep();
    }
  });

  function boot() {
    makeTransparentSprite();

    // Position top-right: mobile keeps the current mobile-style placement, desktop starts at top 6rem.
    state.x = Math.max(16, window.innerWidth - (pet.offsetWidth || 132) - 16);
    state.y = isMobile ? 180 : 96;
    updatePosition();

    if (storage) {
      storage.get("codexPetPosition", (stored) => {
        const saved = stored.codexPetPosition;
        if (saved && Number.isFinite(saved.x) && Number.isFinite(saved.y)) {
          state.x = saved.x;
          state.y = saved.y;
          updatePosition();
        }
      });
    }

    setTimeout(
      () => showThought( "woof! woof!" , 2200),
      1200,
    );
    scheduleDrift();
    scheduleIdle();
    scheduleSleep();
  }

  boot();
})();
