const API_URL = "https://script.google.com/macros/s/AKfycbzcYlKEkiupB773DCWDzTV_dXyZBzRFnRwTs5UNW7AoHkr68HK-U0WnjR5WSDsHhmq0Kw/exec";

const SESSION_KEY = "bain_current_session";
const LOCAL_PHOTO_KEY = "bain_local_profile_photo";
const LOCAL_GROUPS_KEY = "bain_profile_groups";

let currentConnectionTarget = "";
let profilePhotoBase64 = "";
let currentUserNameForVoice = "Usuario";
let currentUser = null;
let profileGroups = [];

const views = document.querySelectorAll(".view");
const navButtons = document.querySelectorAll(".nav-btn");

const authModal = document.getElementById("authModal");
const closeAuthModal = document.getElementById("closeAuthModal");
const authTabs = document.querySelectorAll(".auth-tab");
const authForms = document.querySelectorAll(".auth-form");
const authTitle = document.getElementById("authTitle");
const authSubtitle = document.getElementById("authSubtitle");

const loginForm = document.getElementById("loginForm");
const loginUsernameInput = document.getElementById("loginUsernameInput");
const loginPasswordInput = document.getElementById("loginPasswordInput");

const registerForm = document.getElementById("registerForm");
const profilePhotoInput = document.getElementById("profilePhotoInput");
const photoPreview = document.getElementById("photoPreview");
const registerNameInput = document.getElementById("registerNameInput");
const registerCompanyInput = document.getElementById("registerCompanyInput");
const registerRoleInput = document.getElementById("registerRoleInput");
const registerTypeInput = document.getElementById("registerTypeInput");
const registerCityInput = document.getElementById("registerCityInput");
const registerWhatsappInput = document.getElementById("registerWhatsappInput");
const registerEmailInput = document.getElementById("registerEmailInput");
const registerUsernameInput = document.getElementById("registerUsernameInput");
const registerPasswordInput = document.getElementById("registerPasswordInput");
const registerBioInput = document.getElementById("registerBioInput");

const activateForm = document.getElementById("activateForm");
const activateUsernameInput = document.getElementById("activateUsernameInput");
const activatePasswordInput = document.getElementById("activatePasswordInput");
const activationCodeInput = document.getElementById("activationCodeInput");

const forgotForm = document.getElementById("forgotForm");
const forgotIdentifierInput = document.getElementById("forgotIdentifierInput");
const generateResetBtn = document.getElementById("generateResetBtn");
const resetCodeInput = document.getElementById("resetCodeInput");
const newPasswordInput = document.getElementById("newPasswordInput");

const profilePhotoDisplay = document.getElementById("profilePhotoDisplay");
const profileNameDisplay = document.getElementById("profileNameDisplay");
const profileRoleDisplay = document.getElementById("profileRoleDisplay");
const profileCompanyDisplay = document.getElementById("profileCompanyDisplay");
const profileCityDisplay = document.getElementById("profileCityDisplay");
const profileTypeDisplay = document.getElementById("profileTypeDisplay");
const profileBioDisplay = document.getElementById("profileBioDisplay");
const profileStatusCard = document.getElementById("profileStatusCard");
const openProfileModalBtn = document.getElementById("openProfileModalBtn");
const editProfileBtn = document.getElementById("editProfileBtn");

const openLoginBtn = document.getElementById("openLoginBtn");
const openRegisterBtn = document.getElementById("openRegisterBtn");

const directorySearch = document.getElementById("directorySearch");
const directoryCards = document.querySelectorAll(".directory-card");
const aiPrompt = document.getElementById("aiPrompt");
const aiAnalyzeBtn = document.getElementById("aiAnalyzeBtn");
const aiResult = document.getElementById("aiResult");

const connectionModal = document.getElementById("connectionModal");
const closeConnectionModal = document.getElementById("closeConnectionModal");
const connectionForm = document.getElementById("connectionForm");
const connectionTargetText = document.getElementById("connectionTargetText");
const connectionReasonInput = document.getElementById("connectionReasonInput");
const connectionMessageInput = document.getElementById("connectionMessageInput");

