const marginNetwork = { top: 0, right: 0, bottom: 0, left: 0};
const widthNetwork  = 1300 - marginNetwork.left - marginNetwork.right;
const heightNetwork = 840 - marginNetwork.top  - marginNetwork.bottom;

const zoom = d3.zoom();

const x = 300;
const y = 200;
const scale = 1;
const k = 0.3;

//Create SVG element in chart id element
const svgNetwork = d3.select('#rede_cabelo')
                  .append('svg')
                   .attr("class", "content")
                   .attr("viewBox", `0 0 ${widthNetwork + marginNetwork.left + marginNetwork.right} ${heightNetwork + marginNetwork.top + marginNetwork.bottom}`)
                   .attr("preserveAspectRatio", "none")

var links_data = [{'source': 'MDA', 'target': 'Nicotina', 'count': 555},
 {'source': 'MDA', 'target': 'MDMA', 'count': 401},
 {'source': 'MDA', 'target': 'THC', 'count': 326},
 {'source': 'MDA', 'target': 'Canabinol', 'count': 152},
 {'source': 'MDA', 'target': 'Cocaína', 'count': 138},
 {'source': 'MDA', 'target': 'Ketamina', 'count': 132},
 {'source': 'MDA', 'target': 'Canabidiol', 'count': 109},
 {'source': 'MDA',
  'target': '6-hidroxinorketamina (metabólito ketamina)',
  'count': 94},
 {'source': 'MDA', 'target': 'MDEA/MDDMA (isômeros)', 'count': 74},
 {'source': 'MDA', 'target': 'Cocaetileno', 'count': 70},
 {'source': 'MDA', 'target': 'Norcocaína', 'count': 61},
 {'source': 'MDA', 'target': 'Metanfetamina', 'count': 60},
 {'source': 'MDA', 'target': 'LSD', 'count': 37},
 {'source': 'MDA', 'target': 'Norketamina', 'count': 33},
 {'source': 'MDA', 'target': 'DMT', 'count': 33},
 {'source': 'MDA', 'target': 'Deschloroketamine', 'count': 32},
 {'source': 'MDA', 'target': 'bk-DMBDP (Dipentilona)', 'count': 27},
 {'source': 'MDA', 'target': 'Benzoilecgonina', 'count': 21},
 {'source': 'MDA', 'target': 'ADB-BINACA_ADB-BUTINACA', 'count': 19},
 {'source': 'MDA', 'target': 'Metilona', 'count': 15},
 {'source': 'MDA', 'target': 'AEME', 'count': 10},
 {'source': 'MDA', 'target': '2-fluorodeschloroketamine (2-FDCK)', 'count': 7},
 {'source': 'MDA', 'target': 'Pentilona/Dibutilona (isômeros)', 'count': 6},
 {'source': 'MDA', 'target': '25B-NBOH', 'count': 6},
 {'source': 'MDA', 'target': 'Anfetamina', 'count': 5},
 {'source': 'MDA', 'target': 'Metilfenidato', 'count': 3},
 {'source': 'MDA', 'target': 'Femproporex', 'count': 2},
 {'source': 'MDA', 'target': 'ADB-4en-PINACA', 'count': 2},
 {'source': 'MDA', 'target': 'Psilocina', 'count': 2},
 {'source': 'MDA', 'target': 'MDMB-4en-PINACA', 'count': 2},
 {'source': 'MDA', 'target': '25C-NBOH', 'count': 1},
 {'source': 'Nicotina', 'target': 'MDMA', 'count': 358},
 {'source': 'Nicotina', 'target': 'THC', 'count': 315},
 {'source': 'Nicotina', 'target': 'Canabinol', 'count': 153},
 {'source': 'Nicotina', 'target': 'Cocaína', 'count': 135},
 {'source': 'Nicotina', 'target': 'Ketamina', 'count': 115},
 {'source': 'Nicotina', 'target': 'Canabidiol', 'count': 100},
 {'source': 'Nicotina',
  'target': '6-hidroxinorketamina (metabólito ketamina)',
  'count': 83},
 {'source': 'Nicotina', 'target': 'MDEA/MDDMA (isômeros)', 'count': 64},
 {'source': 'Nicotina', 'target': 'Norcocaína', 'count': 62},
 {'source': 'Nicotina', 'target': 'Cocaetileno', 'count': 58},
 {'source': 'Nicotina', 'target': 'Metanfetamina', 'count': 46},
 {'source': 'Nicotina', 'target': 'Deschloroketamine', 'count': 34},
 {'source': 'Nicotina', 'target': 'bk-DMBDP (Dipentilona)', 'count': 31},
 {'source': 'Nicotina', 'target': 'Norketamina', 'count': 29},
 {'source': 'Nicotina', 'target': 'LSD', 'count': 29},
 {'source': 'Nicotina', 'target': 'DMT', 'count': 23},
 {'source': 'Nicotina', 'target': 'Benzoilecgonina', 'count': 22},
 {'source': 'Nicotina', 'target': 'ADB-BINACA_ADB-BUTINACA', 'count': 21},
 {'source': 'Nicotina', 'target': 'Metilona', 'count': 15},
 {'source': 'Nicotina', 'target': 'AEME', 'count': 12},
 {'source': 'Nicotina',
  'target': '2-fluorodeschloroketamine (2-FDCK)',
  'count': 12},
 {'source': 'Nicotina',
  'target': 'Pentilona/Dibutilona (isômeros)',
  'count': 7},
 {'source': 'Nicotina', 'target': 'Metilfenidato', 'count': 5},
 {'source': 'Nicotina', 'target': 'Anfetamina', 'count': 4},
 {'source': 'Nicotina', 'target': 'MDMB-4en-PINACA', 'count': 3},
 {'source': 'Nicotina', 'target': 'ADB-4en-PINACA', 'count': 2},
 {'source': 'Nicotina', 'target': '25B-NBOH', 'count': 2},
 {'source': 'Nicotina', 'target': 'Psilocina', 'count': 1},
 {'source': 'Nicotina', 'target': 'Femproporex', 'count': 1},
 {'source': 'Nicotina', 'target': '5F-BZO-POXIZID', 'count': 1},
 {'source': 'Nicotina', 'target': 'Adamantyl-CHMINACA', 'count': 1},
 {'source': 'Nicotina', 'target': 'ADB-HEXOXIZID (MDA-19)', 'count': 1},
 {'source': 'Nicotina', 'target': 'ADB-HEXINACA', 'count': 1},
 {'source': 'Nicotina', 'target': '4F-MDMB-BUTICA', 'count': 1},
 {'source': 'Nicotina', 'target': '5F-EMB-PICA', 'count': 1},
 {'source': 'MDMA', 'target': 'THC', 'count': 202},
 {'source': 'MDMA', 'target': 'Canabinol', 'count': 103},
 {'source': 'MDMA', 'target': 'Ketamina', 'count': 103},
 {'source': 'MDMA', 'target': 'Cocaína', 'count': 98},
 {'source': 'MDMA', 'target': 'MDEA/MDDMA (isômeros)', 'count': 78},
 {'source': 'MDMA', 'target': 'Canabidiol', 'count': 76},
 {'source': 'MDMA',
  'target': '6-hidroxinorketamina (metabólito ketamina)',
  'count': 74},
 {'source': 'MDMA', 'target': 'Norcocaína', 'count': 48},
 {'source': 'MDMA', 'target': 'Metanfetamina', 'count': 46},
 {'source': 'MDMA', 'target': 'Cocaetileno', 'count': 39},
 {'source': 'MDMA', 'target': 'LSD', 'count': 33},
 {'source': 'MDMA', 'target': 'Norketamina', 'count': 26},
 {'source': 'MDMA', 'target': 'DMT', 'count': 24},
 {'source': 'MDMA', 'target': 'Deschloroketamine', 'count': 23},
 {'source': 'MDMA', 'target': 'bk-DMBDP (Dipentilona)', 'count': 20},
 {'source': 'MDMA', 'target': 'Metilona', 'count': 17},
 {'source': 'MDMA', 'target': 'Benzoilecgonina', 'count': 15},
 {'source': 'MDMA', 'target': 'ADB-BINACA_ADB-BUTINACA', 'count': 10},
 {'source': 'MDMA',
  'target': '2-fluorodeschloroketamine (2-FDCK)',
  'count': 8},
 {'source': 'MDMA', 'target': 'AEME', 'count': 8},
 {'source': 'MDMA', 'target': 'Pentilona/Dibutilona (isômeros)', 'count': 6},
 {'source': 'MDMA', 'target': 'Anfetamina', 'count': 5},
 {'source': 'MDMA', 'target': 'Metilfenidato', 'count': 4},
 {'source': 'MDMA', 'target': '25B-NBOH', 'count': 3},
 {'source': 'MDMA', 'target': 'Femproporex', 'count': 2},
 {'source': 'MDMA', 'target': 'MDMB-4en-PINACA', 'count': 2},
 {'source': 'MDMA', 'target': 'ADB-4en-PINACA', 'count': 2},
 {'source': 'THC', 'target': 'Canabinol', 'count': 204},
 {'source': 'THC', 'target': 'Canabidiol', 'count': 124},
 {'source': 'THC', 'target': 'Cocaína', 'count': 86},
 {'source': 'THC', 'target': 'Ketamina', 'count': 80},
 {'source': 'THC',
  'target': '6-hidroxinorketamina (metabólito ketamina)',
  'count': 55},
 {'source': 'THC', 'target': 'Cocaetileno', 'count': 39},
 {'source': 'THC', 'target': 'Norcocaína', 'count': 38},
 {'source': 'THC', 'target': 'MDEA/MDDMA (isômeros)', 'count': 37},
 {'source': 'THC', 'target': 'Metanfetamina', 'count': 27},
 {'source': 'THC', 'target': 'LSD', 'count': 27},
 {'source': 'THC', 'target': 'DMT', 'count': 26},
 {'source': 'THC', 'target': 'Deschloroketamine', 'count': 20},
 {'source': 'THC', 'target': 'Norketamina', 'count': 19},
 {'source': 'THC', 'target': 'bk-DMBDP (Dipentilona)', 'count': 17},
 {'source': 'THC', 'target': 'Benzoilecgonina', 'count': 13},
 {'source': 'THC', 'target': 'ADB-BINACA_ADB-BUTINACA', 'count': 11},
 {'source': 'THC', 'target': 'Metilona', 'count': 9},
 {'source': 'THC', 'target': '2-fluorodeschloroketamine (2-FDCK)', 'count': 8},
 {'source': 'THC', 'target': 'AEME', 'count': 7},
 {'source': 'THC', 'target': 'Pentilona/Dibutilona (isômeros)', 'count': 6},
 {'source': 'THC', 'target': 'Anfetamina', 'count': 4},
 {'source': 'THC', 'target': 'Metilfenidato', 'count': 2},
 {'source': 'THC', 'target': '25B-NBOH', 'count': 2},
 {'source': 'THC', 'target': 'Psilocina', 'count': 2},
 {'source': 'THC', 'target': '25E-NBOH', 'count': 2},
 {'source': 'THC', 'target': 'Femproporex', 'count': 1},
 {'source': 'THC', 'target': '25C-NBOH', 'count': 1},
 {'source': 'THC', 'target': '4F-MDMB-BUTICA', 'count': 1},
 {'source': 'THC', 'target': '5F-BZO-POXIZID', 'count': 1},
 {'source': 'THC', 'target': 'Adamantyl-CHMINACA', 'count': 1},
 {'source': 'THC', 'target': 'ADB-HEXOXIZID (MDA-19)', 'count': 1},
 {'source': 'THC', 'target': 'ADB-HEXINACA', 'count': 1},
 {'source': 'THC', 'target': '5F-EMB-PICA', 'count': 1},
 {'source': 'THC', 'target': 'MDMB-4en-PINACA', 'count': 1},
 {'source': 'Canabinol', 'target': 'Canabidiol', 'count': 96},
 {'source': 'Canabinol', 'target': 'Ketamina', 'count': 42},
 {'source': 'Canabinol', 'target': 'Cocaína', 'count': 37},
 {'source': 'Canabinol',
  'target': '6-hidroxinorketamina (metabólito ketamina)',
  'count': 31},
 {'source': 'Canabinol', 'target': 'MDEA/MDDMA (isômeros)', 'count': 21},
 {'source': 'Canabinol', 'target': 'LSD', 'count': 16},
 {'source': 'Canabinol', 'target': 'DMT', 'count': 16},
 {'source': 'Canabinol', 'target': 'Cocaetileno', 'count': 16},
 {'source': 'Canabinol', 'target': 'Metanfetamina', 'count': 14},
 {'source': 'Canabinol', 'target': 'Norcocaína', 'count': 14},
 {'source': 'Canabinol', 'target': 'bk-DMBDP (Dipentilona)', 'count': 11},
 {'source': 'Canabinol', 'target': 'Norketamina', 'count': 9},
 {'source': 'Canabinol', 'target': 'Deschloroketamine', 'count': 9},
 {'source': 'Canabinol', 'target': 'Metilona', 'count': 6},
 {'source': 'Canabinol', 'target': 'Benzoilecgonina', 'count': 5},
 {'source': 'Canabinol',
  'target': 'Pentilona/Dibutilona (isômeros)',
  'count': 4},
 {'source': 'Canabinol', 'target': 'ADB-BINACA_ADB-BUTINACA', 'count': 4},
 {'source': 'Canabinol', 'target': 'AEME', 'count': 3},
 {'source': 'Canabinol',
  'target': '2-fluorodeschloroketamine (2-FDCK)',
  'count': 3},
 {'source': 'Canabinol', 'target': '25B-NBOH', 'count': 2},
 {'source': 'Canabinol', 'target': 'Anfetamina', 'count': 1},
 {'source': 'Canabinol', 'target': '25E-NBOH', 'count': 1},
 {'source': 'Canabinol', 'target': 'Femproporex', 'count': 1},
 {'source': 'Canabinol', 'target': 'Psilocina', 'count': 1},
 {'source': 'Canabinol', 'target': '5F-BZO-POXIZID', 'count': 1},
 {'source': 'Canabinol', 'target': 'Adamantyl-CHMINACA', 'count': 1},
 {'source': 'Canabinol', 'target': 'ADB-HEXOXIZID (MDA-19)', 'count': 1},
 {'source': 'Canabinol', 'target': 'ADB-HEXINACA', 'count': 1},
 {'source': 'Canabinol', 'target': '4F-MDMB-BUTICA', 'count': 1},
 {'source': 'Canabinol', 'target': 'Metilfenidato', 'count': 1},
 {'source': 'Cocaína', 'target': 'Cocaetileno', 'count': 78},
 {'source': 'Cocaína', 'target': 'Norcocaína', 'count': 72},
 {'source': 'Cocaína', 'target': 'Ketamina', 'count': 52},
 {'source': 'Cocaína',
  'target': '6-hidroxinorketamina (metabólito ketamina)',
  'count': 36},
 {'source': 'Cocaína', 'target': 'Canabidiol', 'count': 27},
 {'source': 'Cocaína', 'target': 'Benzoilecgonina', 'count': 25},
 {'source': 'Cocaína', 'target': 'Metanfetamina', 'count': 18},
 {'source': 'Cocaína', 'target': 'MDEA/MDDMA (isômeros)', 'count': 17},
 {'source': 'Cocaína', 'target': 'Norketamina', 'count': 15},
 {'source': 'Cocaína', 'target': 'DMT', 'count': 12},
 {'source': 'Cocaína', 'target': 'AEME', 'count': 11},
 {'source': 'Cocaína', 'target': 'LSD', 'count': 10},
 {'source': 'Cocaína', 'target': 'bk-DMBDP (Dipentilona)', 'count': 8},
 {'source': 'Cocaína', 'target': 'Deschloroketamine', 'count': 8},
 {'source': 'Cocaína',
  'target': '2-fluorodeschloroketamine (2-FDCK)',
  'count': 6},
 {'source': 'Cocaína', 'target': 'ADB-BINACA_ADB-BUTINACA', 'count': 5},
 {'source': 'Cocaína', 'target': 'Metilona', 'count': 4},
 {'source': 'Cocaína', 'target': 'Metilfenidato', 'count': 4},
 {'source': 'Cocaína',
  'target': 'Pentilona/Dibutilona (isômeros)',
  'count': 3},
 {'source': 'Cocaína', 'target': 'MDMB-4en-PINACA', 'count': 2},
 {'source': 'Cocaína', 'target': 'ADB-4en-PINACA', 'count': 1},
 {'source': 'Cocaína', 'target': 'Psilocina', 'count': 1},
 {'source': 'Cocaína', 'target': '5F-EMB-PICA', 'count': 1},
 {'source': 'Cocaína', 'target': '25B-NBOH', 'count': 1},
 {'source': 'Cocaína', 'target': 'Anfetamina', 'count': 1},
 {'source': 'Ketamina',
  'target': '6-hidroxinorketamina (metabólito ketamina)',
  'count': 94},
 {'source': 'Ketamina', 'target': 'Canabidiol', 'count': 33},
 {'source': 'Ketamina', 'target': 'Norketamina', 'count': 32},
 {'source': 'Ketamina', 'target': 'Norcocaína', 'count': 30},
 {'source': 'Ketamina', 'target': 'Cocaetileno', 'count': 26},
 {'source': 'Ketamina', 'target': 'DMT', 'count': 23},
 {'source': 'Ketamina', 'target': 'MDEA/MDDMA (isômeros)', 'count': 20},
 {'source': 'Ketamina', 'target': 'LSD', 'count': 18},
 {'source': 'Ketamina', 'target': 'Benzoilecgonina', 'count': 13},
 {'source': 'Ketamina', 'target': 'Metanfetamina', 'count': 13},
 {'source': 'Ketamina', 'target': 'AEME', 'count': 9},
 {'source': 'Ketamina', 'target': 'ADB-BINACA_ADB-BUTINACA', 'count': 7},
 {'source': 'Ketamina', 'target': 'Metilona', 'count': 6},
 {'source': 'Ketamina', 'target': 'Deschloroketamine', 'count': 4},
 {'source': 'Ketamina', 'target': 'Anfetamina', 'count': 3},
 {'source': 'Ketamina',
  'target': '2-fluorodeschloroketamine (2-FDCK)',
  'count': 3},
 {'source': 'Ketamina', 'target': 'MDMB-4en-PINACA', 'count': 2},
 {'source': 'Ketamina', 'target': 'ADB-4en-PINACA', 'count': 2},
 {'source': 'Ketamina', 'target': 'bk-DMBDP (Dipentilona)', 'count': 2},
 {'source': 'Ketamina', 'target': '25B-NBOH', 'count': 1},
 {'source': 'Ketamina', 'target': 'Femproporex', 'count': 1},
 {'source': 'Ketamina', 'target': '25C-NBOH', 'count': 1},
 {'source': 'Ketamina', 'target': 'Metilfenidato', 'count': 1},
 {'source': 'Ketamina',
  'target': 'Pentilona/Dibutilona (isômeros)',
  'count': 1},
 {'source': 'Canabidiol',
  'target': '6-hidroxinorketamina (metabólito ketamina)',
  'count': 22},
 {'source': 'Canabidiol', 'target': 'Norcocaína', 'count': 17},
 {'source': 'Canabidiol', 'target': 'DMT', 'count': 15},
 {'source': 'Canabidiol', 'target': 'MDEA/MDDMA (isômeros)', 'count': 14},
 {'source': 'Canabidiol', 'target': 'Cocaetileno', 'count': 13},
 {'source': 'Canabidiol', 'target': 'LSD', 'count': 12},
 {'source': 'Canabidiol', 'target': 'Metanfetamina', 'count': 11},
 {'source': 'Canabidiol', 'target': 'Norketamina', 'count': 6},
 {'source': 'Canabidiol', 'target': 'Benzoilecgonina', 'count': 5},
 {'source': 'Canabidiol', 'target': 'Metilona', 'count': 5},
 {'source': 'Canabidiol', 'target': 'AEME', 'count': 5},
 {'source': 'Canabidiol', 'target': 'ADB-BINACA_ADB-BUTINACA', 'count': 4},
 {'source': 'Canabidiol', 'target': 'Deschloroketamine', 'count': 3},
 {'source': 'Canabidiol',
  'target': '2-fluorodeschloroketamine (2-FDCK)',
  'count': 2},
 {'source': 'Canabidiol', 'target': 'bk-DMBDP (Dipentilona)', 'count': 2},
 {'source': 'Canabidiol', 'target': 'Psilocina', 'count': 2},
 {'source': 'Canabidiol',
  'target': 'Pentilona/Dibutilona (isômeros)',
  'count': 2},
 {'source': 'Canabidiol', 'target': 'Anfetamina', 'count': 1},
 {'source': 'Canabidiol', 'target': 'Metilfenidato', 'count': 1},
 {'source': '6-hidroxinorketamina (metabólito ketamina)',
  'target': 'Norketamina',
  'count': 31},
 {'source': '6-hidroxinorketamina (metabólito ketamina)',
  'target': 'Norcocaína',
  'count': 22},
 {'source': '6-hidroxinorketamina (metabólito ketamina)',
  'target': 'DMT',
  'count': 20},
 {'source': '6-hidroxinorketamina (metabólito ketamina)',
  'target': 'Cocaetileno',
  'count': 18},
 {'source': '6-hidroxinorketamina (metabólito ketamina)',
  'target': 'LSD',
  'count': 16},
 {'source': '6-hidroxinorketamina (metabólito ketamina)',
  'target': 'MDEA/MDDMA (isômeros)',
  'count': 14},
 {'source': '6-hidroxinorketamina (metabólito ketamina)',
  'target': 'Benzoilecgonina',
  'count': 10},
 {'source': '6-hidroxinorketamina (metabólito ketamina)',
  'target': 'Metanfetamina',
  'count': 9},
 {'source': '6-hidroxinorketamina (metabólito ketamina)',
  'target': 'AEME',
  'count': 7},
 {'source': '6-hidroxinorketamina (metabólito ketamina)',
  'target': 'Metilona',
  'count': 3},
 {'source': '6-hidroxinorketamina (metabólito ketamina)',
  'target': 'ADB-BINACA_ADB-BUTINACA',
  'count': 3},
 {'source': '6-hidroxinorketamina (metabólito ketamina)',
  'target': 'Anfetamina',
  'count': 3},
 {'source': '6-hidroxinorketamina (metabólito ketamina)',
  'target': 'Deschloroketamine',
  'count': 2},
 {'source': '6-hidroxinorketamina (metabólito ketamina)',
  'target': 'ADB-4en-PINACA',
  'count': 2},
 {'source': '6-hidroxinorketamina (metabólito ketamina)',
  'target': '2-fluorodeschloroketamine (2-FDCK)',
  'count': 2},
 {'source': '6-hidroxinorketamina (metabólito ketamina)',
  'target': 'MDMB-4en-PINACA',
  'count': 2},
 {'source': '6-hidroxinorketamina (metabólito ketamina)',
  'target': 'Femproporex',
  'count': 1},
 {'source': '6-hidroxinorketamina (metabólito ketamina)',
  'target': '25C-NBOH',
  'count': 1},
 {'source': '6-hidroxinorketamina (metabólito ketamina)',
  'target': 'Pentilona/Dibutilona (isômeros)',
  'count': 1},
 {'source': '6-hidroxinorketamina (metabólito ketamina)',
  'target': 'bk-DMBDP (Dipentilona)',
  'count': 1},
 {'source': '6-hidroxinorketamina (metabólito ketamina)',
  'target': '25B-NBOH',
  'count': 1},
 {'source': 'Cocaetileno', 'target': 'Norcocaína', 'count': 46},
 {'source': 'Cocaetileno', 'target': 'Benzoilecgonina', 'count': 20},
 {'source': 'Cocaetileno', 'target': 'Metanfetamina', 'count': 11},
 {'source': 'Cocaetileno', 'target': 'AEME', 'count': 11},
 {'source': 'Cocaetileno', 'target': 'Norketamina', 'count': 10},
 {'source': 'Cocaetileno', 'target': 'DMT', 'count': 7},
 {'source': 'Cocaetileno', 'target': 'LSD', 'count': 6},
 {'source': 'Cocaetileno', 'target': 'MDEA/MDDMA (isômeros)', 'count': 5},
 {'source': 'Cocaetileno', 'target': 'bk-DMBDP (Dipentilona)', 'count': 3},
 {'source': 'Cocaetileno', 'target': 'Metilfenidato', 'count': 2},
 {'source': 'Cocaetileno', 'target': 'MDMB-4en-PINACA', 'count': 2},
 {'source': 'Cocaetileno', 'target': 'Deschloroketamine', 'count': 2},
 {'source': 'Cocaetileno',
  'target': '2-fluorodeschloroketamine (2-FDCK)',
  'count': 2},
 {'source': 'Cocaetileno', 'target': 'Psilocina', 'count': 1},
 {'source': 'Cocaetileno', 'target': 'ADB-4en-PINACA', 'count': 1},
 {'source': 'Cocaetileno', 'target': 'Metilona', 'count': 1},
 {'source': 'Cocaetileno', 'target': '5F-EMB-PICA', 'count': 1},
 {'source': 'Cocaetileno', 'target': '25B-NBOH', 'count': 1},
 {'source': 'Cocaetileno', 'target': 'ADB-BINACA_ADB-BUTINACA', 'count': 1},
 {'source': 'Cocaetileno', 'target': 'Anfetamina', 'count': 1},
 {'source': 'MDEA/MDDMA (isômeros)', 'target': 'Metilona', 'count': 15},
 {'source': 'MDEA/MDDMA (isômeros)', 'target': 'Metanfetamina', 'count': 10},
 {'source': 'MDEA/MDDMA (isômeros)', 'target': 'Norcocaína', 'count': 9},
 {'source': 'MDEA/MDDMA (isômeros)', 'target': 'DMT', 'count': 4},
 {'source': 'MDEA/MDDMA (isômeros)', 'target': 'LSD', 'count': 4},
 {'source': 'MDEA/MDDMA (isômeros)',
  'target': 'bk-DMBDP (Dipentilona)',
  'count': 4},
 {'source': 'MDEA/MDDMA (isômeros)',
  'target': 'Deschloroketamine',
  'count': 3},
 {'source': 'MDEA/MDDMA (isômeros)', 'target': 'Norketamina', 'count': 2},
 {'source': 'MDEA/MDDMA (isômeros)', 'target': 'ADB-4en-PINACA', 'count': 2},
 {'source': 'MDEA/MDDMA (isômeros)', 'target': 'Anfetamina', 'count': 2},
 {'source': 'MDEA/MDDMA (isômeros)', 'target': 'MDMB-4en-PINACA', 'count': 2},
 {'source': 'MDEA/MDDMA (isômeros)', 'target': 'Benzoilecgonina', 'count': 1},
 {'source': 'MDEA/MDDMA (isômeros)',
  'target': 'ADB-BINACA_ADB-BUTINACA',
  'count': 1},
 {'source': 'Norcocaína', 'target': 'Benzoilecgonina', 'count': 22},
 {'source': 'Norcocaína', 'target': 'Norketamina', 'count': 12},
 {'source': 'Norcocaína', 'target': 'AEME', 'count': 11},
 {'source': 'Norcocaína', 'target': 'Metanfetamina', 'count': 9},
 {'source': 'Norcocaína', 'target': 'DMT', 'count': 9},
 {'source': 'Norcocaína', 'target': 'LSD', 'count': 4},
 {'source': 'Norcocaína', 'target': 'bk-DMBDP (Dipentilona)', 'count': 3},
 {'source': 'Norcocaína',
  'target': '2-fluorodeschloroketamine (2-FDCK)',
  'count': 2},
 {'source': 'Norcocaína', 'target': 'Metilfenidato', 'count': 2},
 {'source': 'Norcocaína', 'target': 'Deschloroketamine', 'count': 2},
 {'source': 'Norcocaína', 'target': 'Metilona', 'count': 2},
 {'source': 'Norcocaína', 'target': 'Psilocina', 'count': 1},
 {'source': 'Norcocaína', 'target': 'ADB-BINACA_ADB-BUTINACA', 'count': 1},
 {'source': 'Norcocaína', 'target': 'Anfetamina', 'count': 1},
 {'source': 'Metanfetamina', 'target': 'LSD', 'count': 10},
 {'source': 'Metanfetamina', 'target': 'Deschloroketamine', 'count': 5},
 {'source': 'Metanfetamina', 'target': 'DMT', 'count': 4},
 {'source': 'Metanfetamina', 'target': 'Norketamina', 'count': 4},
 {'source': 'Metanfetamina', 'target': 'Benzoilecgonina', 'count': 4},
 {'source': 'Metanfetamina', 'target': 'Anfetamina', 'count': 3},
 {'source': 'Metanfetamina', 'target': 'bk-DMBDP (Dipentilona)', 'count': 3},
 {'source': 'Metanfetamina', 'target': 'AEME', 'count': 2},
 {'source': 'Metanfetamina', 'target': 'ADB-BINACA_ADB-BUTINACA', 'count': 2},
 {'source': 'Metanfetamina', 'target': 'Metilona', 'count': 2},
 {'source': 'Metanfetamina', 'target': 'Psilocina', 'count': 1},
 {'source': 'Metanfetamina', 'target': 'Femproporex', 'count': 1},
 {'source': 'Metanfetamina', 'target': '25B-NBOH', 'count': 1},
 {'source': 'Metanfetamina', 'target': 'Metilfenidato', 'count': 1},
 {'source': 'Metanfetamina',
  'target': '2-fluorodeschloroketamine (2-FDCK)',
  'count': 1},
 {'source': 'LSD', 'target': 'Norketamina', 'count': 11},
 {'source': 'LSD', 'target': 'DMT', 'count': 4},
 {'source': 'LSD', 'target': 'Benzoilecgonina', 'count': 2},
 {'source': 'LSD', 'target': 'Anfetamina', 'count': 1},
 {'source': 'LSD', 'target': 'Metilona', 'count': 1},
 {'source': 'LSD', 'target': 'AEME', 'count': 1},
 {'source': 'LSD', 'target': '25B-NBOH', 'count': 1},
 {'source': 'LSD', 'target': 'Deschloroketamine', 'count': 1},
 {'source': 'Deschloroketamine',
  'target': '2-fluorodeschloroketamine (2-FDCK)',
  'count': 14},
 {'source': 'Deschloroketamine', 'target': 'Norketamina', 'count': 4},
 {'source': 'Deschloroketamine',
  'target': 'ADB-BINACA_ADB-BUTINACA',
  'count': 3},
 {'source': 'Deschloroketamine', 'target': 'Metilfenidato', 'count': 1},
 {'source': 'Deschloroketamine',
  'target': 'bk-DMBDP (Dipentilona)',
  'count': 1},
 {'source': 'Deschloroketamine', 'target': 'Metilona', 'count': 1},
 {'source': 'Norketamina', 'target': 'DMT', 'count': 6},
 {'source': 'Norketamina', 'target': 'Benzoilecgonina', 'count': 5},
 {'source': 'Norketamina', 'target': 'AEME', 'count': 2},
 {'source': 'Norketamina', 'target': 'Metilona', 'count': 1},
 {'source': 'Norketamina', 'target': 'Anfetamina', 'count': 1},
 {'source': 'DMT', 'target': 'AEME', 'count': 3},
 {'source': 'DMT', 'target': 'Benzoilecgonina', 'count': 3},
 {'source': 'DMT', 'target': 'Metilona', 'count': 2},
 {'source': 'DMT', 'target': 'Femproporex', 'count': 1},
 {'source': 'bk-DMBDP (Dipentilona)',
  'target': 'Pentilona/Dibutilona (isômeros)',
  'count': 12},
 {'source': 'bk-DMBDP (Dipentilona)', 'target': 'Metilona', 'count': 2},
 {'source': 'bk-DMBDP (Dipentilona)', 'target': 'Benzoilecgonina', 'count': 1},
 {'source': 'bk-DMBDP (Dipentilona)',
  'target': '2-fluorodeschloroketamine (2-FDCK)',
  'count': 1},
 {'source': 'Benzoilecgonina', 'target': 'AEME', 'count': 7},
 {'source': 'Benzoilecgonina',
  'target': '2-fluorodeschloroketamine (2-FDCK)',
  'count': 1},
 {'source': 'Benzoilecgonina',
  'target': 'ADB-BINACA_ADB-BUTINACA',
  'count': 1},
 {'source': 'Benzoilecgonina', 'target': 'Anfetamina', 'count': 1},
 {'source': 'ADB-BINACA_ADB-BUTINACA', 'target': '25C-NBOH', 'count': 1},
 {'source': 'ADB-BINACA_ADB-BUTINACA', 'target': 'Metilona', 'count': 1},
 {'source': '2-fluorodeschloroketamine (2-FDCK)',
  'target': 'AEME',
  'count': 1},
 {'source': '2-fluorodeschloroketamine (2-FDCK)',
  'target': 'Metilfenidato',
  'count': 1},
 {'source': 'MDMB-4en-PINACA', 'target': 'ADB-4en-PINACA', 'count': 2},
 {'source': 'MDMB-4en-PINACA', 'target': '5F-EMB-PICA', 'count': 1},
 {'source': '4F-MDMB-BUTICA', 'target': '5F-BZO-POXIZID', 'count': 1},
 {'source': '4F-MDMB-BUTICA', 'target': 'Adamantyl-CHMINACA', 'count': 1},
 {'source': '4F-MDMB-BUTICA', 'target': 'ADB-HEXOXIZID (MDA-19)', 'count': 1},
 {'source': '4F-MDMB-BUTICA', 'target': 'ADB-HEXINACA', 'count': 1},
 {'source': '5F-BZO-POXIZID', 'target': 'ADB-HEXINACA', 'count': 1},
 {'source': '5F-BZO-POXIZID', 'target': 'Adamantyl-CHMINACA', 'count': 1},
 {'source': '5F-BZO-POXIZID', 'target': 'ADB-HEXOXIZID (MDA-19)', 'count': 1},
 {'source': 'Adamantyl-CHMINACA', 'target': 'ADB-HEXINACA', 'count': 1},
 {'source': 'Adamantyl-CHMINACA',
  'target': 'ADB-HEXOXIZID (MDA-19)',
  'count': 1},
 {'source': 'ADB-HEXOXIZID (MDA-19)', 'target': 'ADB-HEXINACA', 'count': 1}];

