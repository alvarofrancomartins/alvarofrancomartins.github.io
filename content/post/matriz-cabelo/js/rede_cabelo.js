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

var links_data = [{"source": "Amitriptlina", "target": "Quetiapina", "count": 1}, 
                {"source": "Nortriptlina", "target": "Quetiapina", "count": 1}, 
                {"source": "Codeina", "target": "Risperidona", "count": 1}, 
                {"source": "Codeina", "target": "Haloperidol", "count": 1}, 
                {"source": "Trazodona", "target": "Quetiapina", "count": 1}, 
                {"source": "Trazodona", "target": "Levomepromazina", "count": 1}, 
                {"source": "Duloxetina", "target": "Quetiapina", "count": 1}, 
                {"source": "Duloxetina", "target": "Levomepromazina", "count": 1}, 
                {"source": "Duloxetina", "target": "Trazodona", "count": 1}, 
                {"source": "Clomipramina", "target": "Quetiapina", "count": 1}, 
                {"source": "Clomipramina", "target": "Levomepromazina", "count": 1}, 
                {"source": "Clomipramina", "target": "Trazodona", "count": 1}, 
                {"source": "Clomipramina", "target": "Duloxetina", "count": 1}, 
                {"source": "Clonazepam", "target": "Trazodona", "count": 1}, 
                {"source": "Clonazepam", "target": "Duloxetina", "count": 1}, 
                {"source": "Cocaetileno", "target": "Trazodona", "count": 1}, 
                {"source": "Cocaetileno", "target": "Duloxetina", "count": 1}, 
                {"source": "Cocaetileno", "target": "Clomipramina", "count": 1}, 
                {"source": "Aeme (crack)", "target": "Trazodona", "count": 1}, 
                {"source": "Aeme (crack)", "target": "Duloxetina", "count": 1}, 
                {"source": "Aeme (crack)", "target": "Clomipramina", "count": 1}, 
                {"source": "Cocaína", "target": "Trazodona", "count": 1}, 
                {"source": "Cocaína", "target": "Duloxetina", "count": 1}, 
                {"source": "Cocaína", "target": "Clomipramina", "count": 1}, 
                {"source": "Temazepam", "target": "Haloperidol", "count": 1}, 
                {"source": "Venlafaxina", "target": "Risperidona", "count": 1}, 
                {"source": "Desmetillvenlafaxina", "target": "Risperidona", "count": 1}, 
                {"source": "Efedrina", "target": "Bupropiona", "count": 1}, 
                {"source": "Efedrina", "target": "Sertralina", "count": 1}, 
                {"source": "Efedrina", "target": "Clonazepam", "count": 1}, 
                {"source": "Imipramina", "target": "Levomepromazina", "count": 1}, 
                {"source": "Imipramina", "target": "Fluoxetina", "count": 1}, 
                {"source": "Midazolam", "target": "Imipramina", "count": 1}, 
                {"source": "Fentanil", "target": "Fluoxetina", "count": 1}, 
                {"source": "Fentanil", "target": "Imipramina", "count": 1}, 
                {"source": "Fentanil", "target": "Amitriptlina", "count": 1}, 
                {"source": "Fentanil", "target": "Nortriptlina", "count": 1}, 
                {"source": "Cocaetileno", "target": "Imipramina", "count": 1}, 
                {"source": "Cocaetileno", "target": "Midazolam", "count": 1}, 
                {"source": "Cocaetileno", "target": "Fentanil", "count": 1}, 
                {"source": "Aeme (crack)", "target": "Imipramina", "count": 1}, 
                {"source": "Aeme (crack)", "target": "Midazolam", "count": 1}, 
                {"source": "Aeme (crack)", "target": "Fentanil", "count": 1}, 
                {"source": "Cocaína", "target": "Imipramina", "count": 1}, 
                {"source": "Cocaína", "target": "Midazolam", "count": 1}, 
                {"source": "Cocaína", "target": "Fentanil", "count": 1}, 
                {"source": "Nortriptlina", "target": "Fenobarbital", "count": 1}, 
                {"source": "Diazepam", "target": "Fenobarbital", "count": 1}, 
                {"source": "Nordiazepam", "target": "Fenobarbital", "count": 1}, 
                {"source": "Codeina", "target": "Fenobarbital", "count": 1}, 
                {"source": "Codeina", "target": "Nortriptlina", "count": 1}, 
                {"source": "Codeina", "target": "Diazepam", "count": 1}, 
                {"source": "Codeina", "target": "Nordiazepam", "count": 1}, 
                {"source": "Morfina", "target": "Fenobarbital", "count": 1}, 
                {"source": "Morfina", "target": "Nortriptlina", "count": 1}, 
                {"source": "Morfina", "target": "Diazepam", "count": 1}, 
                {"source": "Morfina", "target": "Nordiazepam", "count": 1}, 
                {"source": "Morfina", "target": "Codeina", "count": 1}, 
                {"source": "Cocaetileno", "target": "Fenobarbital", "count": 1}, 
                {"source": "Cocaetileno", "target": "Codeina", "count": 1}, 
                {"source": "Cocaetileno", "target": "Morfina", "count": 1}, 
                {"source": "Cocaína", "target": "Fenobarbital", "count": 1}, 
                {"source": "Cocaína", "target": "Codeina", "count": 1}, 
                {"source": "Cocaína", "target": "Morfina", "count": 1}, 
                {"source": "Clonazepam", "target": "Bromazepam", "count": 1}, 
                {"source": "Thc", "target": "Bromazepam", "count": 1}, 
                {"source": "Cocaetileno", "target": "Bromazepam", "count": 1}, 
                {"source": "Aeme (crack)", "target": "Bromazepam", "count": 1}, 
                {"source": "Cocaína", "target": "Bromazepam", "count": 1}, 
                {"source": "Clorpromazina", "target": "Risperidona", "count": 1}, 
                {"source": "Haloperidol", "target": "Clorpromazina", "count": 1}, 
                {"source": "Cocaetileno", "target": "Clorpromazina", "count": 1}, 
                {"source": "Alprazolam", "target": "Amitriptlina", "count": 1}, 
                {"source": "Alprazolam", "target": "Nortriptlina", "count": 1}, 
                {"source": "Venlafaxina", "target": "Olanzapina", "count": 1}, 
                {"source": "Venlafaxina", "target": "Haloperidol", "count": 1}, 
                {"source": "Desmetillvenlafaxina", "target": "Olanzapina", "count": 1}, 
                {"source": "Desmetillvenlafaxina", "target": "Haloperidol", "count": 1}, 
                {"source": "Nortriptlina", "target": "Olanzapina", "count": 1}, 
                {"source": "Temazepam", "target": "Amitriptlina", "count": 1}, 
                {"source": "Temazepam", "target": "Nortriptlina", "count": 1}, 
                {"source": "Bupropiona", "target": "Clozapina", "count": 1}, 
                {"source": "Diazepam", "target": "Alprazolam", "count": 1}, 
                {"source": "Nordiazepam", "target": "Alprazolam", "count": 1}, 
                {"source": "Venlafaxina", "target": "Carbamazepina", "count": 1}, 
                {"source": "Desmetillvenlafaxina", "target": "Carbamazepina", "count": 1}, 
                {"source": "Fluoxetina", "target": "Carbamazepina", "count": 1}, 
                {"source": "Amitriptlina", "target": "Venlafaxina", "count": 1}, 
                {"source": "Amitriptlina", "target": "Desmetillvenlafaxina", "count": 1}, 
                {"source": "Clobazam", "target": "Quetiapina", "count": 1}, 
                {"source": "Clobazam", "target": "Zolpidem", "count": 1}, 
                {"source": "Bromazepam", "target": "Clobazam", "count": 1}, 
                {"source": "Thc", "target": "Cetamina", "count": 1}, 
                {"source": "Mdma", "target": "Clonazepam", "count": 1}, 
                {"source": "Mda", "target": "Clonazepam", "count": 1}, 
                {"source": "Lsd", "target": "Clonazepam", "count": 1}, 
                {"source": "Thc", "target": "Mdma", "count": 1}, 
                {"source": "Thc", "target": "Mda", "count": 1}, 
                {"source": "Thc", "target": "Lsd", "count": 1}, 
                {"source": "Zolpidem", "target": "Risperidona", "count": 1}, 
                {"source": "Zolpidem", "target": "Levomepromazina", "count": 1}, 
                {"source": "Cocaetileno", "target": "Lamotrigina", "count": 1}, 
                {"source": "Aeme (crack)", "target": "Lamotrigina", "count": 1}, 
                {"source": "Cocaína", "target": "Lamotrigina", "count": 1}, 
                {"source": "Venlafaxina", "target": "Lamotrigina", "count": 1}, 
                {"source": "Desmetillvenlafaxina", "target": "Lamotrigina", "count": 1}, 
                {"source": "Tramadol", "target": "Quetiapina", "count": 1}, 
                {"source": "Tramadol", "target": "Sertralina", "count": 1}, 
                {"source": "Tramadol", "target": "Fluoxetina", "count": 1}, 
                {"source": "Tramadol", "target": "Clonazepam", "count": 1}, 
                {"source": "Thc", "target": "Codeina", "count": 1}, 
                {"source": "Bromazepam", "target": "Venlafaxina", "count": 1}, 
                {"source": "Bromazepam", "target": "Desmetillvenlafaxina", "count": 1}, 
                {"source": "Bromazepam", "target": "Alprazolam", "count": 1}, 
                {"source": "Sertralina", "target": "Citalopram", "count": 1}, 
                {"source": "Metilfenidato", "target": "Citalopram", "count": 1}, 
                {"source": "Metilfenidato", "target": "Sertralina", "count": 1}, 
                {"source": "Metilfenidato", "target": "Fluoxetina", "count": 1}, 
                {"source": "Metilfenidato", "target": "Amitriptlina", "count": 1}, 
                {"source": "Metilfenidato", "target": "Nortriptlina", "count": 1}, 
                {"source": "Metilfenidato", "target": "Zolpidem", "count": 1}, 
                {"source": "Metilfenidato", "target": "Clonazepam", "count": 1}, 
                {"source": "Anfetamina", "target": "Citalopram", "count": 1}, 
                {"source": "Anfetamina", "target": "Sertralina", "count": 1}, 
                {"source": "Anfetamina", "target": "Fluoxetina", "count": 1}, 
                {"source": "Anfetamina", "target": "Amitriptlina", "count": 1}, 
                {"source": "Anfetamina", "target": "Nortriptlina", "count": 1}, 
                {"source": "Anfetamina", "target": "Zolpidem", "count": 1}, 
                {"source": "Anfetamina", "target": "Clonazepam", "count": 1}, 
                {"source": "Anfetamina", "target": "Metilfenidato", "count": 1}, 
                {"source": "Cetamina", "target": "Risperidona", "count": 1}, 
                {"source": "Cetamina", "target": "Bupropiona", "count": 1}, 
                {"source": "Cetamina", "target": "Sertralina", "count": 1}, 
                {"source": "Cetamina", "target": "Fluoxetina", "count": 1}, 
                {"source": "Cocaetileno", "target": "Bupropiona", "count": 1}, 
                {"source": "Aeme (crack)", "target": "Bupropiona", "count": 1}, 
                {"source": "Cocaína", "target": "Bupropiona", "count": 1}, 
                {"source": "Mirtazapina", "target": "Bupropiona", "count": 1}, 
                {"source": "Topiramato", "target": "Carbamazepina", "count": 1}, 
                {"source": "Risperidona", "target": "Carbamazepina", "count": 1}, 
                {"source": "Risperidona", "target": "Topiramato", "count": 1}, 
                {"source": "Quetiapina", "target": "Topiramato", "count": 1}, 
                {"source": "Levomepromazina", "target": "Topiramato", "count": 1}, 
                {"source": "Haloperidol", "target": "Topiramato", "count": 1}, 
                {"source": "Bupropiona", "target": "Carbamazepina", "count": 1}, 
                {"source": "Bupropiona", "target": "Quetiapina", "count": 1}, 
                {"source": "Bupropiona", "target": "Levomepromazina", "count": 1}, 
                {"source": "Sertralina", "target": "Topiramato", "count": 1}, 
                {"source": "Diazepam", "target": "Carbamazepina", "count": 1}, 
                {"source": "Nordiazepam", "target": "Carbamazepina", "count": 1}, 
                {"source": "Clonazepam", "target": "Topiramato", "count": 1}, 
                {"source": "Quetiapina", "target": "Olanzapina", "count": 1}, 
                {"source": "Diazepam", "target": "Olanzapina", "count": 1}, 
                {"source": "Venlafaxina", "target": "Pregabalina", "count": 1}, 
                {"source": "Desmetillvenlafaxina", "target": "Pregabalina", "count": 1}, 
                {"source": "Clobazam", "target": "Pregabalina", "count": 1}, 
                {"source": "Clobazam", "target": "Venlafaxina", "count": 1}, 
                {"source": "Clobazam", "target": "Desmetillvenlafaxina", "count": 1}, 
                {"source": "Paroxetina", "target": "Citalopram", "count": 1}, 
                {"source": "Diazepam", "target": "Paroxetina", "count": 1}, 
                {"source": "Temazepam", "target": "Citalopram", "count": 1}, 
                {"source": "Temazepam", "target": "Paroxetina", "count": 1}, 
                {"source": "Nordiazepam", "target": "Paroxetina", "count": 1}, 
                {"source": "Venlafaxina", "target": "Topiramato", "count": 1}, 
                {"source": "Venlafaxina", "target": "Bupropiona", "count": 1}, 
                {"source": "Desmetillvenlafaxina", "target": "Topiramato", "count": 1}, 
                {"source": "Desmetillvenlafaxina", "target": "Bupropiona", "count": 1}, 
                {"source": "Citalopram", "target": "Topiramato", "count": 1}, 
                {"source": "Citalopram", "target": "Bupropiona", "count": 1}, 
                {"source": "Fluoxetina", "target": "Topiramato", "count": 1}, 
                {"source": "Zolpidem", "target": "Topiramato", "count": 1}, 
                {"source": "Zolpidem", "target": "Bupropiona", "count": 1}, 
                {"source": "Mdma", "target": "Topiramato", "count": 1}, 
                {"source": "Mdma", "target": "Bupropiona", "count": 1}, 
                {"source": "Mdma", "target": "Venlafaxina", "count": 1}, 
                {"source": "Mdma", "target": "Desmetillvenlafaxina", "count": 1}, 
                {"source": "Mdma", "target": "Fluoxetina", "count": 1}, 
                {"source": "Mdma", "target": "Diazepam", "count": 1}, 
                {"source": "Mdma", "target": "Nordiazepam", "count": 1}, 
                {"source": "Mda", "target": "Topiramato", "count": 1}, 
                {"source": "Mda", "target": "Bupropiona", "count": 1}, 
                {"source": "Mda", "target": "Venlafaxina", "count": 1}, 
                {"source": "Mda", "target": "Desmetillvenlafaxina", "count": 1}, 
                {"source": "Mda", "target": "Fluoxetina", "count": 1}, 
                {"source": "Mda", "target": "Diazepam", "count": 1}, 
                {"source": "Mda", "target": "Nordiazepam", "count": 1}, 
                {"source": "Lsd", "target": "Topiramato", "count": 1}, 
                {"source": "Lsd", "target": "Bupropiona", "count": 1}, 
                {"source": "Lsd", "target": "Venlafaxina", "count": 1}, 
                {"source": "Lsd", "target": "Desmetillvenlafaxina", "count": 1}, 
                {"source": "Lsd", "target": "Fluoxetina", "count": 1}, 
                {"source": "Lsd", "target": "Diazepam", "count": 1}, 
                {"source": "Lsd", "target": "Nordiazepam", "count": 1}, 
                {"source": "Midazolam", "target": "Quetiapina", "count": 1}, 
                {"source": "Thc", "target": "Midazolam", "count": 1}, 
                {"source": "Clomipramina", "target": "Sertralina", "count": 1}, 
                {"source": "Clomipramina", "target": "Imipramina", "count": 1}, 
                {"source": "Clomipramina", "target": "Desipramina", "count": 1}, 
                {"source": "Amitriptlina", "target": "Desipramina", "count": 1}, 
                {"source": "Amitriptlina", "target": "Clomipramina", "count": 1}, 
                {"source": "Nortriptlina", "target": "Desipramina", "count": 1}, 
                {"source": "Nortriptlina", "target": "Clomipramina", "count": 1}, 
                {"source": "Nitrazepam", "target": "Sertralina", "count": 1}, 
                {"source": "Nitrazepam", "target": "Imipramina", "count": 1}, 
                {"source": "Nitrazepam", "target": "Desipramina", "count": 1}, 
                {"source": "Nitrazepam", "target": "Clomipramina", "count": 1}, 
                {"source": "Nitrazepam", "target": "Amitriptlina", "count": 1}, 
                {"source": "Nitrazepam", "target": "Nortriptlina", "count": 1}, 
                {"source": "Clonazepam", "target": "Nitrazepam", "count": 1}, 
                {"source": "Sibutramina", "target": "Amitriptlina", "count": 1}, 
                {"source": "Sibutramina", "target": "Nortriptlina", "count": 1}, 
                {"source": "Sibutramina", "target": "Diazepam", "count": 1}, 
                {"source": "Sibutramina", "target": "Nordiazepam", "count": 1}, 
                {"source": "Clonazepam", "target": "Alprazolam", "count": 1}, 
                {"source": "Aeme (crack)", "target": "Clobazam", "count": 1}, 
                {"source": "Cocaína", "target": "Clobazam", "count": 1}, 
                {"source": "Clobazam", "target": "Olanzapina", "count": 1}, 
                {"source": "Clobazam", "target": "Sertralina", "count": 1}, 
                {"source": "Amitriptlina", "target": "Mirtazapina", "count": 1}, 
                {"source": "Nortriptlina", "target": "Mirtazapina", "count": 1}, 
                {"source": "Midazolam", "target": "Sertralina", "count": 1}, 
                {"source": "Midazolam", "target": "Mirtazapina", "count": 1}, 
                {"source": "Clonazepam", "target": "Mirtazapina", "count": 1}, 
                {"source": "Clorpromazina", "target": "Olanzapina", "count": 1}, 
                {"source": "Clorpromazina", "target": "Levomepromazina", "count": 1}, 
                {"source": "Citalopram", "target": "Clorpromazina", "count": 1}, 
                {"source": "Clonazepam", "target": "Clorpromazina", "count": 1}, 
                {"source": "Amitriptlina", "target": "Risperidona", "count": 1}, 
                {"source": "Nortriptlina", "target": "Risperidona", "count": 1}, 
                {"source": "Paroxetina", "target": "Quetiapina", "count": 1}, 
                {"source": "Paroxetina", "target": "Venlafaxina", "count": 1}, 
                {"source": "Paroxetina", "target": "Desmetillvenlafaxina", "count": 1}, 
                {"source": "Alprazolam", "target": "Paroxetina", "count": 1}, 
                {"source": "Gabapentina", "target": "Carbamazepina", "count": 1}, 
                {"source": "Pregabalina", "target": "Carbamazepina", "count": 1}, 
                {"source": "Pregabalina", "target": "Gabapentina", "count": 1}, 
                {"source": "Quetiapina", "target": "Gabapentina", "count": 1}, 
                {"source": "Quetiapina", "target": "Pregabalina", "count": 1}, 
                {"source": "Sertralina", "target": "Gabapentina", "count": 1}, 
                {"source": "Sertralina", "target": "Pregabalina", "count": 1}, 
                {"source": "Imipramina", "target": "Carbamazepina", "count": 1}, 
                {"source": "Imipramina", "target": "Gabapentina", "count": 1}, 
                {"source": "Imipramina", "target": "Pregabalina", "count": 1}, 
                {"source": "Imipramina", "target": "Quetiapina", "count": 1}, 
                {"source": "Desipramina", "target": "Carbamazepina", "count": 1}, 
                {"source": "Desipramina", "target": "Gabapentina", "count": 1}, 
                {"source": "Desipramina", "target": "Pregabalina", "count": 1}, 
                {"source": "Desipramina", "target": "Quetiapina", "count": 1}, 
                {"source": "Clonazepam", "target": "Gabapentina", "count": 1}, 
                {"source": "Clonazepam", "target": "Pregabalina", "count": 1}, 
                {"source": "Cocaetileno", "target": "Sibutramina", "count": 1}, 
                {"source": "Aeme (crack)", "target": "Sibutramina", "count": 1}, 
                {"source": "Cocaína", "target": "Sibutramina", "count": 1}, 
                {"source": "Zolpidem", "target": "Haloperidol", "count": 1}, 
                {"source": "Diazepam", "target": "Clorpromazina", "count": 1}, 
                {"source": "Nordiazepam", "target": "Clorpromazina", "count": 1}, 
                {"source": "Aeme (crack)", "target": "Clorpromazina", "count": 1}, 
                {"source": "Olanzapina", "target": "Lamotrigina", "count": 1}, 
                {"source": "Risperidona", "target": "Lamotrigina", "count": 1}, 
                {"source": "Haloperidol", "target": "Lamotrigina", "count": 1}, 
                {"source": "Sertralina", "target": "Lamotrigina", "count": 1}, 
                {"source": "Codeina", "target": "Bromazepam", "count": 1}, 
                {"source": "Levomepromazina", "target": "Fenitoína", "count": 1}, 
                {"source": "Haloperidol", "target": "Fenitoína", "count": 1}, 
                {"source": "Midazolam", "target": "Fenitoína", "count": 1}, 
                {"source": "Diazepam", "target": "Fenitoína", "count": 1}, 
                {"source": "Clonazepam", "target": "Fenitoína", "count": 1}, 
                {"source": "Cetamina", "target": "Fenitoína", "count": 1}, 
                {"source": "Cetamina", "target": "Levomepromazina", "count": 1}, 
                {"source": "Cetamina", "target": "Midazolam", "count": 1}, 
                {"source": "Cetamina", "target": "Diazepam", "count": 1}, 
                {"source": "Cetamina", "target": "Nordiazepam", "count": 1}, 
                {"source": "Metadona", "target": "Fenitoína", "count": 1}, 
                {"source": "Metadona", "target": "Levomepromazina", "count": 1}, 
                {"source": "Metadona", "target": "Haloperidol", "count": 1}, 
                {"source": "Metadona", "target": "Midazolam", "count": 1}, 
                {"source": "Metadona", "target": "Diazepam", "count": 1}, 
                {"source": "Metadona", "target": "Nordiazepam", "count": 1}, 
                {"source": "Metadona", "target": "Clonazepam", "count": 1}, 
                {"source": "Metadona", "target": "Cetamina", "count": 1}, 
                {"source": "Fentanil", "target": "Fenitoína", "count": 1}, 
                {"source": "Fentanil", "target": "Haloperidol", "count": 1}, 
                {"source": "Fentanil", "target": "Diazepam", "count": 1}, 
                {"source": "Fentanil", "target": "Nordiazepam", "count": 1}, 
                {"source": "Fentanil", "target": "Cetamina", "count": 1}, 
                {"source": "Fentanil", "target": "Metadona", "count": 1}, 
                {"source": "Lamotrigina", "target": "Fenitoína", "count": 1}, 
                {"source": "Fluoxetina", "target": "Fenitoína", "count": 1}, 
                {"source": "Fluoxetina", "target": "Lamotrigina", "count": 1}, 
                {"source": "Clobazam", "target": "Fenitoína", "count": 1}, 
                {"source": "Clobazam", "target": "Lamotrigina", "count": 1}, 
                {"source": "Nordiazepam", "target": "Lamotrigina", "count": 1}, 
                {"source": "Nordiazepam", "target": "Clobazam", "count": 1}, 
                {"source": "Bromazepam", "target": "Diazepam", "count": 2}, 
                {"source": "Bromazepam", "target": "Nordiazepam", "count": 2}, 
                {"source": "Clonazepam", "target": "Temazepam", "count": 2}, 
                {"source": "Amitriptlina", "target": "Levomepromazina", "count": 2}, 
                {"source": "Nortriptlina", "target": "Venlafaxina", "count": 2}, 
                {"source": "Nortriptlina", "target": "Desmetillvenlafaxina", "count": 2}, 
                {"source": "Bromazepam", "target": "Fluoxetina", "count": 2}, 
                {"source": "Thc", "target": "Zolpidem", "count": 2}, 
                {"source": "Cocaetileno", "target": "Citalopram", "count": 2}, 
                {"source": "Aeme (crack)", "target": "Quetiapina", "count": 2}, 
                {"source": "Aeme (crack)", "target": "Citalopram", "count": 2}, 
                {"source": "Cocaína", "target": "Citalopram", "count": 2}, 
                {"source": "Quetiapina", "target": "Lamotrigina", "count": 2}, 
                {"source": "Citalopram", "target": "Lamotrigina", "count": 2}, 
                {"source": "Codeina", "target": "Clonazepam", "count": 2}, 
                {"source": "Temazepam", "target": "Sertralina", "count": 2}, 
                {"source": "Alprazolam", "target": "Zolpidem", "count": 2}, 
                {"source": "Bromazepam", "target": "Zolpidem", "count": 2}, 
                {"source": "Amitriptlina", "target": "Carbamazepina", "count": 2}, 
                {"source": "Nortriptlina", "target": "Carbamazepina", "count": 2}, 
                {"source": "Zolpidem", "target": "Amitriptlina", "count": 2}, 
                {"source": "Zolpidem", "target": "Nortriptlina", "count": 2}, 
                {"source": "Cocaetileno", "target": "Cetamina", "count": 2}, 
                {"source": "Aeme (crack)", "target": "Cetamina", "count": 2}, 
                {"source": "Cocaína", "target": "Cetamina", "count": 2}, 
                {"source": "Levomepromazina", "target": "Carbamazepina", "count": 2}, 
                {"source": "Bupropiona", "target": "Risperidona", "count": 2}, 
                {"source": "Bupropiona", "target": "Haloperidol", "count": 2}, 
                {"source": "Nordiazepam", "target": "Olanzapina", "count": 2}, 
                {"source": "Bupropiona", "target": "Topiramato", "count": 2}, 
                {"source": "Fluoxetina", "target": "Bupropiona", "count": 2}, 
                {"source": "Zolpidem", "target": "Venlafaxina", "count": 2}, 
                {"source": "Zolpidem", "target": "Desmetillvenlafaxina", "count": 2}, 
                {"source": "Diazepam", "target": "Topiramato", "count": 2}, 
                {"source": "Diazepam", "target": "Bupropiona", "count": 2}, 
                {"source": "Diazepam", "target": "Venlafaxina", "count": 2}, 
                {"source": "Diazepam", "target": "Desmetillvenlafaxina", "count": 2}, 
                {"source": "Diazepam", "target": "Zolpidem", "count": 2}, 
                {"source": "Nordiazepam", "target": "Topiramato", "count": 2}, 
                {"source": "Nordiazepam", "target": "Bupropiona", "count": 2}, 
                {"source": "Nordiazepam", "target": "Zolpidem", "count": 2}, 
                {"source": "Mdma", "target": "Citalopram", "count": 2}, 
                {"source": "Mdma", "target": "Zolpidem", "count": 2}, 
                {"source": "Mda", "target": "Citalopram", "count": 2}, 
                {"source": "Mda", "target": "Zolpidem", "count": 2}, 
                {"source": "Mda", "target": "Mdma", "count": 2}, 
                {"source": "Lsd", "target": "Citalopram", "count": 2}, 
                {"source": "Lsd", "target": "Zolpidem", "count": 2}, 
                {"source": "Lsd", "target": "Mdma", "count": 2}, 
                {"source": "Lsd", "target": "Mda", "count": 2}, 
                {"source": "Amitriptlina", "target": "Citalopram", "count": 2}, 
                {"source": "Midazolam", "target": "Fluoxetina", "count": 2}, 
                {"source": "Alprazolam", "target": "Sertralina", "count": 2}, 
                {"source": "Amitriptlina", "target": "Imipramina", "count": 2}, 
                {"source": "Nortriptlina", "target": "Imipramina", "count": 2}, 
                {"source": "Clonazepam", "target": "Clomipramina", "count": 2}, 
                {"source": "Clobazam", "target": "Haloperidol", "count": 2}, 
                {"source": "Sertralina", "target": "Levomepromazina", "count": 2}, 
                {"source": "Fluoxetina", "target": "Olanzapina", "count": 2}, 
                {"source": "Clobazam", "target": "Risperidona", "count": 2}, 
                {"source": "Clobazam", "target": "Levomepromazina", "count": 2}, 
                {"source": "Mirtazapina", "target": "Sertralina", "count": 2}, 
                {"source": "Midazolam", "target": "Amitriptlina", "count": 2}, 
                {"source": "Midazolam", "target": "Nortriptlina", "count": 2}, 
                {"source": "Thc", "target": "Clorpromazina", "count": 2}, 
                {"source": "Thc", "target": "Olanzapina", "count": 2}, 
                {"source": "Amitriptlina", "target": "Haloperidol", "count": 2}, 
                {"source": "Cocaetileno", "target": "Sertralina", "count": 2}, 
                {"source": "Aeme (crack)", "target": "Sertralina", "count": 2}, 
                {"source": "Cocaína", "target": "Sertralina", "count": 2}, 
                {"source": "Alprazolam", "target": "Quetiapina", "count": 2}, 
                {"source": "Imipramina", "target": "Sertralina", "count": 2}, 
                {"source": "Desipramina", "target": "Sertralina", "count": 2}, 
                {"source": "Desipramina", "target": "Imipramina", "count": 2}, 
                {"source": "Clonazepam", "target": "Desipramina", "count": 2}, 
                {"source": "Cocaína", "target": "Clorpromazina", "count": 2}, 
                {"source": "Risperidona", "target": "Olanzapina", "count": 2}, 
                {"source": "Haloperidol", "target": "Olanzapina", "count": 2}, 
                {"source": "Sertralina", "target": "Olanzapina", "count": 2}, 
                {"source": "Clonazepam", "target": "Lamotrigina", "count": 2}, 
                {"source": "Codeina", "target": "Quetiapina", "count": 2}, 
                {"source": "Codeina", "target": "Citalopram", "count": 2}, 
                {"source": "Midazolam", "target": "Levomepromazina", "count": 2}, 
                {"source": "Midazolam", "target": "Haloperidol", "count": 2}, 
                {"source": "Diazepam", "target": "Midazolam", "count": 2}, 
                {"source": "Nordiazepam", "target": "Midazolam", "count": 2}, 
                {"source": "Cetamina", "target": "Haloperidol", "count": 2}, 
                {"source": "Fentanil", "target": "Levomepromazina", "count": 2}, 
                {"source": "Fentanil", "target": "Midazolam", "count": 2}, 
                {"source": "Fentanil", "target": "Clonazepam", "count": 2}, 
                {"source": "Nordiazepam", "target": "Fenitoína", "count": 2}, 
                {"source": "Venlafaxina", "target": "Levomepromazina", "count": 3}, 
                {"source": "Desmetillvenlafaxina", "target": "Levomepromazina", "count": 3}, 
                {"source": "Nortriptlina", "target": "Levomepromazina", "count": 3}, 
                {"source": "Aeme (crack)", "target": "Thc", "count": 3}, 
                {"source": "Amitriptlina", "target": "Fluoxetina", "count": 3}, 
                {"source": "Haloperidol", "target": "Carbamazepina", "count": 3}, 
                {"source": "Clonazepam", "target": "Bupropiona", "count": 3}, 
                {"source": "Fluoxetina", "target": "Venlafaxina", "count": 3}, 
                {"source": "Fluoxetina", "target": "Desmetillvenlafaxina", "count": 3}, 
                {"source": "Nordiazepam", "target": "Venlafaxina", "count": 3}, 
                {"source": "Nordiazepam", "target": "Desmetillvenlafaxina", "count": 3}, 
                {"source": "Nortriptlina", "target": "Citalopram", "count": 3}, 
                {"source": "Citalopram", "target": "Haloperidol", "count": 3}, 
                {"source": "Quetiapina", "target": "Risperidona", "count": 3}, 
                {"source": "Thc", "target": "Risperidona", "count": 3}, 
                {"source": "Cocaetileno", "target": "Quetiapina", "count": 3}, 
                {"source": "Cocaetileno", "target": "Levomepromazina", "count": 3}, 
                {"source": "Cocaína", "target": "Quetiapina", "count": 3}, 
                {"source": "Thc", "target": "Quetiapina", "count": 3}, 
                {"source": "Thc", "target": "Sertralina", "count": 3}, 
                {"source": "Aeme (crack)", "target": "Levomepromazina", "count": 3}, 
                {"source": "Clonazepam", "target": "Clobazam", "count": 3}, 
                {"source": "Citalopram", "target": "Olanzapina", "count": 3}, 
                {"source": "Citalopram", "target": "Levomepromazina", "count": 3}, 
                {"source": "Nortriptlina", "target": "Haloperidol", "count": 3}, 
                {"source": "Diazepam", "target": "Amitriptlina", "count": 3}, 
                {"source": "Nordiazepam", "target": "Amitriptlina", "count": 3}, 
                {"source": "Cocaetileno", "target": "Amitriptlina", "count": 3}, 
                {"source": "Aeme (crack)", "target": "Amitriptlina", "count": 3}, 
                {"source": "Aeme (crack)", "target": "Nortriptlina", "count": 3}, 
                {"source": "Cocaína", "target": "Amitriptlina", "count": 3}, 
                {"source": "Quetiapina", "target": "Carbamazepina", "count": 3}, 
                {"source": "Clonazepam", "target": "Imipramina", "count": 3}, 
                {"source": "Fluoxetina", "target": "Quetiapina", "count": 3}, 
                {"source": "Zolpidem", "target": "Sertralina", "count": 3}, 
                {"source": "Bromazepam", "target": "Quetiapina", "count": 3}, 
                {"source": "Bromazepam", "target": "Citalopram", "count": 3}, 
                {"source": "Diazepam", "target": "Levomepromazina", "count": 3}, 
                {"source": "Cetamina", "target": "Clonazepam", "count": 3}, 
                {"source": "Clobazam", "target": "Fluoxetina", "count": 3}, 
                {"source": "Nortriptlina", "target": "Fluoxetina", "count": 4}, 
                {"source": "Aeme (crack)", "target": "Fluoxetina", "count": 4}, 
                {"source": "Sertralina", "target": "Bupropiona", "count": 4}, 
                {"source": "Temazepam", "target": "Diazepam", "count": 4}, 
                {"source": "Nordiazepam", "target": "Temazepam", "count": 4}, 
                {"source": "Citalopram", "target": "Venlafaxina", "count": 4}, 
                {"source": "Citalopram", "target": "Desmetillvenlafaxina", "count": 4}, 
                {"source": "Levomepromazina", "target": "Quetiapina", "count": 4}, 
                {"source": "Diazepam", "target": "Quetiapina", "count": 4}, 
                {"source": "Nordiazepam", "target": "Quetiapina", "count": 4}, 
                {"source": "Clonazepam", "target": "Venlafaxina", "count": 4}, 
                {"source": "Clonazepam", "target": "Desmetillvenlafaxina", "count": 4}, 
                {"source": "Cocaína", "target": "Levomepromazina", "count": 4}, 
                {"source": "Thc", "target": "Levomepromazina", "count": 4}, 
                {"source": "Diazepam", "target": "Risperidona", "count": 4}, 
                {"source": "Diazepam", "target": "Nortriptlina", "count": 4}, 
                {"source": "Nordiazepam", "target": "Risperidona", "count": 4}, 
                {"source": "Cocaetileno", "target": "Nortriptlina", "count": 4}, 
                {"source": "Cocaína", "target": "Nortriptlina", "count": 4}, 
                {"source": "Venlafaxina", "target": "Quetiapina", "count": 4}, 
                {"source": "Desmetillvenlafaxina", "target": "Quetiapina", "count": 4}, 
                {"source": "Alprazolam", "target": "Venlafaxina", "count": 4}, 
                {"source": "Alprazolam", "target": "Desmetillvenlafaxina", "count": 4}, 
                {"source": "Sertralina", "target": "Carbamazepina", "count": 4}, 
                {"source": "Clonazepam", "target": "Carbamazepina", "count": 4}, 
                {"source": "Thc", "target": "Fluoxetina", "count": 4}, 
                {"source": "Zolpidem", "target": "Quetiapina", "count": 4}, 
                {"source": "Aeme (crack)", "target": "Diazepam", "count": 4}, 
                {"source": "Aeme (crack)", "target": "Nordiazepam", "count": 4}, 
                {"source": "Nordiazepam", "target": "Levomepromazina", "count": 4}, 
                {"source": "Clonazepam", "target": "Midazolam", "count": 4}, 
                {"source": "Diazepam", "target": "Citalopram", "count": 5}, 
                {"source": "Diazepam", "target": "Fluoxetina", "count": 5}, 
                {"source": "Fluoxetina", "target": "Citalopram", "count": 5}, 
                {"source": "Fluoxetina", "target": "Risperidona", "count": 5}, 
                {"source": "Levomepromazina", "target": "Olanzapina", "count": 5}, 
                {"source": "Nordiazepam", "target": "Nortriptlina", "count": 5}, 
                {"source": "Cocaetileno", "target": "Risperidona", "count": 5}, 
                {"source": "Aeme (crack)", "target": "Risperidona", "count": 5}, 
                {"source": "Cocaetileno", "target": "Fluoxetina", "count": 5}, 
                {"source": "Cocaína", "target": "Fluoxetina", "count": 5}, 
                {"source": "Fluoxetina", "target": "Haloperidol", "count": 5}, 
                {"source": "Clonazepam", "target": "Zolpidem", "count": 5}, 
                {"source": "Nordiazepam", "target": "Citalopram", "count": 6}, 
                {"source": "Thc", "target": "Haloperidol", "count": 6}, 
                {"source": "Thc", "target": "Diazepam", "count": 6}, 
                {"source": "Thc", "target": "Nordiazepam", "count": 6}, 
                {"source": "Zolpidem", "target": "Citalopram", "count": 6}, 
                {"source": "Levomepromazina", "target": "Risperidona", "count": 6}, 
                {"source": "Fluoxetina", "target": "Levomepromazina", "count": 6}, 
                {"source": "Thc", "target": "Citalopram", "count": 6}, 
                {"source": "Aeme (crack)", "target": "Haloperidol", "count": 6}, 
                {"source": "Haloperidol", "target": "Quetiapina", "count": 6}, 
                {"source": "Zolpidem", "target": "Fluoxetina", "count": 6}, 
                {"source": "Clonazepam", "target": "Olanzapina", "count": 6}, 
                {"source": "Citalopram", "target": "Quetiapina", "count": 6}, 
                {"source": "Amitriptlina", "target": "Sertralina", "count": 7}, 
                {"source": "Nortriptlina", "target": "Sertralina", "count": 7}, 
                {"source": "Cocaetileno", "target": "Diazepam", "count": 7}, 
                {"source": "Cocaetileno", "target": "Nordiazepam", "count": 7}, 
                {"source": "Cocaína", "target": "Risperidona", "count": 7}, 
                {"source": "Sertralina", "target": "Quetiapina", "count": 7}, 
                {"source": "Fluoxetina", "target": "Sertralina", "count": 7}, 
                {"source": "Haloperidol", "target": "Levomepromazina", "count": 7}, 
                {"source": "Nordiazepam", "target": "Fluoxetina", "count": 7}, 
                {"source": "Clonazepam", "target": "Amitriptlina", "count": 8}, 
                {"source": "Cocaetileno", "target": "Haloperidol", "count": 8}, 
                {"source": "Cocaetileno", "target": "Clonazepam", "count": 8}, 
                {"source": "Aeme (crack)", "target": "Clonazepam", "count": 8}, 
                {"source": "Cocaína", "target": "Diazepam", "count": 8}, 
                {"source": "Cocaína", "target": "Nordiazepam", "count": 8}, 
                {"source": "Sertralina", "target": "Risperidona", "count": 8}, 
                {"source": "Diazepam", "target": "Sertralina", "count": 9}, 
                {"source": "Nordiazepam", "target": "Sertralina", "count": 9}, 
                {"source": "Clonazepam", "target": "Nortriptlina", "count": 9}, 
                {"source": "Cocaetileno", "target": "Thc", "count": 9}, 
                {"source": "Cocaína", "target": "Thc", "count": 9}, 
                {"source": "Diazepam", "target": "Haloperidol", "count": 9}, 
                {"source": "Cocaína", "target": "Haloperidol", "count": 10}, 
                {"source": "Cocaína", "target": "Clonazepam", "count": 10}, 
                {"source": "Sertralina", "target": "Haloperidol", "count": 10}, 
                {"source": "Nordiazepam", "target": "Haloperidol", "count": 10}, 
                {"source": "Desmetillvenlafaxina", "target": "Venlafaxina", "count": 11}, 
                {"source": "Clonazepam", "target": "Risperidona", "count": 11}, 
                {"source": "Clonazepam", "target": "Citalopram", "count": 12}, 
                {"source": "Thc", "target": "Clonazepam", "count": 12}, 
                {"source": "Haloperidol", "target": "Risperidona", "count": 12}, 
                {"source": "Clonazepam", "target": "Fluoxetina", "count": 13}, 
                {"source": "Clonazepam", "target": "Diazepam", "count": 13}, 
                {"source": "Nortriptlina", "target": "Amitriptlina", "count": 14}, 
                {"source": "Aeme (crack)", "target": "Cocaetileno", "count": 14}, 
                {"source": "Clonazepam", "target": "Quetiapina", "count": 14}, 
                {"source": "Clonazepam", "target": "Nordiazepam", "count": 14}, 
                {"source": "Clonazepam", "target": "Levomepromazina", "count": 15}, 
                {"source": "Cocaína", "target": "Aeme (crack)", "count": 17}, 
                {"source": "Clonazepam", "target": "Haloperidol", "count": 20}, 
                {"source": "Cocaína", "target": "Cocaetileno", "count": 22}, 
                {"source": "Clonazepam", "target": "Sertralina", "count": 23}, 
                {"source": "Nordiazepam", "target": "Diazepam", "count": 28} 
                ];
