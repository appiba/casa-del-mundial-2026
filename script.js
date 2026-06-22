const postsContainer = document.getElementById("postsContainer");
const searchInput = document.getElementById("searchInput");
const sheetOverlay = document.getElementById("sheetOverlay");

let posts = [
  {
    business: "Laguna Mall",
    initials: "LM",
    category: "Evento",
    title: "Activación especial por temporada mundialista",
    text: "Este fin de semana tendremos pantalla gigante, promociones de comida, música en vivo y dinámicas para toda la familia.",
    likes: 128,
    comments: 34,
    icon: "🏆"
  },
  {
    business: "PhotoLab Studio",
    initials: "PL",
    category: "Promoción",
    title: "Sesión mundialista con tu camiseta favorita",
    text: "Ven con la camiseta de tu equipo y vive una experiencia fotográfica profesional. Fotos individuales, pareja o grupo.",
    likes: 92,
    comments: 18,
    icon: "📸"
  },
  {
    business: "Céline Bar Karaoke",
    initials: "CF",
    category: "Evento",
    title: "Viernes de despecho y karaoke",
    text: "Una noche para cantar, disfrutar y compartir con amigos. Promociones especiales en cócteles y reservas VIP.",
    likes: 210,
    comments: 56,
    icon: "🎤"
  },
  {
    business: "Radio Business FM",
    initials: "RB",
    category: "Servicio",
    title: "Radio interna para centros comerciales",
    text: "Creamos circuitos cerrados de radio para negocios, locales y centros comerciales con programación personalizada.",
    likes: 75,
    comments: 12,
    icon: "🎧"
  }
];

function getCategoryColor(category) {
  switch (category) {
    case "Promoción":
      return {
        badgeBg: "rgba(16, 185, 129, 0.10)",
        badgeColor: "#059669",
        cover: "linear-gradient(135deg, #dcfce7 0%, #064e3b 100%)"
      };
    case "Evento":
      return {
        badgeBg: "rgba(59, 99, 240, 0.10)",
        badgeColor: "#3b63f0",
        cover: "linear-gradient(135deg, #dbeafe 0%, #0f172a 100%)"
      };
    case "Producto":
      return {
        badgeBg: "rgba(245, 158, 11, 0.12)",
        badgeColor: "#d97706",
        cover: "linear-gradient(135deg, #fef3c7 0%, #78350f 100%)"
      };
    case "Servicio":
      return {
        badgeBg: "rgba(168, 85, 247, 0.10)",
        badgeColor: "#7c3aed",
        cover: "linear-gradient(135deg, #ede9fe 0%, #312e81 100%)"
      };
    default:
      return {
        badgeBg: "rgba(107, 114, 128, 0.10)",
        badgeColor: "#4b5563",
        cover: "linear-gradient(135deg, #e5e7eb 0%, #111827 100%)"
      };
  }
}

function renderPosts(list = posts) {
  postsContainer.innerHTML = "";

  if (!list.length) {
    postsContainer.innerHTML = `
      <div class="glass-card empty-card">
        No encontramos publicaciones con esa búsqueda.
      </div>
    `;
    return;
  }

  list.forEach((post) => {
    const colors = getCategoryColor(post.category);

    const card = document.createElement("article");
    card.className = "post-card";

    card.innerHTML = `
      <div class="post-head">
        <div class="post-head-left">
          <div class="profile-avatar">${post.initials}</div>
          <div>
            <div class="post-name">${post.business}</div>
            <div class="post-meta">Publicado hace 1 h · Negocio verificado</div>
          </div>
        </div>
        <div class="post-badge" style="background:${colors.badgeBg}; color:${colors.badgeColor};">
          ${post.category}
        </div>
      </div>

      <div class="post-content">
        <div class="post-title">${post.title}</div>
        <div class="post-text">${post.text}</div>

        <div class="post-cover" style="background:${colors.cover};">
          <span>${post.icon}</span>
        </div>
      </div>

      <div class="post-actions">
        <button class="post-action-btn" onclick="likePost('${post.id || post.title}')">
          ❤️ Me gusta ${post.likes}
        </button>
        <button class="post-action-btn">
          💬 Comentar ${post.comments}
        </button>
        <button class="post-action-btn">
          📲 Compartir
        </button>
        <button class="post-action-btn">
          📌 Guardar
        </button>
      </div>
    `;

    postsContainer.appendChild(card);
  });
}

function likePost(identifier) {
  const post = posts.find((p) => (p.id || p.title) === identifier);
  if (!post) return;
  post.likes += 1;
  renderPosts(filterPosts(searchInput.value.trim()));
}

function openComposer() {
  sheetOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeComposer(event) {
  if (event && event.target !== sheetOverlay) return;
  sheetOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

function createPost() {
  const businessName = document.getElementById("businessName").value.trim();
  const postTitle = document.getElementById("postTitle").value.trim();
  const postText = document.getElementById("postText").value.trim();
  const postCategory = document.getElementById("postCategory").value;

  if (!businessName || !postTitle || !postText) {
    alert("Completa todos los campos antes de publicar.");
    return;
  }

  const initials = businessName
    .split(" ")
    .map(word => word.charAt(0))
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const icons = {
    "Promoción": "🔥",
    "Evento": "🎉",
    "Producto": "🛍️",
    "Servicio": "💼",
    "Comunicado": "📢"
  };

  const newPost = {
    id: Date.now().toString(),
    business: businessName,
    initials,
    category: postCategory,
    title: postTitle,
    text: postText,
    likes: 0,
    comments: 0,
    icon: icons[postCategory] || "📢"
  };

  posts.unshift(newPost);
  clearComposer();
  closeComposer();
  renderPosts(filterPosts(searchInput.value.trim()));
}

function clearComposer() {
  document.getElementById("businessName").value = "";
  document.getElementById("postTitle").value = "";
  document.getElementById("postText").value = "";
  document.getElementById("postCategory").value = "Promoción";
}

function filterPosts(term) {
  const query = term.toLowerCase().trim();

  if (!query) return posts;

  return posts.filter(post =>
    post.business.toLowerCase().includes(query) ||
    post.title.toLowerCase().includes(query) ||
    post.text.toLowerCase().includes(query) ||
    post.category.toLowerCase().includes(query)
  );
}

searchInput.addEventListener("input", (e) => {
  renderPosts(filterPosts(e.target.value));
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeComposer();
  }
});

renderPosts();