var nodes_data = [{'name': 'MDA', 'degree': 31, 'total': 31},
 {'name': 'Nicotina', 'degree': 36, 'total': 36},
 {'name': 'MDMA', 'degree': 29, 'total': 29},
 {'name': 'THC', 'degree': 37, 'total': 37},
 {'name': 'Canabinol', 'degree': 34, 'total': 34},
 {'name': 'Cocaína', 'degree': 30, 'total': 30},
 {'name': 'Ketamina', 'degree': 30, 'total': 30},
 {'name': 'Canabidiol', 'degree': 26, 'total': 26},
 {'name': '6-hidroxinorketamina (metabólito ketamina)',
  'degree': 29,
  'total': 29},
 {'name': 'Cocaetileno', 'degree': 29, 'total': 29},
 {'name': 'MDEA/MDDMA (isômeros)', 'degree': 23, 'total': 23},
 {'name': 'Norcocaína', 'degree': 25, 'total': 25},
 {'name': 'Metanfetamina', 'degree': 27, 'total': 27},
 {'name': 'LSD', 'degree': 21, 'total': 21},
 {'name': 'Deschloroketamine', 'degree': 20, 'total': 20},
 {'name': 'Norketamina', 'degree': 20, 'total': 20},
 {'name': 'DMT', 'degree': 19, 'total': 19},
 {'name': 'bk-DMBDP (Dipentilona)', 'degree': 18, 'total': 18},
 {'name': 'Benzoilecgonina', 'degree': 21, 'total': 21},
 {'name': 'ADB-BINACA_ADB-BUTINACA', 'degree': 17, 'total': 17},
 {'name': 'Metilona', 'degree': 19, 'total': 19},
 {'name': '2-fluorodeschloroketamine (2-FDCK)', 'degree': 17, 'total': 17},
 {'name': 'Pentilona/Dibutilona (isômeros)', 'degree': 10, 'total': 10},
 {'name': 'AEME', 'degree': 17, 'total': 17},
 {'name': '25B-NBOH', 'degree': 11, 'total': 11},
 {'name': 'Anfetamina', 'degree': 16, 'total': 16},
 {'name': 'Metilfenidato', 'degree': 13, 'total': 13},
 {'name': 'MDMB-4en-PINACA', 'degree': 11, 'total': 11},
 {'name': 'Femproporex', 'degree': 9, 'total': 9},
 {'name': 'ADB-4en-PINACA', 'degree': 9, 'total': 9},
 {'name': 'Psilocina', 'degree': 9, 'total': 9},
 {'name': '25E-NBOH', 'degree': 2, 'total': 2},
 {'name': '25C-NBOH', 'degree': 5, 'total': 5},
 {'name': '4F-MDMB-BUTICA', 'degree': 7, 'total': 7},
 {'name': '5F-BZO-POXIZID', 'degree': 7, 'total': 7},
 {'name': 'Adamantyl-CHMINACA', 'degree': 7, 'total': 7},
 {'name': 'ADB-HEXOXIZID (MDA-19)', 'degree': 7, 'total': 7},
 {'name': 'ADB-HEXINACA', 'degree': 7, 'total': 7},
 {'name': '5F-EMB-PICA', 'degree': 5, 'total': 5}];

