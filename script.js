const API_URL =
'https://script.google.com/macros/s/AKfycbzDOFOcxo_7a0zbqVwgrLr23t7hTuamu0FcPWuuIPl6XP3SUkL7Hyjk1GmtKoQToddEgw/exec';

/* ======================
NORMALIZAR CELULAR
====================== */

function limpiarCelular(numero){

  numero = String(numero)
  .replace(/\D/g,'');

  if(numero.startsWith('0')){

    numero = numero.substring(1);

  }

  return numero;

}

/* ======================
API
====================== */

async function apiPost(data){

  const res = await fetch(API_URL,{
    method:'POST',
    body:JSON.stringify(data)
  });

  return await res.json();

}

/* ======================
LOGIN
====================== */

document
.getElementById('loginForm')
.addEventListener(
'submit',
async(e)=>{

  e.preventDefault();

  const cedula =
  document
  .getElementById(
    'loginCedula'
  )
  .value
  .trim();

  const celular =
  limpiarCelular(
    document
    .getElementById(
      'loginCelular'
    )
    .value
  );

  const result =
  await apiPost({

    action:'loginParticipante',

    cedula,
    celular

  });

  if(!result.ok){

    alert(
      result.message
    );

    return;

  }

  localStorage.setItem(
    'participante',
    JSON.stringify(
      result.participante
    )
  );

  location.reload();

});

/* ======================
REGISTRO
====================== */

document
.getElementById('registroForm')
.addEventListener(
'submit',
async(e)=>{

  e.preventDefault();

  const nombres =
  document
  .getElementById(
    'nombres'
  )
  .value
  .trim();

  const apellidos =
  document
  .getElementById(
    'apellidos'
  )
  .value
  .trim();

  const cedula =
  document
  .getElementById(
    'cedula'
  )
  .value
  .trim();

  const celular =
  limpiarCelular(
    document
    .getElementById(
      'celular'
    )
    .value
  );

  const result =
  await apiPost({

    action:'registrarParticipante',

    nombres,
    apellidos,
    cedula,
    celular

  });

  if(!result.ok){

    alert(
      result.message
    );

    return;

  }

  alert(
    'Registro exitoso'
  );

  localStorage.setItem(
    'participante',
    JSON.stringify(
      result.participante
    )
  );

  location.reload();

});

/* ======================
AUTO LOGIN
====================== */

const participante =
JSON.parse(
  localStorage.getItem(
    'participante'
  )
);

if(participante){

  document
  .getElementById(
    'participanteActivo'
  )
  .innerHTML = `

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

}
