const API_URL = 'https://script.google.com/macros/s/AKfycbzDOFOcxo_7a0zbqVwgrLr23t7hTuamu0FcPWuuIPl6XP3SUkL7Hyjk1GmtKoQToddEgw/exec';

const FIXTURE_COMPLETO = [
  { ID_PARTIDO:'1', FASE:'GRUPOS', GRUPO:'A', EQUIPO_LOCAL:'México', EQUIPO_VISITA:'Sudáfrica', FECHA:'2026-06-11', HORA:'14:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'2', FASE:'GRUPOS', GRUPO:'A', EQUIPO_LOCAL:'Corea del Sur', EQUIPO_VISITA:'República Checa', FECHA:'2026-06-11', HORA:'21:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'3', FASE:'GRUPOS', GRUPO:'B', EQUIPO_LOCAL:'Canadá', EQUIPO_VISITA:'Bosnia y Herzegovina', FECHA:'2026-06-12', HORA:'14:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'4', FASE:'GRUPOS', GRUPO:'D', EQUIPO_LOCAL:'EEUU', EQUIPO_VISITA:'Paraguay', FECHA:'2026-06-12', HORA:'20:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'5', FASE:'GRUPOS', GRUPO:'B', EQUIPO_LOCAL:'Catar', EQUIPO_VISITA:'Suiza', FECHA:'2026-06-13', HORA:'14:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'6', FASE:'GRUPOS', GRUPO:'C', EQUIPO_LOCAL:'Brasil', EQUIPO_VISITA:'Marruecos', FECHA:'2026-06-13', HORA:'17:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'7', FASE:'GRUPOS', GRUPO:'C', EQUIPO_LOCAL:'Haití', EQUIPO_VISITA:'Escocia', FECHA:'2026-06-13', HORA:'20:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'8', FASE:'GRUPOS', GRUPO:'D', EQUIPO_LOCAL:'Australia', EQUIPO_VISITA:'Turquía', FECHA:'2026-06-13', HORA:'23:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'9', FASE:'GRUPOS', GRUPO:'E', EQUIPO_LOCAL:'Alemania', EQUIPO_VISITA:'Curasao', FECHA:'2026-06-14', HORA:'12:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'10', FASE:'GRUPOS', GRUPO:'F', EQUIPO_LOCAL:'Holanda', EQUIPO_VISITA:'Japón', FECHA:'2026-06-14', HORA:'15:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'11', FASE:'GRUPOS', GRUPO:'E', EQUIPO_LOCAL:'Costa de Marfil', EQUIPO_VISITA:'Ecuador', FECHA:'2026-06-14', HORA:'18:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'12', FASE:'GRUPOS', GRUPO:'F', EQUIPO_LOCAL:'Suecia', EQUIPO_VISITA:'Túnez', FECHA:'2026-06-14', HORA:'21:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'13', FASE:'GRUPOS', GRUPO:'H', EQUIPO_LOCAL:'España', EQUIPO_VISITA:'Cabo Verde', FECHA:'2026-06-15', HORA:'11:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'14', FASE:'GRUPOS', GRUPO:'G', EQUIPO_LOCAL:'Bélgica', EQUIPO_VISITA:'Egipto', FECHA:'2026-06-15', HORA:'14:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'15', FASE:'GRUPOS', GRUPO:'H', EQUIPO_LOCAL:'Arabia Saudí', EQUIPO_VISITA:'Uruguay', FECHA:'2026-06-15', HORA:'17:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'16', FASE:'GRUPOS', GRUPO:'G', EQUIPO_LOCAL:'Irán', EQUIPO_VISITA:'Nueva Zelanda', FECHA:'2026-06-15', HORA:'20:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'17', FASE:'GRUPOS', GRUPO:'I', EQUIPO_LOCAL:'Francia', EQUIPO_VISITA:'Senegal', FECHA:'2026-06-16', HORA:'14:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'18', FASE:'GRUPOS', GRUPO:'I', EQUIPO_LOCAL:'Irak', EQUIPO_VISITA:'Noruega', FECHA:'2026-06-16', HORA:'17:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'19', FASE:'GRUPOS', GRUPO:'J', EQUIPO_LOCAL:'Argentina', EQUIPO_VISITA:'Argelia', FECHA:'2026-06-16', HORA:'20:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'20', FASE:'GRUPOS', GRUPO:'J', EQUIPO_LOCAL:'Austria', EQUIPO_VISITA:'Jordania', FECHA:'2026-06-16', HORA:'23:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'21', FASE:'GRUPOS', GRUPO:'K', EQUIPO_LOCAL:'Portugal', EQUIPO_VISITA:'Congo Democrático', FECHA:'2026-06-17', HORA:'12:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'22', FASE:'GRUPOS', GRUPO:'L', EQUIPO_LOCAL:'Inglaterra', EQUIPO_VISITA:'Croacia', FECHA:'2026-06-17', HORA:'15:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'23', FASE:'GRUPOS', GRUPO:'L', EQUIPO_LOCAL:'Ghana', EQUIPO_VISITA:'Panamá', FECHA:'2026-06-17', HORA:'18:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'24', FASE:'GRUPOS', GRUPO:'K', EQUIPO_LOCAL:'Uzbekistán', EQUIPO_VISITA:'Colombia', FECHA:'2026-06-17', HORA:'21:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'25', FASE:'GRUPOS', GRUPO:'A', EQUIPO_LOCAL:'República Checa', EQUIPO_VISITA:'Sudáfrica', FECHA:'2026-06-18', HORA:'11:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'26', FASE:'GRUPOS', GRUPO:'B', EQUIPO_LOCAL:'Suiza', EQUIPO_VISITA:'Bosnia y Herzegovina', FECHA:'2026-06-18', HORA:'14:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'27', FASE:'GRUPOS', GRUPO:'B', EQUIPO_LOCAL:'Canadá', EQUIPO_VISITA:'Catar', FECHA:'2026-06-18', HORA:'17:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'28', FASE:'GRUPOS', GRUPO:'A', EQUIPO_LOCAL:'México', EQUIPO_VISITA:'Corea del Sur', FECHA:'2026-06-18', HORA:'20:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'29', FASE:'GRUPOS', GRUPO:'D', EQUIPO_LOCAL:'EEUU', EQUIPO_VISITA:'Australia', FECHA:'2026-06-19', HORA:'14:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'30', FASE:'GRUPOS', GRUPO:'C', EQUIPO_LOCAL:'Escocia', EQUIPO_VISITA:'Marruecos', FECHA:'2026-06-19', HORA:'17:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'31', FASE:'GRUPOS', GRUPO:'C', EQUIPO_LOCAL:'Brasil', EQUIPO_VISITA:'Haití', FECHA:'2026-06-19', HORA:'19:30', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'32', FASE:'GRUPOS', GRUPO:'D', EQUIPO_LOCAL:'Turquía', EQUIPO_VISITA:'Paraguay', FECHA:'2026-06-19', HORA:'22:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'33', FASE:'GRUPOS', GRUPO:'F', EQUIPO_LOCAL:'Holanda', EQUIPO_VISITA:'Suecia', FECHA:'2026-06-20', HORA:'12:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'34', FASE:'GRUPOS', GRUPO:'E', EQUIPO_LOCAL:'Alemania', EQUIPO_VISITA:'Costa de Marfil', FECHA:'2026-06-20', HORA:'15:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'35', FASE:'GRUPOS', GRUPO:'E', EQUIPO_LOCAL:'Ecuador', EQUIPO_VISITA:'Curasao', FECHA:'2026-06-20', HORA:'19:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'36', FASE:'GRUPOS', GRUPO:'F', EQUIPO_LOCAL:'Túnez', EQUIPO_VISITA:'Japón', FECHA:'2026-06-20', HORA:'23:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'37', FASE:'GRUPOS', GRUPO:'H', EQUIPO_LOCAL:'España', EQUIPO_VISITA:'Arabia Saudí', FECHA:'2026-06-21', HORA:'11:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'38', FASE:'GRUPOS', GRUPO:'G', EQUIPO_LOCAL:'Bélgica', EQUIPO_VISITA:'Irán', FECHA:'2026-06-21', HORA:'14:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'39', FASE:'GRUPOS', GRUPO:'H', EQUIPO_LOCAL:'Uruguay', EQUIPO_VISITA:'Cabo Verde', FECHA:'2026-06-21', HORA:'17:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'40', FASE:'GRUPOS', GRUPO:'G', EQUIPO_LOCAL:'Nueva Zelanda', EQUIPO_VISITA:'Egipto', FECHA:'2026-06-21', HORA:'20:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'41', FASE:'GRUPOS', GRUPO:'J', EQUIPO_LOCAL:'Argentina', EQUIPO_VISITA:'Austria', FECHA:'2026-06-22', HORA:'12:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'42', FASE:'GRUPOS', GRUPO:'I', EQUIPO_LOCAL:'Francia', EQUIPO_VISITA:'Irak', FECHA:'2026-06-22', HORA:'16:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'43', FASE:'GRUPOS', GRUPO:'I', EQUIPO_LOCAL:'Noruega', EQUIPO_VISITA:'Senegal', FECHA:'2026-06-22', HORA:'19:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'44', FASE:'GRUPOS', GRUPO:'J', EQUIPO_LOCAL:'Jordania', EQUIPO_VISITA:'Argelia', FECHA:'2026-06-22', HORA:'22:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'45', FASE:'GRUPOS', GRUPO:'K', EQUIPO_LOCAL:'Portugal', EQUIPO_VISITA:'Uzbekistán', FECHA:'2026-06-23', HORA:'12:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'46', FASE:'GRUPOS', GRUPO:'L', EQUIPO_LOCAL:'Inglaterra', EQUIPO_VISITA:'Ghana', FECHA:'2026-06-23', HORA:'15:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'47', FASE:'GRUPOS', GRUPO:'L', EQUIPO_LOCAL:'Panamá', EQUIPO_VISITA:'Croacia', FECHA:'2026-06-23', HORA:'18:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'48', FASE:'GRUPOS', GRUPO:'K', EQUIPO_LOCAL:'Colombia', EQUIPO_VISITA:'Congo Democrático', FECHA:'2026-06-23', HORA:'21:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'49', FASE:'GRUPOS', GRUPO:'B', EQUIPO_LOCAL:'Suiza', EQUIPO_VISITA:'Canadá', FECHA:'2026-06-24', HORA:'14:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'50', FASE:'GRUPOS', GRUPO:'B', EQUIPO_LOCAL:'Bosnia y Herzegovina', EQUIPO_VISITA:'Catar', FECHA:'2026-06-24', HORA:'14:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'51', FASE:'GRUPOS', GRUPO:'C', EQUIPO_LOCAL:'Escocia', EQUIPO_VISITA:'Brasil', FECHA:'2026-06-24', HORA:'17:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'52', FASE:'GRUPOS', GRUPO:'C', EQUIPO_LOCAL:'Marruecos', EQUIPO_VISITA:'Haití', FECHA:'2026-06-24', HORA:'17:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'53', FASE:'GRUPOS', GRUPO:'A', EQUIPO_LOCAL:'República Checa', EQUIPO_VISITA:'México', FECHA:'2026-06-24', HORA:'20:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'54', FASE:'GRUPOS', GRUPO:'A', EQUIPO_LOCAL:'Sudáfrica', EQUIPO_VISITA:'Corea del Sur', FECHA:'2026-06-24', HORA:'20:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'55', FASE:'GRUPOS', GRUPO:'E', EQUIPO_LOCAL:'Curasao', EQUIPO_VISITA:'Costa de Marfil', FECHA:'2026-06-25', HORA:'15:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'56', FASE:'GRUPOS', GRUPO:'E', EQUIPO_LOCAL:'Ecuador', EQUIPO_VISITA:'Alemania', FECHA:'2026-06-25', HORA:'15:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'57', FASE:'GRUPOS', GRUPO:'F', EQUIPO_LOCAL:'Japón', EQUIPO_VISITA:'Suecia', FECHA:'2026-06-25', HORA:'18:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'58', FASE:'GRUPOS', GRUPO:'F', EQUIPO_LOCAL:'Túnez', EQUIPO_VISITA:'Holanda', FECHA:'2026-06-25', HORA:'18:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'59', FASE:'GRUPOS', GRUPO:'D', EQUIPO_LOCAL:'Turquía', EQUIPO_VISITA:'EEUU', FECHA:'2026-06-25', HORA:'21:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'60', FASE:'GRUPOS', GRUPO:'D', EQUIPO_LOCAL:'Paraguay', EQUIPO_VISITA:'Australia', FECHA:'2026-06-25', HORA:'21:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'61', FASE:'GRUPOS', GRUPO:'I', EQUIPO_LOCAL:'Noruega', EQUIPO_VISITA:'Francia', FECHA:'2026-06-26', HORA:'14:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'62', FASE:'GRUPOS', GRUPO:'I', EQUIPO_LOCAL:'Senegal', EQUIPO_VISITA:'Irak', FECHA:'2026-06-26', HORA:'14:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'63', FASE:'GRUPOS', GRUPO:'H', EQUIPO_LOCAL:'Uruguay', EQUIPO_VISITA:'España', FECHA:'2026-06-26', HORA:'19:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'64', FASE:'GRUPOS', GRUPO:'H', EQUIPO_LOCAL:'Cabo Verde', EQUIPO_VISITA:'Arabia Saudí', FECHA:'2026-06-26', HORA:'19:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'65', FASE:'GRUPOS', GRUPO:'G', EQUIPO_LOCAL:'Egipto', EQUIPO_VISITA:'Irán', FECHA:'2026-06-26', HORA:'22:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'66', FASE:'GRUPOS', GRUPO:'G', EQUIPO_LOCAL:'Nueva Zelanda', EQUIPO_VISITA:'Bélgica', FECHA:'2026-06-26', HORA:'22:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'67', FASE:'GRUPOS', GRUPO:'L', EQUIPO_LOCAL:'Panamá', EQUIPO_VISITA:'Inglaterra', FECHA:'2026-06-27', HORA:'16:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'68', FASE:'GRUPOS', GRUPO:'L', EQUIPO_LOCAL:'Croacia', EQUIPO_VISITA:'Ghana', FECHA:'2026-06-27', HORA:'16:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'69', FASE:'GRUPOS', GRUPO:'K', EQUIPO_LOCAL:'Congo Democrático', EQUIPO_VISITA:'Uzbekistán', FECHA:'2026-06-27', HORA:'18:30', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'70', FASE:'GRUPOS', GRUPO:'K', EQUIPO_LOCAL:'Colombia', EQUIPO_VISITA:'Portugal', FECHA:'2026-06-27', HORA:'18:30', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'71', FASE:'GRUPOS', GRUPO:'J', EQUIPO_LOCAL:'Jordania', EQUIPO_VISITA:'Argentina', FECHA:'2026-06-27', HORA:'21:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'72', FASE:'GRUPOS', GRUPO:'J', EQUIPO_LOCAL:'Argelia', EQUIPO_VISITA:'Austria', FECHA:'2026-06-27', HORA:'21:00', ESTADO:'ABIERTO' },
  { ID_PARTIDO:'73', FASE:'RONDA DE 32', GRUPO:'-', EQUIPO_LOCAL:'2A', EQUIPO_VISITA:'2B', FECHA:'2026-06-28', HORA:'14:00', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'74', FASE:'RONDA DE 32', GRUPO:'-', EQUIPO_LOCAL:'1C', EQUIPO_VISITA:'2F', FECHA:'2026-06-29', HORA:'12:00', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'75', FASE:'RONDA DE 32', GRUPO:'-', EQUIPO_LOCAL:'1E', EQUIPO_VISITA:'3A/3B/3C/3D/3F', FECHA:'2026-06-29', HORA:'15:30', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'76', FASE:'RONDA DE 32', GRUPO:'-', EQUIPO_LOCAL:'1F', EQUIPO_VISITA:'2C', FECHA:'2026-06-29', HORA:'20:00', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'77', FASE:'RONDA DE 32', GRUPO:'-', EQUIPO_LOCAL:'2E', EQUIPO_VISITA:'2I', FECHA:'2026-06-30', HORA:'12:00', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'78', FASE:'RONDA DE 32', GRUPO:'-', EQUIPO_LOCAL:'1I', EQUIPO_VISITA:'3C/3D/3F/3G/3H', FECHA:'2026-06-30', HORA:'16:00', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'79', FASE:'RONDA DE 32', GRUPO:'-', EQUIPO_LOCAL:'1A', EQUIPO_VISITA:'3C/3E/3F/3H/3I', FECHA:'2026-06-30', HORA:'20:00', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'80', FASE:'RONDA DE 32', GRUPO:'-', EQUIPO_LOCAL:'1L', EQUIPO_VISITA:'3E/3H/3I/3J/3K', FECHA:'2026-07-01', HORA:'11:00', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'81', FASE:'RONDA DE 32', GRUPO:'-', EQUIPO_LOCAL:'1G', EQUIPO_VISITA:'3A/3E/3H/3I/3J', FECHA:'2026-07-01', HORA:'15:00', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'82', FASE:'RONDA DE 32', GRUPO:'-', EQUIPO_LOCAL:'1D', EQUIPO_VISITA:'3B/3E/3F/3I/3J', FECHA:'2026-07-01', HORA:'19:00', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'83', FASE:'RONDA DE 32', GRUPO:'-', EQUIPO_LOCAL:'1H', EQUIPO_VISITA:'2J', FECHA:'2026-07-02', HORA:'14:00', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'84', FASE:'RONDA DE 32', GRUPO:'-', EQUIPO_LOCAL:'2K', EQUIPO_VISITA:'2L', FECHA:'2026-07-02', HORA:'18:00', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'85', FASE:'RONDA DE 32', GRUPO:'-', EQUIPO_LOCAL:'1B', EQUIPO_VISITA:'3E/3F/3G/3I/3J', FECHA:'2026-07-02', HORA:'22:00', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'86', FASE:'RONDA DE 32', GRUPO:'-', EQUIPO_LOCAL:'2D', EQUIPO_VISITA:'2G', FECHA:'2026-07-03', HORA:'13:00', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'87', FASE:'RONDA DE 32', GRUPO:'-', EQUIPO_LOCAL:'1J', EQUIPO_VISITA:'2H', FECHA:'2026-07-03', HORA:'17:00', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'88', FASE:'RONDA DE 32', GRUPO:'-', EQUIPO_LOCAL:'1K', EQUIPO_VISITA:'3D/3E/3I/3J/3L', FECHA:'2026-07-03', HORA:'20:30', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'89', FASE:'OCTAVOS', GRUPO:'-', EQUIPO_LOCAL:'W73', EQUIPO_VISITA:'W75', FECHA:'2026-07-04', HORA:'12:00', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'90', FASE:'OCTAVOS', GRUPO:'-', EQUIPO_LOCAL:'W74', EQUIPO_VISITA:'W77', FECHA:'2026-07-04', HORA:'16:00', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'91', FASE:'OCTAVOS', GRUPO:'-', EQUIPO_LOCAL:'W76', EQUIPO_VISITA:'W78', FECHA:'2026-07-05', HORA:'15:00', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'92', FASE:'OCTAVOS', GRUPO:'-', EQUIPO_LOCAL:'W79', EQUIPO_VISITA:'W80', FECHA:'2026-07-05', HORA:'19:00', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'93', FASE:'OCTAVOS', GRUPO:'-', EQUIPO_LOCAL:'W83', EQUIPO_VISITA:'W84', FECHA:'2026-07-06', HORA:'14:00', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'94', FASE:'OCTAVOS', GRUPO:'-', EQUIPO_LOCAL:'W81', EQUIPO_VISITA:'W82', FECHA:'2026-07-06', HORA:'19:00', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'95', FASE:'OCTAVOS', GRUPO:'-', EQUIPO_LOCAL:'W86', EQUIPO_VISITA:'W88', FECHA:'2026-07-07', HORA:'11:00', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'96', FASE:'OCTAVOS', GRUPO:'-', EQUIPO_LOCAL:'W85', EQUIPO_VISITA:'W87', FECHA:'2026-07-07', HORA:'15:00', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'97', FASE:'CUARTOS', GRUPO:'-', EQUIPO_LOCAL:'W89', EQUIPO_VISITA:'W90', FECHA:'2026-07-09', HORA:'15:00', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'98', FASE:'CUARTOS', GRUPO:'-', EQUIPO_LOCAL:'W93', EQUIPO_VISITA:'W94', FECHA:'2026-07-10', HORA:'14:00', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'99', FASE:'CUARTOS', GRUPO:'-', EQUIPO_LOCAL:'W91', EQUIPO_VISITA:'W92', FECHA:'2026-07-11', HORA:'16:00', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'100', FASE:'CUARTOS', GRUPO:'-', EQUIPO_LOCAL:'W95', EQUIPO_VISITA:'W96', FECHA:'2026-07-11', HORA:'20:00', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'101', FASE:'SEMIFINAL', GRUPO:'-', EQUIPO_LOCAL:'W97', EQUIPO_VISITA:'W98', FECHA:'2026-07-14', HORA:'14:00', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'102', FASE:'SEMIFINAL', GRUPO:'-', EQUIPO_LOCAL:'W99', EQUIPO_VISITA:'W100', FECHA:'2026-07-15', HORA:'14:00', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'103', FASE:'TERCER PUESTO', GRUPO:'-', EQUIPO_LOCAL:'L101', EQUIPO_VISITA:'L102', FECHA:'2026-07-18', HORA:'16:00', ESTADO:'BLOQUEADO' },
  { ID_PARTIDO:'104', FASE:'FINAL', GRUPO:'-', EQUIPO_LOCAL:'W101', EQUIPO_VISITA:'W102', FECHA:'2026-07-19', HORA:'14:00', ESTADO:'BLOQUEADO' }
];