var nodeSizeScale = d3.scaleLinear()
  .domain(d3.extent(nodes_data, d => d.total))
  .range([1, 50]);

var linkSizeScale = d3.scaleLinear()
  .domain(d3.extent(links_data, d => d.count))
  .range([1, 28]);

var linkColourScale = d3.scaleSequential()
  .domain(d3.extent(links_data, d => d.count))
  .interpolator(d3.interpolateReds);

var radius = 10;
var simulation = d3.forceSimulation()
          .nodes(nodes_data);
                              
var link_force =  d3.forceLink(links_data)
          .id(function(d) {return d.name;})
          .distance(100);

var charge_force = d3.forceManyBody()
    .strength(-1500)
    .distanceMin(35)
    .distanceMax(500);    

var center_force = d3.forceCenter(widthNetwork / 2, heightNetwork / 2);  

simulation
    .force("charge_force", charge_force)
    .force("center_force", center_force)
    .force("link",link_force);
  
simulation.on("tick", tickActions);

// add encompassing group for the zoom 
var g = svgNetwork.append("g")
    .attr("class", "everything");

// add the curved links to our graphic
var link = g.selectAll(".link")
    .data(links_data)
    .enter()
    .append("path")
    .attr("class", "link")
    .style('stroke', d => {return linkColourScale(d.degree);})
    .style("stroke-opacity", d => {return 1 - 1/d.count;})
    .attr('stroke-width', d => {return linkSizeScale(d.degree);})
    // .attr("marker-end", function(d) {
    //     if(JSON.stringify(d.target) !== JSON.stringify(d.source))
    //        return "url(#dominating)";
    // });

