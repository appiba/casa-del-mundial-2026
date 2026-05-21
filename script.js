const API_URL =
'https://script.google.com/macros/s/AKfycbzDOFOcxo_7a0zbqVwgrLr23t7hTuamu0FcPWuuIPl6XP3SUkL7Hyjk1GmtKoQToddEgw/exec';

/* =========================
ELEMENTOS
========================= */

const loginForm =
document.getElementById('loginForm');

const registroForm =
document.getElementById('registroForm');

const tabLogin =
document.getElementById('tabLogin');

const tabRegistro =
document.getElementById('tabRegistro');

const participanteActivo =
document.getElementById('participanteActivo');

const listaPartidos =
document.getElementById('listaPartidos');

const faseTabs =
document.getElementById('faseTabs');

const toast =
document.getElementById('toast');

const totalPartidos =
document.getElementById('totalPartidos');

const totalRanking =
document.getElementById('totalRanking');

const misPuntos =
document.getElementById('misPuntos');

const btnSalir =
document.getElementById('btnSalir');

let partidosGlobal = [];

let pronosticosGlobal = [];

let faseActiva = 'GRUPOS';

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
API
========================= */

function apiPost(payload){

  return fetch(API_URL,{

    method:'POST',

    body:JSON.stringify(payload)

  })
  .then(res=>res.json());

}

/* =========================
TABS LOGIN / REGISTRO
========================= */

tabLogin.addEventListener('click',()=>{

  tabLogin.classList.add('active');

  tabRegistro.classList.remove('active');

  loginForm.style.display = 'grid';

  registroForm.style.display = 'none';

});

tabRegistro.addEventListener('click',()=>{

  tabRegistro.classList.add('active');

  tabLogin.classList.remove('active');

  registroForm.style.display = 'grid';

  loginForm.style.display = 'none';

});

/* =========================
LOGIN
========================= */

loginForm.addEventListener(
'submit',
async(e)=>{

  e.preventDefault();

  const cedula =
  document.getElementById(
    'loginCedula'
  ).value.trim();

  const celular =
  document.getElementById(
    'loginCelular'
  ).value.trim();

  try{

    const result =
    await apiPost({

      action:'loginParticipante',

      cedula,
      celular

    });

    if(!result.ok){

      mostrarToast(
        result.message
      );

      return;

    }

    guardarSesion(
      result.participante
    );

    await iniciarQuiniela();

    mostrarToast(
      'Ingreso correcto'
    );

  }

  catch(error){

    console.error(error);

    mostrarToast(
      'Error iniciando sesión'
    );

  }

});

/* =========================
REGISTRO
========================= */

registroForm.addEventListener(
'submit',
async(e)=>{

  e.preventDefault();

  const nombres =
  document.getElementById(
    'nombres'
  ).value.trim();

  const apellidos =
  document.getElementById(
    'apellidos'
  ).value.trim();

  const cedula =
  document.getElementById(
    'cedula'
  ).value.trim();

  const celular =
  document.getElementById(
    'celular'
  ).value.trim();

  try{

    const result =
    await apiPost({

      action:'registrarParticipante',

      nombres,
      apellidos,
      cedula,
      celular

    });

    if(!result.ok){

      mostrarToast(
        result.message
      );

      return;

    }

    guardarSesion(
      result.participante
    );

    await iniciarQuiniela();

    mostrarToast(
      'Registro exitoso'
    );

  }

  catch(error){

    console.error(error);

    mostrarToast(
      'Error registrando participante'
    );

  }

});

/* =========================
SESION
========================= */

function guardarSesion(
participante
){

  localStorage.setItem(
    'participante',
    JSON.stringify(participante)
  );

}

function obtenerSesion(){

  return JSON.parse(
    localStorage.getItem(
      'participante'
    )
  );

}

/* =========================
SALIR
========================= */

btnSalir.addEventListener(
'click',
()=>{

  localStorage.removeItem(
    'participante'
  );

  location.reload();

});

/* =========================
INICIAR QUINIELA
========================= */