const chatMessages = document.getElementById("chatMessages");
const messageInput = document.getElementById("messageInput");
const sendMessageBtn = document.getElementById("sendMessageBtn");
const sendWhatsappBtn = document.getElementById("sendWhatsappBtn");
const sendEmailBtn = document.getElementById("sendEmailBtn");
const sendProfileBtn = document.getElementById("sendProfileBtn");
const chatTimerText = document.getElementById("chatTimerText");

const openNotificationsBtn = document.getElementById("openNotificationsBtn");
const notificationDot = document.getElementById("notificationDot");
const notificationList = document.getElementById("notificationList");

const adminLogoutBtn = document.getElementById("adminLogoutBtn");
const adminUsersCount = document.getElementById("adminUsersCount");
const adminPendingCount = document.getElementById("adminPendingCount");
const adminNotificationsCount = document.getElementById("adminNotificationsCount");
const adminTabs = document.querySelectorAll(".admin-tab");
const adminPanels = document.querySelectorAll(".admin-panel");
const adminUsersList = document.getElementById("adminUsersList");
const adminCodesList = document.getElementById("adminCodesList");
const adminConfigForm = document.getElementById("adminConfigForm");
const adminEmailInput = document.getElementById("adminEmailInput");
const adminWhatsappInput = document.getElementById("adminWhatsappInput");
const adminChatHoursInput = document.getElementById("adminChatHoursInput");

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

async function apiRequest(action, data = {}) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify({
      action,
      data
    })
  });

  const result = await response.json();

  if (!result.ok) {
    throw new Error(result.error || "Error de conexión con el servidor.");
  }

  return result.data;
}

function saveSession(user, role) {
  currentUser = {
    ...user,
    role
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));

  if (currentUser.name) {
    currentUserNameForVoice = currentUser.name.split(" ")[0] || "Usuario";
  }

  updateProfileUI();
  updateNotificationDot();
}

function loadSession() {
  try {
    currentUser = JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    currentUser = null;
  }

  if (currentUser && currentUser.name) {
    currentUserNameForVoice = currentUser.name.split(" ")[0] || "Usuario";
  }
}

function clearSession() {
  currentUser = null;
  localStorage.removeItem(SESSION_KEY);
  updateProfileUI();
  updateNotificationDot();
}

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
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

  if (viewId === "adminView") {
    renderAdmin();
  }

  if (viewId === "notificationsView") {
    renderNotifications();
  }
}

function openAuth(tab = "login") {
  authModal.classList.add("active");
  setAuthTab(tab);
}

function closeAuth() {
  authModal.classList.remove("active");
}

function setAuthTab(tabName) {
  authTabs.forEach(tab => {
    tab.classList.toggle("active", tab.dataset.authTab === tabName);
  });

  authForms.forEach(form => {
    form.classList.remove("active");
  });

  const targetForm = document.getElementById(`${tabName}Form`);
  if (targetForm) targetForm.classList.add("active");

  const titles = {
    login: [
      "Iniciar sesión",
      "Entra con tu usuario y clave. Si eres administrador, se abrirá tu panel privado."
    ],
    register: [
      "Crear perfil",
      "Tu perfil será enviado a revisión del administrador general."
    ],
    activate: [
      "Activar cuenta",
      "Pega el código entregado por el administrador para habilitar tu cuenta."
    ],
    forgot: [
      "Recuperar clave",
      "Solicita un código temporal para cambiar tu clave."
    ]
  };

  if (authTitle && titles[tabName]) {
    authTitle.textContent = titles[tabName][0];
  }

  if (authSubtitle && titles[tabName]) {
    authSubtitle.textContent = titles[tabName][1];
  }
}

function requireActiveUser(callback) {
  if (!currentUser) {
    openAuth("login");
    return false;
  }

  if (currentUser.role === "admin") {
    if (typeof callback === "function") callback();
    return true;
  }

  if (currentUser.status !== "active") {
    if (currentUser.status === "approved_code_sent") {
      openAuth("activate");
    } else {
      openAuth("login");
    }

    alert("Tu cuenta todavía no está activa. Debe ser aprobada y activada con código.");
    return false;
  }

  if (typeof callback === "function") callback();
  return true;
}

function bindNavigation() {
  document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", event => {
      const viewId = button.dataset.go;

      if (button.classList.contains("protected-action")) {
        event.preventDefault();
        requireActiveUser(() => showView(viewId));
        return;
      }

      showView(viewId);
    });
  });
}