var marker = g.selectAll("marker")
    .data(["dominating"])
    .enter()
    .append("marker")
    .attr('markerUnits', 'userSpaceOnUse')
    .attr("id", function (d) { return d;})
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 0)
    .attr("refY", 0)
    .attr("markerWidth", 12)
    .attr("markerHeight", 12)
    .attr("orient", "auto-start-reverse")
    .style("pointer-events", "none")
    .append("path")
    .attr("d", "M0,-5L10,0L0,5")
    .attr('fill-opacity', 1)
    .attr("fill", "#d9595a");

// draw circles for the nodes 
var node = g.append("g")
        .attr("class", "nodes") 
        .selectAll("circle")
        .data(nodes_data)
        .enter()
        .append("circle")
        .attr("r", d => {return nodeSizeScale(d.total/1.3);})
        .attr("fill", "#8f8f8f")
        // .attr("stroke", "#000000")
        .attr("stroke-width", "1.8px")
        .style('fill-opacity', 1)
        .attr("stroke-opacity", 1)
        .on("mouseover", mouseOver(0))
        .on("mouseout", mouseOut);

var text = g.append("g")
    .attr("class", "labels")
    .selectAll("text")
    .data(nodes_data)
    .enter().append("text")
    .style("text-anchor","middle")
    .style("font-weight", "bold")
    .style("font-size", 18)
    .style("opacity", 0.8)
    .style("pointer-events", "none")
    .attr("dy", ".35em")
    // .attr("stroke", "#000000")
    // .attr("stroke-width", "1.5px")
    .style("fill", "#000000")
    .text(function(d) {return d.name});

