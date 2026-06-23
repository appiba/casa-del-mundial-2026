const userProfile = {
  name: "Edwin",
  assistantName: "Macro"
};

const views = document.querySelectorAll(".view");
const navButtons = document.querySelectorAll(".bottom-nav .nav-btn");

const chatMessages = document.getElementById("chatMessages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

const contactCards = document.querySelectorAll(".contact-card");
const chatName = document.getElementById("chatName");
const chatCompany = document.getElementById("chatCompany");
const chatAvatar = document.getElementById("chatAvatar");

const directorySearch = document.getElementById("directorySearch");
const directoryCards = document.querySelectorAll(".directory-card");

const aiPrompt = document.getElementById("aiPrompt");
const aiSearchBtn = document.getElementById("aiSearchBtn");
const aiResult = document.getElementById("aiResult");

const openVoiceBtn = document.getElementById("openVoiceBtn");
const voiceAssistant = document.getElementById("voiceAssistant");
const voiceStartBtn = document.getElementById("voiceStartBtn");
const voiceCloseBtn = document.getElementById("voiceCloseBtn");
const voiceStatus = document.getElementById("voiceStatus");
const voiceText = document.getElementById("voiceText");
const voiceOrb = document.getElementById("voiceOrb");

const chatData = {
  laguna: {
    name: "Laguna Mall",
    company: "Centro comercial · Alianzas",
    avatar: "LM",
    avatarRed: true,
    messages: [
      { type: "received", text: "Hola, estamos abiertos a revisar propuestas de activaciones comerciales." },
      { type: "sent", text: "Perfecto. Puedo enviar una propuesta de alianza con producción de contenido y difusión." },
      { type: "received", text: "Envíanos valores, beneficios y qué recibiría el centro comercial." }
    ]
  },
  capital: {
    name: "Andes Capital",
    company: "Fondo privado · Inversión",
    avatar: "AC",
    avatarRed: false,
    messages: [
      { type: "received", text: "Nos interesa conocer el modelo financiero del proyecto." },
      { type: "sent", text: "Tenemos proyección de ingresos, costos operativos y estrategia de recuperación." },
      { type: "received", text: "Perfecto. Envíanos ticket de inversión y retorno estimado." }
    ]
  },
  media: {
    name: "EFE-EME Media",
    company: "Medios y negocios · Comercial",
    avatar: "EM",
    avatarRed: false,
    messages: [
      { type: "received", text: "La radio comercial puede funcionar como canje estratégico." },
      { type: "sent", text: "Sí, podemos integrar circuito cerrado de radio, cuñas y programación personalizada." },
      { type: "received", text: "Armemos una propuesta formal para presentarla." }
    ]
  }
};

function showView(viewId) {
  views.forEach((view) => view.classList.remove("active"));

  const targetView = document.getElementById(viewId);
  if (targetView) targetView.classList.add("active");

  navButtons.forEach((button) => {
    button.classList.remove("active");
    if (button.dataset.go === viewId) button.classList.add("active");
  });

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (viewId === "messagesView") {
    setTimeout(scrollChatBottom, 100);
  }
}

function bindNavigation() {
  document.querySelectorAll("[data-go]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const viewId = trigger.dataset.go;
      if (viewId) showView(viewId);
    });
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

function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  chatMessages.appendChild(createMessage(text, "sent"));
  messageInput.value = "";
  scrollChatBottom();

  setTimeout(() => {
    const response = getBusinessReply(text);
    chatMessages.appendChild(createMessage(response, "received"));
    scrollChatBottom();
  }, 650);
}

function getBusinessReply(text) {
  const message = normalizeText(text);

  if (message.includes("inversion") || message.includes("capital")) {
    return "Podemos revisar el monto de inversión, retorno esperado, riesgos y proyección mensual.";
  }

  if (message.includes("alianza") || message.includes("canje")) {
    return "Una alianza puede estructurarse con beneficios claros: espacio, difusión, contenido y resultados medibles.";
  }

  if (message.includes("venta") || message.includes("clientes")) {
    return "Podemos ayudarte a conectar con compradores, clientes corporativos o canales comerciales.";
  }

  if (message.includes("propuesta")) {
    return "Envíanos una propuesta breve con objetivo, beneficios, costos y próximos pasos.";
  }

  return "Entendido. Podemos analizar esta oportunidad como inversión, venta o alianza estratégica.";
}

function scrollChatBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function loadChat(chatKey) {
  const data = chatData[chatKey];
  if (!data) return;

  chatName.textContent = data.name;
  chatCompany.textContent = data.company;
  chatAvatar.textContent = data.avatar;

  if (data.avatarRed) {
    chatAvatar.classList.add("avatar-red");
  } else {
    chatAvatar.classList.remove("avatar-red");
  }

  chatMessages.innerHTML = "";

  data.messages.forEach((message) => {
    chatMessages.appendChild(createMessage(message.text, message.type));
  });

  scrollChatBottom();
}

contactCards.forEach((card) => {
  card.addEventListener("click", () => {
    contactCards.forEach((item) => item.classList.remove("active-contact"));
    card.classList.add("active-contact");
    loadChat(card.dataset.chat);
  });
});

sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") sendMessage();
});

directorySearch.addEventListener("input", () => {
  const query = normalizeText(directorySearch.value.trim());

  directoryCards.forEach((card) => {
    const title = normalizeText(card.querySelector("h3").textContent);
    const text = normalizeText(card.querySelector("p").textContent);
    const keywords = normalizeText(card.dataset.keywords || "");

    const match = title.includes(query) || text.includes(query) || keywords.includes(query);
    card.style.display = match ? "flex" : "none";
  });
});

aiSearchBtn.addEventListener("click", () => {
  const prompt = normalizeText(aiPrompt.value.trim());

  if (!prompt) {
    aiResult.textContent = "Escribe qué tipo de oportunidad buscas: inversionista, alianza, comprador, venta o proyecto.";
    speak("Escribe qué tipo de oportunidad buscas.");
    return;
  }

  if (prompt.includes("inversionista") || prompt.includes("inversion") || prompt.includes("capital")) {
    const response = "Sugerencia IA: conecta con Andes Capital Group. Prepara monto requerido, retorno estimado, utilidad mensual y plan de salida para el inversionista.";
    aiResult.textContent = response;
    speak(response);
    return;
  }

  if (prompt.includes("alianza") || prompt.includes("canje") || prompt.includes("centro comercial")) {
    const response = "Sugerencia IA: conecta con Laguna Mall. Presenta beneficios concretos: tráfico, contenido, activación, difusión y valor comercial del canje.";
    aiResult.textContent = response;
    speak(response);
    return;
  }

  if (prompt.includes("venta") || prompt.includes("clientes") || prompt.includes("comercial")) {
    const response = "Sugerencia IA: busca perfiles de ventas, medios y negocios locales. Crea una oferta clara con precio, entregables y resultados esperados.";
    aiResult.textContent = response;
    speak(response);
    return;
  }

  const response = "Sugerencia IA: define objetivo, inversión necesaria, aliados ideales y beneficio para cada parte.";
  aiResult.textContent = response;
  speak(response);
});

/* VOZ */

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = null;
let isListening = false;
let assistantIsAwake = false;

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getBestVoice() {
  const voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];

  return (
    voices.find((voice) => voice.lang === "es-EC") ||
    voices.find((voice) => voice.lang === "es-ES") ||
    voices.find((voice) => voice.lang.startsWith("es")) ||
    voices[0] ||
    null
  );
}

function speak(text) {
  if (!window.speechSynthesis) {
    voiceStatus.textContent = "Voz no disponible";
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-EC";
  utterance.rate = 0.92;
  utterance.pitch = 1;
  utterance.volume = 1;

  const selectedVoice = getBestVoice();
  if (selectedVoice) utterance.voice = selectedVoice;

  utterance.onstart = () => {
    if (voiceStatus) voiceStatus.textContent = "Hablando";
  };

  utterance.onend = () => {
    if (voiceAssistant.classList.contains("active")) {
      voiceStatus.textContent = "Puedes hablar";
    }
  };

  window.speechSynthesis.speak(utterance);
}

function setupRecognition() {
  if (!SpeechRecognition) {
    voiceStatus.textContent = "Micrófono no compatible";
    voiceText.textContent = "Tu navegador no soporta reconocimiento de voz. Igual puedo hablar, pero no escuchar comandos.";
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "es-EC";
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    isListening = true;
    voiceOrb.classList.add("listening");
    voiceStatus.textContent = "Escuchando";
    voiceText.textContent = `Di: Hola ${userProfile.assistantName}`;
    voiceStartBtn.textContent = "Escuchando";
  };

  recognition.onresult = (event) => {
    const lastResult = event.results[event.results.length - 1];
    const transcript = lastResult[0].transcript.trim();

    voiceText.textContent = transcript;
    processVoiceInput(transcript);
  };

  recognition.onerror = () => {
    voiceStatus.textContent = "No pude escuchar bien";
    voiceText.textContent = "Intenta nuevamente hablando más claro.";
    stopVoiceAnimation();
  };

  recognition.onend = () => {
    stopVoiceAnimation();

    if (voiceAssistant.classList.contains("active")) {
      setTimeout(() => {
        try {
          recognition.start();
        } catch (error) {}
      }, 700);
    }
  };
}

function openVoiceAssistant() {
  voiceAssistant.classList.add("active");
  assistantIsAwake = false;

  voiceStatus.textContent = "Asistente listo";
  voiceText.textContent = `Di: Hola ${userProfile.assistantName}`;

  speak(`Hola ${userProfile.name}. Soy ${userProfile.assistantName}. Toca hablar y dime: Hola ${userProfile.assistantName}.`);
}

function closeVoiceAssistant() {
  voiceAssistant.classList.remove("active");
  assistantIsAwake = false;

  if (recognition && isListening) {
    recognition.stop();
  }

  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }

  stopVoiceAnimation();
}