async function loadProfileGroups() {
  try {
    const result = await apiRequest("getProfileGroups", {});
    profileGroups = result.groups || [];

    localStorage.setItem(LOCAL_GROUPS_KEY, JSON.stringify(profileGroups));
    renderGroupSelect();
  } catch {
    try {
      profileGroups = JSON.parse(localStorage.getItem(LOCAL_GROUPS_KEY)) || [];
    } catch {
      profileGroups = [];
    }

    if (!profileGroups.length) {
      profileGroups = [
        { group_key: "inversionista", group_name: "Inversionista" },
        { group_key: "emprendedor", group_name: "Emprendedor" },
        { group_key: "eventos", group_name: "Eventos" },
        { group_key: "proveedor", group_name: "Proveedor" },
        { group_key: "comprador", group_name: "Comprador" },
        { group_key: "aliado_comercial", group_name: "Aliado comercial" },
        { group_key: "servicios_profesionales", group_name: "Servicios profesionales" },
        { group_key: "tecnologia", group_name: "Tecnología" },
        { group_key: "turismo", group_name: "Turismo" },
        { group_key: "gastronomia", group_name: "Gastronomía" },
        { group_key: "medios_agencia", group_name: "Medios / Agencia" }
      ];
    }

    renderGroupSelect();
  }
}

function renderGroupSelect() {
  if (!registerTypeInput) return;

  registerTypeInput.innerHTML = `
    <option value="">Selecciona tu grupo</option>
    ${profileGroups.map(group => `
      <option value="${group.group_key}">${group.group_name}</option>
    `).join("")}
  `;
}

function getTypeLabel(type) {
  const group = profileGroups.find(item => item.group_key === type);

  if (group) {
    return `Grupo: ${group.group_name}`;
  }

  const labels = {
    inversionista: "Grupo: Inversionista",
    emprendedor: "Grupo: Emprendedor",
    eventos: "Grupo: Eventos",
    proveedor: "Grupo: Proveedor",
    comprador: "Grupo: Comprador",
    aliado_comercial: "Grupo: Aliado comercial",
    servicios_profesionales: "Grupo: Servicios profesionales",
    tecnologia: "Grupo: Tecnología",
    turismo: "Grupo: Turismo",
    gastronomia: "Grupo: Gastronomía",
    medios_agencia: "Grupo: Medios / Agencia",
    user: "Grupo: Usuario"
  };

  return labels[type] || "Grupo profesional";
}