const BANDERAS = {
  'México':'🇲🇽', 'Sudáfrica':'🇿🇦', 'Corea del Sur':'🇰🇷', 'República Checa':'🇨🇿',
  'Canadá':'🇨🇦', 'Bosnia y Herzegovina':'🇧🇦', 'EEUU':'🇺🇸', 'Paraguay':'🇵🇾',
  'Catar':'🇶🇦', 'Suiza':'🇨🇭', 'Brasil':'🇧🇷', 'Marruecos':'🇲🇦',
  'Haití':'🇭🇹', 'Escocia':'🏴󠁧󠁢󠁳󠁣󠁴󠁿', 'Australia':'🇦🇺', 'Turquía':'🇹🇷',
  'Alemania':'🇩🇪', 'Curasao':'🇨🇼', 'Holanda':'🇳🇱', 'Japón':'🇯🇵',
  'Costa de Marfil':'🇨🇮', 'Ecuador':'🇪🇨', 'Suecia':'🇸🇪', 'Túnez':'🇹🇳',
  'España':'🇪🇸', 'Cabo Verde':'🇨🇻', 'Bélgica':'🇧🇪', 'Egipto':'🇪🇬',
  'Arabia Saudí':'🇸🇦', 'Uruguay':'🇺🇾', 'Irán':'🇮🇷', 'Nueva Zelanda':'🇳🇿',
  'Francia':'🇫🇷', 'Senegal':'🇸🇳', 'Irak':'🇮🇶', 'Noruega':'🇳🇴',
  'Argentina':'🇦🇷', 'Argelia':'🇩🇿', 'Austria':'🇦🇹', 'Jordania':'🇯🇴',
  'Portugal':'🇵🇹', 'Congo Democrático':'🇨🇩', 'Inglaterra':'🏴', 'Croacia':'🇭🇷',
  'Ghana':'🇬🇭', 'Panamá':'🇵🇦', 'Uzbekistán':'🇺🇿', 'Colombia':'🇨🇴'
};