function startVoiceAssistant() {
  if (!recognition) {
    voiceStatus.textContent = "Micrófono no compatible";
    voiceText.textContent = "No puedo escuchar en este navegador, pero sí puedo responder con voz si el audio está activo.";
    speak("No puedo escuchar en este navegador, pero sí puedo responder con voz si el audio está activo.");
    return;
  }

  try {
    recognition.start();
  } catch (error) {
    voiceStatus.textContent = "Ya estoy escuchando";
  }
}

function stopVoiceAnimation() {
  isListening = false;
  voiceOrb.classList.remove("listening");
  voiceStartBtn.textContent = "Hablar";
}

function processVoiceInput(command) {
  const text = normalizeText(command);
  const assistantName = normalizeText(userProfile.assistantName);

  const wakePhrases = [
    `hola ${assistantName}`,
    `oye ${assistantName}`,
    `hey ${assistantName}`,
    assistantName
  ];

  const saidWakePhrase = wakePhrases.some((phrase) => text.includes(phrase));

  if (saidWakePhrase && !assistantIsAwake) {
    assistantIsAwake = true;

    const response = `Hola ${userProfile.name}, soy ${userProfile.assistantName}. ¿Qué oportunidad de negocio quieres buscar hoy?`;

    voiceStatus.textContent = "Activado";
    voiceText.textContent = response;
    speak(response);
    return;
  }

  if (!assistantIsAwake) {
    voiceStatus.textContent = "Esperando comando";
    voiceText.textContent = `Primero di: Hola ${userProfile.assistantName}`;
    return;
  }

  handleVoiceCommand(text);
}

function handleVoiceCommand(text) {
  let response = "";

  if (text.includes("inversionista") || text.includes("inversion") || text.includes("capital")) {
    response = `Listo ${userProfile.name}, te muestro oportunidades de inversión y perfiles de capital privado.`;
    showView("directoryView");
    directorySearch.value = "inversionista capital";
    directorySearch.dispatchEvent(new Event("input"));
  } else if (text.includes("alianza") || text.includes("aliado") || text.includes("canje")) {
    response = `Perfecto ${userProfile.name}, te muestro posibles alianzas estratégicas y opciones de canje comercial.`;
    showView("directoryView");
    directorySearch.value = "alianza centro comercial";
    directorySearch.dispatchEvent(new Event("input"));
  } else if (text.includes("venta") || text.includes("vender") || text.includes("clientes") || text.includes("comprador")) {
    response = `Entendido ${userProfile.name}, te muestro opciones enfocadas en ventas, clientes y compradores.`;
    showView("directoryView");
    directorySearch.value = "ventas clientes marketing";
    directorySearch.dispatchEvent(new Event("input"));
  } else if (text.includes("chat") || text.includes("mensaje") || text.includes("contactar")) {
    response = `Abriendo el chat de negocios, ${userProfile.name}.`;
    showView("messagesView");
  } else if (text.includes("perfil") || text.includes("portafolio") || text.includes("profesional")) {
    response = `Abriendo tu perfil profesional, ${userProfile.name}.`;
    showView("profileView");
  } else if (text.includes("inicio") || text.includes("feed") || text.includes("networking")) {
    response = `Volviendo al feed principal de networking empresarial, ${userProfile.name}.`;
    showView("feedView");
  } else if (text.includes("radio") || text.includes("publicidad") || text.includes("medios")) {
    response = "Te muestro oportunidades relacionadas con radio, publicidad y medios.";
    showView("directoryView");
    directorySearch.value = "radio publicidad medios";
    directorySearch.dispatchEvent(new Event("input"));
  } else if (text.includes("ayuda") || text.includes("comandos") || text.includes("que puedes hacer")) {
    response = "Puedo buscar inversionistas, alianzas, ventas, compradores, radio, publicidad, abrir el chat, abrir el perfil o volver al inicio.";
  } else {
    response = `${userProfile.name}, puedo ayudarte a buscar inversionistas, alianzas, ventas, compradores, radio, publicidad, chat o perfiles profesionales.`;
  }

  voiceStatus.textContent = "Respuesta IA";
  voiceText.textContent = response;
  speak(response);
}

