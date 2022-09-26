const marginNetwork = { top: 0, right: 0, bottom: 0, left: 0};
const widthNetwork  = 1400 - marginNetwork.left - marginNetwork.right;
const heightNetwork = 900 - marginNetwork.top  - marginNetwork.bottom;

const zoom = d3.zoom();

const x = 300;
const y = 200;
const scale = 1;
const k = 0.3;

//Create SVG element in chart id element
const svgNetwork = d3.select('#rede_sangue')
                  .append('svg')
                   .attr("class", "content")
                   .attr("viewBox", `0 0 ${widthNetwork + marginNetwork.left + marginNetwork.right} ${heightNetwork + marginNetwork.top + marginNetwork.bottom}`)
                   .attr("preserveAspectRatio", "none")

var links_data = [{"source": "Etanol", "target": "Risperidona", "count": 1}, 
                    {"source": "Cocaina", "target": "Clomipramina", "count": 1}, 
                    {"source": "Diazepam", "target": "Clorpromazina", "count": 1}, 
                    {"source": "Lorazepam", "target": "Haloperidol", "count": 1}, 
                    {"source": "Lorazepam", "target": "Sertralina", "count": 1}, 
                    {"source": "Diazepam", "target": "Lorazepam", "count": 1}, 
                    {"source": "Clonazepam", "target": "Lorazepam", "count": 1}, 
                    {"source": "Venlafaxina", "target": "Risperidona", "count": 1}, 
                    {"source": "Desmetilvenlafaxina", "target": "Risperidona", "count": 1}, 
                    {"source": "Efedrina", "target": "Bupropiona", "count": 1}, 
                    {"source": "Efedrina", "target": "Midazolam", "count": 1}, 
                    {"source": "Efedrina", "target": "Clonazepam", "count": 1}, 
                    {"source": "Fluoxetina", "target": "Bupropiona", "count": 1}, 
                    {"source": "Imipramina", "target": "Levomepromazina", "count": 1}, 
                    {"source": "Imipramina", "target": "Bupropiona", "count": 1}, 
                    {"source": "Imipramina", "target": "Fluoxetina", "count": 1}, 
                    {"source": "Amitriptilina", "target": "Levomepromazina", "count": 1}, 
                    {"source": "Amitriptilina", "target": "Imipramina", "count": 1}, 
                    {"source": "Nortriptilina", "target": "Levomepromazina", "count": 1}, 
                    {"source": "Nortriptilina", "target": "Imipramina", "count": 1}, 
                    {"source": "Fentanil", "target": "Levomepromazina", "count": 1}, 
                    {"source": "Fentanil", "target": "Imipramina", "count": 1}, 
                    {"source": "Etanol", "target": "Levomepromazina", "count": 1}, 
                    {"source": "Etanol", "target": "Bupropiona", "count": 1}, 
                    {"source": "Etanol", "target": "Imipramina", "count": 1}, 
                    {"source": "Cocaina", "target": "Levomepromazina", "count": 1}, 
                    {"source": "Cocaina", "target": "Imipramina", "count": 1}, 
                    {"source": "Etanol", "target": "Fenobarbital", "count": 1}, 
                    {"source": "Citalopram", "target": "Bupropiona", "count": 1}, 
                    {"source": "Zolpidem", "target": "Bupropiona", "count": 1}, 
                    {"source": "Zolpidem", "target": "Sertralina", "count": 1}, 
                    {"source": "Alprazolam", "target": "Bupropiona", "count": 1}, 
                    {"source": "Alprazolam", "target": "Sertralina", "count": 1}, 
                    {"source": "Alprazolam", "target": "Zolpidem", "count": 1}, 
                    {"source": "Clonazepam", "target": "Alprazolam", "count": 1}, 
                    {"source": "Clonazepam", "target": "Bromazepam", "count": 1}, 
                    {"source": "Thc", "target": "Bromazepam", "count": 1}, 
                    {"source": "Thc", "target": "Fentanil", "count": 1}, 
                    {"source": "Cocaina", "target": "Bromazepam", "count": 1}, 
                    {"source": "Thc", "target": "Clorpromazina", "count": 1}, 
                    {"source": "Haloperidol", "target": "Olanzapina", "count": 1}, 
                    {"source": "Venlafaxina", "target": "Olanzapina", "count": 1}, 
                    {"source": "Venlafaxina", "target": "Levomepromazina", "count": 1}, 
                    {"source": "Desmetilvenlafaxina", "target": "Olanzapina", "count": 1}, 
                    {"source": "Desmetilvenlafaxina", "target": "Levomepromazina", "count": 1}, 
                    {"source": "Mirtazapina", "target": "Quetiapina", "count": 1}, 
                    {"source": "Mirtazapina", "target": "Haloperidol", "count": 1}, 
                    {"source": "Mirtazapina", "target": "Citalopram", "count": 1}, 
                    {"source": "Prometazina", "target": "Mirtazapina", "count": 1}, 
                    {"source": "Alprazolam", "target": "Haloperidol", "count": 1}, 
                    {"source": "Alprazolam", "target": "Mirtazapina", "count": 1}, 
                    {"source": "Diazepam", "target": "Mirtazapina", "count": 1}, 
                    {"source": "Codeina", "target": "Carbamazepina", "count": 1}, 
                    {"source": "Morfina", "target": "Carbamazepina", "count": 1}, 
                    {"source": "Morfina", "target": "Codeina", "count": 1}, 
                    {"source": "Midazolam", "target": "Gabapentina", "count": 1}, 
                    {"source": "Fentanil", "target": "Gabapentina", "count": 1}, 
                    {"source": "Etanol", "target": "Ácido valpróico", "count": 1}, 
                    {"source": "Etanol", "target": "Quetiapina", "count": 1}, 
                    {"source": "Bromazepam", "target": "Prometazina", "count": 1}, 
                    {"source": "Amitriptilina", "target": "Risperidona", "count": 1}, 
                    {"source": "Nortriptilina", "target": "Risperidona", "count": 1}, 
                    {"source": "Thc", "target": "Cetamina", "count": 1}, 
                    {"source": "Cocaina", "target": "Cetamina", "count": 1}, 
                    {"source": "Fluoxetina", "target": "Topiramato", "count": 1}, 
                    {"source": "Alprazolam", "target": "Topiramato", "count": 1}, 
                    {"source": "Bupropiona", "target": "Ácido valpróico", "count": 1}, 
                    {"source": "Amitriptilina", "target": "Haloperidol", "count": 1}, 
                    {"source": "Nortriptilina", "target": "Haloperidol", "count": 1}, 
                    {"source": "Clorpromazina", "target": "Quetiapina", "count": 1}, 
                    {"source": "Sertralina", "target": "Clorpromazina", "count": 1}, 
                    {"source": "Zolpidem", "target": "Risperidona", "count": 1}, 
                    {"source": "Zolpidem", "target": "Levomepromazina", "count": 1}, 
                    {"source": "Zolpidem", "target": "Fluoxetina", "count": 1}, 
                    {"source": "Thc", "target": "Risperidona", "count": 1}, 
                    {"source": "Thc", "target": "Levomepromazina", "count": 1}, 
                    {"source": "Thc", "target": "Zolpidem", "count": 1}, 
                    {"source": "Etanol", "target": "Sertralina", "count": 1}, 
                    {"source": "Levomepromazina", "target": "Ácido valpróico", "count": 1}, 
                    {"source": "Fluoxetina", "target": "Ácido valpróico", "count": 1}, 
                    {"source": "Citalopram", "target": "Lamotrigina", "count": 1}, 
                    {"source": "Cocaina", "target": "Lamotrigina", "count": 1}, 
                    {"source": "Cocaina", "target": "Quetiapina", "count": 1}, 
                    {"source": "Venlafaxina", "target": "Lamotrigina", "count": 1}, 
                    {"source": "Desmetilvenlafaxina", "target": "Lamotrigina", "count": 1}, 
                    {"source": "Clonazepam", "target": "Lamotrigina", "count": 1}, 
                    {"source": "Tramadol", "target": "Sertralina", "count": 1}, 
                    {"source": "Tramadol", "target": "Clonazepam", "count": 1}, 
                    {"source": "Quetiapina", "target": "Gabapentina", "count": 1}, 
                    {"source": "Quetiapina", "target": "Pregabalina", "count": 1}, 
                    {"source": "Citalopram", "target": "Gabapentina", "count": 1}, 
                    {"source": "Citalopram", "target": "Pregabalina", "count": 1}, 
                    {"source": "Thc", "target": "Gabapentina", "count": 1}, 
                    {"source": "Thc", "target": "Pregabalina", "count": 1}, 
                    {"source": "Bromazepam", "target": "Venlafaxina", "count": 1}, 
                    {"source": "Bromazepam", "target": "Desmetilvenlafaxina", "count": 1}, 
                    {"source": "Bromazepam", "target": "Alprazolam", "count": 1}, 
                    {"source": "Tramadol", "target": "Midazolam", "count": 1}, 
                    {"source": "Morfina", "target": "Tramadol", "count": 1}, 
                    {"source": "Cocaina", "target": "Risperidona", "count": 1}, 
                    {"source": "Cocaina", "target": "Sertralina", "count": 1}, 
                    {"source": "Diazepam", "target": "Clozapina", "count": 1}, 
                    {"source": "Topiramato", "target": "Carbamazepina", "count": 1}, 
                    {"source": "Risperidona", "target": "Topiramato", "count": 1}, 
                    {"source": "Levomepromazina", "target": "Carbamazepina", "count": 1}, 
                    {"source": "Levomepromazina", "target": "Topiramato", "count": 1}, 
                    {"source": "Haloperidol", "target": "Topiramato", "count": 1}, 
                    {"source": "Bupropiona", "target": "Carbamazepina", "count": 1}, 
                    {"source": "Bupropiona", "target": "Haloperidol", "count": 1}, 
                    {"source": "Sertralina", "target": "Topiramato", "count": 1}, 
                    {"source": "Sertralina", "target": "Levomepromazina", "count": 1}, 
                    {"source": "Midazolam", "target": "Topiramato", "count": 1}, 
                    {"source": "Midazolam", "target": "Risperidona", "count": 1}, 
                    {"source": "Clonazepam", "target": "Topiramato", "count": 1}, 
                    {"source": "Quetiapina", "target": "Olanzapina", "count": 1}, 
                    {"source": "Levomepromazina", "target": "Quetiapina", "count": 1}, 
                    {"source": "Fenitoína", "target": "Carbamazepina", "count": 1}, 
                    {"source": "Pregabalina", "target": "Fenitoína", "count": 1}, 
                    {"source": "Haloperidol", "target": "Pregabalina", "count": 1}, 
                    {"source": "Venlafaxina", "target": "Pregabalina", "count": 1}, 
                    {"source": "Desmetilvenlafaxina", "target": "Pregabalina", "count": 1}, 
                    {"source": "Prometazina", "target": "Fenitoína", "count": 1}, 
                    {"source": "Prometazina", "target": "Pregabalina", "count": 1}, 
                    {"source": "Clobazam", "target": "Carbamazepina", "count": 1}, 
                    {"source": "Clobazam", "target": "Fenitoína", "count": 1}, 
                    {"source": "Clobazam", "target": "Pregabalina", "count": 1}, 
                    {"source": "Clobazam", "target": "Haloperidol", "count": 1}, 
                    {"source": "Clobazam", "target": "Venlafaxina", "count": 1}, 
                    {"source": "Clobazam", "target": "Desmetilvenlafaxina", "count": 1}, 
                    {"source": "Clobazam", "target": "Prometazina", "count": 1}, 
                    {"source": "Diazepam", "target": "Pregabalina", "count": 1}, 
                    {"source": "Clonazepam", "target": "Fenitoína", "count": 1}, 
                    {"source": "Clonazepam", "target": "Clobazam", "count": 1}, 
                    {"source": "Diazepam", "target": "Paroxetina", "count": 1}, 
                    {"source": "Venlafaxina", "target": "Topiramato", "count": 1}, 
                    {"source": "Venlafaxina", "target": "Bupropiona", "count": 1}, 
                    {"source": "Desmetilvenlafaxina", "target": "Topiramato", "count": 1}, 
                    {"source": "Desmetilvenlafaxina", "target": "Bupropiona", "count": 1}, 
                    {"source": "Fentanil", "target": "Carbamazepina", "count": 1}, 
                    {"source": "Clomipramina", "target": "Sertralina", "count": 1}, 
                    {"source": "Clomipramina", "target": "Imipramina", "count": 1}, 
                    {"source": "Metilfenidato", "target": "Sertralina", "count": 1}, 
                    {"source": "Metilfenidato", "target": "Imipramina", "count": 1}, 
                    {"source": "Metilfenidato", "target": "Clomipramina", "count": 1}, 
                    {"source": "Metilfenidato", "target": "Clonazepam", "count": 1}, 
                    {"source": "Citalopram", "target": "Clorpromazina", "count": 1}, 
                    {"source": "Amitriptilina", "target": "Clorpromazina", "count": 1}, 
                    {"source": "Amitriptilina", "target": "Citalopram", "count": 1}, 
                    {"source": "Nortriptilina", "target": "Clorpromazina", "count": 1}, 
                    {"source": "Nortriptilina", "target": "Citalopram", "count": 1}, 
                    {"source": "Sibutramina", "target": "Haloperidol", "count": 1}, 
                    {"source": "Sibutramina", "target": "Prometazina", "count": 1}, 
                    {"source": "Sibutramina", "target": "Midazolam", "count": 1}, 
                    {"source": "Morfina", "target": "Haloperidol", "count": 1}, 
                    {"source": "Morfina", "target": "Prometazina", "count": 1}, 
                    {"source": "Morfina", "target": "Clonazepam", "count": 1}, 
                    {"source": "Morfina", "target": "Sibutramina", "count": 1}, 
                    {"source": "Thc", "target": "Sibutramina", "count": 1}, 
                    {"source": "Thc", "target": "Morfina", "count": 1}, 
                    {"source": "Cocaina", "target": "Sibutramina", "count": 1}, 
                    {"source": "Cocaina", "target": "Morfina", "count": 1}, 
                    {"source": "Etanol", "target": "Alprazolam", "count": 1}, 
                    {"source": "Prometazina", "target": "Ácido valpróico", "count": 1}, 
                    {"source": "Midazolam", "target": "Ácido valpróico", "count": 1}, 
                    {"source": "Diazepam", "target": "Ácido valpróico", "count": 1}, 
                    {"source": "Thc", "target": "Ácido valpróico", "count": 1}, 
                    {"source": "Midazolam", "target": "Imipramina", "count": 1}, 
                    {"source": "Diazepam", "target": "Imipramina", "count": 1}, 
                    {"source": "Nitrazepam", "target": "Sertralina", "count": 1}, 
                    {"source": "Nitrazepam", "target": "Imipramina", "count": 1}, 
                    {"source": "Nitrazepam", "target": "Prometazina", "count": 1}, 
                    {"source": "Nitrazepam", "target": "Midazolam", "count": 1}, 
                    {"source": "Nitrazepam", "target": "Diazepam", "count": 1}, 
                    {"source": "Clonazepam", "target": "Nitrazepam", "count": 1}, 
                    {"source": "Sibutramina", "target": "Amitriptilina", "count": 1}, 
                    {"source": "Sibutramina", "target": "Nortriptilina", "count": 1}, 
                    {"source": "Sibutramina", "target": "Diazepam", "count": 1}, 
                    {"source": "Fluoxetina", "target": "Venlafaxina", "count": 1}, 
                    {"source": "Fluoxetina", "target": "Desmetilvenlafaxina", "count": 1}, 
                    {"source": "Midazolam", "target": "Clomipramina", "count": 1}, 
                    {"source": "Etanol", "target": "Clomipramina", "count": 1}, 
                    {"source": "Risperidona", "target": "Olanzapina", "count": 1}, 
                    {"source": "Sertralina", "target": "Olanzapina", "count": 1}, 
                    {"source": "Mirtazapina", "target": "Sertralina", "count": 1}, 
                    {"source": "Amitriptilina", "target": "Mirtazapina", "count": 1}, 
                    {"source": "Nortriptilina", "target": "Mirtazapina", "count": 1}, 
                    {"source": "Clonazepam", "target": "Mirtazapina", "count": 1}, 
                    {"source": "Fentanil", "target": "Sertralina", "count": 1}, 
                    {"source": "Gabapentina", "target": "Carbamazepina", "count": 1}, 
                    {"source": "Sertralina", "target": "Gabapentina", "count": 1}, 
                    {"source": "Sertralina", "target": "Pregabalina", "count": 1}, 
                    {"source": "Imipramina", "target": "Carbamazepina", "count": 1}, 
                    {"source": "Imipramina", "target": "Gabapentina", "count": 1}, 
                    {"source": "Imipramina", "target": "Pregabalina", "count": 1}, 
                    {"source": "Fentanil", "target": "Olanzapina", "count": 1}, 
                    {"source": "Risperidona", "target": "Fenobarbital", "count": 1}, 
                    {"source": "Quetiapina", "target": "Fenitoína", "count": 1}, 
                    {"source": "Midazolam", "target": "Fenitoína", "count": 1}, 
                    {"source": "Metadona", "target": "Fenitoína", "count": 1}, 
                    {"source": "Metadona", "target": "Quetiapina", "count": 1}, 
                    {"source": "Metadona", "target": "Haloperidol", "count": 1}, 
                    {"source": "Metadona", "target": "Venlafaxina", "count": 1}, 
                    {"source": "Metadona", "target": "Desmetilvenlafaxina", "count": 1}, 
                    {"source": "Fentanil", "target": "Fenitoína", "count": 1}, 
                    {"source": "Fluoxetina", "target": "Lamotrigina", "count": 1}, 
                    {"source": "Clobazam", "target": "Lamotrigina", "count": 1}, 
                    {"source": "Clobazam", "target": "Fluoxetina", "count": 1}, 
                    {"source": "Diazepam", "target": "Lamotrigina", "count": 1}, 
                    {"source": "Bromazepam", "target": "Diazepam", "count": 2}, 
                    {"source": "Cocaina", "target": "Fentanil", "count": 2}, 
                    {"source": "Midazolam", "target": "Clorpromazina", "count": 2}, 
                    {"source": "Cocaina", "target": "Clorpromazina", "count": 2}, 
                    {"source": "Amitriptilina", "target": "Fluoxetina", "count": 2}, 
                    {"source": "Nortriptilina", "target": "Fluoxetina", "count": 2}, 
                    {"source": "Etanol", "target": "Fentanil", "count": 2}, 
                    {"source": "Zolpidem", "target": "Citalopram", "count": 2}, 
                    {"source": "Diazepam", "target": "Zolpidem", "count": 2}, 
                    {"source": "Midazolam", "target": "Citalopram", "count": 2}, 
                    {"source": "Alprazolam", "target": "Citalopram", "count": 2}, 
                    {"source": "Fentanil", "target": "Citalopram", "count": 2}, 
                    {"source": "Amitriptilina", "target": "Quetiapina", "count": 2}, 
                    {"source": "Amitriptilina", "target": "Bupropiona", "count": 2}, 
                    {"source": "Nortriptilina", "target": "Quetiapina", "count": 2}, 
                    {"source": "Nortriptilina", "target": "Bupropiona", "count": 2}, 
                    {"source": "Fentanil", "target": "Bupropiona", "count": 2}, 
                    {"source": "Citalopram", "target": "Haloperidol", "count": 2}, 
                    {"source": "Bromazepam", "target": "Fluoxetina", "count": 2}, 
                    {"source": "Alprazolam", "target": "Prometazina", "count": 2}, 
                    {"source": "Bupropiona", "target": "Quetiapina", "count": 2}, 
                    {"source": "Fluoxetina", "target": "Risperidona", "count": 2}, 
                    {"source": "Clonazepam", "target": "Zolpidem", "count": 2}, 
                    {"source": "Fluoxetina", "target": "Haloperidol", "count": 2}, 
                    {"source": "Cocaina", "target": "Citalopram", "count": 2}, 
                    {"source": "Quetiapina", "target": "Lamotrigina", "count": 2}, 
                    {"source": "Alprazolam", "target": "Quetiapina", "count": 2}, 
                    {"source": "Bromazepam", "target": "Midazolam", "count": 2}, 
                    {"source": "Fentanil", "target": "Bromazepam", "count": 2}, 
                    {"source": "Cocaina", "target": "Amitriptilina", "count": 2}, 
                    {"source": "Cocaina", "target": "Nortriptilina", "count": 2}, 
                    {"source": "Sertralina", "target": "Citalopram", "count": 2}, 
                    {"source": "Fluoxetina", "target": "Citalopram", "count": 2}, 
                    {"source": "Fluoxetina", "target": "Sertralina", "count": 2}, 
                    {"source": "Cocaina", "target": "Bupropiona", "count": 2}, 
                    {"source": "Risperidona", "target": "Carbamazepina", "count": 2}, 
                    {"source": "Levomepromazina", "target": "Risperidona", "count": 2}, 
                    {"source": "Bupropiona", "target": "Risperidona", "count": 2}, 
                    {"source": "Bupropiona", "target": "Levomepromazina", "count": 2}, 
                    {"source": "Prometazina", "target": "Risperidona", "count": 2}, 
                    {"source": "Midazolam", "target": "Levomepromazina", "count": 2}, 
                    {"source": "Levomepromazina", "target": "Olanzapina", "count": 2}, 
                    {"source": "Prometazina", "target": "Olanzapina", "count": 2}, 
                    {"source": "Venlafaxina", "target": "Carbamazepina", "count": 2}, 
                    {"source": "Desmetilvenlafaxina", "target": "Carbamazepina", "count": 2}, 
                    {"source": "Prometazina", "target": "Carbamazepina", "count": 2}, 
                    {"source": "Prometazina", "target": "Venlafaxina", "count": 2}, 
                    {"source": "Prometazina", "target": "Desmetilvenlafaxina", "count": 2}, 
                    {"source": "Diazepam", "target": "Carbamazepina", "count": 2}, 
                    {"source": "Diazepam", "target": "Topiramato", "count": 2}, 
                    {"source": "Midazolam", "target": "Carbamazepina", "count": 2}, 
                    {"source": "Prometazina", "target": "Citalopram", "count": 2}, 
                    {"source": "Clonazepam", "target": "Clorpromazina", "count": 2}, 
                    {"source": "Morfina", "target": "Midazolam", "count": 2}, 
                    {"source": "Haloperidol", "target": "Ácido valpróico", "count": 2}, 
                    {"source": "Thc", "target": "Quetiapina", "count": 2}, 
                    {"source": "Prometazina", "target": "Imipramina", "count": 2}, 
                    {"source": "Sibutramina", "target": "Clonazepam", "count": 2}, 
                    {"source": "Alprazolam", "target": "Venlafaxina", "count": 2}, 
                    {"source": "Alprazolam", "target": "Desmetilvenlafaxina", "count": 2}, 
                    {"source": "Alprazolam", "target": "Fluoxetina", "count": 2}, 
                    {"source": "Clomipramina", "target": "Haloperidol", "count": 2}, 
                    {"source": "Etanol", "target": "Midazolam", "count": 2}, 
                    {"source": "Midazolam", "target": "Mirtazapina", "count": 2}, 
                    {"source": "Fentanil", "target": "Mirtazapina", "count": 2}, 
                    {"source": "Citalopram", "target": "Olanzapina", "count": 2}, 
                    {"source": "Thc", "target": "Olanzapina", "count": 2}, 
                    {"source": "Pregabalina", "target": "Carbamazepina", "count": 2}, 
                    {"source": "Pregabalina", "target": "Gabapentina", "count": 2}, 
                    {"source": "Clonazepam", "target": "Gabapentina", "count": 2}, 
                    {"source": "Thc", "target": "Etanol", "count": 2}, 
                    {"source": "Fluoxetina", "target": "Quetiapina", "count": 2}, 
                    {"source": "Midazolam", "target": "Olanzapina", "count": 2}, 
                    {"source": "Haloperidol", "target": "Fenitoína", "count": 2}, 
                    {"source": "Venlafaxina", "target": "Fenitoína", "count": 2}, 
                    {"source": "Desmetilvenlafaxina", "target": "Fenitoína", "count": 2}, 
                    {"source": "Diazepam", "target": "Fenitoína", "count": 2}, 
                    {"source": "Metadona", "target": "Midazolam", "count": 2}, 
                    {"source": "Metadona", "target": "Diazepam", "count": 2}, 
                    {"source": "Fentanil", "target": "Venlafaxina", "count": 2}, 
                    {"source": "Fentanil", "target": "Desmetilvenlafaxina", "count": 2}, 
                    {"source": "Fentanil", "target": "Metadona", "count": 2}, 
                    {"source": "Diazepam", "target": "Clobazam", "count": 2}, 
                    {"source": "Haloperidol", "target": "Clorpromazina", "count": 3}, 
                    {"source": "Etanol", "target": "Amitriptilina", "count": 3}, 
                    {"source": "Etanol", "target": "Nortriptilina", "count": 3}, 
                    {"source": "Fentanil", "target": "Prometazina", "count": 3}, 
                    {"source": "Fluoxetina", "target": "Levomepromazina", "count": 3}, 
                    {"source": "Sertralina", "target": "Bupropiona", "count": 3}, 
                    {"source": "Prometazina", "target": "Topiramato", "count": 3}, 
                    {"source": "Prometazina", "target": "Bupropiona", "count": 3}, 
                    {"source": "Midazolam", "target": "Bupropiona", "count": 3}, 
                    {"source": "Haloperidol", "target": "Carbamazepina", "count": 3}, 
                    {"source": "Clonazepam", "target": "Venlafaxina", "count": 3}, 
                    {"source": "Clonazepam", "target": "Desmetilvenlafaxina", "count": 3}, 
                    {"source": "Bupropiona", "target": "Topiramato", "count": 3}, 
                    {"source": "Diazepam", "target": "Bupropiona", "count": 3}, 
                    {"source": "Prometazina", "target": "Clorpromazina", "count": 3}, 
                    {"source": "Etanol", "target": "Diazepam", "count": 3}, 
                    {"source": "Quetiapina", "target": "Ácido valpróico", "count": 3}, 
                    {"source": "Thc", "target": "Sertralina", "count": 3}, 
                    {"source": "Diazepam", "target": "Amitriptilina", "count": 3}, 
                    {"source": "Diazepam", "target": "Nortriptilina", "count": 3}, 
                    {"source": "Diazepam", "target": "Alprazolam", "count": 3}, 
                    {"source": "Midazolam", "target": "Amitriptilina", "count": 3}, 
                    {"source": "Midazolam", "target": "Nortriptilina", "count": 3}, 
                    {"source": "Alprazolam", "target": "Midazolam", "count": 3}, 
                    {"source": "Fentanil", "target": "Alprazolam", "count": 3}, 
                    {"source": "Sertralina", "target": "Carbamazepina", "count": 3}, 
                    {"source": "Imipramina", "target": "Sertralina", "count": 3}, 
                    {"source": "Clonazepam", "target": "Pregabalina", "count": 3}, 
                    {"source": "Thc", "target": "Fluoxetina", "count": 3}, 
                    {"source": "Diazepam", "target": "Olanzapina", "count": 3}, 
                    {"source": "Bromazepam", "target": "Quetiapina", "count": 3}, 
                    {"source": "Bromazepam", "target": "Citalopram", "count": 3}, 
                    {"source": "Venlafaxina", "target": "Quetiapina", "count": 3}, 
                    {"source": "Desmetilvenlafaxina", "target": "Quetiapina", "count": 3}, 
                    {"source": "Midazolam", "target": "Venlafaxina", "count": 3}, 
                    {"source": "Midazolam", "target": "Desmetilvenlafaxina", "count": 3}, 
                    {"source": "Fentanil", "target": "Haloperidol", "count": 3}, 
                    {"source": "Haloperidol", "target": "Risperidona", "count": 4}, 
                    {"source": "Prometazina", "target": "Amitriptilina", "count": 4}, 
                    {"source": "Prometazina", "target": "Nortriptilina", "count": 4}, 
                    {"source": "Midazolam", "target": "Fluoxetina", "count": 4}, 
                    {"source": "Clonazepam", "target": "Ácido valpróico", "count": 4}, 
                    {"source": "Clonazepam", "target": "Clomipramina", "count": 4}, 
                    {"source": "Amitriptilina", "target": "Sertralina", "count": 4}, 
                    {"source": "Nortriptilina", "target": "Sertralina", "count": 4}, 
                    {"source": "Fentanil", "target": "Amitriptilina", "count": 4}, 
                    {"source": "Fentanil", "target": "Nortriptilina", "count": 4}, 
                    {"source": "Clonazepam", "target": "Imipramina", "count": 4}, 
                    {"source": "Cocaina", "target": "Fluoxetina", "count": 4}, 
                    {"source": "Diazepam", "target": "Levomepromazina", "count": 4}, 
                    {"source": "Citalopram", "target": "Quetiapina", "count": 4}, 
                    {"source": "Haloperidol", "target": "Quetiapina", "count": 4}, 
                    {"source": "Venlafaxina", "target": "Haloperidol", "count": 4}, 
                    {"source": "Desmetilvenlafaxina", "target": "Haloperidol", "count": 4}, 
                    {"source": "Diazepam", "target": "Quetiapina", "count": 4}, 
                    {"source": "Fentanil", "target": "Quetiapina", "count": 4}, 
                    {"source": "Diazepam", "target": "Citalopram", "count": 5}, 
                    {"source": "Diazepam", "target": "Risperidona", "count": 5}, 
                    {"source": "Etanol", "target": "Prometazina", "count": 5}, 
                    {"source": "Fentanil", "target": "Fluoxetina", "count": 5}, 
                    {"source": "Etanol", "target": "Haloperidol", "count": 5}, 
                    {"source": "Prometazina", "target": "Levomepromazina", "count": 5}, 
                    {"source": "Midazolam", "target": "Sertralina", "count": 5}, 
                    {"source": "Thc", "target": "Citalopram", "count": 5}, 
                    {"source": "Clonazepam", "target": "Carbamazepina", "count": 5}, 
                    {"source": "Cocaina", "target": "Etanol", "count": 5}, 
                    {"source": "Prometazina", "target": "Fluoxetina", "count": 5}, 
                    {"source": "Cocaina", "target": "Midazolam", "count": 5}, 
                    {"source": "Haloperidol", "target": "Levomepromazina", "count": 5}, 
                    {"source": "Midazolam", "target": "Quetiapina", "count": 5}, 
                    {"source": "Diazepam", "target": "Venlafaxina", "count": 5}, 
                    {"source": "Diazepam", "target": "Desmetilvenlafaxina", "count": 5}, 
                    {"source": "Sertralina", "target": "Quetiapina", "count": 5}, 
                    {"source": "Sertralina", "target": "Haloperidol", "count": 6}, 
                    {"source": "Clonazepam", "target": "Bupropiona", "count": 6}, 
                    {"source": "Thc", "target": "Haloperidol", "count": 6}, 
                    {"source": "Thc", "target": "Prometazina", "count": 6}, 
                    {"source": "Thc", "target": "Midazolam", "count": 6}, 
                    {"source": "Thc", "target": "Diazepam", "count": 6}, 
                    {"source": "Etanol", "target": "Fluoxetina", "count": 6}, 
                    {"source": "Cocaina", "target": "Prometazina", "count": 6}, 
                    {"source": "Clonazepam", "target": "Olanzapina", "count": 6}, 
                    {"source": "Fentanil", "target": "Clonazepam", "count": 6}, 
                    {"source": "Sertralina", "target": "Risperidona", "count": 7}, 
                    {"source": "Clonazepam", "target": "Risperidona", "count": 7}, 
                    {"source": "Clonazepam", "target": "Amitriptilina", "count": 7}, 
                    {"source": "Clonazepam", "target": "Nortriptilina", "count": 7}, 
                    {"source": "Cocaina", "target": "Thc", "count": 7}, 
                    {"source": "Prometazina", "target": "Quetiapina", "count": 7}, 
                    {"source": "Cocaina", "target": "Diazepam", "count": 7}, 
                    {"source": "Cocaina", "target": "Clonazepam", "count": 7}, 
                    {"source": "Fentanil", "target": "Diazepam", "count": 7}, 
                    {"source": "Diazepam", "target": "Fluoxetina", "count": 7}, 
                    {"source": "Cocaina", "target": "Haloperidol", "count": 8}, 
                    {"source": "Desmetilvenlafaxina", "target": "Venlafaxina", "count": 8}, 
                    {"source": "Prometazina", "target": "Sertralina", "count": 9}, 
                    {"source": "Etanol", "target": "Clonazepam", "count": 9}, 
                    {"source": "Clonazepam", "target": "Citalopram", "count": 9}, 
                    {"source": "Clonazepam", "target": "Levomepromazina", "count": 9}, 
                    {"source": "Diazepam", "target": "Sertralina", "count": 11}, 
                    {"source": "Thc", "target": "Clonazepam", "count": 11}, 
                    {"source": "Clonazepam", "target": "Fluoxetina", "count": 11}, 
                    {"source": "Nortriptilina", "target": "Amitriptilina", "count": 12}, 
                    {"source": "Midazolam", "target": "Prometazina", "count": 12}, 
                    {"source": "Midazolam", "target": "Haloperidol", "count": 12}, 
                    {"source": "Clonazepam", "target": "Quetiapina", "count": 12}, 
                    {"source": "Diazepam", "target": "Prometazina", "count": 14}, 
                    {"source": "Clonazepam", "target": "Midazolam", "count": 15}, 
                    {"source": "Fentanil", "target": "Midazolam", "count": 15}, 
                    {"source": "Diazepam", "target": "Haloperidol", "count": 16}, 
                    {"source": "Diazepam", "target": "Midazolam", "count": 16}, 
                    {"source": "Prometazina", "target": "Haloperidol", "count": 19}, 
                    {"source": "Clonazepam", "target": "Prometazina", "count": 20}, 
                    {"source": "Clonazepam", "target": "Haloperidol", "count": 20}, 
                    {"source": "Clonazepam", "target": "Diazepam", "count": 23}, 
                    {"source": "Clonazepam", "target": "Sertralina", "count": 26} 
                    ];