var drag_handler = d3.drag()
  .on("start", drag_start)
  .on("drag",  drag_drag)
  .on("end",   drag_end); 

drag_handler(node);

var zoom_handler = d3.zoom()
    .on("zoom", zoom_actions);

zoom_handler(svgNetwork);     

function drag_start(event, d) {
 if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function drag_drag(event, d) {
  d.fx = event.x;
  d.fy = event.y;
}

function drag_end(event, d) {
  if (!event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

function zoom_actions(event, d){
    g.attr("transform", event.transform)
}

function tickActions() {
    //update circle positions each tick of the simulation 
       node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
        
    //update link positions 
    link.attr("d", positionLink1);
      link.filter(function(d){ return JSON.stringify(d.target) !== JSON.stringify(d.source); })
      .attr("d",positionLink2);

    text.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; });
}

function positionLink1(d) {
    var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
    return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
}

function positionLink2(d) {
        // length of current path
    var pl = this.getTotalLength(),
        // radius of circle plus marker head
        r = nodeSizeScale(d.target.total/2) + 1, //12 is the "size" of the marker Math.sqrt(12**2 + 12 **2)
        // position close to where path intercepts circle   
        m = this.getPointAtLength(pl - r);          

     var dx = m.x - d.source.x,
        dy = m.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);

      return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + m.x + "," + m.y;
}