openVoiceBtn.addEventListener("click", openVoiceAssistant);
voiceStartBtn.addEventListener("click", startVoiceAssistant);
voiceCloseBtn.addEventListener("click", closeVoiceAssistant);

voiceAssistant.addEventListener("click", (event) => {
  if (event.target === voiceAssistant) closeVoiceAssistant();
});

if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    getBestVoice();
  };
}

bindNavigation();
setupRecognition();
loadChat("laguna");
showView("feedView");
/* =========================
   PERFIL LOCAL OBLIGATORIO
   FOTO ÚNICA + WHATSAPP + CORREO
========================= */

const PROFILE_STORAGE_KEY = "businessUserProfile";

const profileGateModal = document.getElementById("profileGateModal");
const profileGateClose = document.getElementById("profileGateClose");
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

function getLocalProfile() {
  const savedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);

  if (!savedProfile) return null;

  try {
    return JSON.parse(savedProfile);
  } catch (error) {
    return null;
  }
}

function saveLocalProfile(profile) {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
}

function hasLocalProfile() {
  const profile = getLocalProfile();

  return Boolean(
    profile &&
    profile.name &&
    profile.company &&
    profile.role &&
    profile.whatsapp &&
    profile.email
  );
}

function openProfileGate() {
  loadProfileIntoForm();
  profileGateModal.classList.add("active");
}

function closeProfileGate() {
  profileGateModal.classList.remove("active");
}

function requireProfile(callback) {
  if (!hasLocalProfile()) {
    openProfileGate();
    return false;
  }

  if (typeof callback === "function") {
    callback();
  }

  return true;
}

function normalizeWhatsappNumber(rawNumber) {
  let number = String(rawNumber || "").replace(/\D/g, "");

  if (number.startsWith("0")) {
    number = "593" + number.substring(1);
  }

  if (!number.startsWith("593")) {
    number = "593" + number;
  }

  return number;
}

function buildWhatsappLink(rawNumber) {
  const cleanNumber = normalizeWhatsappNumber(rawNumber);
  return `https://wa.me/${cleanNumber}`;
}

function loadProfileIntoForm() {
  const profile = getLocalProfile();

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

function updateVisibleProfileData() {
  const profile = getLocalProfile();

  if (!profile) return;

  const heroName = document.querySelector("#profileView .hero-profile-content h1");
  const heroRole = document.querySelector("#profileView .profile-role");
  const heroDescription = document.querySelector("#profileView .profile-description");
  const professionalImg = document.querySelector("#profileView .professional-img");

  if (heroName && profile.name) {
    const nameParts = profile.name.trim().split(" ");
    const firstName = nameParts[0] || profile.name;
    const lastName = nameParts.slice(1).join(" ") || profile.company;

    heroName.innerHTML = `${firstName}<br>${lastName}`;
  }

  if (heroRole && profile.role) {
    heroRole.textContent = profile.role;
  }

  if (heroDescription && profile.bio) {
    heroDescription.textContent = profile.bio;
  }

  if (professionalImg && profile.photo) {
    professionalImg.src = profile.photo;
  }

  document.querySelectorAll(".profile .avatar").forEach((avatar) => {
    if (avatar.id === "chatAvatar") return;

    if (profile.photo && avatar.textContent.trim() === "PF") {
      avatar.innerHTML = `<img src="${profile.photo}" alt="Perfil" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" />`;
    }
  });
}

if (profilePhotoInput) {
  profilePhotoInput.addEventListener("change", function () {
    const file = this.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Solo puedes subir imágenes.");
      return;
    }

    if (file.size > 1024 * 1024) {
      alert("La imagen no debe pesar más de 1 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
      const imageBase64 = event.target.result;

      photoPreview.innerHTML = `<img src="${imageBase64}" alt="Foto de perfil" />`;

      const currentProfile = getLocalProfile() || {};
      currentProfile.photo = imageBase64;
      saveLocalProfile(currentProfile);

      updateVisibleProfileData();
    };

    reader.readAsDataURL(file);
  });
}

if (profileForm) {
  profileForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const currentProfile = getLocalProfile() || {};

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
      createdAt: currentProfile.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    saveLocalProfile(profile);
    updateVisibleProfileData();
    closeProfileGate();

    if (typeof speak === "function") {
      speak(`Perfil guardado. Bienvenido ${profile.name}.`);
    }

    alert("Perfil guardado correctamente.");
  });
}

