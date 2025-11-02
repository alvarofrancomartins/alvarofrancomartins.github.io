const marginNetwork = { top: 20, right: 20, bottom: 20, left: 20 };
const widthNetwork = Math.min(1400, window.innerWidth - 40) - marginNetwork.left - marginNetwork.right;
const heightNetwork = Math.min(900, window.innerHeight - 40) - marginNetwork.top - marginNetwork.bottom;

var nodes_data = [
  {
    "name": "lidocaina",
    "degree": 66,
    "total": 86
  },
  {
    "name": "cocaina",
    "degree": 62,
    "total": 95
  },
  {
    "name": "nicotina",
    "degree": 59,
    "total": 82
  },
  {
    "name": "midazolam",
    "degree": 58,
    "total": 67
  },
  {
    "name": "fentanil",
    "degree": 49,
    "total": 53
  },
  {
    "name": "thc",
    "degree": 48,
    "total": 73
  },
  {
    "name": "prometazina",
    "degree": 48,
    "total": 29
  },
  {
    "name": "haloperidol",
    "degree": 45,
    "total": 29
  },
  {
    "name": "clonazepam",
    "degree": 44,
    "total": 24
  },
  {
    "name": "diazepam",
    "degree": 43,
    "total": 35
  },
  {
    "name": "metoclopramida",
    "degree": 43,
    "total": 28
  },
  {
    "name": "solventes",
    "degree": 40,
    "total": 54
  },
  {
    "name": "álcool",
    "degree": 39,
    "total": 47
  },
  {
    "name": "risperidona",
    "degree": 38,
    "total": 12
  },
  {
    "name": "sertralina",
    "degree": 38,
    "total": 25
  },
  {
    "name": "amitriptilina",
    "degree": 38,
    "total": 16
  },
  {
    "name": "nortriptilina",
    "degree": 38,
    "total": 16
  },
  {
    "name": "cetamina",
    "degree": 35,
    "total": 19
  },
  {
    "name": "citalopram",
    "degree": 35,
    "total": 6
  },
  {
    "name": "desvenlafaxina",
    "degree": 35,
    "total": 9
  },
  {
    "name": "levamisol",
    "degree": 34,
    "total": 23
  },
  {
    "name": "dimenidrato",
    "degree": 31,
    "total": 13
  },
  {
    "name": "carbamazepina",
    "degree": 31,
    "total": 22
  },
  {
    "name": "tramadol",
    "degree": 29,
    "total": 11
  },
  {
    "name": "morfina",
    "degree": 28,
    "total": 9
  },
  {
    "name": "descongestionante nasal",
    "degree": 28,
    "total": 8
  },
  {
    "name": "fluoxetina",
    "degree": 26,
    "total": 11
  },
  {
    "name": "antiemético",
    "degree": 25,
    "total": 9
  },
  {
    "name": "quetiapina",
    "degree": 25,
    "total": 5
  },
  {
    "name": "clorpromazina",
    "degree": 25,
    "total": 8
  },
  {
    "name": "paroxetina",
    "degree": 24,
    "total": 4
  },
  {
    "name": "zolpidem",
    "degree": 24,
    "total": 6
  },
  {
    "name": "odansetrona",
    "degree": 23,
    "total": 10
  },
  {
    "name": "venlafaxina",
    "degree": 23,
    "total": 5
  },
  {
    "name": "pregabalina",
    "degree": 21,
    "total": 3
  },
  {
    "name": "codeina",
    "degree": 21,
    "total": 4
  },
  {
    "name": "levomepromazina",
    "degree": 21,
    "total": 8
  },
  {
    "name": "salbutamol",
    "degree": 20,
    "total": 10
  },
  {
    "name": "bupropiona",
    "degree": 20,
    "total": 4
  },
  {
    "name": "anfetamina",
    "degree": 20,
    "total": 5
  },
  {
    "name": "propanolol",
    "degree": 19,
    "total": 2
  },
  {
    "name": "zopiclone",
    "degree": 19,
    "total": 2
  },
  {
    "name": "não detectado",
    "degree": 19,
    "total": 2
  },
  {
    "name": "morfina-3-glicuronideo",
    "degree": 19,
    "total": 6
  },
  {
    "name": "metanol",
    "degree": 18,
    "total": 11
  },
  {
    "name": "fenitoina",
    "degree": 18,
    "total": 5
  },
  {
    "name": "naltrexona",
    "degree": 15,
    "total": 2
  },
  {
    "name": "fenobarbital",
    "degree": 15,
    "total": 6
  },
  {
    "name": "olanzapina",
    "degree": 14,
    "total": 4
  },
  {
    "name": "metadona",
    "degree": 12,
    "total": 2
  },
  {
    "name": "alprazolam",
    "degree": 12,
    "total": 2
  },
  {
    "name": "topiramato",
    "degree": 12,
    "total": 3
  },
  {
    "name": "oxicodona* (confirmar suspeita)",
    "degree": 11,
    "total": 1
  },
  {
    "name": "trazodona",
    "degree": 11,
    "total": 2
  },
  {
    "name": "clomipramina",
    "degree": 10,
    "total": 2
  },
  {
    "name": "lorazepam",
    "degree": 9,
    "total": 1
  },
  {
    "name": "clozapina",
    "degree": 9,
    "total": 2
  },
  {
    "name": "naloxona",
    "degree": 9,
    "total": 2
  },
  {
    "name": "desipramina",
    "degree": 8,
    "total": 1
  },
  {
    "name": "imipramina",
    "degree": 8,
    "total": 1
  },
  {
    "name": "nor-fentanil",
    "degree": 8,
    "total": 1
  },
  {
    "name": "bromazepam",
    "degree": 7,
    "total": 1
  },
  {
    "name": "midazolam abuso!",
    "degree": 7,
    "total": 1
  },
  {
    "name": "ghb",
    "degree": 7,
    "total": 1
  },
  {
    "name": "mirtazapina",
    "degree": 7,
    "total": 1
  },
  {
    "name": "1,4-butanodiol",
    "degree": 7,
    "total": 1
  },
  {
    "name": "detectado em sangue apenas",
    "degree": 7,
    "total": 1
  },
  {
    "name": "oxicodona",
    "degree": 6,
    "total": 1
  },
  {
    "name": "5f-bzo-poxizid",
    "degree": 6,
    "total": 1
  },
  {
    "name": "canabinoide sintético",
    "degree": 6,
    "total": 1
  },
  {
    "name": "bzo-poxizid",
    "degree": 6,
    "total": 1
  },
  {
    "name": "bzo-hexoxizid(mda-19)",
    "degree": 6,
    "total": 1
  },
  {
    "name": "canabinóides sintéticos",
    "degree": 6,
    "total": 1
  },
  {
    "name": "anfepramona",
    "degree": 6,
    "total": 1
  },
  {
    "name": "sibutramina",
    "degree": 6,
    "total": 1
  },
  {
    "name": "fentermina",
    "degree": 5,
    "total": 1
  },
  {
    "name": "ciproheptadina",
    "degree": 5,
    "total": 2
  },
  {
    "name": "bromoprida",
    "degree": 5,
    "total": 1
  },
  {
    "name": "fenoterol",
    "degree": 4,
    "total": 1
  },
  {
    "name": "catinona sintética",
    "degree": 4,
    "total": 1
  },
  {
    "name": "7-aminoflunitrazepam",
    "degree": 4,
    "total": 1
  },
  {
    "name": "ácido valpróico",
    "degree": 3,
    "total": 1
  },
  {
    "name": "hidroxizine",
    "degree": 2,
    "total": 2
  },
  {
    "name": "opióide",
    "degree": 2,
    "total": 1
  },
  {
    "name": "anestésico",
    "degree": 2,
    "total": 1
  },
  {
    "name": "dmt",
    "degree": 2,
    "total": 1
  },
  {
    "name": "obs: dmt não liberado no aghuse",
    "degree": 2,
    "total": 1
  },
  {
    "name": "padrão vencido",
    "degree": 2,
    "total": 1
  },
  {
    "name": "apenas em sangue",
    "degree": 2,
    "total": 1
  },
  {
    "name": "9-oh-risperidona",
    "degree": 1,
    "total": 1
  }
];

