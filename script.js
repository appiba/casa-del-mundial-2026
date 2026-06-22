const views = document.querySelectorAll(".view");
const navTriggers = document.querySelectorAll("[data-go]");
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

const chatData = {
  laguna: {
    name: "Laguna Mall",
    company: "Centro comercial · Alianzas",
    avatar: "LM",
    avatarRed: true,
    messages: [
      {
        type: "received",
        text: "Hola, estamos abiertos a revisar propuestas de activaciones comerciales."
      },
      {
        type: "sent",
        text: "Perfecto. Puedo enviar una propuesta de alianza con producción de contenido y difusión."
      },
      {
        type: "received",
        text: "Envíanos valores, beneficios y qué recibiría el centro comercial."
      }
    ]
  },
  capital: {
    name: "Andes Capital",
    company: "Fondo privado · Inversión",
    avatar: "AC",
    avatarRed: false,
    messages: [
      {
        type: "received",
        text: "Nos interesa conocer el modelo financiero del proyecto."
      },
      {
        type: "sent",
        text: "Tenemos proyección de ingresos, costos operativos y estrategia de recuperación."
      },
      {
        type: "received",
        text: "Perfecto. Envíanos ticket de inversión y retorno estimado."
      }
    ]
  },
  media: {
    name: "EFE-EME Media",
    company: "Medios y negocios · Comercial",
    avatar: "EM",
    avatarRed: false,
    messages: [
      {
        type: "received",
        text: "La radio comercial puede funcionar como canje estratégico."
      },
      {
        type: "sent",
        text: "Sí, podemos integrar circuito cerrado de radio, cuñas y programación personalizada."
      },
      {
        type: "received",
        text: "Armemos una propuesta formal para presentarla."
      }
    ]
  }
};

function showView(viewId) {
  views.forEach((view) => {
    view.classList.remove("active");
  });

  const targetView = document.getElementById(viewId);

  if (targetView) {
    targetView.classList.add("active");
  }

  navButtons.forEach((button) => {
    button.classList.remove("active");

    if (button.dataset.go === viewId) {
      button.classList.add("active");
    }
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  if (viewId === "messagesView") {
    setTimeout(scrollChatBottom, 100);
  }
}

function refreshNavigationEvents() {
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
  const message = text.toLowerCase();

  if (message.includes("inversión") || message.includes("inversion") || message.includes("capital")) {
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

  return "Entendido. Podemos analizar esta oportunidad y definir si conviene como inversión, venta o alianza estratégica.";
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

    const chatKey = card.dataset.chat;
    loadChat(chatKey);
  });
});

sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

directorySearch.addEventListener("input", () => {
  const query = directorySearch.value.toLowerCase().trim();

  directoryCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const text = card.querySelector("p").textContent.toLowerCase();
    const keywords = card.dataset.keywords.toLowerCase();

    const match =
      title.includes(query) ||
      text.includes(query) ||
      keywords.includes(query);

    card.style.display = match ? "flex" : "none";
  });
});

aiSearchBtn.addEventListener("click", () => {
  const prompt = aiPrompt.value.toLowerCase().trim();

  if (!prompt) {
    aiResult.textContent = "Escribe qué tipo de oportunidad buscas: inversionista, alianza, comprador, venta o proyecto.";
    return;
  }

  if (prompt.includes("inversionista") || prompt.includes("inversión") || prompt.includes("capital")) {
    aiResult.textContent =
      "Sugerencia IA: conecta con Andes Capital Group. Prepara monto requerido, retorno estimado, utilidad mensual y plan de salida para el inversionista.";
    return;
  }

  if (prompt.includes("alianza") || prompt.includes("canje") || prompt.includes("centro comercial")) {
    aiResult.textContent =
      "Sugerencia IA: conecta con Laguna Mall. Presenta beneficios concretos: tráfico, contenido, activación, difusión y valor comercial del canje.";
    return;
  }

  if (prompt.includes("venta") || prompt.includes("clientes") || prompt.includes("comercial")) {
    aiResult.textContent =
      "Sugerencia IA: busca perfiles de ventas, medios y negocios locales. Crea una oferta clara con precio, entregables y resultados esperados.";
    return;
  }

  if (prompt.includes("radio") || prompt.includes("publicidad") || prompt.includes("medios")) {
    aiResult.textContent =
      "Sugerencia IA: presenta la radio como canal corporativo. El mejor enfoque es vender circuito cerrado, cuñas, programación y presencia de marca.";
    return;
  }

  aiResult.textContent =
    "Sugerencia IA: esta oportunidad puede trabajarse como proyecto estratégico. Define objetivo, inversión necesaria, aliados ideales y beneficio para cada parte.";
});

refreshNavigationEvents();
loadChat("laguna");
showView("feedView");
/* =========================
   ASISTENTE DE VOZ INTERNO
========================= */