async function iniciarQuiniela(){

  const participante =
  obtenerSesion();

  if(!participante) return;

  document.getElementById(
    'acceso'
  ).style.display = 'none';

  document.getElementById(
    'miCuenta'
  ).style.display = 'block';

  document.getElementById(
    'partidos'
  ).style.display = 'block';

  btnSalir.style.display =
  'inline-block';

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
            Usuario:
            ${participante.cedula}
          </p>

        </div>

      </div>

      <div class="points">
        ACTIVO
      </div>

    </div>

  `;

  await cargarDatos();

  document
  .getElementById('partidos')
  .scrollIntoView({
    behavior:'smooth'
  });

}

/* =========================
CARGAR DATOS
========================= */

async function cargarDatos(){

  const participante =
  obtenerSesion();

  const partidosRes =
  await apiPost({

    action:'obtenerPartidos'

  });

  const fasesRes =
  await apiPost({

    action:'obtenerFases'

  });

  const pronosticosRes =
  await apiPost({

    action:'obtenerPronosticos',

    codigo:
    participante.codigo

  });

  const rankingRes =
  await apiPost({

    action:'obtenerRanking'

  });

  partidosGlobal =
  partidosRes.partidos || [];

  pronosticosGlobal =
  pronosticosRes.pronosticos || [];

  totalPartidos.innerText =
  partidosGlobal.length;

  totalRanking.innerText =
  rankingRes.ranking
  ? rankingRes.ranking.length
  : 0;

  renderFases(
    fasesRes.fases || []
  );

  renderPartidos();

  renderRanking(
    rankingRes.ranking || []
  );

}

/* =========================
FASES
========================= */

function renderFases(fases){

  faseTabs.innerHTML = '';

  fases.forEach(fase => {

    const estado =
    String(
      fase.ESTADO || ''
    ).toUpperCase();

    const nombre =
    String(
      fase.FASE || ''
    ).toUpperCase();

    const btn =
    document.createElement(
      'button'
    );

    btn.className =
    'filter';

    btn.innerText =
    nombre;

    if(nombre === faseActiva){

      btn.classList.add(
        'active'
      );

    }

    if(estado !== 'ABIERTA'){

      btn.disabled = true;

      btn.innerText =
      nombre + ' 🔒';

    }

    btn.addEventListener(
      'click',
      ()=>{

        faseActiva =
        nombre;

        document
        .querySelectorAll(
          '#faseTabs .filter'
        )
        .forEach(b=>{

          b.classList.remove(
            'active'
          );

        });

        btn.classList.add(
          'active'
        );

        renderPartidos();

      }
    );

    faseTabs.appendChild(btn);

  });

}

/* =========================
PARTIDOS
========================= */

function renderPartidos(){

  listaPartidos.innerHTML = '';

  const partidos =
  partidosGlobal.filter(p =>

    String(
      p.FASE || ''
    ).toUpperCase()

    ===

    faseActiva

  );

  if(partidos.length === 0){

    listaPartidos.innerHTML = `

      <div class="empty-state">
        No existen partidos para esta fase.
      </div>

    `;

    return;

  }

  partidos.forEach(partido => {

    const pronostico =
    pronosticosGlobal.find(p =>

      String(
        p.ID_PARTIDO
      ) ===

      String(
        partido.ID_PARTIDO
      )

    );

    const estado =
    String(
      partido.ESTADO || ''
    ).toUpperCase();

    const bloqueado =
    estado !== 'ABIERTO';

    const estadoClase =

      estado === 'ABIERTO'
      ? 'status-abierto'

      :

      estado === 'BLOQUEADO'
      ? 'status-bloqueado'

      :

      'status-finalizado';

    const card =
    document.createElement(
      'div'
    );

    card.className =
    'match-card';

    card.innerHTML = `

      <div class="match-header">

        <span>

          ${partido.FASE}
          · Grupo ${partido.GRUPO || '-'}
          · ${formatearFecha(partido.FECHA)}
          · ${partido.HORA || ''}

        </span>

        <div class="
          match-status
          ${estadoClase}
        ">

          ${estado}

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
          id="local-${partido.ID_PARTIDO}"
          value="${
            pronostico
            ? pronostico.GOLES_LOCAL
            : ''
          }"
          placeholder="0"
          ${bloqueado ? 'disabled' : ''}
        >

        <input
          type="number"
          min="0"
          id="visita-${partido.ID_PARTIDO}"
          value="${
            pronostico
            ? pronostico.GOLES_VISITA
            : ''
          }"
          placeholder="0"
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

          ${
            pronostico
            ? 'Actualizar'
            : 'Guardar'
          }

        </button>

      </div>

    `;

    listaPartidos.appendChild(
      card
    );

  });

}

/* =========================
GUARDAR PRONOSTICO
========================= */

async function guardarPronostico(
idPartido
){

  const participante =
  obtenerSesion();

  if(!participante){

    mostrarToast(
      'Debes ingresar primero'
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

    const result =
    await apiPost({

      action:'guardarPronostico',

      codigo:
      participante.codigo,

      idPartido,

      golesLocal,

      golesVisita

    });

    mostrarToast(
      result.message
    );

    if(result.ok){

      await cargarDatos();

    }

  }

  catch(error){

    console.error(error);

    mostrarToast(
      'Error guardando pronóstico'
    );

  }

}

/* =========================
RANKING
========================= */

function renderRanking(
ranking
){

  const rankingContainer =
  document.getElementById(
    'rankingContainer'
  );

  rankingContainer.innerHTML = '';

  if(!ranking.length){

    rankingContainer.innerHTML = `

      <div class="empty-state">
        El ranking aparecerá cuando existan puntajes.
      </div>

    `;

    return;

  }

  ranking.forEach((item,index)=>{

    const card =
    document.createElement(
      'div'
    );

    card.className =
    'ranking-card';

    card.innerHTML = `

      <div class="ranking-left">

        <div class="position">
          ${
            item.POSICION ||
            index + 1
          }
        </div>

        <div>

          <h3>
            ${item.CODIGO}
          </h3>

          <p>

            Aciertos:
            ${item.ACIERTOS || 0}

            ·

            Exactos:
            ${item.EXACTOS || 0}

          </p>

        </div>

      </div>

      <div class="points">
        ${item.PUNTOS || 0}
      </div>

    `;

    rankingContainer.appendChild(
      card
    );

  });

}

/* =========================
FORMATEAR FECHA
========================= */

function formatearFecha(
fecha
){

  if(!fecha) return '';

  try{

    return new Date(
      fecha
    ).toLocaleDateString(
      'es-EC',
      {

        day:'2-digit',
        month:'short',
        year:'numeric'

      }
    );

  }

  catch(error){

    return fecha;

  }

}

/* =========================
AUTO LOGIN
========================= */

iniciarQuiniela();
