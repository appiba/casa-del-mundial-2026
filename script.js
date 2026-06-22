const views = document.querySelectorAll(".view");
const navTriggers = document.querySelectorAll("[data-go]");
const navButtons = document.querySelectorAll(".bottom-nav .nav-btn");

const chatMessages = document.getElementById("chatMessages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

const contactCards = document.querySelectorAll(".contact-card");
const chatName = document.getElementById("chatName");
const chatCompany = document.getElementById("chatCompany");

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

navTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const viewId = trigger.dataset.go;
    if (viewId) showView(viewId);
  });
});

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

sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

contactCards.forEach((card) => {
  card.addEventListener("click", () => {
    contactCards.forEach((item) => item.classList.remove("active-contact"));
    card.classList.add("active-contact");

    const chatKey = card.dataset.chat;
    loadChat(chatKey);
  });
});

function loadChat(chatKey) {
  const data = chatData[chatKey];

  if (!data) return;

  chatName.textContent = data.name;
  chatCompany.textContent = data.company;
  chatMessages.innerHTML = "";

  data.messages.forEach((message) => {
    chatMessages.appendChild(createMessage(message.text, message.type));
  });

  scrollChatBottom();
}

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

showView("feedView");
