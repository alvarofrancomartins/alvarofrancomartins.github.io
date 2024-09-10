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

// Declare the variables outside the fetch block so they are accessible globally
var nodes_data = [{"name": "6-hidroxinorketamina (metabólito ketamina)", "degree": 29, "total": 29},
{"name": "5F-EMB-PICA", "degree": 5, "total": 5},
{"name": "MDA", "degree": 31, "total": 31},
{"name": "Adamantyl-CHMINACA", "degree": 7, "total": 7},
{"name": "4F-MDMB-BUTICA", "degree": 7, "total": 7},
{"name": "Canabinol", "degree": 34, "total": 34},
{"name": "AEME", "degree": 17, "total": 17},
{"name": "Nicotina", "degree": 36, "total": 36},
{"name": "Ketamina", "degree": 30, "total": 30},
{"name": "LSD", "degree": 21, "total": 21},
{"name": "Metanfetamina", "degree": 27, "total": 27},
{"name": "25E-NBOH", "degree": 2, "total": 2},
{"name": "Psilocina", "degree": 9, "total": 9},
{"name": "Cocaína", "degree": 30, "total": 30},
{"name": "Anfetamina", "degree": 16, "total": 16},
{"name": "MDMB-4en-PINACA", "degree": 11, "total": 11},
{"name": "Femproporex", "degree": 9, "total": 9},
{"name": "Metilfenidato", "degree": 13, "total": 13},
{"name": "Norcocaína", "degree": 25, "total": 25},
{"name": "Norketamina", "degree": 20, "total": 20},
{"name": "ADB-HEXINACA", "degree": 7, "total": 7},
{"name": "THC", "degree": 37, "total": 37},
{"name": "5F-BZO-POXIZID", "degree": 7, "total": 7},
{"name": "MDEA/MDDMA (isômeros)", "degree": 23, "total": 23},
{"name": "Canabidiol", "degree": 26, "total": 26},
{"name": "DMT", "degree": 19, "total": 19},
{"name": "2-fluorodeschloroketamine (2-FDCK)", "degree": 17, "total": 17},
{"name": "Pentilona/Dibutilona (isômeros)", "degree": 10, "total": 10},
{"name": "Metilona", "degree": 19, "total": 19},
{"name": "bk-DMBDP (Dipentilona)", "degree": 18, "total": 18},
{"name": "Cocaetileno", "degree": 29, "total": 29},
{"name": "ADB-BINACA_ADB-BUTINACA", "degree": 17, "total": 17},
{"name": "ADB-4en-PINACA", "degree": 9, "total": 9},
{"name": "ADB-HEXOXIZID (MDA-19)", "degree": 7, "total": 7},
{"name": "MDMA", "degree": 29, "total": 29},
{"name": "Benzoilecgonina", "degree": 21, "total": 21},
{"name": "25C-NBOH", "degree": 5, "total": 5},
{"name": "25B-NBOH", "degree": 11, "total": 11},
{"name": "Deschloroketamine", "degree": 20, "total": 20}
]

