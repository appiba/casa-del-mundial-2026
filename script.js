const API_URL =
'https://script.google.com/macros/s/AKfycbyvYZa5VUVgydteQgC0HmzjtRbgCZxIlwnrI3awmggOB_FE9Wl2_ES1zPvVyu6TF2MicQ/exec';

const registroForm =
document.getElementById('registroForm');

const listaPartidos =
document.getElementById('listaPartidos');

const participanteActivo =
document.getElementById('participanteActivo');

const toast =
document.getElementById('toast');

/* =========================
TOAST
========================= */

function mostrarToast(texto){

  toast.innerText = texto;

  toast.classList.add('show');

  setTimeout(() => {

    toast.classList.remove('show');

  },3000);

}

/* =========================
REGISTRO
========================= */

registroForm.addEventListener('submit', async (e)=>{

  e.preventDefault();

  const nombres =
  document.getElementById('nombres').value.trim();

  const apellidos =
  document.getElementById('apellidos').value.trim();

  const cedula =
  document.getElementById('cedula').value.trim();

  const celular =
  document.getElementById('celular').value.trim();

  const instagram =
  document.getElementById('instagram').value.trim();

  try{

    const response = await fetch(API_URL,{

      method:'POST',

      body:JSON.stringify({

        action:'registrarParticipante',

        nombres,
        apellidos,
        cedula,
        celular,
        instagram

      })

    });

    const result = await response.json();

    if(!result.ok){

      mostrarToast(result.message);

      return;

    }

    localStorage.setItem(
      'participante',
      JSON.stringify({

        id:result.idParticipante,

        nombres,
        apellidos,
        cedula,
        celular,
        instagram

      })
    );

    mostrarParticipante();

    mostrarToast('Registro exitoso');

    document
    .getElementById('partidos')
    .scrollIntoView({
      behavior:'smooth'
    });

  }

  catch(error){

    console.error(error);

    mostrarToast('Error registrando participante');

  }

});

/* =========================
MOSTRAR PARTICIPANTE
========================= */

function mostrarParticipante(){

  const participante =
  JSON.parse(
    localStorage.getItem('participante')
  );

  if(!participante){

    participanteActivo.innerHTML = `
      No existe participante registrado.
    `;

    return;

  }

  participanteActivo.innerHTML = `

    <div class="ranking-card">

      <div class="ranking-left">

        <div class="position">
          ✓
        </div>

        <div>

          <h3>
            ${participante.nombres}
            ${participante.apellidos}
          </h3>

          <p>
            ${participante.cedula}
          </p>

        </div>

      </div>

      <div class="points">
        ACTIVO
      </div>

    </div>

  `;

}

/* =========================
PARTIDOS
========================= */

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

  partidos.forEach(partido => {

    const estadoClase =
      partido.ESTADO === 'ABIERTO'
      ? 'status-abierto'
      : partido.ESTADO === 'BLOQUEADO'
      ? 'status-bloqueado'
      : 'status-finalizado';

    const bloqueado =
      partido.ESTADO !== 'ABIERTO';

    const card =
    document.createElement('div');

    card.className = 'match-card';

    card.innerHTML = `

      <div class="match-header">

        <span>
          ${partido.FASE}
          · Grupo ${partido.GRUPO}
        </span>

        <div class="
          match-status
          ${estadoClase}
        ">
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
          ${bloqueado ? 'disabled' : ''}
        >

        <input
          type="number"
          min="0"
          placeholder="0"
          id="visita-${partido.ID_PARTIDO}"
          ${bloqueado ? 'disabled' : ''}
        >

        <button
          onclick="
            guardarPronostico(
              '${partido.ID_PARTIDO}'
            )
          "
          ${bloqueado ? 'disabled' : ''}
        >
          Guardar Pronóstico
        </button>

      </div>

    `;

    listaPartidos.appendChild(card);

  });

}

/* =========================
GUARDAR PRONOSTICO
========================= */

async function guardarPronostico(idPartido){

  const participante =
  JSON.parse(
    localStorage.getItem('participante')
  );

  if(!participante){

    mostrarToast(
      'Debes registrarte primero'
    );

    return;

  }

  const golesLocal =
  document.getElementById(
    `local-${idPartido}`
  ).value;

  const golesVisita =
  document.getElementById(
    `visita-${idPartido}`
  ).value;

  if(
    golesLocal === '' ||
    golesVisita === ''
  ){

    mostrarToast(
      'Ingresa ambos marcadores'
    );

    return;

  }

  try{

    const response = await fetch(API_URL,{

      method:'POST',

      body:JSON.stringify({

        action:'guardarPronostico',

        idParticipante:
        participante.id,

        idPartido,

        golesA:golesLocal,

        golesB:golesVisita

      })

    });

    const result =
    await response.json();

    mostrarToast(result.message);

  }

  catch(error){

    console.error(error);

    mostrarToast(
      'Error guardando pronóstico'
    );

  }

}

/* =========================
INICIO
========================= */

mostrarParticipante();

cargarPartidos();