const FASES_FALLBACK = [
  { FASE:'GRUPOS', ESTADO:'ABIERTA' },
  { FASE:'RONDA DE 32', ESTADO:'BLOQUEADA' },
  { FASE:'OCTAVOS', ESTADO:'BLOQUEADA' },
  { FASE:'CUARTOS', ESTADO:'BLOQUEADA' },
  { FASE:'SEMIFINAL', ESTADO:'BLOQUEADA' },
  { FASE:'TERCER PUESTO', ESTADO:'BLOQUEADA' },
  { FASE:'FINAL', ESTADO:'BLOQUEADA' }
];

let partidosGlobal = [];
let pronosticosGlobal = [];
let faseActiva = 'GRUPOS';

function limpiarCelular(numero) {
  numero = String(numero || '').replace(/\D/g, '');
  if (numero.startsWith('0')) numero = numero.substring(1);
  return numero;
}

function mensaje(texto) {
  const toast = document.getElementById('toast');
  toast.textContent = texto;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

async function apiPost(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return await res.json();
}

function bandera(equipo) {
  return BANDERAS[equipo] || '🏳️';
}

function equipoHTML(nombre) {
  return `
    <div class="team-name">
      <span class="flag-badge">${bandera(nombre)}</span>
      <span>${nombre}</span>
    </div>
  `;
}

function mostrarLogin() {
  document.getElementById('tabLogin').classList.add('active');
  document.getElementById('tabRegistro').classList.remove('active');
  document.getElementById('loginForm').style.display = 'grid';
  document.getElementById('registroForm').style.display = 'none';
}

function mostrarRegistro() {
  document.getElementById('tabRegistro').classList.add('active');
  document.getElementById('tabLogin').classList.remove('active');
  document.getElementById('registroForm').style.display = 'grid';
  document.getElementById('loginForm').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  const participante = obtenerSesion();

  document.getElementById('registroForm').addEventListener('submit', registrarParticipante);
  document.getElementById('loginForm').addEventListener('submit', loginParticipante);

  const btnSalir = document.getElementById('btnSalir');
  if (btnSalir) {
    btnSalir.addEventListener('click', () => {
      localStorage.removeItem('participante');
      location.reload();
    });
  }

  if (participante) iniciarQuiniela();
});