var links_data = [{"source": "25B-NBOH", "target": "6-hidroxinorketamina (metabólito ketamina)", "count": 1}, 
{"source": "25B-NBOH", "target": "Ketamina", "count": 1}, 
{"source": "DMT", "target": "Femproporex", "count": 1}, 
{"source": "6-hidroxinorketamina (metabólito ketamina)", "target": "Femproporex", "count": 1}, 
{"source": "Femproporex", "target": "Ketamina", "count": 1}, 
{"source": "Canabinol", "target": "Femproporex", "count": 1}, 
{"source": "Femproporex", "target": "THC", "count": 1}, 
{"source": "Femproporex", "target": "Nicotina", "count": 1}, 
{"source": "Femproporex", "target": "Metanfetamina", "count": 1}, 
{"source": "25C-NBOH", "target": "6-hidroxinorketamina (metabólito ketamina)", "count": 1}, 
{"source": "25C-NBOH", "target": "Ketamina", "count": 1}, 
{"source": "25C-NBOH", "target": "ADB-BINACA_ADB-BUTINACA", "count": 1}, 
{"source": "25C-NBOH", "target": "THC", "count": 1}, 
{"source": "25C-NBOH", "target": "MDA", "count": 1}, 
{"source": "Metanfetamina", "target": "Psilocina", "count": 1}, 
{"source": "Cocaetileno", "target": "Psilocina", "count": 1}, 
{"source": "Norcocaína", "target": "Psilocina", "count": 1}, 
{"source": "Cocaína", "target": "Psilocina", "count": 1}, 
{"source": "25E-NBOH", "target": "Canabinol", "count": 1}, 
{"source": "ADB-4en-PINACA", "target": "Cocaetileno", "count": 1}, 
{"source": "ADB-4en-PINACA", "target": "Cocaína", "count": 1}, 
{"source": "LSD", "target": "Metilona", "count": 1}, 
{"source": "AEME", "target": "LSD", "count": 1}, 
{"source": "Benzoilecgonina", "target": "MDEA/MDDMA (isômeros)", "count": 1}, 
{"source": "Canabinol", "target": "Psilocina", "count": 1}, 
{"source": "Nicotina", "target": "Psilocina", "count": 1}, 
{"source": "Benzoilecgonina", "target": "bk-DMBDP (Dipentilona)", "count": 1}, 
{"source": "Anfetamina", "target": "LSD", "count": 1}, 
{"source": "Anfetamina", "target": "Canabidiol", "count": 1}, 
{"source": "Anfetamina", "target": "Canabinol", "count": 1}, 
{"source": "Cocaetileno", "target": "Metilona", "count": 1}, 
{"source": "Ketamina", "target": "Metilfenidato", "count": 1}, 
{"source": "Canabidiol", "target": "Metilfenidato", "count": 1}, 
{"source": "Canabinol", "target": "Metilfenidato", "count": 1}, 
{"source": "Metanfetamina", "target": "Metilfenidato", "count": 1}, 
{"source": "2-fluorodeschloroketamine (2-FDCK)", "target": "AEME", "count": 1}, 
{"source": "2-fluorodeschloroketamine (2-FDCK)", "target": "Benzoilecgonina", "count": 1}, 
{"source": "Deschloroketamine", "target": "Metilfenidato", "count": 1}, 
{"source": "2-fluorodeschloroketamine (2-FDCK)", "target": "Metilfenidato", "count": 1}, 
{"source": "Metilona", "target": "Norketamina", "count": 1}, 
{"source": "Deschloroketamine", "target": "bk-DMBDP (Dipentilona)", "count": 1}, 
{"source": "ADB-BINACA_ADB-BUTINACA", "target": "Metilona", "count": 1}, 
{"source": "ADB-BINACA_ADB-BUTINACA", "target": "MDEA/MDDMA (isômeros)", "count": 1}, 
{"source": "6-hidroxinorketamina (metabólito ketamina)", "target": "Pentilona/Dibutilona (isômeros)", "count": 1}, 
{"source": "Ketamina", "target": "Pentilona/Dibutilona (isômeros)", "count": 1}, 
{"source": "6-hidroxinorketamina (metabólito ketamina)", "target": "bk-DMBDP (Dipentilona)", "count": 1}, 
{"source": "ADB-BINACA_ADB-BUTINACA", "target": "Cocaetileno", "count": 1}, 
{"source": "ADB-BINACA_ADB-BUTINACA", "target": "Norcocaína", "count": 1}, 
{"source": "ADB-BINACA_ADB-BUTINACA", "target": "Benzoilecgonina", "count": 1}, 
{"source": "2-fluorodeschloroketamine (2-FDCK)", "target": "bk-DMBDP (Dipentilona)", "count": 1}, 
{"source": "Deschloroketamine", "target": "Metilona", "count": 1}, 
{"source": "Anfetamina", "target": "Norketamina", "count": 1}, 
{"source": "Anfetamina", "target": "Cocaetileno", "count": 1}, 
{"source": "Anfetamina", "target": "Norcocaína", "count": 1}, 
{"source": "Anfetamina", "target": "Benzoilecgonina", "count": 1}, 
{"source": "Anfetamina", "target": "Cocaína", "count": 1}, 
{"source": "2-fluorodeschloroketamine (2-FDCK)", "target": "Metanfetamina", "count": 1}, 
{"source": "Deschloroketamine", "target": "LSD", "count": 1}, 
{"source": "25B-NBOH", "target": "Metanfetamina", "count": 1}, 
{"source": "5F-BZO-POXIZID", "target": "Adamantyl-CHMINACA", "count": 1}, 
{"source": "5F-BZO-POXIZID", "target": "ADB-HEXOXIZID (MDA-19)", "count": 1}, 
{"source": "ADB-HEXOXIZID (MDA-19)", "target": "Adamantyl-CHMINACA", "count": 1}, 
{"source": "5F-BZO-POXIZID", "target": "ADB-HEXINACA", "count": 1}, 
{"source": "ADB-HEXINACA", "target": "Adamantyl-CHMINACA", "count": 1}, 
{"source": "ADB-HEXINACA", "target": "ADB-HEXOXIZID (MDA-19)", "count": 1}, 
{"source": "4F-MDMB-BUTICA", "target": "5F-BZO-POXIZID", "count": 1}, 
{"source": "4F-MDMB-BUTICA", "target": "Adamantyl-CHMINACA", "count": 1}, 
{"source": "4F-MDMB-BUTICA", "target": "ADB-HEXOXIZID (MDA-19)", "count": 1}, 
{"source": "4F-MDMB-BUTICA", "target": "ADB-HEXINACA", "count": 1}, 
{"source": "5F-BZO-POXIZID", "target": "Canabinol", "count": 1}, 
{"source": "Adamantyl-CHMINACA", "target": "Canabinol", "count": 1}, 
{"source": "ADB-HEXOXIZID (MDA-19)", "target": "Canabinol", "count": 1}, 
{"source": "ADB-HEXINACA", "target": "Canabinol", "count": 1}, 
{"source": "4F-MDMB-BUTICA", "target": "Canabinol", "count": 1}, 
{"source": "5F-BZO-POXIZID", "target": "THC", "count": 1}, 
{"source": "Adamantyl-CHMINACA", "target": "THC", "count": 1}, 
{"source": "ADB-HEXOXIZID (MDA-19)", "target": "THC", "count": 1}, 
{"source": "ADB-HEXINACA", "target": "THC", "count": 1}, 
{"source": "4F-MDMB-BUTICA", "target": "THC", "count": 1}, 
{"source": "5F-BZO-POXIZID", "target": "Nicotina", "count": 1}, 
{"source": "Adamantyl-CHMINACA", "target": "Nicotina", "count": 1}, 
{"source": "ADB-HEXOXIZID (MDA-19)", "target": "Nicotina", "count": 1}, 
{"source": "ADB-HEXINACA", "target": "Nicotina", "count": 1}, 
{"source": "4F-MDMB-BUTICA", "target": "Nicotina", "count": 1}, 
{"source": "5F-EMB-PICA", "target": "MDMB-4en-PINACA", "count": 1}, 
{"source": "5F-EMB-PICA", "target": "THC", "count": 1}, 
{"source": "MDMB-4en-PINACA", "target": "THC", "count": 1}, 
{"source": "5F-EMB-PICA", "target": "Cocaetileno", "count": 1}, 
{"source": "5F-EMB-PICA", "target": "Cocaína", "count": 1}, 
{"source": "5F-EMB-PICA", "target": "Nicotina", "count": 1}, 
{"source": "25B-NBOH", "target": "LSD", "count": 1}, 
{"source": "25B-NBOH", "target": "Cocaetileno", "count": 1}, 
{"source": "25B-NBOH", "target": "Cocaína", "count": 1}, 
{"source": "Femproporex", "target": "MDA", "count": 2}, 
{"source": "Femproporex", "target": "MDMA", "count": 2}, 
{"source": "6-hidroxinorketamina (metabólito ketamina)", "target": "ADB-4en-PINACA", "count": 2}, 
{"source": "ADB-4en-PINACA", "target": "Ketamina", "count": 2}, 
{"source": "ADB-4en-PINACA", "target": "MDMB-4en-PINACA", "count": 2}, 
{"source": "6-hidroxinorketamina (metabólito ketamina)", "target": "MDMB-4en-PINACA", "count": 2}, 
{"source": "Ketamina", "target": "MDMB-4en-PINACA", "count": 2}, 
{"source": "ADB-4en-PINACA", "target": "MDEA/MDDMA (isômeros)", "count": 2}, 
{"source": "MDEA/MDDMA (isômeros)", "target": "MDMB-4en-PINACA", "count": 2}, 
{"source": "ADB-4en-PINACA", "target": "MDA", "count": 2}, 
{"source": "MDA", "target": "MDMB-4en-PINACA", "count": 2}, 
{"source": "ADB-4en-PINACA", "target": "MDMA", "count": 2}, 
{"source": "MDMA", "target": "MDMB-4en-PINACA", "count": 2}, 
{"source": "ADB-4en-PINACA", "target": "Nicotina", "count": 2}, 
{"source": "Anfetamina", "target": "MDEA/MDDMA (isômeros)", "count": 2}, 
{"source": "Canabidiol", "target": "Psilocina", "count": 2}, 
{"source": "Psilocina", "target": "THC", "count": 2}, 
{"source": "MDA", "target": "Psilocina", "count": 2}, 
{"source": "AEME", "target": "Norketamina", "count": 2}, 
{"source": "Cocaetileno", "target": "Metilfenidato", "count": 2}, 
{"source": "2-fluorodeschloroketamine (2-FDCK)", "target": "Canabidiol", "count": 2}, 
{"source": "Metilfenidato", "target": "THC", "count": 2}, 
{"source": "Metilfenidato", "target": "Norcocaína", "count": 2}, 
{"source": "2-fluorodeschloroketamine (2-FDCK)", "target": "Norcocaína", "count": 2}, 
{"source": "DMT", "target": "Metilona", "count": 2}, 
{"source": "MDEA/MDDMA (isômeros)", "target": "Norketamina", "count": 2}, 
{"source": "Metilona", "target": "Norcocaína", "count": 2}, 
{"source": "Benzoilecgonina", "target": "LSD", "count": 2}, 
{"source": "AEME", "target": "Metanfetamina", "count": 2}, 
{"source": "Metanfetamina", "target": "Metilona", "count": 2}, 
{"source": "Metilona", "target": "bk-DMBDP (Dipentilona)", "count": 2}, 
{"source": "Ketamina", "target": "bk-DMBDP (Dipentilona)", "count": 2}, 
{"source": "ADB-BINACA_ADB-BUTINACA", "target": "Metanfetamina", "count": 2}, 
{"source": "2-fluorodeschloroketamine (2-FDCK)", "target": "Cocaetileno", "count": 2}, 
{"source": "Cocaetileno", "target": "Deschloroketamine", "count": 2}, 
{"source": "Deschloroketamine", "target": "Norcocaína", "count": 2}, 
{"source": "25E-NBOH", "target": "THC", "count": 2}, 
{"source": "25B-NBOH", "target": "Nicotina", "count": 2}, 
{"source": "2-fluorodeschloroketamine (2-FDCK)", "target": "6-hidroxinorketamina (metabólito ketamina)", "count": 2}, 
{"source": "Canabidiol", "target": "Pentilona/Dibutilona (isômeros)", "count": 2}, 
{"source": "Canabidiol", "target": "bk-DMBDP (Dipentilona)", "count": 2}, 
{"source": "6-hidroxinorketamina (metabólito ketamina)", "target": "Deschloroketamine", "count": 2}, 
{"source": "Cocaetileno", "target": "MDMB-4en-PINACA", "count": 2}, 
{"source": "Cocaína", "target": "MDMB-4en-PINACA", "count": 2}, 
{"source": "25B-NBOH", "target": "Canabinol", "count": 2}, 
{"source": "25B-NBOH", "target": "THC", "count": 2}, 
{"source": "AEME", "target": "DMT", "count": 3}, 
{"source": "Benzoilecgonina", "target": "DMT", "count": 3}, 
{"source": "Anfetamina", "target": "Metanfetamina", "count": 3}, 
{"source": "6-hidroxinorketamina (metabólito ketamina)", "target": "Metilona", "count": 3}, 
{"source": "AEME", "target": "Canabinol", "count": 3}, 
{"source": "MDA", "target": "Metilfenidato", "count": 3}, 
{"source": "ADB-BINACA_ADB-BUTINACA", "target": "Deschloroketamine", "count": 3}, 
{"source": "6-hidroxinorketamina (metabólito ketamina)", "target": "ADB-BINACA_ADB-BUTINACA", "count": 3}, 
{"source": "Norcocaína", "target": "bk-DMBDP (Dipentilona)", "count": 3}, 
{"source": "Cocaetileno", "target": "bk-DMBDP (Dipentilona)", "count": 3}, 
{"source": "6-hidroxinorketamina (metabólito ketamina)", "target": "Anfetamina", "count": 3}, 
{"source": "Anfetamina", "target": "Ketamina", "count": 3}, 
{"source": "Deschloroketamine", "target": "MDEA/MDDMA (isômeros)", "count": 3}, 
{"source": "2-fluorodeschloroketamine (2-FDCK)", "target": "Ketamina", "count": 3}, 
{"source": "Cocaína", "target": "Pentilona/Dibutilona (isômeros)", "count": 3}, 
{"source": "2-fluorodeschloroketamine (2-FDCK)", "target": "Canabinol", "count": 3}, 
{"source": "Metanfetamina", "target": "bk-DMBDP (Dipentilona)", "count": 3}, 
{"source": "Canabidiol", "target": "Deschloroketamine", "count": 3}, 
{"source": "MDMB-4en-PINACA", "target": "Nicotina", "count": 3}, 
{"source": "25B-NBOH", "target": "MDMA", "count": 3}, 
{"source": "LSD", "target": "MDEA/MDDMA (isômeros)", "count": 4}, 
{"source": "DMT", "target": "LSD", "count": 4}, 
{"source": "DMT", "target": "Metanfetamina", "count": 4}, 
{"source": "Metanfetamina", "target": "Norketamina", "count": 4}, 
{"source": "Anfetamina", "target": "THC", "count": 4}, 
{"source": "DMT", "target": "MDEA/MDDMA (isômeros)", "count": 4}, 
{"source": "LSD", "target": "Norcocaína", "count": 4}, 
{"source": "Benzoilecgonina", "target": "Metanfetamina", "count": 4}, 
{"source": "Cocaína", "target": "Metilona", "count": 4}, 
{"source": "Anfetamina", "target": "Nicotina", "count": 4}, 
{"source": "MDMA", "target": "Metilfenidato", "count": 4}, 
{"source": "Cocaína", "target": "Metilfenidato", "count": 4}, 
{"source": "Deschloroketamine", "target": "Norketamina", "count": 4}, 
{"source": "Canabinol", "target": "Pentilona/Dibutilona (isômeros)", "count": 4}, 
{"source": "MDEA/MDDMA (isômeros)", "target": "bk-DMBDP (Dipentilona)", "count": 4}, 
{"source": "Deschloroketamine", "target": "Ketamina", "count": 4}, 
{"source": "ADB-BINACA_ADB-BUTINACA", "target": "Canabidiol", "count": 4}, 
{"source": "ADB-BINACA_ADB-BUTINACA", "target": "Canabinol", "count": 4}, 
{"source": "AEME", "target": "Canabidiol", "count": 5}, 
{"source": "Benzoilecgonina", "target": "Canabidiol", "count": 5}, 
{"source": "Benzoilecgonina", "target": "Canabinol", "count": 5}, 
{"source": "Cocaetileno", "target": "MDEA/MDDMA (isômeros)", "count": 5}, 
{"source": "Anfetamina", "target": "MDA", "count": 5}, 
{"source": "Anfetamina", "target": "MDMA", "count": 5}, 
{"source": "Canabidiol", "target": "Metilona", "count": 5}, 
{"source": "Deschloroketamine", "target": "Metanfetamina", "count": 5}, 
{"source": "Metilfenidato", "target": "Nicotina", "count": 5}, 
{"source": "Benzoilecgonina", "target": "Norketamina", "count": 5}, 
{"source": "ADB-BINACA_ADB-BUTINACA", "target": "Cocaína", "count": 5}, 
{"source": "Canabidiol", "target": "Norketamina", "count": 6}, 
{"source": "DMT", "target": "Norketamina", "count": 6}, 
{"source": "Ketamina", "target": "Metilona", "count": 6}, 
{"source": "Canabinol", "target": "Metilona", "count": 6}, 
{"source": "MDA", "target": "Pentilona/Dibutilona (isômeros)", "count": 6}, 
{"source": "2-fluorodeschloroketamine (2-FDCK)", "target": "Cocaína", "count": 6}, 
{"source": "MDMA", "target": "Pentilona/Dibutilona (isômeros)", "count": 6}, 
{"source": "Pentilona/Dibutilona (isômeros)", "target": "THC", "count": 6}, 
{"source": "Cocaetileno", "target": "LSD", "count": 6}, 
{"source": "25B-NBOH", "target": "MDA", "count": 6}, 
{"source": "Cocaetileno", "target": "DMT", "count": 7}, 
{"source": "AEME", "target": "THC", "count": 7}, 
{"source": "6-hidroxinorketamina (metabólito ketamina)", "target": "AEME", "count": 7}, 
{"source": "AEME", "target": "Benzoilecgonina", "count": 7}, 
{"source": "ADB-BINACA_ADB-BUTINACA", "target": "Ketamina", "count": 7}, 
{"source": "2-fluorodeschloroketamine (2-FDCK)", "target": "MDA", "count": 7}, 
{"source": "Nicotina", "target": "Pentilona/Dibutilona (isômeros)", "count": 7}, 
{"source": "AEME", "target": "MDMA", "count": 8}, 
{"source": "Cocaína", "target": "Deschloroketamine", "count": 8}, 
{"source": "Cocaína", "target": "bk-DMBDP (Dipentilona)", "count": 8}, 
{"source": "2-fluorodeschloroketamine (2-FDCK)", "target": "THC", "count": 8}, 
{"source": "2-fluorodeschloroketamine (2-FDCK)", "target": "MDMA", "count": 8}, 
{"source": "6-hidroxinorketamina (metabólito ketamina)", "target": "Metanfetamina", "count": 9}, 
{"source": "Canabinol", "target": "Norketamina", "count": 9}, 
{"source": "DMT", "target": "Norcocaína", "count": 9}, 
{"source": "AEME", "target": "Ketamina", "count": 9}, 
{"source": "Metanfetamina", "target": "Norcocaína", "count": 9}, 
{"source": "Metilona", "target": "THC", "count": 9}, 
{"source": "MDEA/MDDMA (isômeros)", "target": "Norcocaína", "count": 9}, 
{"source": "Canabinol", "target": "Deschloroketamine", "count": 9}, 
{"source": "LSD", "target": "Metanfetamina", "count": 10}, 
{"source": "AEME", "target": "MDA", "count": 10}, 
{"source": "6-hidroxinorketamina (metabólito ketamina)", "target": "Benzoilecgonina", "count": 10}, 
{"source": "ADB-BINACA_ADB-BUTINACA", "target": "MDMA", "count": 10}, 
{"source": "MDEA/MDDMA (isômeros)", "target": "Metanfetamina", "count": 10}, 
{"source": "Cocaetileno", "target": "Norketamina", "count": 10}, 
{"source": "Cocaína", "target": "LSD", "count": 10}, 
{"source": "AEME", "target": "Cocaetileno", "count": 11}, 
{"source": "AEME", "target": "Norcocaína", "count": 11}, 
{"source": "AEME", "target": "Cocaína", "count": 11}, 
{"source": "Cocaetileno", "target": "Metanfetamina", "count": 11}, 
{"source": "LSD", "target": "Norketamina", "count": 11}, 
{"source": "Canabidiol", "target": "Metanfetamina", "count": 11}, 
{"source": "ADB-BINACA_ADB-BUTINACA", "target": "THC", "count": 11}, 
{"source": "Canabinol", "target": "bk-DMBDP (Dipentilona)", "count": 11}, 
{"source": "Cocaína", "target": "DMT", "count": 12}, 
{"source": "Canabidiol", "target": "LSD", "count": 12}, 
{"source": "AEME", "target": "Nicotina", "count": 12}, 
{"source": "Pentilona/Dibutilona (isômeros)", "target": "bk-DMBDP (Dipentilona)", "count": 12}, 
{"source": "2-fluorodeschloroketamine (2-FDCK)", "target": "Nicotina", "count": 12}, 
{"source": "Norcocaína", "target": "Norketamina", "count": 12}, 
{"source": "Ketamina", "target": "Metanfetamina", "count": 13}, 
{"source": "Benzoilecgonina", "target": "Ketamina", "count": 13}, 
{"source": "Benzoilecgonina", "target": "THC", "count": 13}, 
{"source": "Canabidiol", "target": "Cocaetileno", "count": 13}, 
{"source": "6-hidroxinorketamina (metabólito ketamina)", "target": "MDEA/MDDMA (isômeros)", "count": 14}, 
{"source": "Canabinol", "target": "Norcocaína", "count": 14}, 
{"source": "Canabidiol", "target": "MDEA/MDDMA (isômeros)", "count": 14}, 
{"source": "Canabinol", "target": "Metanfetamina", "count": 14}, 
{"source": "2-fluorodeschloroketamine (2-FDCK)", "target": "Deschloroketamine", "count": 14}, 
{"source": "MDEA/MDDMA (isômeros)", "target": "Metilona", "count": 15}, 
{"source": "MDA", "target": "Metilona", "count": 15}, 
{"source": "Metilona", "target": "Nicotina", "count": 15}, 
{"source": "Cocaína", "target": "Norketamina", "count": 15}, 
{"source": "Benzoilecgonina", "target": "MDMA", "count": 15}, 
{"source": "Canabidiol", "target": "DMT", "count": 15}, 
{"source": "6-hidroxinorketamina (metabólito ketamina)", "target": "LSD", "count": 16}, 
{"source": "Canabinol", "target": "DMT", "count": 16}, 
{"source": "Canabinol", "target": "LSD", "count": 16}, 
{"source": "Canabinol", "target": "Cocaetileno", "count": 16}, 
{"source": "MDMA", "target": "Metilona", "count": 17}, 
{"source": "Cocaína", "target": "MDEA/MDDMA (isômeros)", "count": 17}, 
{"source": "Canabidiol", "target": "Norcocaína", "count": 17}, 
{"source": "THC", "target": "bk-DMBDP (Dipentilona)", "count": 17}, 
{"source": "Ketamina", "target": "LSD", "count": 18}, 
{"source": "Cocaína", "target": "Metanfetamina", "count": 18}, 
{"source": "6-hidroxinorketamina (metabólito ketamina)", "target": "Cocaetileno", "count": 18}, 
{"source": "Norketamina", "target": "THC", "count": 19}, 
{"source": "ADB-BINACA_ADB-BUTINACA", "target": "MDA", "count": 19}, 
{"source": "6-hidroxinorketamina (metabólito ketamina)", "target": "DMT", "count": 20}, 
{"source": "Ketamina", "target": "MDEA/MDDMA (isômeros)", "count": 20}, 
{"source": "MDMA", "target": "bk-DMBDP (Dipentilona)", "count": 20}, 
{"source": "Deschloroketamine", "target": "THC", "count": 20}, 
{"source": "Benzoilecgonina", "target": "Cocaetileno", "count": 20}, 
{"source": "ADB-BINACA_ADB-BUTINACA", "target": "Nicotina", "count": 21}, 
{"source": "Benzoilecgonina", "target": "MDA", "count": 21}, 
{"source": "Canabinol", "target": "MDEA/MDDMA (isômeros)", "count": 21}, 
{"source": "6-hidroxinorketamina (metabólito ketamina)", "target": "Canabidiol", "count": 22}, 
{"source": "6-hidroxinorketamina (metabólito ketamina)", "target": "Norcocaína", "count": 22}, 
{"source": "Benzoilecgonina", "target": "Norcocaína", "count": 22}, 
{"source": "Benzoilecgonina", "target": "Nicotina", "count": 22}, 
{"source": "DMT", "target": "Ketamina", "count": 23}, 
{"source": "DMT", "target": "Nicotina", "count": 23}, 
{"source": "Deschloroketamine", "target": "MDMA", "count": 23}, 
{"source": "DMT", "target": "MDMA", "count": 24}, 
{"source": "Benzoilecgonina", "target": "Cocaína", "count": 25}, 
{"source": "MDMA", "target": "Norketamina", "count": 26}, 
{"source": "Cocaetileno", "target": "Ketamina", "count": 26}, 
{"source": "DMT", "target": "THC", "count": 26}, 
{"source": "Metanfetamina", "target": "THC", "count": 27}, 
{"source": "Canabidiol", "target": "Cocaína", "count": 27}, 
{"source": "MDA", "target": "bk-DMBDP (Dipentilona)", "count": 27}, 
{"source": "LSD", "target": "THC", "count": 27}, 
{"source": "LSD", "target": "Nicotina", "count": 29}, 
{"source": "Nicotina", "target": "Norketamina", "count": 29}, 
{"source": "Ketamina", "target": "Norcocaína", "count": 30}, 
{"source": "6-hidroxinorketamina (metabólito ketamina)", "target": "Norketamina", "count": 31}, 
{"source": "Nicotina", "target": "bk-DMBDP (Dipentilona)", "count": 31}, 
{"source": "6-hidroxinorketamina (metabólito ketamina)", "target": "Canabinol", "count": 31}, 
{"source": "Ketamina", "target": "Norketamina", "count": 32}, 
{"source": "Deschloroketamine", "target": "MDA", "count": 32}, 
{"source": "LSD", "target": "MDMA", "count": 33}, 
{"source": "MDA", "target": "Norketamina", "count": 33}, 
{"source": "Canabidiol", "target": "Ketamina", "count": 33}, 
{"source": "DMT", "target": "MDA", "count": 33}, 
{"source": "Deschloroketamine", "target": "Nicotina", "count": 34}, 
{"source": "6-hidroxinorketamina (metabólito ketamina)", "target": "Cocaína", "count": 36}, 
{"source": "MDEA/MDDMA (isômeros)", "target": "THC", "count": 37}, 
{"source": "LSD", "target": "MDA", "count": 37}, 
{"source": "Canabinol", "target": "Cocaína", "count": 37}, 
{"source": "Norcocaína", "target": "THC", "count": 38}, 
{"source": "Cocaetileno", "target": "THC", "count": 39}, 
{"source": "Cocaetileno", "target": "MDMA", "count": 39}, 
{"source": "Canabinol", "target": "Ketamina", "count": 42}, 
{"source": "Cocaetileno", "target": "Norcocaína", "count": 46}, 
{"source": "Metanfetamina", "target": "Nicotina", "count": 46}, 
{"source": "MDMA", "target": "Metanfetamina", "count": 46}, 
{"source": "MDMA", "target": "Norcocaína", "count": 48}, 
{"source": "Cocaína", "target": "Ketamina", "count": 52}, 
{"source": "6-hidroxinorketamina (metabólito ketamina)", "target": "THC", "count": 55}, 
{"source": "Cocaetileno", "target": "Nicotina", "count": 58}, 
{"source": "MDA", "target": "Metanfetamina", "count": 60}, 
{"source": "MDA", "target": "Norcocaína", "count": 61}, 
{"source": "Nicotina", "target": "Norcocaína", "count": 62}, 
{"source": "MDEA/MDDMA (isômeros)", "target": "Nicotina", "count": 64}, 
{"source": "Cocaetileno", "target": "MDA", "count": 70}, 
{"source": "Cocaína", "target": "Norcocaína", "count": 72}, 
{"source": "6-hidroxinorketamina (metabólito ketamina)", "target": "MDMA", "count": 74}, 
{"source": "MDA", "target": "MDEA/MDDMA (isômeros)", "count": 74}, 
{"source": "Canabidiol", "target": "MDMA", "count": 76}, 
{"source": "MDEA/MDDMA (isômeros)", "target": "MDMA", "count": 78}, 
{"source": "Cocaetileno", "target": "Cocaína", "count": 78}, 
{"source": "Ketamina", "target": "THC", "count": 80}, 
{"source": "6-hidroxinorketamina (metabólito ketamina)", "target": "Nicotina", "count": 83}, 
{"source": "Cocaína", "target": "THC", "count": 86}, 
{"source": "6-hidroxinorketamina (metabólito ketamina)", "target": "Ketamina", "count": 94}, 
{"source": "6-hidroxinorketamina (metabólito ketamina)", "target": "MDA", "count": 94}, 
{"source": "Canabidiol", "target": "Canabinol", "count": 96}, 
{"source": "Cocaína", "target": "MDMA", "count": 98}, 
{"source": "Canabidiol", "target": "Nicotina", "count": 100}, 
{"source": "Ketamina", "target": "MDMA", "count": 103}, 
{"source": "Canabinol", "target": "MDMA", "count": 103}, 
{"source": "Canabidiol", "target": "MDA", "count": 109}, 
{"source": "Ketamina", "target": "Nicotina", "count": 115}, 
{"source": "Canabidiol", "target": "THC", "count": 124}, 
{"source": "Ketamina", "target": "MDA", "count": 132}, 
{"source": "Cocaína", "target": "Nicotina", "count": 135}, 
{"source": "Cocaína", "target": "MDA", "count": 138}, 
{"source": "Canabinol", "target": "MDA", "count": 152}, 
{"source": "Canabinol", "target": "Nicotina", "count": 153}, 
{"source": "MDMA", "target": "THC", "count": 202}, 
{"source": "Canabinol", "target": "THC", "count": 204}, 
{"source": "Nicotina", "target": "THC", "count": 315}, 
{"source": "MDA", "target": "THC", "count": 326}, 
{"source": "MDMA", "target": "Nicotina", "count": 358}, 
{"source": "MDA", "target": "MDMA", "count": 401}, 
{"source": "MDA", "target": "Nicotina", "count": 555} 
]

