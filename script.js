const APP_PROFILE_KEY = "macroBusinessProfile";

const defaultUser = {
  name: "Usuario",
  assistantName: "Macro"
};

const views = document.querySelectorAll(".view");
const navButtons = document.querySelectorAll(".nav-btn");
const protectedButtons = document.querySelectorAll(".protected-action");

const profileModal = document.getElementById("profileModal");
const closeProfileModal = document.getElementById("closeProfileModal");
const profileForm = document.getElementById("profileForm");
const profilePhotoInput = document.getElementById("profilePhotoInput");
const photoPreview = document.getElementById("photoPreview");

const profileNameInput = document.getElementById("profileNameInput");
const profileCompanyInput = document.getElementById("profileCompanyInput");
const profileRoleInput = document.getElementById("profileRoleInput");
const profileCityInput = document.getElementById("profileCityInput");
const profileWhatsappInput = document.getElementById("profileWhatsappInput");
const profileEmailInput = document.getElementById("profileEmailInput");
const profileBioInput = document.getElementById("profileBioInput");

const profilePhotoDisplay = document.getElementById("profilePhotoDisplay");
const profileNameDisplay = document.getElementById("profileNameDisplay");
const profileRoleDisplay = document.getElementById("profileRoleDisplay");
const profileCompanyDisplay = document.getElementById("profileCompanyDisplay");
const profileCityDisplay = document.getElementById("profileCityDisplay");
const profileBioDisplay = document.getElementById("profileBioDisplay");

const openProfileModalBtn = document.getElementById("openProfileModalBtn");
const openProfileFromHeader = document.getElementById("openProfileFromHeader");
const editProfileBtn = document.getElementById("editProfileBtn");

const directorySearch = document.getElementById("directorySearch");
const directoryCards = document.querySelectorAll(".directory-card");
const aiPrompt = document.getElementById("aiPrompt");
const aiAnalyzeBtn = document.getElementById("aiAnalyzeBtn");
const aiResult = document.getElementById("aiResult");

const chatMessages = document.getElementById("chatMessages");
const messageInput = document.getElementById("messageInput");
const sendMessageBtn = document.getElementById("sendMessageBtn");
const sendWhatsappBtn = document.getElementById("sendWhatsappBtn");
const sendEmailBtn = document.getElementById("sendEmailBtn");
const sendProfileBtn = document.getElementById("sendProfileBtn");