async function registrarParticipante(e) {
  e.preventDefault();

  const nombres = document.getElementById('nombres').value.trim();
  const apellidos = document.getElementById('apellidos').value.trim();
  const cedula = document.getElementById('cedula').value.trim();
  const celular = limpiarCelular(document.getElementById('celular').value);

  const result = await apiPost({
    action: 'registrarParticipante',
    nombres,
    apellidos,
    cedula,
    celular
  });

  if (!result.ok) {
    mensaje(result.message);
    return;
  }

  localStorage.setItem('participante', JSON.stringify(result.participante));
  mensaje('Registro exitoso');
  setTimeout(() => location.reload(), 700);
}

async function loginParticipante(e) {
  e.preventDefault();

  const cedula = document.getElementById('loginCedula').value.trim();
  const celular = limpiarCelular(document.getElementById('loginCelular').value);

  const result = await apiPost({
    action: 'loginParticipante',
    cedula,
    celular
  });

  if (!result.ok) {
    mensaje(result.message);
    return;
  }

  localStorage.setItem('participante', JSON.stringify(result.participante));
  mensaje('Ingreso correcto');
  setTimeout(() => location.reload(), 700);
}

function obtenerSesion() {
  return JSON.parse(localStorage.getItem('participante'));
}

async function iniciarQuiniela() {
  const participante = obtenerSesion();

  document.getElementById('acceso').style.display = 'none';
  document.getElementById('miCuenta').style.display = 'block';
  document.getElementById('partidos').style.display = 'block';

  const btnSalir = document.getElementById('btnSalir');
  if (btnSalir) btnSalir.style.display = 'inline-block';

  document.getElementById('participanteActivo').innerHTML = `
    <div class="ranking-card">
      <div class="ranking-left">
        <div class="position">✓</div>
        <div>
          <h3>${participante.nombres} ${participante.apellidos}</h3>
          <p>Usuario: ${participante.cedula}</p>
        </div>
      </div>
      <div class="points">ACTIVO</div>
    </div>
  `;

  await cargarDatos();

  document.getElementById('partidos').scrollIntoView({ behavior:'smooth' });
}