function bindAuth() {
  authTabs.forEach(tab => {
    tab.addEventListener("click", () => setAuthTab(tab.dataset.authTab));
  });

  closeAuthModal.addEventListener("click", closeAuth);

  authModal.addEventListener("click", event => {
    if (event.target === authModal) closeAuth();
  });

  loginForm.addEventListener("submit", async event => {
    event.preventDefault();

    const username = loginUsernameInput.value.trim();
    const password = loginPasswordInput.value.trim();

    if (!username || !password) {
      alert("Ingresa usuario y clave.");
      return;
    }

    try {
      const result = await apiRequest("login", {
        username,
        password
      });

      saveSession(result.user, result.role);
      closeAuth();

      if (result.role === "admin") {
        showView("adminView");
        return;
      }

      if (result.user.status === "active") {
        showView("homeView");
        alert("Sesión iniciada correctamente.");
        return;
      }

      if (result.user.status === "approved_code_sent") {
        setAuthTab("activate");
        authModal.classList.add("active");
        alert("Tu perfil ya fue aprobado. Activa tu cuenta con el código.");
        return;
      }

      showView("profileView");
      alert("Tu perfil está pendiente de revisión del administrador.");
    } catch (error) {
      alert(error.message);
    }
  });

  registerForm.addEventListener("submit", async event => {
    event.preventDefault();

    const payload = {
      name: registerNameInput.value.trim(),
      company: registerCompanyInput.value.trim(),
      role: registerRoleInput.value.trim(),
      type: registerTypeInput.value.trim(),
      city: registerCityInput.value.trim(),
      whatsapp: registerWhatsappInput.value.trim(),
      email: registerEmailInput.value.trim(),
      username: registerUsernameInput.value.trim(),
      password: registerPasswordInput.value.trim(),
      bio: registerBioInput.value.trim(),
      photo_url: profilePhotoBase64 || localStorage.getItem(LOCAL_PHOTO_KEY) || ""
    };

    if (
      !payload.name ||
      !payload.company ||
      !payload.role ||
      !payload.type ||
      !payload.city ||
      !payload.whatsapp ||
      !payload.email ||
      !payload.username ||
      !payload.password ||
      !payload.bio
    ) {
      alert("Completa todos los campos.");
      return;
    }

    try {
      const result = await apiRequest("registerUser", payload);

      saveSession(result.user, "user");
      closeAuth();
      updateProfileUI();
      showView("profileView");

      registerForm.reset();
      photoPreview.innerHTML = `<span class="material-symbols-rounded">add_a_photo</span>`;

      alert("Perfil enviado a revisión del administrador.");
    } catch (error) {
      alert(error.message);
    }
  });

  activateForm.addEventListener("submit", async event => {
    event.preventDefault();

    const username = activateUsernameInput.value.trim();
    const password = activatePasswordInput.value.trim();
    const activationCode = activationCodeInput.value.trim().toUpperCase();

    if (!username || !password || !activationCode) {
      alert("Completa usuario, clave y código.");
      return;
    }

    try {
      const result = await apiRequest("activateUser", {
        username,
        password,
        activation_code: activationCode
      });

      saveSession(result.user, "user");
      closeAuth();
      updateProfileUI();
      showView("homeView");

      alert("Cuenta activada correctamente.");
    } catch (error) {
      alert(error.message);
    }
  });

  generateResetBtn.addEventListener("click", async () => {
    const identifier = forgotIdentifierInput.value.trim();

    if (!identifier) {
      alert("Ingresa tu usuario o WhatsApp.");
      return;
    }

    try {
      const result = await apiRequest("requestPasswordReset", {
        identifier
      });

      alert(result.message || "Código generado. El administrador podrá enviarlo por WhatsApp.");
    } catch (error) {
      alert(error.message);
    }
  });

  forgotForm.addEventListener("submit", async event => {
    event.preventDefault();

    const identifier = forgotIdentifierInput.value.trim();
    const resetCode = resetCodeInput.value.trim().toUpperCase();
    const newPassword = newPasswordInput.value.trim();

    if (!identifier || !resetCode || !newPassword) {
      alert("Completa usuario, código y nueva clave.");
      return;
    }

    try {
      await apiRequest("resetPassword", {
        identifier,
        reset_code: resetCode,
        new_password: newPassword
      });

      alert("Clave actualizada correctamente.");
      setAuthTab("login");
    } catch (error) {
      alert(error.message);
    }
  });

  profilePhotoInput.addEventListener("change", async event => {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Solo puedes subir imágenes.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("La foto no debe pesar más de 2 MB.");
      return;
    }

    try {
      const resized = await resizeImageToBase64(file, 420, 0.72);
      profilePhotoBase64 = resized;
      localStorage.setItem(LOCAL_PHOTO_KEY, resized);
      photoPreview.innerHTML = `<img src="${resized}" alt="Foto de perfil" />`;
      alert("Foto cargada correctamente.");
    } catch {
      alert("No se pudo procesar la imagen.");
    }
  });
}