const voiceModal = document.getElementById("voiceModal");
const openVoiceBtn = document.getElementById("openVoiceBtn");
const closeVoiceBtn = document.getElementById("closeVoiceBtn");
const startVoiceBtn = document.getElementById("startVoiceBtn");
const voiceOrb = document.getElementById("voiceOrb");
const voiceStatus = document.getElementById("voiceStatus");
const voiceText = document.getElementById("voiceText");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = null;
let isListening = false;
let assistantAwake = false;

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getProfile() {
  const saved = localStorage.getItem(APP_PROFILE_KEY);

  if (!saved) return null;

  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

function saveProfile(profile) {
  localStorage.setItem(APP_PROFILE_KEY, JSON.stringify(profile));
}

function hasProfile() {
  const profile = getProfile();

  return Boolean(
    profile &&
    profile.name &&
    profile.company &&
    profile.role &&
    profile.city &&
    profile.whatsapp &&
    profile.email
  );
}

function requireProfile(callback) {
  if (!hasProfile()) {
    openProfileModal();
    return false;
  }

  if (typeof callback === "function") {
    callback();
  }

  return true;
}

function showView(viewId) {
  views.forEach(view => view.classList.remove("active"));

  const target = document.getElementById(viewId);
  if (target) target.classList.add("active");

  navButtons.forEach(button => {
    button.classList.remove("active");

    if (button.dataset.go === viewId) {
      button.classList.add("active");
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function bindNavigation() {
  document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", event => {
      const viewId = button.dataset.go;

      if (button.classList.contains("protected-action")) {
        event.preventDefault();
        requireProfile(() => showView(viewId));
        return;
      }

      showView(viewId);
    });
  });
}

function openProfileModal() {
  loadProfileForm();
  profileModal.classList.add("active");
}

function closeProfileModalFn() {
  profileModal.classList.remove("active");
}

function normalizeWhatsapp(raw) {
  let number = String(raw || "").replace(/\D/g, "");

  if (number.startsWith("0")) {
    number = "593" + number.substring(1);
  }

  if (!number.startsWith("593")) {
    number = "593" + number;
  }

  return number;
}

function buildWhatsappLink(raw) {
  return `https://wa.me/${normalizeWhatsapp(raw)}`;
}

function loadProfileForm() {
  const profile = getProfile();

  if (!profile) return;

  profileNameInput.value = profile.name || "";
  profileCompanyInput.value = profile.company || "";
  profileRoleInput.value = profile.role || "";
  profileCityInput.value = profile.city || "";
  profileWhatsappInput.value = profile.whatsapp || "";
  profileEmailInput.value = profile.email || "";
  profileBioInput.value = profile.bio || "";

  if (profile.photo) {
    photoPreview.innerHTML = `<img src="${profile.photo}" alt="Foto de perfil" />`;
  }
}

function updateProfileUI() {
  const profile = getProfile();

  if (!profile) return;

  const firstName = profile.name.split(" ")[0] || "Usuario";
  defaultUser.name = firstName;

  profileNameDisplay.textContent = profile.name;
  profileRoleDisplay.textContent = profile.role;
  profileCompanyDisplay.textContent = profile.company;
  profileCityDisplay.textContent = profile.city;
  profileBioDisplay.textContent = profile.bio;

  if (profile.photo) {
    profilePhotoDisplay.innerHTML = `<img src="${profile.photo}" alt="Foto de perfil" />`;
  }
}

function bindProfile() {
  openProfileModalBtn.addEventListener("click", openProfileModal);
  openProfileFromHeader.addEventListener("click", openProfileModal);
  editProfileBtn.addEventListener("click", openProfileModal);
  closeProfileModal.addEventListener("click", closeProfileModalFn);

  profileModal.addEventListener("click", event => {
    if (event.target === profileModal) {
      closeProfileModalFn();
    }
  });

  profilePhotoInput.addEventListener("change", function () {
    const file = this.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Solo puedes subir imágenes.");
      return;
    }

    if (file.size > 1024 * 1024) {
      alert("La foto no debe pesar más de 1 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = event => {
      const photo = event.target.result;

      photoPreview.innerHTML = `<img src="${photo}" alt="Foto de perfil" />`;

      const currentProfile = getProfile() || {};
      currentProfile.photo = photo;
      saveProfile(currentProfile);
      updateProfileUI();
    };

    reader.readAsDataURL(file);
  });

  profileForm.addEventListener("submit", event => {
    event.preventDefault();

    const currentProfile = getProfile() || {};

    const profile = {
      ...currentProfile,
      name: profileNameInput.value.trim(),
      company: profileCompanyInput.value.trim(),
      role: profileRoleInput.value.trim(),
      city: profileCityInput.value.trim(),
      whatsapp: profileWhatsappInput.value.trim(),
      whatsappLink: buildWhatsappLink(profileWhatsappInput.value.trim()),
      email: profileEmailInput.value.trim(),
      bio: profileBioInput.value.trim(),
      updatedAt: new Date().toISOString()
    };

    if (
      !profile.name ||
      !profile.company ||
      !profile.role ||
      !profile.city ||
      !profile.whatsapp ||
      !profile.email ||
      !profile.bio
    ) {
      alert("Completa todos los campos del perfil.");
      return;
    }

    saveProfile(profile);
    updateProfileUI();
    closeProfileModalFn();

    speak(`Perfil guardado. Bienvenido ${profile.name}.`);
    alert("Perfil guardado correctamente.");
  });
}

function createMessage(text, type = "sent") {
  const row = document.createElement("div");
  row.className = `message-row ${type}`;

  const bubble = document.createElement("div");
  bubble.className = "message";
  bubble.textContent = text;

  row.appendChild(bubble);
  return row;
}

function scrollChatBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendChatMessage(text, autoReply = true) {
  chatMessages.appendChild(createMessage(text, "sent"));
  scrollChatBottom();

  if (autoReply) {
    setTimeout(() => {
      chatMessages.appendChild(
        createMessage(
          "Perfecto. Con esa información podemos continuar la negociación directamente.",
          "received"
        )
      );
      scrollChatBottom();
    }, 650);
  }
}

function bindChat() {
  sendMessageBtn.addEventListener("click", () => {
    requireProfile(() => {
      const text = messageInput.value.trim();

      if (!text) return;

      sendChatMessage(text);
      messageInput.value = "";
    });
  });

  messageInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      sendMessageBtn.click();
    }
  });

  sendWhatsappBtn.addEventListener("click", () => {
    requireProfile(() => {
      const profile = getProfile();

      sendChatMessage(
        `Hola, te comparto mi WhatsApp para continuar la conversación:\n${profile.whatsappLink}`
      );
    });
  });

  sendEmailBtn.addEventListener("click", () => {
    requireProfile(() => {
      const profile = getProfile();

      sendChatMessage(
        `Te comparto mi correo para avanzar con la propuesta:\n${profile.email}`
      );
    });
  });

  sendProfileBtn.addEventListener("click", () => {
    requireProfile(() => {
      const profile = getProfile();

      sendChatMessage(
        `Te comparto mi perfil profesional:\n${profile.name}\n${profile.company}\n${profile.role}\n${profile.city}\n${profile.bio}`
      );
    });
  });
}

