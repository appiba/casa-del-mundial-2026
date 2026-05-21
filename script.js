const API_URL =
'https://script.google.com/macros/s/AKfycbyz-NTTpZJimKeTdaFS60jwgoFnJh0PK31BXk1_5hhZUVCyqFlkJxNGqLQV1sg9POSScA/exec';

/* =========================
ELEMENTOS
========================= */

const registroForm =
document.getElementById('registroForm');

const listaPartidos =
document.getElementById('listaPartidos');

const participanteActivo =
document.getElementById('participanteActivo');

const toast =
document.getElementById('toast');

const totalPartidos =
document.getElementById('totalPartidos');

/* =========================
TOAST
========================= */

function mostrarToast(texto){

  toast.innerText = texto;

  toast.classList.add('show');

  setTimeout(()=>{

    toast.classList.remove('show');

  },3000);

}

/* =========================
REGISTRO
========================= */

registroForm.addEventListener(
'submit',
async(e)=>{

  e.preventDefault();

  const nombres =
  document.getElementById('nombres')
  .value.trim();

  const apellidos =
  document.getElementById('apellidos')
  .value.trim();

  const cedula =
  document.getElementById('cedula')
  .value.trim();

  const celular =
  document.getElementById('celular')
  .value.trim();

  try{

    const response =
    await fetch(API_URL,{

      method:'POST',

      body:JSON.stringify({

        action:'registrarParticipante',

        nombres,
        apellidos,
        cedula,
        celular

      })

    });

    const result =
    await response.json();

    if(!result.ok){

      mostrarToast(result.message);

      return;

    }

    const participante = {

      codigo:result.codigo,

      nombres,
      apellidos

    };

    localStorage.setItem(
      'participante',
      JSON.stringify(participante)
    );

    mostrarParticipante();

    mostrarToast(
      `Código generado: ${result.codigo}`
    );

    document
    .getElementById('partidos')
    .scrollIntoView({
      behavior:'smooth'
    });

  }

  catch(error){

    console.error(error);

    mostrarToast(
      'Error registrando participante'
    );

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
      <div class="empty-state">
        No existe participante registrado.
      </div>
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
            Código:
            ${participante.codigo}
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
CARGAR PARTIDOS
========================= */

async function cargarPartidos(){

  try{

    const response =
    await fetch(API_URL,{

      method:'POST',

      body:JSON.stringify({

        action:'obtenerPartidos'

      })

    });

    const data =
    await response.json();

    if(!data.ok){

      mostrarToast(
        'Error cargando partidos'
      );

      return;

    }

    totalPartidos.innerText =
    data.partidos.length;

    renderizarPartidos(
      data.partidos
    );

  }

  catch(error){

    console.error(error);

    mostrarToast(
      'Error de conexión'
    );

  }

}

/* =========================
RENDER PARTIDOS
========================= */

function renderizarPartidos(partidos){

  listaPartidos.innerHTML = '';

  if(partidos.length === 0){

    listaPartidos.innerHTML = `
      <div class="empty-state">
        No existen partidos todavía.
      </div>
    `;

    return;

  }

  partidos.forEach(partido => {

    const bloqueado =
    partido.ESTADO !== 'ABIERTO';

    const estadoClase =
    partido.ESTADO === 'ABIERTO'
    ? 'status-abierto'
    : partido.ESTADO === 'BLOQUEADO'
    ? 'status-bloqueado'
    : 'status-finalizado';

    const card =
    document.createElement('div');

    card.className =
    'match-card';

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
          <h4>
            ${partido.EQUIPO_LOCAL}
          </h4>
        </div>

        <div class="vs">
          VS
        </div>

        <div class="team">
          <h4>
            ${partido.EQUIPO_VISITA}
          </h4>
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

          Guardar

        </button>

      </div>

    `;

    listaPartidos.appendChild(card);

  });

}

/* =========================
GUARDAR PRONOSTICO
========================= */

async function guardarPronostico(
idPartido
){

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

    const response =
    await fetch(API_URL,{

      method:'POST',

      body:JSON.stringify({

        action:'guardarPronostico',

        codigo:
        participante.codigo,

        idPartido,

        golesLocal,

        golesVisita

      })

    });

    const result =
    await response.json();

    mostrarToast(
      result.message
    );

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