var nodeSizeScale = d3.scaleLinear()
  .domain(d3.extent(nodes_data, d => d.total))
  .range([1, 50]);

var linkSizeScale = d3.scaleLinear()
  .domain(d3.extent(links_data, d => d.count))
  .range([1, 28]);

// Add a vibrant color scale for nodes based on their size
var nodeColourScale = d3.scaleSequential()
  .domain(d3.extent(nodes_data, d => d.degree*2))
  .interpolator(d3.interpolateBlues);  // You can use other vibrant interpolators like interpolateViridis, interpolateInferno, etc.

var linkColourScale = d3.scaleSequential()
  .domain(d3.extent(links_data, d => d.count))
  .interpolator(d3.interpolateBlues);  // Vibrant rainbow-like colors

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
    .style('stroke', d => {return linkColourScale(d.count);})
    .style("stroke-opacity", 1)
    .attr('stroke-width', d => {return linkSizeScale(d.count);})
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
    .attr("r", d => nodeSizeScale(d.total))
    .attr("fill", d => nodeColourScale(d.total))  // Use color scale based on node size
    .attr("stroke", "#000000")
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
        // Update stroke opacity for connected nodes
        node.style("stroke-opacity", function(o) {
            thisOpacity = isConnected(d, o) ? 1 : opacity;
            return thisOpacity;
        });

        // Keep the original vibrant color during hover
        node.style("fill-opacity", function(o) {
            thisOpacity = isConnected(d, o) ? 1 : opacity;
            return thisOpacity;
        });

        node.style("fill", function(o) {
            // Maintain original color based on node size using nodeColourScale
            return isConnected(d, o) ? nodeColourScale(o.total) : nodeColourScale(o.total);
        });

        // Update the text opacity and size during hover
        text.style("opacity", function(o) {
            if (isConnected(d, o)) {
                if (o.name === d.name) {
                    return 1;
                }
            } else {
                return opacity;
            }
        });

        text.style("font-size", function(o) {
            thisOpacity = isConnected(d, o) ? 20 : 18;
            return thisOpacity;
        });

        // Update the link styles during hover
        link.style("stroke-opacity", function(o) {
            return o.source === d || o.target === d ? 1 : opacity;
        });

        link.style("stroke", function(o) {
            return o.source === d || o.target === d ? linkColourScale(o.count + 5) : "#333";
        });

        // Show tooltip during hover
        var html = '<p style="color:black;">' + d.name + '</p>' +
                   '<p style="color:black;">' + d.degree + ' connections' + '</p>'

        tooltipNetwork.html(html)
                      .style("left", (event.pageX) + "px")
                      .style("top", (event.pageY) + "px")
                      .transition()
                      .duration(300)
                      .style("opacity", 1);
    };
}


function mouseOut() {
    node.style("stroke-opacity", 1);
    node.style("fill-opacity", 1);

    text.style("opacity", 0.8);
    text.style("font-size", 18);

    // Restore the original vibrant color based on node size
    node.style("fill", d => nodeColourScale(d.total));

    // Reset the link styles
    link.style("stroke", d => linkColourScale(d.count));
    link.style("stroke-opacity", d => 1);
}