function bindDirectory() {
  directorySearch.addEventListener("input", () => {
    const query = normalizeText(directorySearch.value);

    directoryCards.forEach(card => {
      const title = normalizeText(card.querySelector("h3").textContent);
      const text = normalizeText(card.querySelector("p").textContent);
      const keywords = normalizeText(card.dataset.keywords);

      const match =
        title.includes(query) ||
        text.includes(query) ||
        keywords.includes(query);

      card.style.display = match ? "flex" : "none";
    });
  });

  aiAnalyzeBtn.addEventListener("click", () => {
    requireProfile(() => {
      const prompt = normalizeText(aiPrompt.value);

      if (!prompt) {
        aiResult.textContent = "Escribe qué tipo de contacto o negocio estás buscando.";
        speak("Escribe qué tipo de contacto o negocio estás buscando.");
        return;
      }

      let response = "Macro recomienda crear una propuesta clara con objetivo, beneficio, contacto y siguiente paso.";

      if (prompt.includes("inversion") || prompt.includes("capital") || prompt.includes("inversionista")) {
        response = "Macro recomienda buscar un perfil inversionista. Prepara monto requerido, retorno estimado y proyección de ingresos.";
      }

      if (prompt.includes("alianza") || prompt.includes("canje") || prompt.includes("convenio")) {
        response = "Macro recomienda buscar aliados estratégicos. Presenta qué entregas, qué recibes y cuál es el beneficio para ambas partes.";
      }

      if (prompt.includes("venta") || prompt.includes("cliente") || prompt.includes("comprador")) {
        response = "Macro recomienda buscar compradores comerciales. Presenta tu oferta, precio, entregables y forma de contacto.";
      }

      aiResult.textContent = response;
      speak(response);
    });
  });
}

function getBestVoice() {
  const voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];

  return (
    voices.find(voice => voice.lang === "es-EC") ||
    voices.find(voice => voice.lang === "es-ES") ||
    voices.find(voice => voice.lang.startsWith("es")) ||
    voices[0] ||
    null
  );
}

function speak(text) {
  if (!window.speechSynthesis) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-EC";
  utterance.rate = 0.92;
  utterance.pitch = 1;
  utterance.volume = 1;

  const voice = getBestVoice();
  if (voice) utterance.voice = voice;

  window.speechSynthesis.speak(utterance);
}