var nodes_data = [{"name": "Imipramina", "degree": 19, "total": 14},
                {"name": "Efedrina", "degree": 3, "total": 2},
                {"name": "Diazepam", "degree": 39, "total": 26},
                {"name": "Sertralina", "degree": 32, "total": 23},
                {"name": "Clorpromazina", "degree": 12, "total": 9},
                {"name": "Lamotrigina", "degree": 9, "total": 6},
                {"name": "Etanol", "degree": 21, "total": 16},
                {"name": "Fenobarbital", "degree": 2, "total": 1},
                {"name": "Venlafaxina", "degree": 22, "total": 17},
                {"name": "Nitrazepam", "degree": 6, "total": 4},
                {"name": "Morfina", "degree": 10, "total": 7},
                {"name": "Lorazepam", "degree": 4, "total": 3},
                {"name": "Cocaina", "degree": 25, "total": 20},
                {"name": "Bromazepam", "degree": 13, "total": 10},
                {"name": "Metadona", "degree": 8, "total": 5},
                {"name": "Midazolam", "degree": 37, "total": 25},
                {"name": "Prometazina", "degree": 34, "total": 24},
                {"name": "Topiramato", "degree": 14, "total": 11},
                {"name": "Clonazepam", "degree": 42, "total": 27},
                {"name": "Zolpidem", "degree": 10, "total": 7},
                {"name": "Nortriptilina", "degree": 20, "total": 15},
                {"name": "Metilfenidato", "degree": 4, "total": 3},
                {"name": "Fluoxetina", "degree": 27, "total": 21},
                {"name": "Codeina", "degree": 2, "total": 1},
                {"name": "Fenitoína", "degree": 13, "total": 10},
                {"name": "Risperidona", "degree": 21, "total": 16},
                {"name": "Olanzapina", "degree": 14, "total": 11},
                {"name": "Fentanil", "degree": 27, "total": 21},
                {"name": "Mirtazapina", "degree": 12, "total": 9},
                {"name": "Tramadol", "degree": 4, "total": 3},
                {"name": "Alprazolam", "degree": 18, "total": 13},
                {"name": "Levomepromazina", "degree": 24, "total": 19},
                {"name": "Sibutramina", "degree": 10, "total": 7},
                {"name": "Bupropiona", "degree": 25, "total": 20},
                {"name": "Clomipramina", "degree": 8, "total": 5},
                {"name": "Amitriptilina", "degree": 20, "total": 15},
                {"name": "Haloperidol", "degree": 34, "total": 24},
                {"name": "Clobazam", "degree": 11, "total": 8},
                {"name": "Thc", "degree": 24, "total": 19},
                {"name": "Ácido valpróico", "degree": 11, "total": 8},
                {"name": "Pregabalina", "degree": 15, "total": 12},
                {"name": "Gabapentina", "degree": 10, "total": 7},
                {"name": "Paroxetina", "degree": 1, "total": 0},
                {"name": "Cetamina", "degree": 2, "total": 1},
                {"name": "Clozapina", "degree": 1, "total": 0},
                {"name": "Desmetilvenlafaxina", "degree": 22, "total": 17},
                {"name": "Quetiapina", "degree": 29, "total": 22},
                {"name": "Carbamazepina", "degree": 20, "total": 15},
                {"name": "Citalopram", "degree": 23, "total": 18}
                ];

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
          .distance(200);

var charge_force = d3.forceManyBody()
    .strength(-1500)
    .distanceMin(100)
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
    .style("stroke-opacity", d => {return 1 - 1/d.count;})
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
        .attr("r", d => {return nodeSizeScale(d.total/1.3);})
        .attr("fill", "#8f8f8f")
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

var tooltipNetwork = d3.select("#rede_sangue").append("div")
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