var nodes_data = [{"name": "Codeina", "degree": 14, "total": 11},
                {"name": "Thc", "degree": 23, "total": 17},
                {"name": "Topiramato", "degree": 18, "total": 14},
                {"name": "Lsd", "degree": 13, "total": 10},
                {"name": "Fentanil", "degree": 16, "total": 12},
                {"name": "Mda", "degree": 13, "total": 10},
                {"name": "Risperidona", "degree": 26, "total": 19},
                {"name": "Olanzapina", "degree": 17, "total": 13},
                {"name": "Nortriptlina", "degree": 34, "total": 25},
                {"name": "Fluoxetina", "degree": 36, "total": 26},
                {"name": "Pregabalina", "degree": 10, "total": 7},
                {"name": "Zolpidem", "degree": 25, "total": 18},
                {"name": "Carbamazepina", "degree": 19, "total": 15},
                {"name": "Paroxetina", "degree": 8, "total": 5},
                {"name": "Bromazepam", "degree": 16, "total": 12},
                {"name": "Mdma", "degree": 13, "total": 10},
                {"name": "Temazepam", "degree": 9, "total": 6},
                {"name": "Quetiapina", "degree": 37, "total": 27},
                {"name": "Mirtazapina", "degree": 6, "total": 3},
                {"name": "Amitriptlina", "degree": 30, "total": 21},
                {"name": "Cetamina", "degree": 17, "total": 13},
                {"name": "Venlafaxina", "degree": 26, "total": 19},
                {"name": "Desmetillvenlafaxina", "degree": 26, "total": 19},
                {"name": "Sertralina", "degree": 37, "total": 27},
                {"name": "Imipramina", "degree": 18, "total": 14},
                {"name": "Midazolam", "degree": 20, "total": 16},
                {"name": "Gabapentina", "degree": 7, "total": 4},
                {"name": "Metadona", "degree": 9, "total": 6},
                {"name": "Citalopram", "degree": 31, "total": 22},
                {"name": "Anfetamina", "degree": 8, "total": 5},
                {"name": "Morfina", "degree": 7, "total": 4},
                {"name": "Diazepam", "degree": 39, "total": 28},
                {"name": "Haloperidol", "degree": 32, "total": 23},
                {"name": "Bupropiona", "degree": 25, "total": 18},
                {"name": "Efedrina", "degree": 3, "total": 1},
                {"name": "Clorpromazina", "degree": 12, "total": 9},
                {"name": "Clonazepam", "degree": 50, "total": 30},
                {"name": "Nitrazepam", "degree": 7, "total": 4},
                {"name": "Nordiazepam", "degree": 41, "total": 29},
                {"name": "Clomipramina", "degree": 14, "total": 11},
                {"name": "Metilfenidato", "degree": 8, "total": 5},
                {"name": "Desipramina", "degree": 11, "total": 8},
                {"name": "Aeme (crack)", "degree": 28, "total": 20},
                {"name": "Cocaetileno", "degree": 30, "total": 21},
                {"name": "Cocaína", "degree": 31, "total": 22},
                {"name": "Clozapina", "degree": 1, "total": 0},
                {"name": "Duloxetina", "degree": 8, "total": 5},
                {"name": "Lamotrigina", "degree": 16, "total": 12},
                {"name": "Fenitoína", "degree": 12, "total": 9},
                {"name": "Fenobarbital", "degree": 7, "total": 4},
                {"name": "Levomepromazina", "degree": 33, "total": 24},
                {"name": "Trazodona", "degree": 8, "total": 5},
                {"name": "Alprazolam", "degree": 12, "total": 9},
                {"name": "Clobazam", "degree": 18, "total": 14},
                {"name": "Tramadol", "degree": 4, "total": 2},
                {"name": "Sibutramina", "degree": 7, "total": 4}
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