var links_data = [
  {
    "source": "cocaina",
    "target": "nicotina",
    "count": 51
  },
  {
    "source": "fentanil",
    "target": "midazolam",
    "count": 49
  },
  {
    "source": "cocaina",
    "target": "lidocaina",
    "count": 48
  },
  {
    "source": "solventes",
    "target": "álcool",
    "count": 45
  },
  {
    "source": "lidocaina",
    "target": "nicotina",
    "count": 40
  },
  {
    "source": "cocaina",
    "target": "thc",
    "count": 38
  },
  {
    "source": "nicotina",
    "target": "thc",
    "count": 34
  },
  {
    "source": "lidocaina",
    "target": "midazolam",
    "count": 34
  },
  {
    "source": "nicotina",
    "target": "solventes",
    "count": 32
  },
  {
    "source": "cocaina",
    "target": "midazolam",
    "count": 31
  },
  {
    "source": "lidocaina",
    "target": "thc",
    "count": 31
  },
  {
    "source": "fentanil",
    "target": "lidocaina",
    "count": 29
  },
  {
    "source": "midazolam",
    "target": "nicotina",
    "count": 28
  },
  {
    "source": "nicotina",
    "target": "álcool",
    "count": 27
  },
  {
    "source": "cocaina",
    "target": "solventes",
    "count": 26
  },
  {
    "source": "cocaina",
    "target": "álcool",
    "count": 25
  },
  {
    "source": "lidocaina",
    "target": "solventes",
    "count": 24
  },
  {
    "source": "cocaina",
    "target": "fentanil",
    "count": 23
  },
  {
    "source": "fentanil",
    "target": "nicotina",
    "count": 23
  },
  {
    "source": "cocaina",
    "target": "levamisol",
    "count": 22
  },
  {
    "source": "lidocaina",
    "target": "álcool",
    "count": 20
  },
  {
    "source": "midazolam",
    "target": "thc",
    "count": 19
  },
  {
    "source": "cocaina",
    "target": "diazepam",
    "count": 19
  },
  {
    "source": "solventes",
    "target": "thc",
    "count": 17
  },
  {
    "source": "haloperidol",
    "target": "prometazina",
    "count": 17
  },
  {
    "source": "diazepam",
    "target": "lidocaina",
    "count": 17
  },
  {
    "source": "midazolam",
    "target": "solventes",
    "count": 17
  },
  {
    "source": "carbamazepina",
    "target": "cocaina",
    "count": 17
  },
  {
    "source": "diazepam",
    "target": "nicotina",
    "count": 16
  },
  {
    "source": "amitriptilina",
    "target": "nortriptilina",
    "count": 16
  },
  {
    "source": "thc",
    "target": "álcool",
    "count": 15
  },
  {
    "source": "diazepam",
    "target": "midazolam",
    "count": 15
  },
  {
    "source": "cocaina",
    "target": "sertralina",
    "count": 15
  },
  {
    "source": "fentanil",
    "target": "solventes",
    "count": 15
  },
  {
    "source": "nicotina",
    "target": "sertralina",
    "count": 14
  },
  {
    "source": "cocaina",
    "target": "prometazina",
    "count": 13
  },
  {
    "source": "haloperidol",
    "target": "nicotina",
    "count": 13
  },
  {
    "source": "levamisol",
    "target": "nicotina",
    "count": 13
  },
  {
    "source": "fentanil",
    "target": "thc",
    "count": 13
  },
  {
    "source": "diazepam",
    "target": "haloperidol",
    "count": 13
  },
  {
    "source": "lidocaina",
    "target": "sertralina",
    "count": 13
  },
  {
    "source": "metoclopramida",
    "target": "nicotina",
    "count": 12
  },
  {
    "source": "midazolam",
    "target": "álcool",
    "count": 12
  },
  {
    "source": "clonazepam",
    "target": "cocaina",
    "count": 12
  },
  {
    "source": "cocaina",
    "target": "haloperidol",
    "count": 11
  },
  {
    "source": "nicotina",
    "target": "prometazina",
    "count": 11
  },
  {
    "source": "metoclopramida",
    "target": "midazolam",
    "count": 11
  },
  {
    "source": "cocaina",
    "target": "metoclopramida",
    "count": 11
  },
  {
    "source": "metanol",
    "target": "solventes",
    "count": 11
  },
  {
    "source": "metanol",
    "target": "álcool",
    "count": 11
  },
  {
    "source": "diazepam",
    "target": "thc",
    "count": 11
  },
  {
    "source": "haloperidol",
    "target": "lidocaina",
    "count": 11
  },
  {
    "source": "haloperidol",
    "target": "midazolam",
    "count": 10
  },
  {
    "source": "midazolam",
    "target": "prometazina",
    "count": 10
  },
  {
    "source": "diazepam",
    "target": "fentanil",
    "count": 10
  },
  {
    "source": "diazepam",
    "target": "prometazina",
    "count": 10
  },
  {
    "source": "lidocaina",
    "target": "prometazina",
    "count": 10
  },
  {
    "source": "fentanil",
    "target": "álcool",
    "count": 10
  },
  {
    "source": "clonazepam",
    "target": "nicotina",
    "count": 10
  },
  {
    "source": "cetamina",
    "target": "lidocaina",
    "count": 10
  },
  {
    "source": "clonazepam",
    "target": "lidocaina",
    "count": 10
  },
  {
    "source": "carbamazepina",
    "target": "lidocaina",
    "count": 10
  },
  {
    "source": "haloperidol",
    "target": "thc",
    "count": 9
  },
  {
    "source": "levamisol",
    "target": "thc",
    "count": 9
  },
  {
    "source": "fentanil",
    "target": "metoclopramida",
    "count": 9
  },
  {
    "source": "cocaina",
    "target": "salbutamol",
    "count": 9
  },
  {
    "source": "diazepam",
    "target": "sertralina",
    "count": 9
  },
  {
    "source": "carbamazepina",
    "target": "nicotina",
    "count": 9
  },
  {
    "source": "haloperidol",
    "target": "solventes",
    "count": 9
  },
  {
    "source": "antiemético",
    "target": "dimenidrato",
    "count": 9
  },
  {
    "source": "amitriptilina",
    "target": "midazolam",
    "count": 9
  },
  {
    "source": "midazolam",
    "target": "nortriptilina",
    "count": 9
  },
  {
    "source": "cetamina",
    "target": "fentanil",
    "count": 8
  },
  {
    "source": "lidocaina",
    "target": "metoclopramida",
    "count": 8
  },
  {
    "source": "amitriptilina",
    "target": "cocaina",
    "count": 8
  },
  {
    "source": "cocaina",
    "target": "nortriptilina",
    "count": 8
  },
  {
    "source": "haloperidol",
    "target": "álcool",
    "count": 8
  },
  {
    "source": "diazepam",
    "target": "solventes",
    "count": 8
  },
  {
    "source": "diazepam",
    "target": "álcool",
    "count": 8
  },
  {
    "source": "amitriptilina",
    "target": "fentanil",
    "count": 8
  },
  {
    "source": "fentanil",
    "target": "nortriptilina",
    "count": 8
  },
  {
    "source": "levamisol",
    "target": "midazolam",
    "count": 7
  },
  {
    "source": "cetamina",
    "target": "midazolam",
    "count": 7
  },
  {
    "source": "sertralina",
    "target": "thc",
    "count": 7
  },
  {
    "source": "carbamazepina",
    "target": "thc",
    "count": 7
  },
  {
    "source": "cetamina",
    "target": "solventes",
    "count": 7
  },
  {
    "source": "levamisol",
    "target": "lidocaina",
    "count": 7
  },
  {
    "source": "dimenidrato",
    "target": "lidocaina",
    "count": 7
  },
  {
    "source": "amitriptilina",
    "target": "sertralina",
    "count": 7
  },
  {
    "source": "nortriptilina",
    "target": "sertralina",
    "count": 7
  },
  {
    "source": "amitriptilina",
    "target": "lidocaina",
    "count": 7
  },
  {
    "source": "lidocaina",
    "target": "nortriptilina",
    "count": 7
  },
  {
    "source": "levamisol",
    "target": "prometazina",
    "count": 6
  },
  {
    "source": "lidocaina",
    "target": "morfina",
    "count": 6
  },
  {
    "source": "nicotina",
    "target": "risperidona",
    "count": 6
  },
  {
    "source": "cocaina",
    "target": "dimenidrato",
    "count": 6
  },
  {
    "source": "levamisol",
    "target": "metoclopramida",
    "count": 6
  },
  {
    "source": "cetamina",
    "target": "cocaina",
    "count": 6
  },
  {
    "source": "fentanil",
    "target": "prometazina",
    "count": 6
  },
  {
    "source": "cocaina",
    "target": "descongestionante nasal",
    "count": 6
  },
  {
    "source": "cocaina",
    "target": "levomepromazina",
    "count": 6
  },
  {
    "source": "nicotina",
    "target": "salbutamol",
    "count": 6
  },
  {
    "source": "fentanil",
    "target": "sertralina",
    "count": 6
  },
  {
    "source": "midazolam",
    "target": "sertralina",
    "count": 6
  },
  {
    "source": "sertralina",
    "target": "solventes",
    "count": 6
  },
  {
    "source": "metoclopramida",
    "target": "solventes",
    "count": 6
  },
  {
    "source": "clonazepam",
    "target": "thc",
    "count": 6
  },
  {
    "source": "lidocaina",
    "target": "salbutamol",
    "count": 6
  },
  {
    "source": "antiemético",
    "target": "lidocaina",
    "count": 6
  },
  {
    "source": "fentanil",
    "target": "metanol",
    "count": 6
  },
  {
    "source": "morfina",
    "target": "morfina-3-glicuronideo",
    "count": 6
  },
  {
    "source": "levomepromazina",
    "target": "nicotina",
    "count": 6
  },
  {
    "source": "prometazina",
    "target": "thc",
    "count": 5
  },
  {
    "source": "midazolam",
    "target": "tramadol",
    "count": 5
  },
  {
    "source": "lidocaina",
    "target": "risperidona",
    "count": 5
  },
  {
    "source": "cetamina",
    "target": "thc",
    "count": 5
  },
  {
    "source": "salbutamol",
    "target": "thc",
    "count": 5
  },
  {
    "source": "metanol",
    "target": "nicotina",
    "count": 5
  },
  {
    "source": "risperidona",
    "target": "sertralina",
    "count": 5
  },
  {
    "source": "carbamazepina",
    "target": "metoclopramida",
    "count": 5
  },
  {
    "source": "carbamazepina",
    "target": "sertralina",
    "count": 5
  },
  {
    "source": "diazepam",
    "target": "levamisol",
    "count": 5
  },
  {
    "source": "metoclopramida",
    "target": "thc",
    "count": 5
  },
  {
    "source": "dimenidrato",
    "target": "nicotina",
    "count": 5
  },
  {
    "source": "sertralina",
    "target": "álcool",
    "count": 5
  },
  {
    "source": "desvenlafaxina",
    "target": "venlafaxina",
    "count": 5
  },
  {
    "source": "metoclopramida",
    "target": "álcool",
    "count": 5
  },
  {
    "source": "prometazina",
    "target": "solventes",
    "count": 5
  },
  {
    "source": "prometazina",
    "target": "álcool",
    "count": 5
  },
  {
    "source": "clonazepam",
    "target": "haloperidol",
    "count": 5
  },
  {
    "source": "clonazepam",
    "target": "prometazina",
    "count": 5
  },
  {
    "source": "clonazepam",
    "target": "solventes",
    "count": 5
  },
  {
    "source": "clonazepam",
    "target": "álcool",
    "count": 5
  },
  {
    "source": "fentanil",
    "target": "haloperidol",
    "count": 5
  },
  {
    "source": "cetamina",
    "target": "álcool",
    "count": 5
  },
  {
    "source": "lidocaina",
    "target": "metanol",
    "count": 5
  },
  {
    "source": "metanol",
    "target": "midazolam",
    "count": 5
  },
  {
    "source": "amitriptilina",
    "target": "nicotina",
    "count": 5
  },
  {
    "source": "nicotina",
    "target": "nortriptilina",
    "count": 5
  },
  {
    "source": "lidocaina",
    "target": "morfina-3-glicuronideo",
    "count": 5
  },
  {
    "source": "levomepromazina",
    "target": "lidocaina",
    "count": 5
  },
  {
    "source": "levomepromazina",
    "target": "solventes",
    "count": 5
  },
  {
    "source": "levomepromazina",
    "target": "álcool",
    "count": 5
  },
  {
    "source": "cocaina",
    "target": "odansetrona",
    "count": 4
  },
  {
    "source": "odansetrona",
    "target": "solventes",
    "count": 4
  },
  {
    "source": "haloperidol",
    "target": "levamisol",
    "count": 4
  },
  {
    "source": "desvenlafaxina",
    "target": "lidocaina",
    "count": 4
  },
  {
    "source": "desvenlafaxina",
    "target": "midazolam",
    "count": 4
  },
  {
    "source": "desvenlafaxina",
    "target": "nicotina",
    "count": 4
  },
  {
    "source": "fentanil",
    "target": "morfina",
    "count": 4
  },
  {
    "source": "midazolam",
    "target": "morfina",
    "count": 4
  },
  {
    "source": "prometazina",
    "target": "sertralina",
    "count": 4
  },
  {
    "source": "diazepam",
    "target": "risperidona",
    "count": 4
  },
  {
    "source": "haloperidol",
    "target": "risperidona",
    "count": 4
  },
  {
    "source": "levomepromazina",
    "target": "thc",
    "count": 4
  },
  {
    "source": "amitriptilina",
    "target": "clonazepam",
    "count": 4
  },
  {
    "source": "clonazepam",
    "target": "fluoxetina",
    "count": 4
  },
  {
    "source": "clonazepam",
    "target": "nortriptilina",
    "count": 4
  },
  {
    "source": "cocaina",
    "target": "fluoxetina",
    "count": 4
  },
  {
    "source": "haloperidol",
    "target": "odansetrona",
    "count": 4
  },
  {
    "source": "carbamazepina",
    "target": "salbutamol",
    "count": 4
  },
  {
    "source": "antiemético",
    "target": "nicotina",
    "count": 4
  },
  {
    "source": "dimenidrato",
    "target": "midazolam",
    "count": 4
  },
  {
    "source": "cocaina",
    "target": "desvenlafaxina",
    "count": 4
  },
  {
    "source": "carbamazepina",
    "target": "diazepam",
    "count": 4
  },
  {
    "source": "metoclopramida",
    "target": "tramadol",
    "count": 4
  },
  {
    "source": "fluoxetina",
    "target": "solventes",
    "count": 4
  },
  {
    "source": "fluoxetina",
    "target": "álcool",
    "count": 4
  },
  {
    "source": "fentanil",
    "target": "levamisol",
    "count": 4
  },
  {
    "source": "clorpromazina",
    "target": "lidocaina",
    "count": 4
  },
  {
    "source": "cocaina",
    "target": "fenobarbital",
    "count": 4
  },
  {
    "source": "cocaina",
    "target": "metanol",
    "count": 4
  },
  {
    "source": "lidocaina",
    "target": "tramadol",
    "count": 4
  },
  {
    "source": "descongestionante nasal",
    "target": "lidocaina",
    "count": 4
  },
  {
    "source": "odansetrona",
    "target": "álcool",
    "count": 3
  },
  {
    "source": "cetamina",
    "target": "tramadol",
    "count": 3
  },
  {
    "source": "citalopram",
    "target": "midazolam",
    "count": 3
  },
  {
    "source": "metoclopramida",
    "target": "risperidona",
    "count": 3
  },
  {
    "source": "nicotina",
    "target": "paroxetina",
    "count": 3
  },
  {
    "source": "dimenidrato",
    "target": "metoclopramida",
    "count": 3
  },
  {
    "source": "levamisol",
    "target": "sertralina",
    "count": 3
  },
  {
    "source": "risperidona",
    "target": "thc",
    "count": 3
  },
  {
    "source": "carbamazepina",
    "target": "prometazina",
    "count": 3
  },
  {
    "source": "carbamazepina",
    "target": "levamisol",
    "count": 3
  },
  {
    "source": "haloperidol",
    "target": "levomepromazina",
    "count": 3
  },
  {
    "source": "descongestionante nasal",
    "target": "levamisol",
    "count": 3
  },
  {
    "source": "cocaina",
    "target": "tramadol",
    "count": 3
  },
  {
    "source": "thc",
    "target": "tramadol",
    "count": 3
  },
  {
    "source": "levamisol",
    "target": "salbutamol",
    "count": 3
  },
  {
    "source": "antiemético",
    "target": "cocaina",
    "count": 3
  },
  {
    "source": "dimenidrato",
    "target": "fentanil",
    "count": 3
  },
  {
    "source": "cocaina",
    "target": "venlafaxina",
    "count": 3
  },
  {
    "source": "descongestionante nasal",
    "target": "desvenlafaxina",
    "count": 3
  },
  {
    "source": "desvenlafaxina",
    "target": "diazepam",
    "count": 3
  },
  {
    "source": "carbamazepina",
    "target": "solventes",
    "count": 3
  },
  {
    "source": "carbamazepina",
    "target": "álcool",
    "count": 3
  },
  {
    "source": "descongestionante nasal",
    "target": "nicotina",
    "count": 3
  },
  {
    "source": "levamisol",
    "target": "solventes",
    "count": 3
  },
  {
    "source": "levamisol",
    "target": "álcool",
    "count": 3
  },
  {
    "source": "salbutamol",
    "target": "solventes",
    "count": 3
  },
  {
    "source": "salbutamol",
    "target": "álcool",
    "count": 3
  },
  {
    "source": "cetamina",
    "target": "diazepam",
    "count": 3
  },
  {
    "source": "clonazepam",
    "target": "midazolam",
    "count": 3
  },
  {
    "source": "fluoxetina",
    "target": "midazolam",
    "count": 3
  },
  {
    "source": "midazolam",
    "target": "quetiapina",
    "count": 3
  },
  {
    "source": "clonazepam",
    "target": "fentanil",
    "count": 3
  },
  {
    "source": "fentanil",
    "target": "fluoxetina",
    "count": 3
  },
  {
    "source": "fluoxetina",
    "target": "nicotina",
    "count": 3
  },
  {
    "source": "dimenidrato",
    "target": "thc",
    "count": 3
  },
  {
    "source": "fluoxetina",
    "target": "haloperidol",
    "count": 3
  },
  {
    "source": "fluoxetina",
    "target": "prometazina",
    "count": 3
  },
  {
    "source": "anfetamina",
    "target": "nicotina",
    "count": 3
  },
  {
    "source": "citalopram",
    "target": "cocaina",
    "count": 3
  },
  {
    "source": "cocaina",
    "target": "zolpidem",
    "count": 3
  },
  {
    "source": "descongestionante nasal",
    "target": "sertralina",
    "count": 3
  },
  {
    "source": "descongestionante nasal",
    "target": "zolpidem",
    "count": 3
  },
  {
    "source": "sertralina",
    "target": "zolpidem",
    "count": 3
  },
  {
    "source": "fenitoina",
    "target": "haloperidol",
    "count": 3
  },
  {
    "source": "fenitoina",
    "target": "nicotina",
    "count": 3
  },
  {
    "source": "clonazepam",
    "target": "diazepam",
    "count": 3
  },
  {
    "source": "carbamazepina",
    "target": "risperidona",
    "count": 3
  },
  {
    "source": "clorpromazina",
    "target": "cocaina",
    "count": 3
  },
  {
    "source": "morfina",
    "target": "tramadol",
    "count": 3
  },
  {
    "source": "carbamazepina",
    "target": "fenobarbital",
    "count": 3
  },
  {
    "source": "amitriptilina",
    "target": "risperidona",
    "count": 3
  },
  {
    "source": "cocaina",
    "target": "risperidona",
    "count": 3
  },
  {
    "source": "nortriptilina",
    "target": "risperidona",
    "count": 3
  },
  {
    "source": "amitriptilina",
    "target": "morfina",
    "count": 3
  },
  {
    "source": "amitriptilina",
    "target": "morfina-3-glicuronideo",
    "count": 3
  },
  {
    "source": "amitriptilina",
    "target": "prometazina",
    "count": 3
  },
  {
    "source": "morfina",
    "target": "nortriptilina",
    "count": 3
  },
  {
    "source": "morfina-3-glicuronideo",
    "target": "nortriptilina",
    "count": 3
  },
  {
    "source": "nortriptilina",
    "target": "prometazina",
    "count": 3
  },
  {
    "source": "amitriptilina",
    "target": "diazepam",
    "count": 3
  },
  {
    "source": "diazepam",
    "target": "nortriptilina",
    "count": 3
  },
  {
    "source": "clonazepam",
    "target": "fenitoina",
    "count": 3
  },
  {
    "source": "fenitoina",
    "target": "lidocaina",
    "count": 3
  },
  {
    "source": "fenitoina",
    "target": "solventes",
    "count": 3
  },
  {
    "source": "fenitoina",
    "target": "álcool",
    "count": 3
  },
  {
    "source": "clonazepam",
    "target": "metoclopramida",
    "count": 3
  },
  {
    "source": "lidocaina",
    "target": "zolpidem",
    "count": 3
  },
  {
    "source": "antiemético",
    "target": "carbamazepina",
    "count": 3
  },
  {
    "source": "carbamazepina",
    "target": "dimenidrato",
    "count": 3
  },
  {
    "source": "fenobarbital",
    "target": "midazolam",
    "count": 3
  },
  {
    "source": "cetamina",
    "target": "nicotina",
    "count": 3
  },
  {
    "source": "fenobarbital",
    "target": "lidocaina",
    "count": 3
  },
  {
    "source": "odansetrona",
    "target": "thc",
    "count": 2
  },
  {
    "source": "cetamina",
    "target": "pregabalina",
    "count": 2
  },
  {
    "source": "citalopram",
    "target": "fentanil",
    "count": 2
  },
  {
    "source": "citalopram",
    "target": "tramadol",
    "count": 2
  },
  {
    "source": "fentanil",
    "target": "metadona",
    "count": 2
  },
  {
    "source": "fentanil",
    "target": "pregabalina",
    "count": 2
  },
  {
    "source": "fentanil",
    "target": "tramadol",
    "count": 2
  },
  {
    "source": "metadona",
    "target": "midazolam",
    "count": 2
  },
  {
    "source": "midazolam",
    "target": "pregabalina",
    "count": 2
  },
  {
    "source": "codeina",
    "target": "fentanil",
    "count": 2
  },
  {
    "source": "codeina",
    "target": "metoclopramida",
    "count": 2
  },
  {
    "source": "codeina",
    "target": "midazolam",
    "count": 2
  },
  {
    "source": "codeina",
    "target": "morfina",
    "count": 2
  },
  {
    "source": "desvenlafaxina",
    "target": "fentanil",
    "count": 2
  },
  {
    "source": "desvenlafaxina",
    "target": "metoclopramida",
    "count": 2
  },
  {
    "source": "desvenlafaxina",
    "target": "risperidona",
    "count": 2
  },
  {
    "source": "fentanil",
    "target": "paroxetina",
    "count": 2
  },
  {
    "source": "fentanil",
    "target": "risperidona",
    "count": 2
  },
  {
    "source": "lidocaina",
    "target": "pregabalina",
    "count": 2
  },
  {
    "source": "metoclopramida",
    "target": "morfina",
    "count": 2
  },
  {
    "source": "metoclopramida",
    "target": "paroxetina",
    "count": 2
  },
  {
    "source": "midazolam",
    "target": "paroxetina",
    "count": 2
  },
  {
    "source": "midazolam",
    "target": "risperidona",
    "count": 2
  },
  {
    "source": "morfina",
    "target": "nicotina",
    "count": 2
  },
  {
    "source": "morfina",
    "target": "risperidona",
    "count": 2
  },
  {
    "source": "bupropiona",
    "target": "nicotina",
    "count": 2
  },
  {
    "source": "bupropiona",
    "target": "paroxetina",
    "count": 2
  },
  {
    "source": "bupropiona",
    "target": "solventes",
    "count": 2
  },
  {
    "source": "bupropiona",
    "target": "thc",
    "count": 2
  },
  {
    "source": "bupropiona",
    "target": "álcool",
    "count": 2
  },
  {
    "source": "paroxetina",
    "target": "solventes",
    "count": 2
  },
  {
    "source": "paroxetina",
    "target": "álcool",
    "count": 2
  },
  {
    "source": "propanolol",
    "target": "zolpidem",
    "count": 2
  },
  {
    "source": "propanolol",
    "target": "zopiclone",
    "count": 2
  },
  {
    "source": "zolpidem",
    "target": "zopiclone",
    "count": 2
  },
  {
    "source": "diazepam",
    "target": "naltrexona",
    "count": 2
  },
  {
    "source": "haloperidol",
    "target": "sertralina",
    "count": 2
  },
  {
    "source": "lidocaina",
    "target": "naltrexona",
    "count": 2
  },
  {
    "source": "prometazina",
    "target": "risperidona",
    "count": 2
  },
  {
    "source": "alprazolam",
    "target": "midazolam",
    "count": 2
  },
  {
    "source": "carbamazepina",
    "target": "fentanil",
    "count": 2
  },
  {
    "source": "carbamazepina",
    "target": "midazolam",
    "count": 2
  },
  {
    "source": "clomipramina",
    "target": "fentanil",
    "count": 2
  },
  {
    "source": "metoclopramida",
    "target": "prometazina",
    "count": 2
  },
  {
    "source": "carbamazepina",
    "target": "odansetrona",
    "count": 2
  },
  {
    "source": "metoclopramida",
    "target": "sertralina",
    "count": 2
  },
  {
    "source": "diazepam",
    "target": "levomepromazina",
    "count": 2
  },
  {
    "source": "citalopram",
    "target": "prometazina",
    "count": 2
  },
  {
    "source": "descongestionante nasal",
    "target": "thc",
    "count": 2
  },
  {
    "source": "levamisol",
    "target": "levomepromazina",
    "count": 2
  },
  {
    "source": "levamisol",
    "target": "tramadol",
    "count": 2
  },
  {
    "source": "nicotina",
    "target": "tramadol",
    "count": 2
  },
  {
    "source": "metoclopramida",
    "target": "salbutamol",
    "count": 2
  },
  {
    "source": "antiemético",
    "target": "diazepam",
    "count": 2
  },
  {
    "source": "antiemético",
    "target": "fentanil",
    "count": 2
  },
  {
    "source": "antiemético",
    "target": "midazolam",
    "count": 2
  },
  {
    "source": "antiemético",
    "target": "sertralina",
    "count": 2
  },
  {
    "source": "diazepam",
    "target": "dimenidrato",
    "count": 2
  },
  {
    "source": "dimenidrato",
    "target": "sertralina",
    "count": 2
  },
  {
    "source": "dimenidrato",
    "target": "solventes",
    "count": 2
  },
  {
    "source": "dimenidrato",
    "target": "álcool",
    "count": 2
  },
  {
    "source": "descongestionante nasal",
    "target": "diazepam",
    "count": 2
  },
  {
    "source": "descongestionante nasal",
    "target": "venlafaxina",
    "count": 2
  },
  {
    "source": "desvenlafaxina",
    "target": "levamisol",
    "count": 2
  },
  {
    "source": "diazepam",
    "target": "metoclopramida",
    "count": 2
  },
  {
    "source": "diazepam",
    "target": "venlafaxina",
    "count": 2
  },
  {
    "source": "morfina",
    "target": "thc",
    "count": 2
  },
  {
    "source": "carbamazepina",
    "target": "haloperidol",
    "count": 2
  },
  {
    "source": "diazepam",
    "target": "odansetrona",
    "count": 2
  },
  {
    "source": "clonazepam",
    "target": "descongestionante nasal",
    "count": 2
  },
  {
    "source": "clonazepam",
    "target": "levamisol",
    "count": 2
  },
  {
    "source": "descongestionante nasal",
    "target": "prometazina",
    "count": 2
  },
  {
    "source": "anfetamina",
    "target": "desvenlafaxina",
    "count": 2
  },
  {
    "source": "anfetamina",
    "target": "diazepam",
    "count": 2
  },
  {
    "source": "anfetamina",
    "target": "haloperidol",
    "count": 2
  },
  {
    "source": "desvenlafaxina",
    "target": "haloperidol",
    "count": 2
  },
  {
    "source": "haloperidol",
    "target": "venlafaxina",
    "count": 2
  },
  {
    "source": "amitriptilina",
    "target": "cetamina",
    "count": 2
  },
  {
    "source": "cetamina",
    "target": "metoclopramida",
    "count": 2
  },
  {
    "source": "cetamina",
    "target": "nortriptilina",
    "count": 2
  },
  {
    "source": "diazepam",
    "target": "salbutamol",
    "count": 2
  },
  {
    "source": "salbutamol",
    "target": "sertralina",
    "count": 2
  },
  {
    "source": "clonazepam",
    "target": "quetiapina",
    "count": 2
  },
  {
    "source": "fluoxetina",
    "target": "quetiapina",
    "count": 2
  },
  {
    "source": "nicotina",
    "target": "quetiapina",
    "count": 2
  },
  {
    "source": "nicotina",
    "target": "odansetrona",
    "count": 2
  },
  {
    "source": "anfetamina",
    "target": "solventes",
    "count": 2
  },
  {
    "source": "haloperidol",
    "target": "metoclopramida",
    "count": 2
  },
  {
    "source": "metoclopramida",
    "target": "odansetrona",
    "count": 2
  },
  {
    "source": "amitriptilina",
    "target": "citalopram",
    "count": 2
  },
  {
    "source": "citalopram",
    "target": "nortriptilina",
    "count": 2
  },
  {
    "source": "clonazepam",
    "target": "desvenlafaxina",
    "count": 2
  },
  {
    "source": "clonazepam",
    "target": "sertralina",
    "count": 2
  },
  {
    "source": "clonazepam",
    "target": "venlafaxina",
    "count": 2
  },
  {
    "source": "cocaina",
    "target": "não detectado",
    "count": 2
  },
  {
    "source": "desvenlafaxina",
    "target": "sertralina",
    "count": 2
  },
  {
    "source": "desvenlafaxina",
    "target": "zolpidem",
    "count": 2
  },
  {
    "source": "fenitoina",
    "target": "fentanil",
    "count": 2
  },
  {
    "source": "fenitoina",
    "target": "midazolam",
    "count": 2
  },
  {
    "source": "cetamina",
    "target": "metanol",
    "count": 2
  },
  {
    "source": "clorpromazina",
    "target": "diazepam",
    "count": 2
  },
  {
    "source": "clorpromazina",
    "target": "haloperidol",
    "count": 2
  },
  {
    "source": "clorpromazina",
    "target": "prometazina",
    "count": 2
  },
  {
    "source": "clorpromazina",
    "target": "levamisol",
    "count": 2
  },
  {
    "source": "clorpromazina",
    "target": "midazolam",
    "count": 2
  },
  {
    "source": "cocaina",
    "target": "morfina",
    "count": 2
  },
  {
    "source": "haloperidol",
    "target": "morfina",
    "count": 2
  },
  {
    "source": "morfina",
    "target": "prometazina",
    "count": 2
  },
  {
    "source": "metanol",
    "target": "prometazina",
    "count": 2
  },
  {
    "source": "citalopram",
    "target": "nicotina",
    "count": 2
  },
  {
    "source": "clonazepam",
    "target": "risperidona",
    "count": 2
  },
  {
    "source": "amitriptilina",
    "target": "haloperidol",
    "count": 2
  },
  {
    "source": "antiemético",
    "target": "morfina",
    "count": 2
  },
  {
    "source": "antiemético",
    "target": "morfina-3-glicuronideo",
    "count": 2
  },
  {
    "source": "dimenidrato",
    "target": "morfina",
    "count": 2
  },
  {
    "source": "dimenidrato",
    "target": "morfina-3-glicuronideo",
    "count": 2
  },
  {
    "source": "haloperidol",
    "target": "nortriptilina",
    "count": 2
  },
  {
    "source": "amitriptilina",
    "target": "carbamazepina",
    "count": 2
  },
  {
    "source": "carbamazepina",
    "target": "nortriptilina",
    "count": 2
  },
  {
    "source": "desvenlafaxina",
    "target": "prometazina",
    "count": 2
  },
  {
    "source": "cetamina",
    "target": "prometazina",
    "count": 2
  },
  {
    "source": "morfina-3-glicuronideo",
    "target": "tramadol",
    "count": 2
  },
  {
    "source": "fentanil",
    "target": "naloxona",
    "count": 2
  },
  {
    "source": "lidocaina",
    "target": "naloxona",
    "count": 2
  },
  {
    "source": "midazolam",
    "target": "naloxona",
    "count": 2
  },
  {
    "source": "clorpromazina",
    "target": "nicotina",
    "count": 2
  },
  {
    "source": "clorpromazina",
    "target": "thc",
    "count": 2
  },
  {
    "source": "fentanil",
    "target": "morfina-3-glicuronideo",
    "count": 2
  },
  {
    "source": "bupropiona",
    "target": "lidocaina",
    "count": 2
  },
  {
    "source": "bupropiona",
    "target": "metoclopramida",
    "count": 2
  },
  {
    "source": "carbamazepina",
    "target": "clonazepam",
    "count": 2
  },
  {
    "source": "antiemético",
    "target": "thc",
    "count": 2
  },
  {
    "source": "antiemético",
    "target": "tramadol",
    "count": 2
  },
  {
    "source": "dimenidrato",
    "target": "tramadol",
    "count": 2
  },
  {
    "source": "antiemético",
    "target": "clorpromazina",
    "count": 2
  },
  {
    "source": "carbamazepina",
    "target": "clorpromazina",
    "count": 2
  },
  {
    "source": "clorpromazina",
    "target": "dimenidrato",
    "count": 2
  },
  {
    "source": "lidocaina",
    "target": "topiramato",
    "count": 2
  },
  {
    "source": "fenobarbital",
    "target": "fentanil",
    "count": 2
  },
  {
    "source": "fenobarbital",
    "target": "metoclopramida",
    "count": 2
  },
  {
    "source": "cetamina",
    "target": "levamisol",
    "count": 2
  },
  {
    "source": "anfetamina",
    "target": "fentanil",
    "count": 2
  },
  {
    "source": "anfetamina",
    "target": "lidocaina",
    "count": 2
  },
  {
    "source": "anfetamina",
    "target": "midazolam",
    "count": 2
  },
  {
    "source": "levomepromazina",
    "target": "sertralina",
    "count": 2
  },
  {
    "source": "fluoxetina",
    "target": "levamisol",
    "count": 2
  },
  {
    "source": "fluoxetina",
    "target": "lidocaina",
    "count": 2
  },
  {
    "source": "carbamazepina",
    "target": "levomepromazina",
    "count": 2
  },
  {
    "source": "levomepromazina",
    "target": "salbutamol",
    "count": 2
  },
  {
    "source": "cocaina",
    "target": "fenitoina",
    "count": 2
  },
  {
    "source": "fenitoina",
    "target": "thc",
    "count": 2
  },
  {
    "source": "fluoxetina",
    "target": "risperidona",
    "count": 1
  },
  {
    "source": "hidroxizine",
    "target": "thc",
    "count": 1
  },
  {
    "source": "cetamina",
    "target": "citalopram",
    "count": 1
  },
  {
    "source": "cetamina",
    "target": "metadona",
    "count": 1
  },
  {
    "source": "citalopram",
    "target": "metadona",
    "count": 1
  },
  {
    "source": "citalopram",
    "target": "pregabalina",
    "count": 1
  },
  {
    "source": "metadona",
    "target": "pregabalina",
    "count": 1
  },
  {
    "source": "metadona",
    "target": "tramadol",
    "count": 1
  },
  {
    "source": "pregabalina",
    "target": "tramadol",
    "count": 1
  },
  {
    "source": "codeina",
    "target": "desvenlafaxina",
    "count": 1
  },
  {
    "source": "codeina",
    "target": "lidocaina",
    "count": 1
  },
  {
    "source": "codeina",
    "target": "nicotina",
    "count": 1
  },
  {
    "source": "codeina",
    "target": "oxicodona* (confirmar suspeita)",
    "count": 1
  },
  {
    "source": "codeina",
    "target": "paroxetina",
    "count": 1
  },
  {
    "source": "codeina",
    "target": "pregabalina",
    "count": 1
  },
  {
    "source": "codeina",
    "target": "risperidona",
    "count": 1
  },
  {
    "source": "desvenlafaxina",
    "target": "morfina",
    "count": 1
  },
  {
    "source": "desvenlafaxina",
    "target": "oxicodona* (confirmar suspeita)",
    "count": 1
  },
  {
    "source": "desvenlafaxina",
    "target": "paroxetina",
    "count": 1
  },
  {
    "source": "desvenlafaxina",
    "target": "pregabalina",
    "count": 1
  },
  {
    "source": "fentanil",
    "target": "oxicodona* (confirmar suspeita)",
    "count": 1
  },
  {
    "source": "lidocaina",
    "target": "oxicodona* (confirmar suspeita)",
    "count": 1
  },
  {
    "source": "lidocaina",
    "target": "paroxetina",
    "count": 1
  },
  {
    "source": "metoclopramida",
    "target": "oxicodona* (confirmar suspeita)",
    "count": 1
  },
  {
    "source": "metoclopramida",
    "target": "pregabalina",
    "count": 1
  },
  {
    "source": "midazolam",
    "target": "oxicodona* (confirmar suspeita)",
    "count": 1
  },
  {
    "source": "morfina",
    "target": "oxicodona* (confirmar suspeita)",
    "count": 1
  },
  {
    "source": "morfina",
    "target": "paroxetina",
    "count": 1
  },
  {
    "source": "morfina",
    "target": "pregabalina",
    "count": 1
  },
  {
    "source": "nicotina",
    "target": "oxicodona* (confirmar suspeita)",
    "count": 1
  },
  {
    "source": "nicotina",
    "target": "pregabalina",
    "count": 1
  },
  {
    "source": "oxicodona* (confirmar suspeita)",
    "target": "paroxetina",
    "count": 1
  },
  {
    "source": "oxicodona* (confirmar suspeita)",
    "target": "pregabalina",
    "count": 1
  },
  {
    "source": "oxicodona* (confirmar suspeita)",
    "target": "risperidona",
    "count": 1
  },
  {
    "source": "paroxetina",
    "target": "pregabalina",
    "count": 1
  },
  {
    "source": "paroxetina",
    "target": "risperidona",
    "count": 1
  },
  {
    "source": "pregabalina",
    "target": "risperidona",
    "count": 1
  },
  {
    "source": "dimenidrato",
    "target": "levamisol",
    "count": 1
  },
  {
    "source": "cetamina",
    "target": "salbutamol",
    "count": 1
  },
  {
    "source": "bupropiona",
    "target": "metanol",
    "count": 1
  },
  {
    "source": "bupropiona",
    "target": "propanolol",
    "count": 1
  },
  {
    "source": "bupropiona",
    "target": "zolpidem",
    "count": 1
  },
  {
    "source": "bupropiona",
    "target": "zopiclone",
    "count": 1
  },
  {
    "source": "metanol",
    "target": "paroxetina",
    "count": 1
  },
  {
    "source": "metanol",
    "target": "propanolol",
    "count": 1
  },
  {
    "source": "metanol",
    "target": "thc",
    "count": 1
  },
  {
    "source": "metanol",
    "target": "zolpidem",
    "count": 1
  },
  {
    "source": "metanol",
    "target": "zopiclone",
    "count": 1
  },
  {
    "source": "nicotina",
    "target": "propanolol",
    "count": 1
  },
  {
    "source": "nicotina",
    "target": "zolpidem",
    "count": 1
  },
  {
    "source": "nicotina",
    "target": "zopiclone",
    "count": 1
  },
  {
    "source": "paroxetina",
    "target": "propanolol",
    "count": 1
  },
  {
    "source": "paroxetina",
    "target": "thc",
    "count": 1
  },
  {
    "source": "paroxetina",
    "target": "zolpidem",
    "count": 1
  },
  {
    "source": "paroxetina",
    "target": "zopiclone",
    "count": 1
  },
  {
    "source": "propanolol",
    "target": "solventes",
    "count": 1
  },
  {
    "source": "propanolol",
    "target": "thc",
    "count": 1
  },
  {
    "source": "propanolol",
    "target": "álcool",
    "count": 1
  },
  {
    "source": "solventes",
    "target": "zolpidem",
    "count": 1
  },
  {
    "source": "solventes",
    "target": "zopiclone",
    "count": 1
  },
  {
    "source": "thc",
    "target": "zolpidem",
    "count": 1
  },
  {
    "source": "thc",
    "target": "zopiclone",
    "count": 1
  },
  {
    "source": "zolpidem",
    "target": "álcool",
    "count": 1
  },
  {
    "source": "zopiclone",
    "target": "álcool",
    "count": 1
  },
  {
    "source": "cocaina",
    "target": "fenoterol",
    "count": 1
  },
  {
    "source": "fenoterol",
    "target": "levamisol",
    "count": 1
  },
  {
    "source": "fenoterol",
    "target": "prometazina",
    "count": 1
  },
  {
    "source": "fenoterol",
    "target": "sertralina",
    "count": 1
  },
  {
    "source": "diazepam",
    "target": "lorazepam",
    "count": 1
  },
  {
    "source": "haloperidol",
    "target": "lorazepam",
    "count": 1
  },
  {
    "source": "haloperidol",
    "target": "naltrexona",
    "count": 1
  },
  {
    "source": "lidocaina",
    "target": "lorazepam",
    "count": 1
  },
  {
    "source": "lorazepam",
    "target": "naltrexona",
    "count": 1
  },
  {
    "source": "lorazepam",
    "target": "nicotina",
    "count": 1
  },
  {
    "source": "lorazepam",
    "target": "prometazina",
    "count": 1
  },
  {
    "source": "lorazepam",
    "target": "risperidona",
    "count": 1
  },
  {
    "source": "lorazepam",
    "target": "sertralina",
    "count": 1
  },
  {
    "source": "lorazepam",
    "target": "thc",
    "count": 1
  },
  {
    "source": "naltrexona",
    "target": "nicotina",
    "count": 1
  },
  {
    "source": "naltrexona",
    "target": "prometazina",
    "count": 1
  },
  {
    "source": "naltrexona",
    "target": "risperidona",
    "count": 1
  },
  {
    "source": "naltrexona",
    "target": "sertralina",
    "count": 1
  },
  {
    "source": "naltrexona",
    "target": "thc",
    "count": 1
  },
  {
    "source": "alprazolam",
    "target": "carbamazepina",
    "count": 1
  },
  {
    "source": "alprazolam",
    "target": "clomipramina",
    "count": 1
  },
  {
    "source": "alprazolam",
    "target": "fentanil",
    "count": 1
  },
  {
    "source": "alprazolam",
    "target": "metoclopramida",
    "count": 1
  },
  {
    "source": "alprazolam",
    "target": "prometazina",
    "count": 1
  },
  {
    "source": "carbamazepina",
    "target": "clomipramina",
    "count": 1
  },
  {
    "source": "clomipramina",
    "target": "metoclopramida",
    "count": 1
  },
  {
    "source": "clomipramina",
    "target": "midazolam",
    "count": 1
  },
  {
    "source": "clomipramina",
    "target": "prometazina",
    "count": 1
  },
  {
    "source": "clozapina",
    "target": "diazepam",
    "count": 1
  },
  {
    "source": "clozapina",
    "target": "fentermina",
    "count": 1
  },
  {
    "source": "clozapina",
    "target": "haloperidol",
    "count": 1
  },
  {
    "source": "clozapina",
    "target": "levomepromazina",
    "count": 1
  },
  {
    "source": "clozapina",
    "target": "olanzapina",
    "count": 1
  },
  {
    "source": "diazepam",
    "target": "fentermina",
    "count": 1
  },
  {
    "source": "diazepam",
    "target": "olanzapina",
    "count": 1
  },
  {
    "source": "fentermina",
    "target": "haloperidol",
    "count": 1
  },
  {
    "source": "fentermina",
    "target": "levomepromazina",
    "count": 1
  },
  {
    "source": "fentermina",
    "target": "olanzapina",
    "count": 1
  },
  {
    "source": "haloperidol",
    "target": "olanzapina",
    "count": 1
  },
  {
    "source": "levomepromazina",
    "target": "olanzapina",
    "count": 1
  },
  {
    "source": "anfetamina",
    "target": "catinona sintética",
    "count": 1
  },
  {
    "source": "anfetamina",
    "target": "citalopram",
    "count": 1
  },
  {
    "source": "anfetamina",
    "target": "prometazina",
    "count": 1
  },
  {
    "source": "anfetamina",
    "target": "trazodona",
    "count": 1
  },
  {
    "source": "catinona sintética",
    "target": "citalopram",
    "count": 1
  },
  {
    "source": "catinona sintética",
    "target": "prometazina",
    "count": 1
  },
  {
    "source": "catinona sintética",
    "target": "trazodona",
    "count": 1
  },
  {
    "source": "citalopram",
    "target": "trazodona",
    "count": 1
  },
  {
    "source": "prometazina",
    "target": "trazodona",
    "count": 1
  },
  {
    "source": "descongestionante nasal",
    "target": "levomepromazina",
    "count": 1
  },
  {
    "source": "descongestionante nasal",
    "target": "odansetrona",
    "count": 1
  },
  {
    "source": "levamisol",
    "target": "odansetrona",
    "count": 1
  },
  {
    "source": "levomepromazina",
    "target": "odansetrona",
    "count": 1
  },
  {
    "source": "diazepam",
    "target": "tramadol",
    "count": 1
  },
  {
    "source": "amitriptilina",
    "target": "codeina",
    "count": 1
  },
  {
    "source": "amitriptilina",
    "target": "fluoxetina",
    "count": 1
  },
  {
    "source": "amitriptilina",
    "target": "oxicodona",
    "count": 1
  },
  {
    "source": "clonazepam",
    "target": "codeina",
    "count": 1
  },
  {
    "source": "clonazepam",
    "target": "oxicodona",
    "count": 1
  },
  {
    "source": "cocaina",
    "target": "codeina",
    "count": 1
  },
  {
    "source": "cocaina",
    "target": "oxicodona",
    "count": 1
  },
  {
    "source": "codeina",
    "target": "fluoxetina",
    "count": 1
  },
  {
    "source": "codeina",
    "target": "nortriptilina",
    "count": 1
  },
  {
    "source": "codeina",
    "target": "oxicodona",
    "count": 1
  },
  {
    "source": "fluoxetina",
    "target": "nortriptilina",
    "count": 1
  },
  {
    "source": "fluoxetina",
    "target": "oxicodona",
    "count": 1
  },
  {
    "source": "nortriptilina",
    "target": "oxicodona",
    "count": 1
  },
  {
    "source": "odansetrona",
    "target": "topiramato",
    "count": 1
  },
  {
    "source": "fentanil",
    "target": "ácido valpróico",
    "count": 1
  },
  {
    "source": "metoclopramida",
    "target": "ácido valpróico",
    "count": 1
  },
  {
    "source": "midazolam",
    "target": "ácido valpróico",
    "count": 1
  },
  {
    "source": "antiemético",
    "target": "solventes",
    "count": 1
  },
  {
    "source": "antiemético",
    "target": "álcool",
    "count": 1
  },
  {
    "source": "descongestionante nasal",
    "target": "metoclopramida",
    "count": 1
  },
  {
    "source": "levamisol",
    "target": "venlafaxina",
    "count": 1
  },
  {
    "source": "metoclopramida",
    "target": "venlafaxina",
    "count": 1
  },
  {
    "source": "codeina",
    "target": "thc",
    "count": 1
  },
  {
    "source": "odansetrona",
    "target": "prometazina",
    "count": 1
  },
  {
    "source": "descongestionante nasal",
    "target": "haloperidol",
    "count": 1
  },
  {
    "source": "anfetamina",
    "target": "risperidona",
    "count": 1
  },
  {
    "source": "anfetamina",
    "target": "thc",
    "count": 1
  },
  {
    "source": "anfetamina",
    "target": "venlafaxina",
    "count": 1
  },
  {
    "source": "desvenlafaxina",
    "target": "thc",
    "count": 1
  },
  {
    "source": "risperidona",
    "target": "venlafaxina",
    "count": 1
  },
  {
    "source": "thc",
    "target": "venlafaxina",
    "count": 1
  },
  {
    "source": "amitriptilina",
    "target": "metoclopramida",
    "count": 1
  },
  {
    "source": "amitriptilina",
    "target": "tramadol",
    "count": 1
  },
  {
    "source": "metoclopramida",
    "target": "nortriptilina",
    "count": 1
  },
  {
    "source": "nortriptilina",
    "target": "tramadol",
    "count": 1
  },
  {
    "source": "quetiapina",
    "target": "solventes",
    "count": 1
  },
  {
    "source": "quetiapina",
    "target": "álcool",
    "count": 1
  },
  {
    "source": "clomipramina",
    "target": "clonazepam",
    "count": 1
  },
  {
    "source": "clomipramina",
    "target": "fluoxetina",
    "count": 1
  },
  {
    "source": "clomipramina",
    "target": "nicotina",
    "count": 1
  },
  {
    "source": "clomipramina",
    "target": "quetiapina",
    "count": 1
  },
  {
    "source": "fentanil",
    "target": "quetiapina",
    "count": 1
  },
  {
    "source": "clonazepam",
    "target": "dimenidrato",
    "count": 1
  },
  {
    "source": "clonazepam",
    "target": "odansetrona",
    "count": 1
  },
  {
    "source": "dimenidrato",
    "target": "odansetrona",
    "count": 1
  },
  {
    "source": "ciproheptadina",
    "target": "clonazepam",
    "count": 1
  },
  {
    "source": "ciproheptadina",
    "target": "fluoxetina",
    "count": 1
  },
  {
    "source": "ciproheptadina",
    "target": "haloperidol",
    "count": 1
  },
  {
    "source": "ciproheptadina",
    "target": "prometazina",
    "count": 1
  },
  {
    "source": "anfetamina",
    "target": "metoclopramida",
    "count": 1
  },
  {
    "source": "anfetamina",
    "target": "odansetrona",
    "count": 1
  },
  {
    "source": "amitriptilina",
    "target": "descongestionante nasal",
    "count": 1
  },
  {
    "source": "amitriptilina",
    "target": "desvenlafaxina",
    "count": 1
  },
  {
    "source": "amitriptilina",
    "target": "não detectado",
    "count": 1
  },
  {
    "source": "amitriptilina",
    "target": "propanolol",
    "count": 1
  },
  {
    "source": "amitriptilina",
    "target": "venlafaxina",
    "count": 1
  },
  {
    "source": "amitriptilina",
    "target": "zolpidem",
    "count": 1
  },
  {
    "source": "amitriptilina",
    "target": "zopiclone",
    "count": 1
  },
  {
    "source": "citalopram",
    "target": "clonazepam",
    "count": 1
  },
  {
    "source": "citalopram",
    "target": "descongestionante nasal",
    "count": 1
  },
  {
    "source": "citalopram",
    "target": "desvenlafaxina",
    "count": 1
  },
  {
    "source": "citalopram",
    "target": "não detectado",
    "count": 1
  },
  {
    "source": "citalopram",
    "target": "propanolol",
    "count": 1
  },
  {
    "source": "citalopram",
    "target": "sertralina",
    "count": 1
  },
  {
    "source": "citalopram",
    "target": "venlafaxina",
    "count": 1
  },
  {
    "source": "citalopram",
    "target": "zolpidem",
    "count": 1
  },
  {
    "source": "citalopram",
    "target": "zopiclone",
    "count": 1
  },
  {
    "source": "clonazepam",
    "target": "não detectado",
    "count": 1
  },
  {
    "source": "clonazepam",
    "target": "propanolol",
    "count": 1
  },
  {
    "source": "clonazepam",
    "target": "zolpidem",
    "count": 1
  },
  {
    "source": "clonazepam",
    "target": "zopiclone",
    "count": 1
  },
  {
    "source": "cocaina",
    "target": "propanolol",
    "count": 1
  },
  {
    "source": "cocaina",
    "target": "zopiclone",
    "count": 1
  },
  {
    "source": "descongestionante nasal",
    "target": "nortriptilina",
    "count": 1
  },
  {
    "source": "descongestionante nasal",
    "target": "não detectado",
    "count": 1
  },
  {
    "source": "descongestionante nasal",
    "target": "propanolol",
    "count": 1
  },
  {
    "source": "descongestionante nasal",
    "target": "zopiclone",
    "count": 1
  },
  {
    "source": "desvenlafaxina",
    "target": "nortriptilina",
    "count": 1
  },
  {
    "source": "desvenlafaxina",
    "target": "não detectado",
    "count": 1
  },
  {
    "source": "desvenlafaxina",
    "target": "propanolol",
    "count": 1
  },
  {
    "source": "desvenlafaxina",
    "target": "zopiclone",
    "count": 1
  },
  {
    "source": "nortriptilina",
    "target": "não detectado",
    "count": 1
  },
  {
    "source": "nortriptilina",
    "target": "propanolol",
    "count": 1
  },
  {
    "source": "nortriptilina",
    "target": "venlafaxina",
    "count": 1
  },
  {
    "source": "nortriptilina",
    "target": "zolpidem",
    "count": 1
  },
  {
    "source": "nortriptilina",
    "target": "zopiclone",
    "count": 1
  },
  {
    "source": "não detectado",
    "target": "propanolol",
    "count": 1
  },
  {
    "source": "não detectado",
    "target": "sertralina",
    "count": 1
  },
  {
    "source": "não detectado",
    "target": "venlafaxina",
    "count": 1
  },
  {
    "source": "não detectado",
    "target": "zolpidem",
    "count": 1
  },
  {
    "source": "não detectado",
    "target": "zopiclone",
    "count": 1
  },
  {
    "source": "propanolol",
    "target": "sertralina",
    "count": 1
  },
  {
    "source": "propanolol",
    "target": "venlafaxina",
    "count": 1
  },
  {
    "source": "sertralina",
    "target": "venlafaxina",
    "count": 1
  },
  {
    "source": "sertralina",
    "target": "zopiclone",
    "count": 1
  },
  {
    "source": "venlafaxina",
    "target": "zolpidem",
    "count": 1
  },
  {
    "source": "venlafaxina",
    "target": "zopiclone",
    "count": 1
  },
  {
    "source": "fenitoina",
    "target": "metoclopramida",
    "count": 1
  },
  {
    "source": "fenitoina",
    "target": "prometazina",
    "count": 1
  },
  {
    "source": "clonazepam",
    "target": "clorpromazina",
    "count": 1
  },
  {
    "source": "citalopram",
    "target": "clorpromazina",
    "count": 1
  },
  {
    "source": "citalopram",
    "target": "haloperidol",
    "count": 1
  },
  {
    "source": "citalopram",
    "target": "levamisol",
    "count": 1
  },
  {
    "source": "citalopram",
    "target": "morfina",
    "count": 1
  },
  {
    "source": "citalopram",
    "target": "quetiapina",
    "count": 1
  },
  {
    "source": "clorpromazina",
    "target": "morfina",
    "count": 1
  },
  {
    "source": "clorpromazina",
    "target": "quetiapina",
    "count": 1
  },
  {
    "source": "clorpromazina",
    "target": "tramadol",
    "count": 1
  },
  {
    "source": "cocaina",
    "target": "quetiapina",
    "count": 1
  },
  {
    "source": "haloperidol",
    "target": "quetiapina",
    "count": 1
  },
  {
    "source": "haloperidol",
    "target": "tramadol",
    "count": 1
  },
  {
    "source": "levamisol",
    "target": "morfina",
    "count": 1
  },
  {
    "source": "levamisol",
    "target": "quetiapina",
    "count": 1
  },
  {
    "source": "morfina",
    "target": "quetiapina",
    "count": 1
  },
  {
    "source": "prometazina",
    "target": "quetiapina",
    "count": 1
  },
  {
    "source": "prometazina",
    "target": "tramadol",
    "count": 1
  },
  {
    "source": "quetiapina",
    "target": "tramadol",
    "count": 1
  },
  {
    "source": "fenobarbital",
    "target": "nicotina",
    "count": 1
  },
  {
    "source": "cetamina",
    "target": "codeina",
    "count": 1
  },
  {
    "source": "cetamina",
    "target": "odansetrona",
    "count": 1
  },
  {
    "source": "codeina",
    "target": "odansetrona",
    "count": 1
  },
  {
    "source": "codeina",
    "target": "tramadol",
    "count": 1
  },
  {
    "source": "odansetrona",
    "target": "tramadol",
    "count": 1
  },
  {
    "source": "fluoxetina",
    "target": "thc",
    "count": 1
  },
  {
    "source": "fluoxetina",
    "target": "salbutamol",
    "count": 1
  },
  {
    "source": "prometazina",
    "target": "salbutamol",
    "count": 1
  },
  {
    "source": "diazepam",
    "target": "metanol",
    "count": 1
  },
  {
    "source": "bromoprida",
    "target": "diazepam",
    "count": 1
  },
  {
    "source": "bromoprida",
    "target": "fentanil",
    "count": 1
  },
  {
    "source": "bromoprida",
    "target": "haloperidol",
    "count": 1
  },
  {
    "source": "bromoprida",
    "target": "midazolam",
    "count": 1
  },
  {
    "source": "bromoprida",
    "target": "odansetrona",
    "count": 1
  },
  {
    "source": "fentanil",
    "target": "odansetrona",
    "count": 1
  },
  {
    "source": "midazolam",
    "target": "odansetrona",
    "count": 1
  },
  {
    "source": "amitriptilina",
    "target": "bromazepam",
    "count": 1
  },
  {
    "source": "amitriptilina",
    "target": "paroxetina",
    "count": 1
  },
  {
    "source": "bromazepam",
    "target": "citalopram",
    "count": 1
  },
  {
    "source": "bromazepam",
    "target": "fentanil",
    "count": 1
  },
  {
    "source": "bromazepam",
    "target": "midazolam",
    "count": 1
  },
  {
    "source": "bromazepam",
    "target": "nicotina",
    "count": 1
  },
  {
    "source": "bromazepam",
    "target": "nortriptilina",
    "count": 1
  },
  {
    "source": "bromazepam",
    "target": "paroxetina",
    "count": 1
  },
  {
    "source": "citalopram",
    "target": "paroxetina",
    "count": 1
  },
  {
    "source": "nortriptilina",
    "target": "paroxetina",
    "count": 1
  },
  {
    "source": "amitriptilina",
    "target": "thc",
    "count": 1
  },
  {
    "source": "nortriptilina",
    "target": "thc",
    "count": 1
  },
  {
    "source": "amitriptilina",
    "target": "antiemético",
    "count": 1
  },
  {
    "source": "amitriptilina",
    "target": "dimenidrato",
    "count": 1
  },
  {
    "source": "antiemético",
    "target": "haloperidol",
    "count": 1
  },
  {
    "source": "antiemético",
    "target": "nortriptilina",
    "count": 1
  },
  {
    "source": "antiemético",
    "target": "prometazina",
    "count": 1
  },
  {
    "source": "antiemético",
    "target": "risperidona",
    "count": 1
  },
  {
    "source": "dimenidrato",
    "target": "haloperidol",
    "count": 1
  },
  {
    "source": "dimenidrato",
    "target": "nortriptilina",
    "count": 1
  },
  {
    "source": "dimenidrato",
    "target": "prometazina",
    "count": 1
  },
  {
    "source": "dimenidrato",
    "target": "risperidona",
    "count": 1
  },
  {
    "source": "haloperidol",
    "target": "morfina-3-glicuronideo",
    "count": 1
  },
  {
    "source": "morfina-3-glicuronideo",
    "target": "nicotina",
    "count": 1
  },
  {
    "source": "morfina-3-glicuronideo",
    "target": "prometazina",
    "count": 1
  },
  {
    "source": "morfina-3-glicuronideo",
    "target": "risperidona",
    "count": 1
  },
  {
    "source": "metanol",
    "target": "metoclopramida",
    "count": 1
  },
  {
    "source": "5f-bzo-poxizid",
    "target": "bzo-hexoxizid(mda-19)",
    "count": 1
  },
  {
    "source": "5f-bzo-poxizid",
    "target": "bzo-poxizid",
    "count": 1
  },
  {
    "source": "5f-bzo-poxizid",
    "target": "canabinoide sintético",
    "count": 1
  },
  {
    "source": "5f-bzo-poxizid",
    "target": "canabinóides sintéticos",
    "count": 1
  },
  {
    "source": "5f-bzo-poxizid",
    "target": "cocaina",
    "count": 1
  },
  {
    "source": "5f-bzo-poxizid",
    "target": "lidocaina",
    "count": 1
  },
  {
    "source": "bzo-hexoxizid(mda-19)",
    "target": "bzo-poxizid",
    "count": 1
  },
  {
    "source": "bzo-hexoxizid(mda-19)",
    "target": "canabinoide sintético",
    "count": 1
  },
  {
    "source": "bzo-hexoxizid(mda-19)",
    "target": "canabinóides sintéticos",
    "count": 1
  },
  {
    "source": "bzo-hexoxizid(mda-19)",
    "target": "cocaina",
    "count": 1
  },
  {
    "source": "bzo-hexoxizid(mda-19)",
    "target": "lidocaina",
    "count": 1
  },
  {
    "source": "bzo-poxizid",
    "target": "canabinoide sintético",
    "count": 1
  },
  {
    "source": "bzo-poxizid",
    "target": "canabinóides sintéticos",
    "count": 1
  },
  {
    "source": "bzo-poxizid",
    "target": "cocaina",
    "count": 1
  },
  {
    "source": "bzo-poxizid",
    "target": "lidocaina",
    "count": 1
  },
  {
    "source": "canabinoide sintético",
    "target": "canabinóides sintéticos",
    "count": 1
  },
  {
    "source": "canabinoide sintético",
    "target": "cocaina",
    "count": 1
  },
  {
    "source": "canabinoide sintético",
    "target": "lidocaina",
    "count": 1
  },
  {
    "source": "canabinóides sintéticos",
    "target": "cocaina",
    "count": 1
  },
  {
    "source": "canabinóides sintéticos",
    "target": "lidocaina",
    "count": 1
  },
  {
    "source": "cocaina",
    "target": "morfina-3-glicuronideo",
    "count": 1
  },
  {
    "source": "anfepramona",
    "target": "cocaina",
    "count": 1
  },
  {
    "source": "anfepramona",
    "target": "haloperidol",
    "count": 1
  },
  {
    "source": "anfepramona",
    "target": "lidocaina",
    "count": 1
  },
  {
    "source": "anfepramona",
    "target": "midazolam",
    "count": 1
  },
  {
    "source": "anfepramona",
    "target": "prometazina",
    "count": 1
  },
  {
    "source": "anfepramona",
    "target": "sibutramina",
    "count": 1
  },
  {
    "source": "cocaina",
    "target": "sibutramina",
    "count": 1
  },
  {
    "source": "haloperidol",
    "target": "sibutramina",
    "count": 1
  },
  {
    "source": "lidocaina",
    "target": "sibutramina",
    "count": 1
  },
  {
    "source": "midazolam",
    "target": "sibutramina",
    "count": 1
  },
  {
    "source": "prometazina",
    "target": "sibutramina",
    "count": 1
  },
  {
    "source": "nicotina",
    "target": "venlafaxina",
    "count": 1
  },
  {
    "source": "prometazina",
    "target": "venlafaxina",
    "count": 1
  },
  {
    "source": "cetamina",
    "target": "haloperidol",
    "count": 1
  },
  {
    "source": "amitriptilina",
    "target": "clorpromazina",
    "count": 1
  },
  {
    "source": "clorpromazina",
    "target": "fentanil",
    "count": 1
  },
  {
    "source": "clorpromazina",
    "target": "nortriptilina",
    "count": 1
  },
  {
    "source": "clorpromazina",
    "target": "sertralina",
    "count": 1
  },
  {
    "source": "alprazolam",
    "target": "desvenlafaxina",
    "count": 1
  },
  {
    "source": "alprazolam",
    "target": "midazolam abuso!",
    "count": 1
  },
  {
    "source": "alprazolam",
    "target": "nicotina",
    "count": 1
  },
  {
    "source": "alprazolam",
    "target": "olanzapina",
    "count": 1
  },
  {
    "source": "alprazolam",
    "target": "quetiapina",
    "count": 1
  },
  {
    "source": "alprazolam",
    "target": "trazodona",
    "count": 1
  },
  {
    "source": "desvenlafaxina",
    "target": "midazolam abuso!",
    "count": 1
  },
  {
    "source": "desvenlafaxina",
    "target": "olanzapina",
    "count": 1
  },
  {
    "source": "desvenlafaxina",
    "target": "quetiapina",
    "count": 1
  },
  {
    "source": "desvenlafaxina",
    "target": "trazodona",
    "count": 1
  },
  {
    "source": "midazolam",
    "target": "midazolam abuso!",
    "count": 1
  },
  {
    "source": "midazolam",
    "target": "olanzapina",
    "count": 1
  },
  {
    "source": "midazolam",
    "target": "trazodona",
    "count": 1
  },
  {
    "source": "midazolam abuso!",
    "target": "nicotina",
    "count": 1
  },
  {
    "source": "midazolam abuso!",
    "target": "olanzapina",
    "count": 1
  },
  {
    "source": "midazolam abuso!",
    "target": "quetiapina",
    "count": 1
  },
  {
    "source": "midazolam abuso!",
    "target": "trazodona",
    "count": 1
  },
  {
    "source": "nicotina",
    "target": "olanzapina",
    "count": 1
  },
  {
    "source": "nicotina",
    "target": "trazodona",
    "count": 1
  },
  {
    "source": "olanzapina",
    "target": "quetiapina",
    "count": 1
  },
  {
    "source": "olanzapina",
    "target": "trazodona",
    "count": 1
  },
  {
    "source": "quetiapina",
    "target": "trazodona",
    "count": 1
  },
  {
    "source": "clozapina",
    "target": "fentanil",
    "count": 1
  },
  {
    "source": "clozapina",
    "target": "lidocaina",
    "count": 1
  },
  {
    "source": "clozapina",
    "target": "metoclopramida",
    "count": 1
  },
  {
    "source": "clozapina",
    "target": "midazolam",
    "count": 1
  },
  {
    "source": "metoclopramida",
    "target": "morfina-3-glicuronideo",
    "count": 1
  },
  {
    "source": "cetamina",
    "target": "clonazepam",
    "count": 1
  },
  {
    "source": "cetamina",
    "target": "desipramina",
    "count": 1
  },
  {
    "source": "cetamina",
    "target": "fenitoina",
    "count": 1
  },
  {
    "source": "cetamina",
    "target": "imipramina",
    "count": 1
  },
  {
    "source": "clonazepam",
    "target": "desipramina",
    "count": 1
  },
  {
    "source": "clonazepam",
    "target": "imipramina",
    "count": 1
  },
  {
    "source": "clonazepam",
    "target": "pregabalina",
    "count": 1
  },
  {
    "source": "desipramina",
    "target": "fenitoina",
    "count": 1
  },
  {
    "source": "desipramina",
    "target": "imipramina",
    "count": 1
  },
  {
    "source": "desipramina",
    "target": "lidocaina",
    "count": 1
  },
  {
    "source": "desipramina",
    "target": "pregabalina",
    "count": 1
  },
  {
    "source": "desipramina",
    "target": "solventes",
    "count": 1
  },
  {
    "source": "desipramina",
    "target": "álcool",
    "count": 1
  },
  {
    "source": "fenitoina",
    "target": "imipramina",
    "count": 1
  },
  {
    "source": "fenitoina",
    "target": "pregabalina",
    "count": 1
  },
  {
    "source": "imipramina",
    "target": "lidocaina",
    "count": 1
  },
  {
    "source": "imipramina",
    "target": "pregabalina",
    "count": 1
  },
  {
    "source": "imipramina",
    "target": "solventes",
    "count": 1
  },
  {
    "source": "imipramina",
    "target": "álcool",
    "count": 1
  },
  {
    "source": "pregabalina",
    "target": "solventes",
    "count": 1
  },
  {
    "source": "pregabalina",
    "target": "álcool",
    "count": 1
  },
  {
    "source": "cocaina",
    "target": "naloxona",
    "count": 1
  },
  {
    "source": "descongestionante nasal",
    "target": "fentanil",
    "count": 1
  },
  {
    "source": "descongestionante nasal",
    "target": "midazolam",
    "count": 1
  },
  {
    "source": "amitriptilina",
    "target": "metadona",
    "count": 1
  },
  {
    "source": "amitriptilina",
    "target": "naloxona",
    "count": 1
  },
  {
    "source": "lidocaina",
    "target": "metadona",
    "count": 1
  },
  {
    "source": "metadona",
    "target": "morfina",
    "count": 1
  },
  {
    "source": "metadona",
    "target": "morfina-3-glicuronideo",
    "count": 1
  },
  {
    "source": "metadona",
    "target": "naloxona",
    "count": 1
  },
  {
    "source": "metadona",
    "target": "nortriptilina",
    "count": 1
  },
  {
    "source": "midazolam",
    "target": "morfina-3-glicuronideo",
    "count": 1
  },
  {
    "source": "morfina",
    "target": "naloxona",
    "count": 1
  },
  {
    "source": "morfina-3-glicuronideo",
    "target": "naloxona",
    "count": 1
  },
  {
    "source": "naloxona",
    "target": "nortriptilina",
    "count": 1
  },
  {
    "source": "clonazepam",
    "target": "tramadol",
    "count": 1
  },
  {
    "source": "descongestionante nasal",
    "target": "quetiapina",
    "count": 1
  },
  {
    "source": "descongestionante nasal",
    "target": "risperidona",
    "count": 1
  },
  {
    "source": "lidocaina",
    "target": "quetiapina",
    "count": 1
  },
  {
    "source": "quetiapina",
    "target": "risperidona",
    "count": 1
  },
  {
    "source": "quetiapina",
    "target": "zolpidem",
    "count": 1
  },
  {
    "source": "risperidona",
    "target": "zolpidem",
    "count": 1
  },
  {
    "source": "bupropiona",
    "target": "carbamazepina",
    "count": 1
  },
  {
    "source": "bupropiona",
    "target": "clonazepam",
    "count": 1
  },
  {
    "source": "bupropiona",
    "target": "cocaina",
    "count": 1
  },
  {
    "source": "bupropiona",
    "target": "levamisol",
    "count": 1
  },
  {
    "source": "bupropiona",
    "target": "risperidona",
    "count": 1
  },
  {
    "source": "bupropiona",
    "target": "salbutamol",
    "count": 1
  },
  {
    "source": "clonazepam",
    "target": "salbutamol",
    "count": 1
  },
  {
    "source": "levamisol",
    "target": "risperidona",
    "count": 1
  },
  {
    "source": "risperidona",
    "target": "salbutamol",
    "count": 1
  },
  {
    "source": "bupropiona",
    "target": "fluoxetina",
    "count": 1
  },
  {
    "source": "fluoxetina",
    "target": "metoclopramida",
    "count": 1
  },
  {
    "source": "fluoxetina",
    "target": "paroxetina",
    "count": 1
  },
  {
    "source": "carbamazepina",
    "target": "tramadol",
    "count": 1
  },
  {
    "source": "sertralina",
    "target": "tramadol",
    "count": 1
  },
  {
    "source": "7-aminoflunitrazepam",
    "target": "cocaina",
    "count": 1
  },
  {
    "source": "7-aminoflunitrazepam",
    "target": "diazepam",
    "count": 1
  },
  {
    "source": "7-aminoflunitrazepam",
    "target": "fentanil",
    "count": 1
  },
  {
    "source": "7-aminoflunitrazepam",
    "target": "midazolam",
    "count": 1
  },
  {
    "source": "1,4-butanodiol",
    "target": "citalopram",
    "count": 1
  },
  {
    "source": "1,4-butanodiol",
    "target": "cocaina",
    "count": 1
  },
  {
    "source": "1,4-butanodiol",
    "target": "ghb",
    "count": 1
  },
  {
    "source": "1,4-butanodiol",
    "target": "lidocaina",
    "count": 1
  },
  {
    "source": "1,4-butanodiol",
    "target": "mirtazapina",
    "count": 1
  },
  {
    "source": "1,4-butanodiol",
    "target": "nicotina",
    "count": 1
  },
  {
    "source": "1,4-butanodiol",
    "target": "topiramato",
    "count": 1
  },
  {
    "source": "citalopram",
    "target": "ghb",
    "count": 1
  },
  {
    "source": "citalopram",
    "target": "lidocaina",
    "count": 1
  },
  {
    "source": "citalopram",
    "target": "mirtazapina",
    "count": 1
  },
  {
    "source": "citalopram",
    "target": "topiramato",
    "count": 1
  },
  {
    "source": "cocaina",
    "target": "ghb",
    "count": 1
  },
  {
    "source": "cocaina",
    "target": "mirtazapina",
    "count": 1
  },
  {
    "source": "cocaina",
    "target": "topiramato",
    "count": 1
  },
  {
    "source": "ghb",
    "target": "lidocaina",
    "count": 1
  },
  {
    "source": "ghb",
    "target": "mirtazapina",
    "count": 1
  },
  {
    "source": "ghb",
    "target": "nicotina",
    "count": 1
  },
  {
    "source": "ghb",
    "target": "topiramato",
    "count": 1
  },
  {
    "source": "lidocaina",
    "target": "mirtazapina",
    "count": 1
  },
  {
    "source": "mirtazapina",
    "target": "nicotina",
    "count": 1
  },
  {
    "source": "mirtazapina",
    "target": "topiramato",
    "count": 1
  },
  {
    "source": "nicotina",
    "target": "topiramato",
    "count": 1
  },
  {
    "source": "anestésico",
    "target": "opióide",
    "count": 1
  },
  {
    "source": "anestésico",
    "target": "álcool",
    "count": 1
  },
  {
    "source": "opióide",
    "target": "álcool",
    "count": 1
  },
  {
    "source": "hidroxizine",
    "target": "midazolam",
    "count": 1
  },
  {
    "source": "fenitoina",
    "target": "fenobarbital",
    "count": 1
  },
  {
    "source": "cocaina",
    "target": "detectado em sangue apenas",
    "count": 1
  },
  {
    "source": "descongestionante nasal",
    "target": "detectado em sangue apenas",
    "count": 1
  },
  {
    "source": "descongestionante nasal",
    "target": "salbutamol",
    "count": 1
  },
  {
    "source": "detectado em sangue apenas",
    "target": "diazepam",
    "count": 1
  },
  {
    "source": "detectado em sangue apenas",
    "target": "lidocaina",
    "count": 1
  },
  {
    "source": "detectado em sangue apenas",
    "target": "nicotina",
    "count": 1
  },
  {
    "source": "detectado em sangue apenas",
    "target": "salbutamol",
    "count": 1
  },
  {
    "source": "detectado em sangue apenas",
    "target": "sertralina",
    "count": 1
  },
  {
    "source": "amitriptilina",
    "target": "solventes",
    "count": 1
  },
  {
    "source": "cetamina",
    "target": "sertralina",
    "count": 1
  },
  {
    "source": "nortriptilina",
    "target": "solventes",
    "count": 1
  },
  {
    "source": "olanzapina",
    "target": "sertralina",
    "count": 1
  },
  {
    "source": "olanzapina",
    "target": "thc",
    "count": 1
  },
  {
    "source": "cocaina",
    "target": "nor-fentanil",
    "count": 1
  },
  {
    "source": "dimenidrato",
    "target": "fenobarbital",
    "count": 1
  },
  {
    "source": "dimenidrato",
    "target": "nor-fentanil",
    "count": 1
  },
  {
    "source": "fenobarbital",
    "target": "nor-fentanil",
    "count": 1
  },
  {
    "source": "fenobarbital",
    "target": "solventes",
    "count": 1
  },
  {
    "source": "fenobarbital",
    "target": "álcool",
    "count": 1
  },
  {
    "source": "lidocaina",
    "target": "nor-fentanil",
    "count": 1
  },
  {
    "source": "metoclopramida",
    "target": "nor-fentanil",
    "count": 1
  },
  {
    "source": "midazolam",
    "target": "nor-fentanil",
    "count": 1
  },
  {
    "source": "nor-fentanil",
    "target": "solventes",
    "count": 1
  },
  {
    "source": "nor-fentanil",
    "target": "álcool",
    "count": 1
  },
  {
    "source": "9-oh-risperidona",
    "target": "thc",
    "count": 1
  },
  {
    "source": "fentanil",
    "target": "levomepromazina",
    "count": 1
  },
  {
    "source": "levomepromazina",
    "target": "risperidona",
    "count": 1
  },
  {
    "source": "risperidona",
    "target": "solventes",
    "count": 1
  },
  {
    "source": "risperidona",
    "target": "álcool",
    "count": 1
  },
  {
    "source": "dmt",
    "target": "obs: dmt não liberado no aghuse",
    "count": 1
  },
  {
    "source": "dmt",
    "target": "padrão vencido",
    "count": 1
  },
  {
    "source": "obs: dmt não liberado no aghuse",
    "target": "padrão vencido",
    "count": 1
  },
  {
    "source": "antiemético",
    "target": "naltrexona",
    "count": 1
  },
  {
    "source": "antiemético",
    "target": "não detectado",
    "count": 1
  },
  {
    "source": "carbamazepina",
    "target": "naltrexona",
    "count": 1
  },
  {
    "source": "carbamazepina",
    "target": "não detectado",
    "count": 1
  },
  {
    "source": "clorpromazina",
    "target": "naltrexona",
    "count": 1
  },
  {
    "source": "clorpromazina",
    "target": "não detectado",
    "count": 1
  },
  {
    "source": "cocaina",
    "target": "naltrexona",
    "count": 1
  },
  {
    "source": "diazepam",
    "target": "não detectado",
    "count": 1
  },
  {
    "source": "dimenidrato",
    "target": "naltrexona",
    "count": 1
  },
  {
    "source": "dimenidrato",
    "target": "não detectado",
    "count": 1
  },
  {
    "source": "lidocaina",
    "target": "não detectado",
    "count": 1
  },
  {
    "source": "naltrexona",
    "target": "não detectado",
    "count": 1
  },
  {
    "source": "clorpromazina",
    "target": "solventes",
    "count": 1
  },
  {
    "source": "clorpromazina",
    "target": "álcool",
    "count": 1
  },
  {
    "source": "antiemético",
    "target": "cetamina",
    "count": 1
  },
  {
    "source": "cetamina",
    "target": "dimenidrato",
    "count": 1
  },
  {
    "source": "cetamina",
    "target": "morfina",
    "count": 1
  },
  {
    "source": "cetamina",
    "target": "morfina-3-glicuronideo",
    "count": 1
  },
  {
    "source": "apenas em sangue",
    "target": "lidocaina",
    "count": 1
  },
  {
    "source": "apenas em sangue",
    "target": "thc",
    "count": 1
  },
  {
    "source": "ciproheptadina",
    "target": "lidocaina",
    "count": 1
  },
  {
    "source": "haloperidol",
    "target": "metanol",
    "count": 1
  },
  {
    "source": "cetamina",
    "target": "fenobarbital",
    "count": 1
  },
  {
    "source": "fenobarbital",
    "target": "thc",
    "count": 1
  },
  {
    "source": "antiemético",
    "target": "topiramato",
    "count": 1
  },
  {
    "source": "dimenidrato",
    "target": "topiramato",
    "count": 1
  },
  {
    "source": "midazolam",
    "target": "topiramato",
    "count": 1
  },
  {
    "source": "topiramato",
    "target": "tramadol",
    "count": 1
  },
  {
    "source": "diazepam",
    "target": "fenitoina",
    "count": 1
  },
  {
    "source": "morfina-3-glicuronideo",
    "target": "thc",
    "count": 1
  },
  {
    "source": "clonazepam",
    "target": "fenobarbital",
    "count": 1
  },
  {
    "source": "diazepam",
    "target": "fluoxetina",
    "count": 1
  },
  {
    "source": "fluoxetina",
    "target": "levomepromazina",
    "count": 1
  },
  {
    "source": "levomepromazina",
    "target": "prometazina",
    "count": 1
  },
  {
    "source": "bupropiona",
    "target": "diazepam",
    "count": 1
  },
  {
    "source": "bupropiona",
    "target": "midazolam",
    "count": 1
  },
  {
    "source": "lidocaina",
    "target": "venlafaxina",
    "count": 1
  },
  {
    "source": "midazolam",
    "target": "venlafaxina",
    "count": 1
  },
  {
    "source": "prometazina",
    "target": "zolpidem",
    "count": 1
  },
  {
    "source": "levamisol",
    "target": "zolpidem",
    "count": 1
  },
  {
    "source": "anfetamina",
    "target": "cetamina",
    "count": 1
  },
  {
    "source": "anfetamina",
    "target": "cocaina",
    "count": 1
  },
  {
    "source": "anfetamina",
    "target": "levamisol",
    "count": 1
  },
  {
    "source": "cetamina",
    "target": "desvenlafaxina",
    "count": 1
  }
];