function resizeImageToBase64(file, maxSize = 420, quality = 0.72) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = event => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");

        let width = img.width;
        let height = img.height;

        if (width > height && width > maxSize) {
          height = Math.round((height * maxSize) / width);
          width = maxSize;
        } else if (height > maxSize) {
          width = Math.round((width * maxSize) / height);
          height = maxSize;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        resolve(canvas.toDataURL("image/jpeg", quality));
      };

      img.onerror = reject;
      img.src = event.target.result;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function updateProfileUI() {
  const user = currentUser;

  if (!user || user.role === "admin") {
    profileNameDisplay.textContent = "Crea tu perfil";
    profileRoleDisplay.textContent = "Perfil profesional de negocios";
    profileCompanyDisplay.textContent = "Empresa / Marca";
    profileCityDisplay.textContent = "Ciudad / País";
    if (profileTypeDisplay) profileTypeDisplay.textContent = "Grupo profesional";
    profileBioDisplay.textContent = "Crea tu perfil para conectar con inversionistas, aliados y compradores.";
    profileStatusCard.textContent = "Estado: Sin perfil";
    profileStatusCard.className = "profile-status-card";

    profilePhotoDisplay.innerHTML = `<span class="material-symbols-rounded">person</span>`;
    return;
  }

  currentUserNameForVoice = user.name.split(" ")[0] || "Usuario";

  profileNameDisplay.textContent = user.name || "Sin nombre";
  profileRoleDisplay.textContent = user.role || "Perfil profesional";
  profileCompanyDisplay.textContent = user.company || "Empresa / Marca";
  profileCityDisplay.textContent = user.city || "Ciudad / País";
  if (profileTypeDisplay) profileTypeDisplay.textContent = getTypeLabel(user.type);
  profileBioDisplay.textContent = user.bio || "Sin descripción.";

  const photo = user.photo_url || localStorage.getItem(LOCAL_PHOTO_KEY);

  if (photo) {
    profilePhotoDisplay.innerHTML = `<img src="${photo}" alt="Foto de perfil" />`;
  } else {
    profilePhotoDisplay.innerHTML = `<span class="material-symbols-rounded">person</span>`;
  }

  const statusLabels = {
    pending_review: "Pendiente de aprobación",
    approved_code_sent: "Aprobado · Falta activar",
    active: "Cuenta activa",
    suspended: "Suspendido",
    rejected: "Rechazado",
    deleted: "Eliminado"
  };

  profileStatusCard.textContent = `Estado: ${statusLabels[user.status] || user.status || "Sin estado"}`;
  profileStatusCard.className = "profile-status-card";

  if (user.status === "active") {
    profileStatusCard.classList.add("active");
  }

  if (user.status === "pending_review" || user.status === "approved_code_sent") {
    profileStatusCard.classList.add("pending");
  }
}

function bindProfileButtons() {
  openProfileModalBtn.addEventListener("click", () => openAuth("register"));
  editProfileBtn.addEventListener("click", () => openAuth("register"));

  if (openLoginBtn) {
    openLoginBtn.addEventListener("click", () => openAuth("login"));
  }

  if (openRegisterBtn) {
    openRegisterBtn.addEventListener("click", () => openAuth("register"));
  }
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
    requireActiveUser(() => {
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

      if (prompt.includes("evento") || prompt.includes("activacion") || prompt.includes("produccion")) {
        response = "Macro recomienda buscar el grupo de eventos. Presenta fechas, público objetivo, presupuesto y propuesta de valor.";
      }

      if (prompt.includes("venta") || prompt.includes("cliente") || prompt.includes("comprador")) {
        response = "Macro recomienda buscar compradores comerciales. Presenta tu oferta, precio, entregables y forma de contacto.";
      }

      aiResult.textContent = response;
      speak(response);
    });
  });

  document.querySelectorAll(".request-connection-btn").forEach(button => {
    button.addEventListener("click", () => {
      requireActiveUser(() => {
        currentConnectionTarget = button.dataset.target || "Contacto de negocio";
        connectionTargetText.textContent = `Solicitud para conectar con: ${currentConnectionTarget}`;
        connectionModal.classList.add("active");
      });
    });
  });
}

function bindConnection() {
  closeConnectionModal.addEventListener("click", () => {
    connectionModal.classList.remove("active");
  });

  connectionModal.addEventListener("click", event => {
    if (event.target === connectionModal) {
      connectionModal.classList.remove("active");
    }
  });

  connectionForm.addEventListener("submit", async event => {
    event.preventDefault();

    if (!currentUser || currentUser.status !== "active") {
      openAuth("login");
      return;
    }

    const reason = connectionReasonInput.value;
    const message = connectionMessageInput.value.trim();

    if (!reason || !message) {
      alert("Completa el motivo y el mensaje.");
      return;
    }

    try {
      await apiRequest("createConnectionRequest", {
        from_user_id: currentUser.user_id,
        to_user_id: "",
        to_user_name: currentConnectionTarget,
        reason,
        message
      });

      connectionModal.classList.remove("active");
      connectionForm.reset();

      alert("Solicitud enviada correctamente.");
    } catch (error) {
      alert(error.message);
    }
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
          "Perfecto. Con esa información pueden continuar la negociación directamente.",
          "received"
        )
      );

      scrollChatBottom();
    }, 650);
  }
}

