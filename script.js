const API_URL = 'https://script.google.com/macros/s/AKfycbyvYZa5VUVgydteQgC0HmzjtRbgCZxIlwnrI3awmggOB_FE9Wl2_ES1zPvVyu6TF2MicQ/exec';

const listaPartidos = document.getElementById('listaPartidos');

const toast = document.getElementById('toast');

async function cargarPartidos(){

  try{

    const response = await fetch(API_URL,{

      method:'POST',

      body:JSON.stringify({
        action:'obtenerPartidos'
      })

    });

    const data = await response.json();

    if(!data.ok){

      mostrarToast('Error cargando partidos');

      return;

    }

    renderizarPartidos(data.partidos);

  }

  catch(error){

    console.error(error);

    mostrarToast('Error de conexión');

  }

}

function renderizarPartidos(partidos){

  listaPartidos.innerHTML = '';

  if(partidos.length === 0){

    listaPartidos.innerHTML = `
      <div class="empty-state">
        No existen partidos cargados todavía.
      </div>
    `;

    return;

  }

  partidos.forEach(partido => {

    const estadoClase =
      partido.ESTADO === 'ABIERTO'
      ? 'status-abierto'
      : partido.ESTADO === 'BLOQUEADO'
      ? 'status-bloqueado'
      : 'status-finalizado';

    const card = document.createElement('div');

    card.className = 'match-card';

    card.innerHTML = `

      <div class="match-header">

        <span>
          ${partido.FASE} · Grupo ${partido.GRUPO}
        </span>

        <div class="match-status ${estadoClase}">
          ${partido.ESTADO}
        </div>

      </div>

      <div class="match-teams">

        <div class="team">
          <h4>${partido.EQUIPO_LOCAL}</h4>
        </div>

        <div class="vs">
          VS
        </div>

        <div class="team">
          <h4>${partido.EQUIPO_VISITA}</h4>
        </div>

      </div>

      <div class="match-actions">

        <input
          type="number"
          min="0"
          placeholder="0"
          id="local-${partido.ID_PARTIDO}"
        >

        <input
          type="number"
          min="0"
          placeholder="0"
          id="visita-${partido.ID_PARTIDO}"
        >

        <button onclick="guardarPronostico('${partido.ID_PARTIDO}')">
          Guardar Pronóstico
        </button>

      </div>

    `;

    listaPartidos.appendChild(card);

  });

}

async function guardarPronostico(idPartido){

  const golesLocal =
    document.getElementById(`local-${idPartido}`).value;

  const golesVisita =
    document.getElementById(`visita-${idPartido}`).value;

  if(golesLocal === '' || golesVisita === ''){

    mostrarToast('Debes ingresar ambos marcadores');

    return;

  }

  mostrarToast('Pronóstico guardado');

}

function mostrarToast(texto){

  toast.innerText = texto;

  toast.classList.add('show');

  setTimeout(() => {

    toast.classList.remove('show');

  },3000);

}

cargarPartidos();