const openVoiceBtn = document.getElementById("openVoiceBtn");
const voiceAssistant = document.getElementById("voiceAssistant");
const voiceStartBtn = document.getElementById("voiceStartBtn");
const voiceCloseBtn = document.getElementById("voiceCloseBtn");
const voiceStatus = document.getElementById("voiceStatus");
const voiceText = document.getElementById("voiceText");
const voiceOrb = document.getElementById("voiceOrb");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = null;
let isListening = false;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.lang = "es-EC";
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    isListening = true;
    voiceOrb.classList.add("listening");
    voiceStatus.textContent = "Escuchando";
    voiceText.textContent = "Te escucho...";
    voiceStartBtn.textContent = "Escuchando";
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    voiceText.textContent = transcript;
    handleVoiceCommand(transcript);
  };

  recognition.onerror = () => {
    voiceStatus.textContent = "No pude escuchar bien";
    voiceText.textContent = "Intenta nuevamente hablando más claro.";
    stopVoiceAnimation();
  };

  recognition.onend = () => {
    stopVoiceAnimation();
  };
} else {
  voiceStatus.textContent = "No compatible";
  voiceText.textContent =
    "Este navegador no permite reconocimiento de voz. Prueba en Chrome o Safari actualizado.";
}

function openVoiceAssistant() {
  voiceAssistant.classList.add("active");
}

function closeVoiceAssistant() {
  voiceAssistant.classList.remove("active");

  if (recognition && isListening) {
    recognition.stop();
  }

  stopVoiceAnimation();
}

function startVoiceAssistant() {
  if (!recognition) {
    voiceStatus.textContent = "No compatible";
    voiceText.textContent =
      "Este navegador no soporta reconocimiento de voz en la web.";
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

function speak(text) {
  if (!window.speechSynthesis) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-EC";
  utterance.rate = 0.95;
  utterance.pitch = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function handleVoiceCommand(command) {
  const text = command.toLowerCase();

  let response = "";

  if (
    text.includes("inversionista") ||
    text.includes("inversión") ||
    text.includes("capital")
  ) {
    response =
      "Te muestro oportunidades de inversión y perfiles de capital privado.";
    showView("directoryView");
    directorySearch.value = "inversionista capital";
    directorySearch.dispatchEvent(new Event("input"));
  } else if (
    text.includes("alianza") ||
    text.includes("aliado") ||
    text.includes("canje")
  ) {
    response =
      "Te muestro posibles alianzas estratégicas y opciones de canje comercial.";
    showView("directoryView");
    directorySearch.value = "alianza centro comercial";
    directorySearch.dispatchEvent(new Event("input"));
  } else if (
    text.includes("venta") ||
    text.includes("vender") ||
    text.includes("clientes") ||
    text.includes("comprador")
  ) {
    response =
      "Te muestro opciones enfocadas en ventas, clientes y compradores.";
    showView("directoryView");
    directorySearch.value = "ventas clientes marketing";
    directorySearch.dispatchEvent(new Event("input"));
  } else if (
    text.includes("chat") ||
    text.includes("mensaje") ||
    text.includes("contactar")
  ) {
    response =
      "Abriendo el chat de negocios para contactar posibles aliados.";
    showView("messagesView");
  } else if (
    text.includes("perfil") ||
    text.includes("portafolio") ||
    text.includes("profesional")
  ) {
    response =
      "Abriendo el perfil profesional con portafolio y experiencia.";
    showView("profileView");
  } else if (
    text.includes("inicio") ||
    text.includes("feed") ||
    text.includes("networking")
  ) {
    response =
      "Volviendo al feed principal de networking empresarial.";
    showView("feedView");
  } else if (
    text.includes("radio") ||
    text.includes("publicidad") ||
    text.includes("medios")
  ) {
    response =
      "Te muestro oportunidades relacionadas con radio, publicidad y medios.";
    showView("directoryView");
    directorySearch.value = "radio publicidad medios";
    directorySearch.dispatchEvent(new Event("input"));
  } else {
    response =
      "Puedo ayudarte a buscar inversionistas, alianzas, ventas, compradores, radio, publicidad, chat o perfiles profesionales.";
  }

  voiceStatus.textContent = "Respuesta IA";
  voiceText.textContent = response;
  speak(response);

  setTimeout(() => {
    closeVoiceAssistant();
  }, 2600);
}

openVoiceBtn.addEventListener("click", openVoiceAssistant);
voiceStartBtn.addEventListener("click", startVoiceAssistant);
voiceCloseBtn.addEventListener("click", closeVoiceAssistant);

voiceAssistant.addEventListener("click", (event) => {
  if (event.target === voiceAssistant) {
    closeVoiceAssistant();
  }
});