function bindChat() {
  sendMessageBtn.addEventListener("click", () => {
    requireActiveUser(() => {
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
    requireActiveUser(() => {
      sendChatMessage(
        `Hola, te comparto mi WhatsApp para continuar la conversación:\n${currentUser.whatsapp_link || buildWhatsappLink(currentUser.whatsapp)}`
      );
    });
  });

  sendEmailBtn.addEventListener("click", () => {
    requireActiveUser(() => {
      sendChatMessage(
        `Te comparto mi correo para avanzar con la propuesta:\n${currentUser.email}`
      );
    });
  });

  sendProfileBtn.addEventListener("click", () => {
    requireActiveUser(() => {
      sendChatMessage(
        `Te comparto mi perfil profesional:\n${currentUser.name}\n${currentUser.company}\n${currentUser.role}\n${getTypeLabel(currentUser.type)}\n${currentUser.city}\n${currentUser.bio}`
      );
    });
  });
}

async function updateNotificationDot() {
  if (!currentUser) {
    notificationDot.classList.remove("active");
    return;
  }

  try {
    const result = await apiRequest("getNotifications", {
      user_id: currentUser.user_id || "",
      target_role: currentUser.role === "admin" ? "admin" : "user"
    });

    const unread = result.notifications.filter(item => item.status === "unread");
    notificationDot.classList.toggle("active", unread.length > 0);
  } catch {
    notificationDot.classList.remove("active");
  }
}

async function renderNotifications() {
  if (!currentUser) {
    notificationList.innerHTML = `
      <article class="notification-card">
        <h3>Sin sesión</h3>
        <p>Inicia sesión para ver tus notificaciones.</p>
      </article>
    `;
    return;
  }

  notificationList.innerHTML = `
    <article class="notification-card">
      <h3>Cargando...</h3>
      <p>Estamos revisando tus notificaciones.</p>
    </article>
  `;

  try {
    const result = await apiRequest("getNotifications", {
      user_id: currentUser.user_id || "",
      target_role: currentUser.role === "admin" ? "admin" : "user"
    });

    const notifications = result.notifications || [];

    if (!notifications.length) {
      notificationList.innerHTML = `
        <article class="notification-card">
          <h3>Sin notificaciones</h3>
          <p>Aquí aparecerán aprobaciones, códigos, conexiones, chats y alertas del sistema.</p>
        </article>
      `;
      return;
    }

    notificationList.innerHTML = notifications.map(n => `
      <article class="notification-card ${n.status === "unread" ? "unread" : ""}">
        <h3>${n.title}</h3>
        <p>${n.message}</p>
        <div class="notification-actions">
          <button onclick="markNotificationRead('${n.notification_id}')">Marcar leído</button>
        </div>
      </article>
    `).join("");
  } catch (error) {
    notificationList.innerHTML = `
      <article class="notification-card">
        <h3>Error</h3>
        <p>${error.message}</p>
      </article>
    `;
  }
}

async function markNotificationRead(notificationId) {
  try {
    await apiRequest("markNotificationRead", {
      notification_id: notificationId
    });

    renderNotifications();
    updateNotificationDot();
  } catch (error) {
    alert(error.message);
  }
}

async function renderAdmin() {
  if (!currentUser || currentUser.role !== "admin") {
    showView("homeView");
    return;
  }

  adminUsersList.innerHTML = `
    <article class="admin-item">
      <h3>Cargando usuarios...</h3>
      <p>Consultando Google Sheets.</p>
    </article>
  `;

  adminCodesList.innerHTML = `
    <article class="admin-item">
      <h3>Cargando códigos...</h3>
      <p>Consultando Google Sheets.</p>
    </article>
  `;

  try {
    const result = await apiRequest("getAdminDashboard", {
      admin_id: currentUser.user_id
    });

    const users = result.users || [];
    const activationCodes = result.activationCodes || [];
    const resetCodes = result.resetCodes || [];
    const notifications = result.notifications || [];
    const config = result.config || {};

    if (result.groups && result.groups.length) {
      profileGroups = result.groups;
      localStorage.setItem(LOCAL_GROUPS_KEY, JSON.stringify(profileGroups));
      renderGroupSelect();
    }

    adminUsersCount.textContent = users.length;
    adminPendingCount.textContent = users.filter(u => u.status === "pending_review").length;
    adminNotificationsCount.textContent = notifications.filter(n => n.status === "unread").length;

    adminUsersList.innerHTML = users.length ? users.map(user => `
      <article class="admin-item">
        <h3>${user.name}</h3>
        <p>
          ${user.company}<br>
          ${user.role}<br>
          ${getTypeLabel(user.type)}<br>
          ${user.city}<br>
          WhatsApp: ${user.whatsapp}<br>
          Correo: ${user.email}<br>
          Usuario: ${user.username}<br>
          Estado: ${user.status}
        </p>
        <div class="admin-actions">
          <button onclick="approveUser('${user.user_id}')">Aprobar</button>
          <button onclick="suspendUser('${user.user_id}')">Suspender</button>
          <button onclick="rejectUser('${user.user_id}')">Rechazar</button>
        </div>
      </article>
    `).join("") : `
      <article class="admin-item">
        <h3>Sin usuarios</h3>
        <p>Aquí aparecerán los perfiles enviados a revisión.</p>
      </article>
    `;

    const allCodes = [
      ...activationCodes.map(c => ({
        code: c.activation_code,
        type: "activation",
        status: c.status,
        username: c.username,
        phone: c.phone,
        expires_at: c.expires_at
      })),
      ...resetCodes.map(c => ({
        code: c.reset_code,
        type: "password_reset",
        status: c.status,
        username: c.username,
        phone: c.phone,
        expires_at: c.expires_at
      }))
    ];

    adminCodesList.innerHTML = allCodes.length ? allCodes.map(item => {
      const wa = item.phone
        ? `https://wa.me/${normalizeWhatsapp(item.phone)}?text=${encodeURIComponent("Tu código en Business AI Network es: " + item.code)}`
        : "#";

      return `
        <article class="admin-item">
          <h3>${item.code}</h3>
          <p>
            Tipo: ${item.type}<br>
            Usuario: ${item.username || ""}<br>
            Estado: ${item.status}<br>
            Expira: ${item.expires_at ? new Date(item.expires_at).toLocaleString() : ""}
          </p>
          <div class="admin-actions">
            <button onclick="copyText('${item.code}')">Copiar código</button>
            <button onclick="window.open('${wa}', '_blank')">WhatsApp</button>
          </div>
        </article>
      `;
    }).join("") : `
      <article class="admin-item">
        <h3>Sin códigos</h3>
        <p>Aquí aparecerán códigos de activación y recuperación.</p>
      </article>
    `;

    adminEmailInput.value = config.admin_contact_email || "";
    adminWhatsappInput.value = config.admin_contact_phone || "";
    adminChatHoursInput.value = config.default_chat_hours || 8;
  } catch (error) {
    adminUsersList.innerHTML = `
      <article class="admin-item">
        <h3>Error</h3>
        <p>${error.message}</p>
      </article>
    `;
  }
}

async function approveUser(userId) {
  if (!currentUser || currentUser.role !== "admin") return;

  try {
    const result = await apiRequest("approveUser", {
      user_id: userId,
      admin_id: currentUser.user_id
    });

    alert(`Usuario aprobado. Código: ${result.activation_code}`);

    if (result.whatsapp_url) {
      window.open(result.whatsapp_url, "_blank");
    }

    renderAdmin();
  } catch (error) {
    alert(error.message);
  }
}

async function suspendUser(userId) {
  if (!currentUser || currentUser.role !== "admin") return;

  try {
    await apiRequest("suspendUser", {
      user_id: userId,
      admin_id: currentUser.user_id
    });

    alert("Usuario suspendido.");
    renderAdmin();
  } catch (error) {
    alert(error.message);
  }
}

async function rejectUser(userId) {
  if (!currentUser || currentUser.role !== "admin") return;

  try {
    await apiRequest("rejectUser", {
      user_id: userId,
      admin_id: currentUser.user_id
    });

    alert("Usuario rechazado.");
    renderAdmin();
  } catch (error) {
    alert(error.message);
  }
}

function copyText(text) {
  navigator.clipboard.writeText(text);
  alert("Copiado: " + text);
}

function bindAdmin() {
  adminLogoutBtn.addEventListener("click", () => {
    clearSession();
    showView("homeView");
  });

  adminTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      adminTabs.forEach(t => t.classList.remove("active"));
      adminPanels.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");

      const panelId = `admin${tab.dataset.adminTab.charAt(0).toUpperCase()}${tab.dataset.adminTab.slice(1)}Panel`;
      const panel = document.getElementById(panelId);

      if (panel) panel.classList.add("active");
    });
  });

  adminConfigForm.addEventListener("submit", async event => {
    event.preventDefault();

    if (!currentUser || currentUser.role !== "admin") return;

    try {
      await apiRequest("updateAdminConfig", {
        admin_id: currentUser.user_id,
        admin_contact_email: adminEmailInput.value.trim(),
        admin_contact_phone: adminWhatsappInput.value.trim(),
        default_chat_hours: adminChatHoursInput.value.trim()
      });

      alert("Configuración guardada.");
      renderAdmin();
    } catch (error) {
      alert(error.message);
    }
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
  requireActiveUser(() => {
    voiceModal.classList.add("active");
    assistantAwake = false;

    voiceStatus.textContent = "Asistente Macro";
    voiceText.textContent = "Di: Hola Macro";

    speak(`Hola ${currentUserNameForVoice}. Soy Macro. Toca hablar y dime Hola Macro.`);
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
  requireActiveUser(() => {
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

      const response = `Hola ${currentUserNameForVoice}, soy Macro. ¿Qué oportunidad de negocio quieres buscar hoy?`;
      voiceStatus.textContent = "Activado";
      voiceText.textContent = response;
      speak(response);
      return;
    }

    voiceStatus.textContent = "Esperando comando";
    voiceText.textContent = "Primero di: Hola Macro";
    return;
  }

  let response = "Puedo ayudarte a buscar inversión, alianzas, eventos, compradores, abrir chat o abrir tu perfil.";

  if (text.includes("inversion") || text.includes("capital")) {
    response = `Listo ${currentUserNameForVoice}, busquemos perfiles de inversión.`;
    showView("directoryView");
    directorySearch.value = "inversionista capital";
    directorySearch.dispatchEvent(new Event("input"));
  }

  if (text.includes("alianza") || text.includes("canje")) {
    response = `Perfecto ${currentUserNameForVoice}, busquemos aliados estratégicos.`;
    showView("directoryView");
    directorySearch.value = "alianza convenio";
    directorySearch.dispatchEvent(new Event("input"));
  }

  if (text.includes("evento") || text.includes("activacion") || text.includes("produccion")) {
    response = `Entendido ${currentUserNameForVoice}, busquemos perfiles de eventos y activaciones.`;
    showView("directoryView");
    directorySearch.value = "eventos produccion activaciones";
    directorySearch.dispatchEvent(new Event("input"));
  }

  if (text.includes("venta") || text.includes("comprador") || text.includes("cliente")) {
    response = `Entendido ${currentUserNameForVoice}, busquemos compradores comerciales.`;
    showView("directoryView");
    directorySearch.value = "comprador venta cliente";
    directorySearch.dispatchEvent(new Event("input"));
  }

  if (text.includes("chat") || text.includes("mensaje")) {
    response = `Abriendo el chat temporal, ${currentUserNameForVoice}.`;
    showView("chatView");
  }

  if (text.includes("perfil")) {
    response = `Abriendo tu perfil profesional, ${currentUserNameForVoice}.`;
    showView("profileView");
  }

  if (text.includes("inicio")) {
    response = `Volviendo al inicio, ${currentUserNameForVoice}.`;
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

async function testApiConnection() {
  try {
    await apiRequest("ping", {});
    console.log("API conectada correctamente.");
  } catch (error) {
    console.warn("No se pudo conectar con Apps Script:", error.message);
  }
}

async function initApp() {
  loadSession();

  bindNavigation();
  bindAuth();
  bindProfileButtons();
  bindDirectory();
  bindConnection();
  bindChat();
  bindAdmin();
  bindVoice();
  setupVoice();

  openNotificationsBtn.addEventListener("click", () => {
    requireActiveUser(() => showView("notificationsView"));
  });

  await loadProfileGroups();

  updateProfileUI();
  updateNotificationDot();
  showView("homeView");
  testApiConnection();
}

initApp();