function setupVoice() {
  if (!SpeechRecognition) {
    voiceStatus.textContent = "Micrófono no compatible";
    voiceText.textContent = "Este navegador puede hablar, pero no escuchar comandos.";
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "es-EC";
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onstart = () => {
    isListening = true;
    voiceOrb.classList.add("listening");
    voiceStatus.textContent = "Escuchando";
    voiceText.textContent = "Di: Hola Macro";
    startVoiceBtn.textContent = "Escuchando";
  };

  recognition.onresult = event => {
    const result = event.results[event.results.length - 1][0].transcript;
    processVoice(result);
  };

  recognition.onerror = () => {
    voiceStatus.textContent = "No pude escuchar bien";
    voiceText.textContent = "Intenta nuevamente.";
  };

  recognition.onend = () => {
    isListening = false;
    voiceOrb.classList.remove("listening");
    startVoiceBtn.textContent = "Hablar";

    if (voiceModal.classList.contains("active")) {
      setTimeout(() => {
        try {
          recognition.start();
        } catch {}
      }, 700);
    }
  };
}

function openVoice() {
  requireProfile(() => {
    voiceModal.classList.add("active");
    assistantAwake = false;

    voiceStatus.textContent = "Asistente Macro";
    voiceText.textContent = "Di: Hola Macro";

    speak(`Hola ${defaultUser.name}. Soy Macro. Toca hablar y dime Hola Macro.`);
  });
}

function closeVoice() {
  voiceModal.classList.remove("active");
  assistantAwake = false;

  if (recognition && isListening) {
    recognition.stop();
  }

  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }

  voiceOrb.classList.remove("listening");
  startVoiceBtn.textContent = "Hablar";
}

function startVoice() {
  requireProfile(() => {
    if (!recognition) {
      speak("No puedo escuchar en este navegador, pero sí puedo hablar.");
      return;
    }

    try {
      recognition.start();
    } catch {
      voiceStatus.textContent = "Ya estoy escuchando";
    }
  });
}

function processVoice(command) {
  const text = normalizeText(command);
  voiceText.textContent = command;

  if (!assistantAwake) {
    if (text.includes("hola macro") || text.includes("macro")) {
      assistantAwake = true;

      const response = `Hola ${defaultUser.name}, soy Macro. ¿Qué oportunidad de negocio quieres buscar hoy?`;
      voiceStatus.textContent = "Activado";
      voiceText.textContent = response;
      speak(response);
      return;
    }

    voiceStatus.textContent = "Esperando comando";
    voiceText.textContent = "Primero di: Hola Macro";
    return;
  }

  let response = "Puedo ayudarte a buscar inversión, alianzas, compradores, abrir chat o abrir tu perfil.";

  if (text.includes("inversion") || text.includes("capital")) {
    response = `Listo ${defaultUser.name}, busquemos perfiles de inversión.`;
    showView("directoryView");
    directorySearch.value = "inversionista capital";
    directorySearch.dispatchEvent(new Event("input"));
  }

  if (text.includes("alianza") || text.includes("canje")) {
    response = `Perfecto ${defaultUser.name}, busquemos aliados estratégicos.`;
    showView("directoryView");
    directorySearch.value = "alianza convenio";
    directorySearch.dispatchEvent(new Event("input"));
  }

  if (text.includes("venta") || text.includes("comprador") || text.includes("cliente")) {
    response = `Entendido ${defaultUser.name}, busquemos compradores comerciales.`;
    showView("directoryView");
    directorySearch.value = "comprador venta cliente";
    directorySearch.dispatchEvent(new Event("input"));
  }

  if (text.includes("chat") || text.includes("mensaje")) {
    response = `Abriendo el chat temporal, ${defaultUser.name}.`;
    showView("chatView");
  }

  if (text.includes("perfil")) {
    response = `Abriendo tu perfil profesional, ${defaultUser.name}.`;
    showView("profileView");
  }

  if (text.includes("inicio")) {
    response = `Volviendo al inicio, ${defaultUser.name}.`;
    showView("homeView");
  }

  voiceStatus.textContent = "Respuesta";
  voiceText.textContent = response;
  speak(response);
}

function bindVoice() {
  openVoiceBtn.addEventListener("click", openVoice);
  closeVoiceBtn.addEventListener("click", closeVoice);
  startVoiceBtn.addEventListener("click", startVoice);

  voiceModal.addEventListener("click", event => {
    if (event.target === voiceModal) {
      closeVoice();
    }
  });

  if (window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = getBestVoice;
  }
}

function initApp() {
  bindNavigation();
  bindProfile();
  bindChat();
  bindDirectory();
  bindVoice();
  setupVoice();
  updateProfileUI();
  showView("homeView");
}

initApp();