async function cargarDatos() {
  const participante = obtenerSesion();

  let partidosRes = { partidos: [] };
  let fasesRes = { fases: [] };
  let pronosticosRes = { pronosticos: [] };
  let rankingRes = { ranking: [] };

  try {
    partidosRes = await apiPost({ action:'obtenerPartidos' });
    fasesRes = await apiPost({ action:'obtenerFases' });
    pronosticosRes = await apiPost({ action:'obtenerPronosticos', codigo: participante.codigo });
    rankingRes = await apiPost({ action:'obtenerRanking' });
  } catch (error) {
    console.error(error);
  }

  partidosGlobal = partidosRes.partidos && partidosRes.partidos.length ? partidosRes.partidos : FIXTURE_COMPLETO;
  pronosticosGlobal = pronosticosRes.pronosticos || [];

  document.getElementById('totalPartidos').innerText = partidosGlobal.length;
  document.getElementById('totalRanking').innerText = rankingRes.ranking ? rankingRes.ranking.length : 0;

  renderFases(fasesRes.fases && fasesRes.fases.length ? fasesRes.fases : FASES_FALLBACK);
  renderPartidos();
  renderRanking(rankingRes.ranking || []);
}

function renderFases(fases) {
  const contenedor = document.getElementById('faseTabs');
  contenedor.innerHTML = '';

  fases.forEach(fase => {
    const nombre = String(fase.FASE || '').toUpperCase();
    const estado = String(fase.ESTADO || '').toUpperCase();

    const btn = document.createElement('button');
    btn.className = 'filter';
    btn.type = 'button';
    btn.innerText = estado === 'ABIERTA' ? nombre : `${nombre} 🔒`;

    if (nombre === faseActiva) btn.classList.add('active');

    if (estado !== 'ABIERTA') btn.disabled = true;

    btn.addEventListener('click', () => {
      faseActiva = nombre;
      document.querySelectorAll('#faseTabs .filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPartidos();
    });

    contenedor.appendChild(btn);
  });
}

function renderPartidos() {
  const contenedor = document.getElementById('listaPartidos');
  contenedor.innerHTML = '';

  const partidos = partidosGlobal.filter(p => String(p.FASE || '').toUpperCase() === faseActiva);

  if (!partidos.length) {
    contenedor.innerHTML = `<div class="empty-state">No existen partidos para esta fase.</div>`;
    return;
  }

  partidos.forEach(partido => {
    const pronostico = pronosticosGlobal.find(p => String(p.ID_PARTIDO) === String(partido.ID_PARTIDO));
    const estado = String(partido.ESTADO || '').toUpperCase();
    const bloqueado = estado !== 'ABIERTO';

    const estadoClase =
      estado === 'ABIERTO' ? 'status-abierto' :
      estado === 'BLOQUEADO' ? 'status-bloqueado' :
      'status-finalizado';

    const card = document.createElement('div');
    card.className = 'match-card';

    card.innerHTML = `
      <div class="match-header">
        <span>${partido.FASE} · Grupo ${partido.GRUPO || '-'} · ${formatearFecha(partido.FECHA)} · ${partido.HORA || ''}</span>
        <div class="match-status ${estadoClase}">${estado}</div>
      </div>

      <div class="match-teams">
        <div class="team">${equipoHTML(partido.EQUIPO_LOCAL)}</div>
        <div class="vs">VS</div>
        <div class="team">${equipoHTML(partido.EQUIPO_VISITA)}</div>
      </div>

      <div class="match-actions">
        <input type="number" min="0" id="local-${partido.ID_PARTIDO}" value="${pronostico ? pronostico.GOLES_LOCAL : ''}" placeholder="0" ${bloqueado ? 'disabled' : ''}>
        <span class="score-separator">-</span>
        <input type="number" min="0" id="visita-${partido.ID_PARTIDO}" value="${pronostico ? pronostico.GOLES_VISITA : ''}" placeholder="0" ${bloqueado ? 'disabled' : ''}>
        <button onclick="guardarPronostico('${partido.ID_PARTIDO}')" ${bloqueado ? 'disabled' : ''}>${pronostico ? 'Actualizar' : 'Guardar'}</button>
      </div>
    `;

    contenedor.appendChild(card);
  });
}

async function guardarPronostico(idPartido) {
  const participante = obtenerSesion();

  const golesLocal = document.getElementById(`local-${idPartido}`).value;
  const golesVisita = document.getElementById(`visita-${idPartido}`).value;

  if (golesLocal === '' || golesVisita === '') {
    mensaje('Ingresa ambos marcadores');
    return;
  }

  const result = await apiPost({
    action:'guardarPronostico',
    codigo: participante.codigo,
    idPartido,
    golesLocal,
    golesVisita
  });

  mensaje(result.message || 'Pronóstico guardado');

  if (result.ok) await cargarDatos();
}

function renderRanking(ranking) {
  const contenedor = document.getElementById('rankingContainer');
  contenedor.innerHTML = '';

  if (!ranking.length) {
    contenedor.innerHTML = `<div class="empty-state">El ranking aparecerá cuando existan puntajes.</div>`;
    return;
  }

  ranking.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'ranking-card';

    card.innerHTML = `
      <div class="ranking-left">
        <div class="position">${item.POSICION || index + 1}</div>
        <div>
          <h3>${item.CODIGO}</h3>
          <p>Aciertos: ${item.ACIERTOS || 0} · Exactos: ${item.EXACTOS || 0}</p>
        </div>
      </div>
      <div class="points">${item.PUNTOS || 0}</div>
    `;

    contenedor.appendChild(card);
  });
}

function formatearFecha(fecha) {
  if (!fecha) return '';
  try {
    return new Date(fecha).toLocaleDateString('es-EC', {
      day:'2-digit',
      month:'short',
      year:'numeric'
    });
  } catch (error) {
    return fecha;
  }
}