// Create SVG element
const svgNetwork = d3.select('#rede_metanol')
    .append('svg')
    .attr("class", "content")
    .attr("viewBox", `0 0 ${widthNetwork + marginNetwork.left + marginNetwork.right} ${heightNetwork + marginNetwork.top + marginNetwork.bottom}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

// Add responsive behavior
window.addEventListener('resize', function() {
    const newWidth = Math.min(1400, window.innerWidth - 40) - marginNetwork.left - marginNetwork.right;
    const newHeight = Math.min(900, window.innerHeight - 40) - marginNetwork.top - marginNetwork.bottom;
    
    svgNetwork
        .attr("viewBox", `0 0 ${newWidth + marginNetwork.left + marginNetwork.right} ${newHeight + marginNetwork.top + marginNetwork.bottom}`);
    
    simulation.force("center", d3.forceCenter(newWidth / 2, newHeight / 2));
    simulation.alpha(0.3).restart();
});

// Create definitions for gradients and filters
var defs = svgNetwork.append("defs");

// Node gradient
var nodeGradient = defs.append("radialGradient")
    .attr("id", "node-gradient")
    .attr("cx", "30%")
    .attr("cy", "30%")
    .attr("r", "70%");
    
nodeGradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#ffffff")
    .attr("stop-opacity", 0.8);
    
nodeGradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#34495e")
    .attr("stop-opacity", 0.8);

// Shadow filter
var shadowFilter = defs.append("filter")
    .attr("id", "node-shadow")
    .attr("x", "-50%")
    .attr("y", "-50%")
    .attr("width", "200%")
    .attr("height", "200%");

shadowFilter.append("feDropShadow")
    .attr("dx", 2)
    .attr("dy", 2)
    .attr("stdDeviation", 3)
    .attr("flood-color", "#000000")
    .attr("flood-opacity", 0.3);

// Create scales
var nodeSizeScale = d3.scaleSqrt()
    .domain(d3.extent(nodes_data, d => d.total))
    .range([3, 25]);

var linkSizeScale = d3.scaleSqrt()
    .domain(d3.extent(links_data, d => d.count))
    .range([0.5, 8]);

var linkColourScale = d3.scaleSequential()
    .domain(d3.extent(links_data, d => d.count))
    .interpolator(d3.interpolateViridis);

// Node color scale by drug category
function getNodeColor(drugName) {
    const stimulants = ["cocaina", "anfetamina", "metanfetamina", "mdma", "metilfenidato", "efedrina"];
    const depressants = ["thc", "álcool", "clonazepam", "diazepam", "alprazolam", "lorazepam", "midazolam", "zolpidem"];
    const psychedelics = ["lsd", "psilocina", "dmt", "2c-b", "25b-nboh", "25c-nboh", "25e-nboh"];
    const opioids = ["fentanil", "morfina", "codeina", "tramadol", "metadona", "hidrocodona"];
    
    if (stimulants.some(s => drugName.toLowerCase().includes(s))) return "#e74c3c";
    if (depressants.some(d => drugName.toLowerCase().includes(d))) return "#3498db";
    if (psychedelics.some(p => drugName.toLowerCase().includes(p))) return "#9b59b6";
    if (opioids.some(o => drugName.toLowerCase().includes(o))) return "#e67e22";
    return "#95a5a6";
}

// Create simulation
var simulation = d3.forceSimulation(nodes_data)
    .force("charge", d3.forceManyBody().strength(-50).distanceMax(300))
    .force("link", d3.forceLink(links_data).id(d => d.name).distance(100))
    .force("center", d3.forceCenter(widthNetwork / 2, heightNetwork / 2))
    .force("collision", d3.forceCollide().radius(d => nodeSizeScale(d.total) + 5))
    .alphaDecay(0.05);

// Add encompassing group for zoom
var g = svgNetwork.append("g")
    .attr("class", "everything");

// Create links
var link = g.selectAll(".link")
    .data(links_data)
    .enter()
    .append("path")
    .attr("class", "link")
    .style('stroke', d => linkColourScale(d.count))
    .style("stroke-opacity", d => 0.2 + (d.count / d3.max(links_data, l => l.count)) * 0.6)
    .attr('stroke-width', d => linkSizeScale(d.count))
    .style("stroke-linecap", "round")
    .style("cursor", "pointer")
    .on("mouseover", linkMouseOver)
    .on("mouseout", linkMouseOut);

// Create nodes
var node = g.append("g")
    .attr("class", "nodes") 
    .selectAll("circle")
    .data(nodes_data)
    .enter()
    .append("circle")
    .attr("r", d => nodeSizeScale(d.total))
    .attr("fill", d => getNodeColor(d.name))
    .attr("stroke", "#2c3e50")
    .attr("stroke-width", 1.5)
    .style("filter", "url(#node-shadow)")
    .style("cursor", "pointer")
    .on("mouseover", mouseOver(0.1))
    .on("mouseout", mouseOut)
    .on("click", nodeClick);

// Create labels
var text = g.append("g")
    .attr("class", "labels")
    .selectAll("text")
    .data(nodes_data)
    .enter().append("text")
    .style("text-anchor", "middle")
    .style("font-weight", "600")
    .style("font-size", d => Math.max(10, Math.min(14, nodeSizeScale(d.total) / 2)))
    .style("font-family", "Arial, sans-serif")
    .style("pointer-events", "none")
    .attr("dy", ".35em")
    .style("fill", "#2c3e50")
    .style("stroke", "#ffffff")
    .style("stroke-width", "3px")
    .style("paint-order", "stroke")
    .style("opacity", d => d.total > 5 ? 0.9 : 0)
    .text(function(d) { 
        if (d.name.length > 12) return d.name.substring(0, 10) + "...";
        return d.name;
    });

// Drag handler
var drag_handler = d3.drag()
    .on("start", drag_start)
    .on("drag", drag_drag)
    .on("end", drag_end);

drag_handler(node);

// Zoom handler
var zoom_handler = d3.zoom()
    .scaleExtent([0.1, 4])
    .on("zoom", zoom_actions);

zoom_handler(svgNetwork);

// Create tooltip
var tooltipNetwork = d3.select("#rede_metanol").append("div")
    .attr("class", "tooltip-html")
    .style("opacity", 0);

// Create legend
createLegend();

// Add reset button
d3.select('#rede_metanol').append('button')
    .text('Reset View')
    .attr('class', 'reset-button')
    .style('position', 'absolute')
    .style('top', '10px')
    .style('left', '10px')
    .style('z-index', '1000')
    .on('click', function() {
        svgNetwork.transition()
            .duration(750)
            .call(zoom_handler.transform, d3.zoomIdentity);
    });

// Force simulation functions
function tickActions() {
    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
        
    text
        .attr("x", d => d.x)
        .attr("y", d => d.y);
        
    link.attr("d", d => {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const dr = Math.sqrt(dx * dx + dy * dy);
        return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
    });
}

simulation.on("tick", tickActions);

// Drag functions
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

// Zoom function
function zoom_actions(event) {
    g.attr("transform", event.transform);
}

// Link interaction functions
function linkMouseOver(event, d) {
    d3.select(this)
        .transition()
        .duration(200)
        .style("stroke-width", linkSizeScale(d.count) + 2)
        .style("stroke-opacity", 0.9);
}

function linkMouseOut(event, d) {
    d3.select(this)
        .transition()
        .duration(200)
        .style("stroke-width", linkSizeScale(d.count))
        .style("stroke-opacity", 0.2);
}

// Node click function
function nodeClick(event, d) {
    // Reset all nodes and links first
    node.style("opacity", 1);
    link.style("opacity", 1);
    text.style("opacity", o => o.total > 5 ? 0.9 : 0);
    
    // Highlight connected nodes and links
    node.style("opacity", o => isConnected(d, o) ? 1 : 0.1);
    link.style("opacity", o => (o.source === d || o.target === d) ? 1 : 0.1);
    text.style("opacity", o => isConnected(d, o) && o.total > 2 ? 1 : 0);
    
    // Show node details
    showNodeDetails(event, d);
}

// Show node details function
function showNodeDetails(event, d) {
    const topConnections = links_data
        .filter(l => l.source === d.name || l.target === d.name)
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
        .map(l => ({
            name: l.source === d.name ? l.target : l.source,
            count: l.count
        }));
    
    const detailsHtml = `
        <div class="node-details">
            <h3>${d.name}</h3>
            <p><strong>Conexões:</strong> ${d.degree}</p>
            <p><strong>Ocorrências:</strong> ${d.total}</p>
            ${topConnections.length > 0 ? `
                <p><strong>Co-ocorrências principais:</strong></p>
                <ul>
                    ${topConnections.map(conn => 
                        `<li>${conn.name}: ${conn.count} vez${conn.count > 1 ? 'es' : ''}</li>`
                    ).join('')}
                </ul>
            ` : ''}
        </div>
    `;
    
    tooltipNetwork.html(detailsHtml)
        .style("left", (event.pageX + 15) + "px")
        .style("top", (event.pageY - 15) + "px")
        .transition()
        .duration(200)
        .style("opacity", 1);
}

// Mouse over function
function mouseOver(opacity) {
    return function(event, d) {
        node.style("stroke-opacity", function(o) {
            return isConnected(d, o) ? 1 : opacity;
        });

        node.style("fill-opacity", function(o) {
            return isConnected(d, o) ? 1 : opacity;
        });

        text.style("opacity", function(o) {
            return isConnected(d, o) ? 1 : opacity;
        });

        link.style("stroke-opacity", function(o) {
            return o.source === d || o.target === d ? 1 : opacity;
        });

        link.style("stroke", function(o) {
            return o.source === d || o.target === d ? linkColourScale(o.count + 2) : linkColourScale(o.count);
        });

        const html = `
            <div class="node-tooltip">
                <strong>${d.name}</strong><br>
                ${d.degree} conexões<br>
                ${d.total} ocorrências
            </div>
        `;

        tooltipNetwork.html(html)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 10) + "px")
            .transition()
            .duration(200)
            .style("opacity", 1);
    };
}

// Mouse out function
function mouseOut() {
    node.style("stroke-opacity", 1);
    node.style("fill-opacity", 1);
    text.style("opacity", d => d.total > 5 ? 0.9 : 0);
    link.style("stroke", d => linkColourScale(d.count));
    link.style("stroke-opacity", d => 0.2 + (d.count / d3.max(links_data, l => l.count)) * 0.6);
    
    tooltipNetwork.transition()
        .duration(500)
        .style("opacity", 0);
}

// Connection functions
var linkedByIndex = {};
links_data.forEach(function(d) {
    linkedByIndex[d.source.index + "," + d.target.index] = 1;
    linkedByIndex[d.target.index + "," + d.source.index] = 1;
});

function isConnected(a, b) {
    return linkedByIndex[a.index + "," + b.index] || a.index === b.index;
}

// Create legend function
function createLegend() {
    const legend = d3.select('#rede_metanol').append('div')
        .attr('class', 'legend')
        .style('position', 'absolute')
        .style('bottom', '10px')
        .style('left', '10px')
        .style('background', 'rgba(255,255,255,0.95)')
        .style('padding', '12px')
        .style('border-radius', '8px')
        .style('border', '1px solid #ddd')
        .style('box-shadow', '0 2px 8px rgba(0,0,0,0.1)')
        .style('font-family', 'Arial, sans-serif')
        .style('font-size', '12px')
        .style('z-index', '1000');
    
    const categories = [
        { color: '#e74c3c', label: 'Estimulantes' },
        { color: '#3498db', label: 'Depressivos' },
        { color: '#9b59b6', label: 'Psicodélicos' },
        { color: '#e67e22', label: 'Opioides' },
        { color: '#95a5a6', label: 'Outros' }
    ];
    
    // Title
    legend.append('div')
        .style('font-weight', 'bold')
        .style('margin-bottom', '8px')
        .style('color', '#2c3e50')
        .text('Categorias de Drogas');
    
    categories.forEach(cat => {
        legend.append('div')
            .style('display', 'flex')
            .style('align-items', 'center')
            .style('margin-bottom', '6px')
            .html(`
                <div style="width:14px;height:14px;background:${cat.color};margin-right:8px;border-radius:50%;border:1px solid #2c3e50;"></div>
                <span style="color:#2c3e50;">${cat.label}</span>
            `);
    });
    
    // Connection strength info
    legend.append('div')
        .style('margin-top', '10px')
        .style('padding-top', '10px')
        .style('border-top', '1px solid #eee')
        .style('color', '#666')
        .style('font-size', '11px')
        .html('💡 <em>Linhas mais grossas = mais co-ocorrências</em>');
}

// Add some CSS styles (you can also put this in a separate CSS file)
const style = document.createElement('style');
style.textContent = `
    .tooltip-html {
        position: absolute;
        padding: 12px;
        background: rgba(255, 255, 255, 0.98);
        border: 1px solid #ddd;
        border-radius: 8px;
        pointer-events: none;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        backdrop-filter: blur(5px);
        max-width: 300px;
        font-family: Arial, sans-serif;
        font-size: 14px;
        line-height: 1.4;
        z-index: 1000;
    }
    
    .node-details h3 {
        margin: 0 0 8px 0;
        color: #2c3e50;
        border-bottom: 2px solid #3498db;
        padding-bottom: 4px;
    }
    
    .node-details p {
        margin: 6px 0;
        color: #34495e;
    }
    
    .node-details ul {
        margin: 8px 0;
        padding-left: 16px;
    }
    
    .node-details li {
        margin-bottom: 2px;
        color: #34495e;
    }
    
    .node-tooltip {
        text-align: center;
    }
    
    .node-tooltip strong {
        color: #2c3e50;
    }
    
    .reset-button {
        background: #3498db;
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        transition: background 0.3s;
    }
    
    .reset-button:hover {
        background: #2980b9;
    }
    
    .link {
        transition: all 0.3s ease;
    }
    
    .nodes circle {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);