var linkedByIndex = {};
links_data.forEach(function(d) {
    linkedByIndex[d.source.index + "," + d.target.index] = 1;
});

function isConnected(a, b) {
    return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
}

function isConnected2(a, b) {
    return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index];
}

var tooltipNetwork = d3.select("#rede_cabelo").append("div")
                            .attr("class", "tooltip-html")
                            .style("opacity", 0); 

function mouseOver(opacity) {
    return function(event, d) {
        node.style("stroke-opacity", function(o) {
            thisOpacity = isConnected(d, o) ? 1 : opacity;
            return thisOpacity;
        });

        node.style("fill-opacity", function(o) {
            thisOpacity = isConnected(d, o) ? 1 : opacity;
            return thisOpacity;
        });

        node.style("fill", function(o) {
            thisOpacity = isConnected(d, o) ? '#a4a4a4' : '"#8f8f8f';
            return thisOpacity;
        });

        text.style("opacity", function(o) {
            if (isConnected(d, o)) {

                if (o.name === d.name) {
                    return 1;
                }
            }
            else {
                return opacity;
            }
        });

        text.style("font-size", function(o) {
            thisOpacity = isConnected(d, o) ? 20 : 18;
            return thisOpacity;
        });

        link.style("stroke-opacity", function(o) {
            return o.source === d || o.target === d ? 1 : opacity;
        });

        link.style("stroke", function(o) {
            return o.source === d || o.target === d ? linkColourScale(o.count + 5) : "#333";
        });

        // link.attr("marker-end", function(o) {
        //     if (o.source === d || o.target === d) {
        //         return "url(#dominating)";
        //     }
        // });

        var html = '<p style="color:black;">' + d.name                      + '</p>' +
                   '<p style="color:black;">' + d.degree + ' conexões'  + '</p>'

        tooltipNetwork.html(html)
                       .style("left", (event.pageX) + "px")
                       .style("top", (event.pageY)  + "px")
                       .transition()
                       .duration(300) // ms
                       .style("opacity", 1); // started as 0!

    };
}

function mouseOut() {
    node.style("stroke-opacity", 1);
    node.style("fill-opacity", 1);

    text.style("opacity", 0.8);
    text.style("font-size", 18);
    // text.text(function(d) {if (d.total > 3) {return d.name}});

    node.style("fill", "#8f8f8f");
    node.style('fill-opacity', 1);

    // link.attr("marker-end", "url(#dominating)");
    link.style("stroke", d => {return linkColourScale(d.count);});
    link.style("stroke-opacity", d => {return 1 - 1/d.count;});
}