if (profileGateClose) {
  profileGateClose.addEventListener("click", closeProfileGate);
}

if (profileGateModal) {
  profileGateModal.addEventListener("click", function (event) {
    if (event.target === profileGateModal) {
      closeProfileGate();
    }
  });
}

/* =========================
   BLOQUEAR ACCIONES SIN PERFIL
========================= */

function protectAppActions() {
  const protectedSelectors = [
    ".accent-action",
    ".post-actions button",
    ".directory-card button",
    "#sendBtn",
    "#aiSearchBtn",
    "#voiceStartBtn"
  ];

  protectedSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((button) => {
      button.addEventListener(
        "click",
        function (event) {
          if (!hasLocalProfile()) {
            event.preventDefault();
            event.stopImmediatePropagation();
            openProfileGate();
          }
        },
        true
      );
    });
  });
}

/* =========================
   BOTONES RÁPIDOS EN CHAT
========================= */

function injectQuickContactActions() {
  const chatPanel = document.querySelector(".chat-panel");
  const chatArea = document.getElementById("chatMessages");

  if (!chatPanel || !chatArea) return;

  if (document.querySelector(".quick-contact-actions")) return;

  const quickActions = document.createElement("div");
  quickActions.className = "quick-contact-actions";

  quickActions.innerHTML = `
    <button type="button" id="sendWhatsappBtn">
      <span class="material-symbols-rounded">call</span>
      WhatsApp
    </button>

    <button type="button" id="sendEmailBtn">
      <span class="material-symbols-rounded">mail</span>
      Correo
    </button>

    <button type="button" id="sendProfileBtn">
      <span class="material-symbols-rounded">badge</span>
      Perfil
    </button>
  `;

  const notice = document.createElement("div");
  notice.className = "chat-temp-notice";
  notice.textContent =
    "Chat temporal de negocios. Comparte tu WhatsApp o correo para continuar la negociación fuera de la plataforma.";

  chatPanel.insertBefore(notice, chatArea);
  chatPanel.insertBefore(quickActions, chatArea);

  document.getElementById("sendWhatsappBtn").addEventListener("click", sendMyWhatsapp);
  document.getElementById("sendEmailBtn").addEventListener("click", sendMyEmail);
  document.getElementById("sendProfileBtn").addEventListener("click", sendMyProfile);
}

function sendQuickChatMessage(message) {
  if (!chatMessages) return;

  chatMessages.appendChild(createMessage(message, "sent"));
  scrollChatBottom();

  setTimeout(() => {
    chatMessages.appendChild(
      createMessage(
        "Perfecto, con ese contacto podemos continuar la negociación directamente.",
        "received"
      )
    );

    scrollChatBottom();
  }, 650);
}

function sendMyWhatsapp() {
  requireProfile(() => {
    const profile = getLocalProfile();

    const message =
      `Hola, te comparto mi WhatsApp para continuar la conversación:\n${profile.whatsappLink}`;

    sendQuickChatMessage(message);
  });
}

function sendMyEmail() {
  requireProfile(() => {
    const profile = getLocalProfile();

    const message =
      `Te comparto mi correo para avanzar con la propuesta:\n${profile.email}`;

    sendQuickChatMessage(message);
  });
}

function sendMyProfile() {
  requireProfile(() => {
    const profile = getLocalProfile();

    const profileText =
      `Te comparto mi perfil profesional:\n` +
      `${profile.name}\n` +
      `${profile.company}\n` +
      `${profile.role}\n` +
      `${profile.city}\n` +
      `${profile.bio}`;

    sendQuickChatMessage(profileText);
  });
}

/* =========================
   INICIALIZAR PERFIL
========================= */

protectAppActions();
injectQuickContactActions();
updateVisibleProfileData();
