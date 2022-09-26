const marginNetwork = { top: 0, right: 0, bottom: 0, left: 0};
const widthNetwork  = 1400 - marginNetwork.left - marginNetwork.right;
const heightNetwork = 900 - marginNetwork.top  - marginNetwork.bottom;

const zoom = d3.zoom();

const x = 300;
const y = 200;
const scale = 1;
const k = 0.3;

//Create SVG element in chart id element
const svgNetwork = d3.select('#rede_urina')
                  .append('svg')
                   .attr("class", "content")
                   .attr("viewBox", `0 0 ${widthNetwork + marginNetwork.left + marginNetwork.right} ${heightNetwork + marginNetwork.top + marginNetwork.bottom}`)
                   .attr("preserveAspectRatio", "none")

var links_data = [{"source": "Etanol", "target": "Risperidona", "count": 1}, 
                    {"source": "Carbamazepina", "target": "Dipirona", "count": 1}, 
                    {"source": "Levamisol", "target": "Clomipramina", "count": 1}, 
                    {"source": "Cocaetileno", "target": "Clomipramina", "count": 1}, 
                    {"source": "Aeme (crack)", "target": "Clomipramina", "count": 1}, 
                    {"source": "Cocaína", "target": "Clomipramina", "count": 1}, 
                    {"source": "Diazepam", "target": "Clorpromazina", "count": 1}, 
                    {"source": "Levamisol", "target": "Clorpromazina", "count": 1}, 
                    {"source": "Lorazepam", "target": "Paracetamol", "count": 1}, 
                    {"source": "Lorazepam", "target": "Dipirona", "count": 1}, 
                    {"source": "Lorazepam", "target": "Haloperidol", "count": 1}, 
                    {"source": "Lorazepam", "target": "Sertralina", "count": 1}, 
                    {"source": "Diazepam", "target": "Lorazepam", "count": 1}, 
                    {"source": "Clonazepam", "target": "Lorazepam", "count": 1}, 
                    {"source": "Venlafaxina", "target": "Carbamazepina", "count": 1}, 
                    {"source": "Venlafaxina", "target": "Risperidona", "count": 1}, 
                    {"source": "Efedrina", "target": "Bupropiona", "count": 1}, 
                    {"source": "Efedrina", "target": "Midazolam", "count": 1}, 
                    {"source": "Efedrina", "target": "Clonazepam", "count": 1}, 
                    {"source": "Levomepromazina", "target": "Aldicarbe", "count": 1}, 
                    {"source": "Bupropiona", "target": "Aldicarbe", "count": 1}, 
                    {"source": "Fluoxetina", "target": "Bupropiona", "count": 1}, 
                    {"source": "Imipramina", "target": "Aldicarbe", "count": 1}, 
                    {"source": "Imipramina", "target": "Levomepromazina", "count": 1}, 
                    {"source": "Imipramina", "target": "Bupropiona", "count": 1}, 
                    {"source": "Imipramina", "target": "Fluoxetina", "count": 1}, 
                    {"source": "Amitriptlina", "target": "Aldicarbe", "count": 1}, 
                    {"source": "Amitriptlina", "target": "Levomepromazina", "count": 1}, 
                    {"source": "Amitriptlina", "target": "Imipramina", "count": 1}, 
                    {"source": "Prometazina", "target": "Aldicarbe", "count": 1}, 
                    {"source": "Clonazepam", "target": "Aldicarbe", "count": 1}, 
                    {"source": "Fentanil", "target": "Levomepromazina", "count": 1}, 
                    {"source": "Fentanil", "target": "Imipramina", "count": 1}, 
                    {"source": "Etanol", "target": "Aldicarbe", "count": 1}, 
                    {"source": "Etanol", "target": "Levomepromazina", "count": 1}, 
                    {"source": "Etanol", "target": "Bupropiona", "count": 1}, 
                    {"source": "Etanol", "target": "Imipramina", "count": 1}, 
                    {"source": "Levamisol", "target": "Aldicarbe", "count": 1}, 
                    {"source": "Levamisol", "target": "Levomepromazina", "count": 1}, 
                    {"source": "Levamisol", "target": "Imipramina", "count": 1}, 
                    {"source": "Levamisol", "target": "Fentanil", "count": 1}, 
                    {"source": "Cocaetileno", "target": "Levomepromazina", "count": 1}, 
                    {"source": "Cocaetileno", "target": "Bupropiona", "count": 1}, 
                    {"source": "Cocaetileno", "target": "Imipramina", "count": 1}, 
                    {"source": "Cocaetileno", "target": "Fentanil", "count": 1}, 
                    {"source": "Aeme (crack)", "target": "Aldicarbe", "count": 1}, 
                    {"source": "Aeme (crack)", "target": "Levomepromazina", "count": 1}, 
                    {"source": "Aeme (crack)", "target": "Bupropiona", "count": 1}, 
                    {"source": "Aeme (crack)", "target": "Imipramina", "count": 1}, 
                    {"source": "Aeme (crack)", "target": "Amitriptlina", "count": 1}, 
                    {"source": "Aeme (crack)", "target": "Prometazina", "count": 1}, 
                    {"source": "Aeme (crack)", "target": "Etanol", "count": 1}, 
                    {"source": "Cocaína", "target": "Levomepromazina", "count": 1}, 
                    {"source": "Cocaína", "target": "Imipramina", "count": 1}, 
                    {"source": "Etanol", "target": "Fenobarbital", "count": 1}, 
                    {"source": "Diclofenaco", "target": "Ibuprofeno", "count": 1}, 
                    {"source": "Paracetamol", "target": "Ibuprofeno", "count": 1}, 
                    {"source": "Amitriptlina", "target": "Ibuprofeno", "count": 1}, 
                    {"source": "Amitriptlina", "target": "Paracetamol", "count": 1}, 
                    {"source": "Etanol", "target": "Ibuprofeno", "count": 1}, 
                    {"source": "Citalopram", "target": "Bupropiona", "count": 1}, 
                    {"source": "Zolpidem", "target": "Bupropiona", "count": 1}, 
                    {"source": "Zolpidem", "target": "Sertralina", "count": 1}, 
                    {"source": "Alprazolam", "target": "Bupropiona", "count": 1}, 
                    {"source": "Alprazolam", "target": "Sertralina", "count": 1}, 
                    {"source": "Alprazolam", "target": "Zolpidem", "count": 1}, 
                    {"source": "Carboxi-thc*", "target": "Bromadiolone", "count": 1}, 
                    {"source": "Midazolam", "target": "Citalopram", "count": 1}, 
                    {"source": "Clonazepam", "target": "Bromazepam", "count": 1}, 
                    {"source": "Carboxi-thc*", "target": "Bromazepam", "count": 1}, 
                    {"source": "Aeme (crack)", "target": "Bromazepam", "count": 1}, 
                    {"source": "Cocaína", "target": "Bromazepam", "count": 1}, 
                    {"source": "Carboxi-thc*", "target": "Clorpromazina", "count": 1}, 
                    {"source": "Haloperidol", "target": "Olanzapina", "count": 1}, 
                    {"source": "Venlafaxina", "target": "Olanzapina", "count": 1}, 
                    {"source": "Venlafaxina", "target": "Levomepromazina", "count": 1}, 
                    {"source": "Nortriptlina", "target": "Dipirona", "count": 1}, 
                    {"source": "Nortriptlina", "target": "Olanzapina", "count": 1}, 
                    {"source": "Nortriptlina", "target": "Levomepromazina", "count": 1}, 
                    {"source": "Nortriptlina", "target": "Haloperidol", "count": 1}, 
                    {"source": "Nortriptlina", "target": "Venlafaxina", "count": 1}, 
                    {"source": "Prometazina", "target": "Nortriptlina", "count": 1}, 
                    {"source": "Midazolam", "target": "Nortriptlina", "count": 1}, 
                    {"source": "Diazepam", "target": "Nortriptlina", "count": 1}, 
                    {"source": "Clonazepam", "target": "Nortriptlina", "count": 1}, 
                    {"source": "Mirtazapina", "target": "Quetiapina", "count": 1}, 
                    {"source": "Mirtazapina", "target": "Haloperidol", "count": 1}, 
                    {"source": "Mirtazapina", "target": "Citalopram", "count": 1}, 
                    {"source": "Prometazina", "target": "Mirtazapina", "count": 1}, 
                    {"source": "Alprazolam", "target": "Haloperidol", "count": 1}, 
                    {"source": "Alprazolam", "target": "Mirtazapina", "count": 1}, 
                    {"source": "Diazepam", "target": "Mirtazapina", "count": 1}, 
                    {"source": "Olanzapina", "target": "Brodifacoum", "count": 1}, 
                    {"source": "Codeina", "target": "Paracetamol", "count": 1}, 
                    {"source": "Codeina", "target": "Carbamazepina", "count": 1}, 
                    {"source": "Morfina", "target": "Paracetamol", "count": 1}, 
                    {"source": "Morfina", "target": "Carbamazepina", "count": 1}, 
                    {"source": "Morfina", "target": "Codeina", "count": 1}, 
                    {"source": "Gabapentina", "target": "Paracetamol", "count": 1}, 
                    {"source": "Midazolam", "target": "Gabapentina", "count": 1}, 
                    {"source": "Fentanil", "target": "Paracetamol", "count": 1}, 
                    {"source": "Fentanil", "target": "Gabapentina", "count": 1}, 
                    {"source": "Etanol", "target": "Ácido valpróico", "count": 1}, 
                    {"source": "Etanol", "target": "Quetiapina", "count": 1}, 
                    {"source": "Bromazepam", "target": "Prometazina", "count": 1}, 
                    {"source": "Amitriptlina", "target": "Risperidona", "count": 1}, 
                    {"source": "Carboxi-thc*", "target": "Cetamina", "count": 1}, 
                    {"source": "Levamisol", "target": "Cetamina", "count": 1}, 
                    {"source": "Aeme (crack)", "target": "Cetamina", "count": 1}, 
                    {"source": "Cocaína", "target": "Cetamina", "count": 1}, 
                    {"source": "Citalopram", "target": "Bromadiolone", "count": 1}, 
                    {"source": "Clonazepam", "target": "Bromadiolone", "count": 1}, 
                    {"source": "Fluoxetina", "target": "Topiramato", "count": 1}, 
                    {"source": "Alprazolam", "target": "Topiramato", "count": 1}, 
                    {"source": "Risperidona", "target": "Diclofenaco", "count": 1}, 
                    {"source": "Risperidona", "target": "Paracetamol", "count": 1}, 
                    {"source": "Fluoxetina", "target": "Diclofenaco", "count": 1}, 
                    {"source": "Levamisol", "target": "Diclofenaco", "count": 1}, 
                    {"source": "Levamisol", "target": "Paracetamol", "count": 1}, 
                    {"source": "Cocaetileno", "target": "Diclofenaco", "count": 1}, 
                    {"source": "Cocaetileno", "target": "Paracetamol", "count": 1}, 
                    {"source": "Cocaetileno", "target": "Risperidona", "count": 1}, 
                    {"source": "Aeme (crack)", "target": "Diclofenaco", "count": 1}, 
                    {"source": "Aeme (crack)", "target": "Paracetamol", "count": 1}, 
                    {"source": "Aeme (crack)", "target": "Risperidona", "count": 1}, 
                    {"source": "Aeme (crack)", "target": "Haloperidol", "count": 1}, 
                    {"source": "Cocaína", "target": "Paracetamol", "count": 1}, 
                    {"source": "Ácido valpróico", "target": "Ibuprofeno", "count": 1}, 
                    {"source": "Quetiapina", "target": "Ibuprofeno", "count": 1}, 
                    {"source": "Bupropiona", "target": "Ibuprofeno", "count": 1}, 
                    {"source": "Bupropiona", "target": "Ácido valpróico", "count": 1}, 
                    {"source": "Midazolam", "target": "Ibuprofeno", "count": 1}, 
                    {"source": "Fentanil", "target": "Ibuprofeno", "count": 1}, 
                    {"source": "Fentanil", "target": "Ácido valpróico", "count": 1}, 
                    {"source": "Haloperidol", "target": "Brodifacoum", "count": 1}, 
                    {"source": "Amitriptlina", "target": "Brodifacoum", "count": 1}, 
                    {"source": "Amitriptlina", "target": "Haloperidol", "count": 1}, 
                    {"source": "Prometazina", "target": "Brodifacoum", "count": 1}, 
                    {"source": "Clorpromazina", "target": "Quetiapina", "count": 1}, 
                    {"source": "Sertralina", "target": "Clorpromazina", "count": 1}, 
                    {"source": "Zolpidem", "target": "Risperidona", "count": 1}, 
                    {"source": "Zolpidem", "target": "Levomepromazina", "count": 1}, 
                    {"source": "Zolpidem", "target": "Fluoxetina", "count": 1}, 
                    {"source": "Carboxi-thc*", "target": "Risperidona", "count": 1}, 
                    {"source": "Carboxi-thc*", "target": "Zolpidem", "count": 1}, 
                    {"source": "Etanol", "target": "Sertralina", "count": 1}, 
                    {"source": "Levomepromazina", "target": "Ácido valpróico", "count": 1}, 
                    {"source": "Fluoxetina", "target": "Ácido valpróico", "count": 1}, 
                    {"source": "Citalopram", "target": "Lamotrigina", "count": 1}, 
                    {"source": "Levamisol", "target": "Lamotrigina", "count": 1}, 
                    {"source": "Levamisol", "target": "Quetiapina", "count": 1}, 
                    {"source": "Cocaetileno", "target": "Lamotrigina", "count": 1}, 
                    {"source": "Cocaetileno", "target": "Quetiapina", "count": 1}, 
                    {"source": "Aeme (crack)", "target": "Lamotrigina", "count": 1}, 
                    {"source": "Aeme (crack)", "target": "Quetiapina", "count": 1}, 
                    {"source": "Cocaína", "target": "Lamotrigina", "count": 1}, 
                    {"source": "Cocaína", "target": "Quetiapina", "count": 1}, 
                    {"source": "Venlafaxina", "target": "Lamotrigina", "count": 1}, 
                    {"source": "Clonazepam", "target": "Lamotrigina", "count": 1}, 
                    {"source": "Tramadol", "target": "Brodifacoum", "count": 1}, 
                    {"source": "Tramadol", "target": "Sertralina", "count": 1}, 
                    {"source": "Tramadol", "target": "Clonazepam", "count": 1}, 
                    {"source": "Bromazepam", "target": "Venlafaxina", "count": 1}, 
                    {"source": "Bromazepam", "target": "Alprazolam", "count": 1}, 
                    {"source": "Tramadol", "target": "Dipirona", "count": 1}, 
                    {"source": "Tramadol", "target": "Midazolam", "count": 1}, 
                    {"source": "Tramadol", "target": "Fentanil", "count": 1}, 
                    {"source": "Morfina", "target": "Dipirona", "count": 1}, 
                    {"source": "Morfina", "target": "Fentanil", "count": 1}, 
                    {"source": "Morfina", "target": "Tramadol", "count": 1}, 
                    {"source": "Levamisol", "target": "Sertralina", "count": 1}, 
                    {"source": "Cocaína", "target": "Sertralina", "count": 1}, 
                    {"source": "Diazepam", "target": "Clozapina", "count": 1}, 
                    {"source": "Topiramato", "target": "Carbamazepina", "count": 1}, 
                    {"source": "Risperidona", "target": "Topiramato", "count": 1}, 
                    {"source": "Levomepromazina", "target": "Carbamazepina", "count": 1}, 
                    {"source": "Levomepromazina", "target": "Topiramato", "count": 1}, 
                    {"source": "Haloperidol", "target": "Topiramato", "count": 1}, 
                    {"source": "Bupropiona", "target": "Carbamazepina", "count": 1}, 
                    {"source": "Bupropiona", "target": "Haloperidol", "count": 1}, 
                    {"source": "Sertralina", "target": "Topiramato", "count": 1}, 
                    {"source": "Prometazina", "target": "Carbamazepina", "count": 1}, 
                    {"source": "Diazepam", "target": "Carbamazepina", "count": 1}, 
                    {"source": "Clonazepam", "target": "Topiramato", "count": 1}, 
                    {"source": "Quetiapina", "target": "Olanzapina", "count": 1}, 
                    {"source": "Levomepromazina", "target": "Quetiapina", "count": 1}, 
                    {"source": "Ácido acetilsalicílico", "target": "Paracetamol", "count": 1}, 
                    {"source": "Ácido acetilsalicílico", "target": "Dipirona", "count": 1}, 
                    {"source": "Ácido valpróico", "target": "Paracetamol", "count": 1}, 
                    {"source": "Ácido valpróico", "target": "Ácido acetilsalicílico", "count": 1}, 
                    {"source": "Pregabalina", "target": "Paracetamol", "count": 1}, 
                    {"source": "Haloperidol", "target": "Pregabalina", "count": 1}, 
                    {"source": "Venlafaxina", "target": "Pregabalina", "count": 1}, 
                    {"source": "Prometazina", "target": "Pregabalina", "count": 1}, 
                    {"source": "Clobazam", "target": "Paracetamol", "count": 1}, 
                    {"source": "Clobazam", "target": "Pregabalina", "count": 1}, 
                    {"source": "Clobazam", "target": "Haloperidol", "count": 1}, 
                    {"source": "Clobazam", "target": "Venlafaxina", "count": 1}, 
                    {"source": "Clobazam", "target": "Prometazina", "count": 1}, 
                    {"source": "Diazepam", "target": "Pregabalina", "count": 1}, 
                    {"source": "Clonazepam", "target": "Clobazam", "count": 1}, 
                    {"source": "Diazepam", "target": "Paroxetina", "count": 1}, 
                    {"source": "Dipirona", "target": "Ibuprofeno", "count": 1}, 
                    {"source": "Topiramato", "target": "Diclofenaco", "count": 1}, 
                    {"source": "Bupropiona", "target": "Diclofenaco", "count": 1}, 
                    {"source": "Bupropiona", "target": "Paracetamol", "count": 1}, 
                    {"source": "Bupropiona", "target": "Dipirona", "count": 1}, 
                    {"source": "Venlafaxina", "target": "Diclofenaco", "count": 1}, 
                    {"source": "Venlafaxina", "target": "Topiramato", "count": 1}, 
                    {"source": "Venlafaxina", "target": "Bupropiona", "count": 1}, 
                    {"source": "Midazolam", "target": "Carbamazepina", "count": 1}, 
                    {"source": "Fentanil", "target": "Carbamazepina", "count": 1}, 
                    {"source": "Clomipramina", "target": "Sertralina", "count": 1}, 
                    {"source": "Clomipramina", "target": "Imipramina", "count": 1}, 
                    {"source": "Metilfenidato", "target": "Dipirona", "count": 1}, 
                    {"source": "Metilfenidato", "target": "Sertralina", "count": 1}, 
                    {"source": "Metilfenidato", "target": "Imipramina", "count": 1}, 
                    {"source": "Metilfenidato", "target": "Clomipramina", "count": 1}, 
                    {"source": "Metilfenidato", "target": "Clonazepam", "count": 1}, 
                    {"source": "Citalopram", "target": "Clorpromazina", "count": 1}, 
                    {"source": "Amitriptlina", "target": "Clorpromazina", "count": 1}, 
                    {"source": "Amitriptlina", "target": "Citalopram", "count": 1}, 
                    {"source": "Etanol", "target": "Brodifacoum", "count": 1}, 
                    {"source": "Cocaetileno", "target": "Brodifacoum", "count": 1}, 
                    {"source": "Cocaína", "target": "Brodifacoum", "count": 1}, 
                    {"source": "Aldicarbe", "target": "Dipirona", "count": 1}, 
                    {"source": "Sibutramina", "target": "Haloperidol", "count": 1}, 
                    {"source": "Sibutramina", "target": "Prometazina", "count": 1}, 
                    {"source": "Sibutramina", "target": "Midazolam", "count": 1}, 
                    {"source": "Morfina", "target": "Haloperidol", "count": 1}, 
                    {"source": "Morfina", "target": "Prometazina", "count": 1}, 
                    {"source": "Morfina", "target": "Clonazepam", "count": 1}, 
                    {"source": "Morfina", "target": "Sibutramina", "count": 1}, 
                    {"source": "Carboxi-thc*", "target": "Sibutramina", "count": 1}, 
                    {"source": "Carboxi-thc*", "target": "Morfina", "count": 1}, 
                    {"source": "Levamisol", "target": "Sibutramina", "count": 1}, 
                    {"source": "Levamisol", "target": "Morfina", "count": 1}, 
                    {"source": "Cocaetileno", "target": "Sibutramina", "count": 1}, 
                    {"source": "Cocaetileno", "target": "Morfina", "count": 1}, 
                    {"source": "Cocaína", "target": "Sibutramina", "count": 1}, 
                    {"source": "Cocaína", "target": "Morfina", "count": 1}, 
                    {"source": "Etanol", "target": "Alprazolam", "count": 1}, 
                    {"source": "Prometazina", "target": "Ácido valpróico", "count": 1}, 
                    {"source": "Diazepam", "target": "Ácido valpróico", "count": 1}, 
                    {"source": "Carboxi-thc*", "target": "Ácido valpróico", "count": 1}, 
                    {"source": "Imipramina", "target": "Diclofenaco", "count": 1}, 
                    {"source": "Imipramina", "target": "Paracetamol", "count": 1}, 
                    {"source": "Diazepam", "target": "Imipramina", "count": 1}, 
                    {"source": "Nitrazepam", "target": "Diclofenaco", "count": 1}, 
                    {"source": "Nitrazepam", "target": "Paracetamol", "count": 1}, 
                    {"source": "Nitrazepam", "target": "Dipirona", "count": 1}, 
                    {"source": "Nitrazepam", "target": "Sertralina", "count": 1}, 
                    {"source": "Nitrazepam", "target": "Imipramina", "count": 1}, 
                    {"source": "Nitrazepam", "target": "Prometazina", "count": 1}, 
                    {"source": "Nitrazepam", "target": "Midazolam", "count": 1}, 
                    {"source": "Nitrazepam", "target": "Diazepam", "count": 1}, 
                    {"source": "Clonazepam", "target": "Nitrazepam", "count": 1}, 
                    {"source": "Sibutramina", "target": "Amitriptlina", "count": 1}, 
                    {"source": "Sibutramina", "target": "Diazepam", "count": 1}, 
                    {"source": "Fluoxetina", "target": "Venlafaxina", "count": 1}, 
                    {"source": "Prometazina", "target": "Clomipramina", "count": 1}, 
                    {"source": "Midazolam", "target": "Clomipramina", "count": 1}, 
                    {"source": "Etanol", "target": "Clomipramina", "count": 1}, 
                    {"source": "Haloperidol", "target": "Ibuprofeno", "count": 1}, 
                    {"source": "Risperidona", "target": "Olanzapina", "count": 1}, 
                    {"source": "Mirtazapina", "target": "Diclofenaco", "count": 1}, 
                    {"source": "Mirtazapina", "target": "Dipirona", "count": 1}, 
                    {"source": "Mirtazapina", "target": "Sertralina", "count": 1}, 
                    {"source": "Amitriptlina", "target": "Mirtazapina", "count": 1}, 
                    {"source": "Midazolam", "target": "Mirtazapina", "count": 1}, 
                    {"source": "Clonazepam", "target": "Mirtazapina", "count": 1}, 
                    {"source": "Fentanil", "target": "Diclofenaco", "count": 1}, 
                    {"source": "Fentanil", "target": "Sertralina", "count": 1}, 
                    {"source": "Olanzapina", "target": "Ibuprofeno", "count": 1}, 
                    {"source": "Citalopram", "target": "Ibuprofeno", "count": 1}, 
                    {"source": "Citalopram", "target": "Levomepromazina", "count": 1}, 
                    {"source": "Carboxi-thc*", "target": "Ibuprofeno", "count": 1}, 
                    {"source": "Gabapentina", "target": "Carbamazepina", "count": 1}, 
                    {"source": "Pregabalina", "target": "Carbamazepina", "count": 1}, 
                    {"source": "Pregabalina", "target": "Gabapentina", "count": 1}, 
                    {"source": "Sertralina", "target": "Gabapentina", "count": 1}, 
                    {"source": "Sertralina", "target": "Pregabalina", "count": 1}, 
                    {"source": "Imipramina", "target": "Carbamazepina", "count": 1}, 
                    {"source": "Imipramina", "target": "Gabapentina", "count": 1}, 
                    {"source": "Imipramina", "target": "Pregabalina", "count": 1}, 
                    {"source": "Clonazepam", "target": "Gabapentina", "count": 1}, 
                    {"source": "Fentanil", "target": "Olanzapina", "count": 1}, 
                    {"source": "Levomepromazina", "target": "Diclofenaco", "count": 1}, 
                    {"source": "Levomepromazina", "target": "Paracetamol", "count": 1}, 
                    {"source": "Fenobarbital", "target": "Dipirona", "count": 1}, 
                    {"source": "Risperidona", "target": "Fenobarbital", "count": 1}, 
                    {"source": "Quetiapina", "target": "Fenitoína", "count": 1}, 
                    {"source": "Haloperidol", "target": "Fenitoína", "count": 1}, 
                    {"source": "Venlafaxina", "target": "Fenitoína", "count": 1}, 
                    {"source": "Midazolam", "target": "Fenitoína", "count": 1}, 
                    {"source": "Diazepam", "target": "Fenitoína", "count": 1}, 
                    {"source": "Metadona", "target": "Fenitoína", "count": 1}, 
                    {"source": "Metadona", "target": "Quetiapina", "count": 1}, 
                    {"source": "Metadona", "target": "Haloperidol", "count": 1}, 
                    {"source": "Metadona", "target": "Venlafaxina", "count": 1}, 
                    {"source": "Fentanil", "target": "Fenitoína", "count": 1}, 
                    {"source": "Lamotrigina", "target": "Dipirona", "count": 1}, 
                    {"source": "Fluoxetina", "target": "Lamotrigina", "count": 1}, 
                    {"source": "Clobazam", "target": "Dipirona", "count": 1}, 
                    {"source": "Clobazam", "target": "Lamotrigina", "count": 1}, 
                    {"source": "Clobazam", "target": "Fluoxetina", "count": 1}, 
                    {"source": "Diazepam", "target": "Lamotrigina", "count": 1}, 
                    {"source": "Bromazepam", "target": "Diazepam", "count": 2}, 
                    {"source": "Aeme (crack)", "target": "Midazolam", "count": 2}, 
                    {"source": "Aeme (crack)", "target": "Fentanil", "count": 2}, 
                    {"source": "Cocaína", "target": "Fentanil", "count": 2}, 
                    {"source": "Aeme (crack)", "target": "Diazepam", "count": 2}, 
                    {"source": "Midazolam", "target": "Clorpromazina", "count": 2}, 
                    {"source": "Cocaetileno", "target": "Clorpromazina", "count": 2}, 
                    {"source": "Cocaína", "target": "Clorpromazina", "count": 2}, 
                    {"source": "Amitriptlina", "target": "Fluoxetina", "count": 2}, 
                    {"source": "Etanol", "target": "Fentanil", "count": 2}, 
                    {"source": "Midazolam", "target": "Levomepromazina", "count": 2}, 
                    {"source": "Zolpidem", "target": "Citalopram", "count": 2}, 
                    {"source": "Diazepam", "target": "Zolpidem", "count": 2}, 
                    {"source": "Alprazolam", "target": "Citalopram", "count": 2}, 
                    {"source": "Amitriptlina", "target": "Quetiapina", "count": 2}, 
                    {"source": "Amitriptlina", "target": "Bupropiona", "count": 2}, 
                    {"source": "Carbamazepina", "target": "Paracetamol", "count": 2}, 
                    {"source": "Cocaetileno", "target": "Aldicarbe", "count": 2}, 
                    {"source": "Cocaína", "target": "Aldicarbe", "count": 2}, 
                    {"source": "Bromazepam", "target": "Fluoxetina", "count": 2}, 
                    {"source": "Cocaína", "target": "Diclofenaco", "count": 2}, 
                    {"source": "Bupropiona", "target": "Quetiapina", "count": 2}, 
                    {"source": "Clonazepam", "target": "Zolpidem", "count": 2}, 
                    {"source": "Fluoxetina", "target": "Haloperidol", "count": 2}, 
                    {"source": "Aeme (crack)", "target": "Citalopram", "count": 2}, 
                    {"source": "Quetiapina", "target": "Lamotrigina", "count": 2}, 
                    {"source": "Sertralina", "target": "Brodifacoum", "count": 2}, 
                    {"source": "Clonazepam", "target": "Brodifacoum", "count": 2}, 
                    {"source": "Carboxi-thc*", "target": "Fentanil", "count": 2}, 
                    {"source": "Alprazolam", "target": "Quetiapina", "count": 2}, 
                    {"source": "Bromazepam", "target": "Midazolam", "count": 2}, 
                    {"source": "Fentanil", "target": "Bromazepam", "count": 2}, 
                    {"source": "Levamisol", "target": "Amitriptlina", "count": 2}, 
                    {"source": "Cocaetileno", "target": "Amitriptlina", "count": 2}, 
                    {"source": "Cocaína", "target": "Amitriptlina", "count": 2}, 
                    {"source": "Fluoxetina", "target": "Citalopram", "count": 2}, 
                    {"source": "Fluoxetina", "target": "Sertralina", "count": 2}, 
                    {"source": "Levamisol", "target": "Risperidona", "count": 2}, 
                    {"source": "Levamisol", "target": "Bupropiona", "count": 2}, 
                    {"source": "Cocaína", "target": "Risperidona", "count": 2}, 
                    {"source": "Cocaína", "target": "Bupropiona", "count": 2}, 
                    {"source": "Risperidona", "target": "Carbamazepina", "count": 2}, 
                    {"source": "Levomepromazina", "target": "Risperidona", "count": 2}, 
                    {"source": "Haloperidol", "target": "Carbamazepina", "count": 2}, 
                    {"source": "Bupropiona", "target": "Risperidona", "count": 2}, 
                    {"source": "Bupropiona", "target": "Levomepromazina", "count": 2}, 
                    {"source": "Prometazina", "target": "Risperidona", "count": 2}, 
                    {"source": "Etanol", "target": "Diclofenaco", "count": 2}, 
                    {"source": "Topiramato", "target": "Paracetamol", "count": 2}, 
                    {"source": "Topiramato", "target": "Dipirona", "count": 2}, 
                    {"source": "Venlafaxina", "target": "Paracetamol", "count": 2}, 
                    {"source": "Diazepam", "target": "Topiramato", "count": 2}, 
                    {"source": "Clonazepam", "target": "Clorpromazina", "count": 2}, 
                    {"source": "Diazepam", "target": "Brodifacoum", "count": 2}, 
                    {"source": "Fluoxetina", "target": "Aldicarbe", "count": 2}, 
                    {"source": "Midazolam", "target": "Aldicarbe", "count": 2}, 
                    {"source": "Fentanil", "target": "Aldicarbe", "count": 2}, 
                    {"source": "Morfina", "target": "Midazolam", "count": 2}, 
                    {"source": "Alprazolam", "target": "Paracetamol", "count": 2}, 
                    {"source": "Ácido valpróico", "target": "Dipirona", "count": 2}, 
                    {"source": "Haloperidol", "target": "Ácido valpróico", "count": 2}, 
                    {"source": "Midazolam", "target": "Ácido valpróico", "count": 2}, 
                    {"source": "Carboxi-thc*", "target": "Quetiapina", "count": 2}, 
                    {"source": "Sertralina", "target": "Paracetamol", "count": 2}, 
                    {"source": "Imipramina", "target": "Dipirona", "count": 2}, 
                    {"source": "Prometazina", "target": "Diclofenaco", "count": 2}, 
                    {"source": "Prometazina", "target": "Imipramina", "count": 2}, 
                    {"source": "Midazolam", "target": "Paracetamol", "count": 2}, 
                    {"source": "Midazolam", "target": "Imipramina", "count": 2}, 
                    {"source": "Sibutramina", "target": "Clonazepam", "count": 2}, 
                    {"source": "Alprazolam", "target": "Venlafaxina", "count": 2}, 
                    {"source": "Alprazolam", "target": "Fluoxetina", "count": 2}, 
                    {"source": "Clonazepam", "target": "Alprazolam", "count": 2}, 
                    {"source": "Clomipramina", "target": "Haloperidol", "count": 2}, 
                    {"source": "Levomepromazina", "target": "Dipirona", "count": 2}, 
                    {"source": "Sertralina", "target": "Diclofenaco", "count": 2}, 
                    {"source": "Amitriptlina", "target": "Diclofenaco", "count": 2}, 
                    {"source": "Amitriptlina", "target": "Dipirona", "count": 2}, 
                    {"source": "Midazolam", "target": "Diclofenaco", "count": 2}, 
                    {"source": "Fentanil", "target": "Mirtazapina", "count": 2}, 
                    {"source": "Levomepromazina", "target": "Ibuprofeno", "count": 2}, 
                    {"source": "Citalopram", "target": "Olanzapina", "count": 2}, 
                    {"source": "Sertralina", "target": "Ibuprofeno", "count": 2}, 
                    {"source": "Sertralina", "target": "Olanzapina", "count": 2}, 
                    {"source": "Sertralina", "target": "Levomepromazina", "count": 2}, 
                    {"source": "Prometazina", "target": "Ibuprofeno", "count": 2}, 
                    {"source": "Carboxi-thc*", "target": "Olanzapina", "count": 2}, 
                    {"source": "Carboxi-thc*", "target": "Levomepromazina", "count": 2}, 
                    {"source": "Levamisol", "target": "Citalopram", "count": 2}, 
                    {"source": "Levamisol", "target": "Diazepam", "count": 2}, 
                    {"source": "Cocaetileno", "target": "Citalopram", "count": 2}, 
                    {"source": "Alprazolam", "target": "Midazolam", "count": 2}, 
                    {"source": "Clonazepam", "target": "Pregabalina", "count": 2}, 
                    {"source": "Carboxi-thc*", "target": "Etanol", "count": 2}, 
                    {"source": "Fluoxetina", "target": "Quetiapina", "count": 2}, 
                    {"source": "Midazolam", "target": "Olanzapina", "count": 2}, 
                    {"source": "Citalopram", "target": "Dipirona", "count": 2}, 
                    {"source": "Bromazepam", "target": "Dipirona", "count": 2}, 
                    {"source": "Metadona", "target": "Midazolam", "count": 2}, 
                    {"source": "Metadona", "target": "Diazepam", "count": 2}, 
                    {"source": "Fentanil", "target": "Venlafaxina", "count": 2}, 
                    {"source": "Fentanil", "target": "Metadona", "count": 2}, 
                    {"source": "Diazepam", "target": "Clobazam", "count": 2}, 
                    {"source": "Aeme (crack)", "target": "Clonazepam", "count": 3}, 
                    {"source": "Haloperidol", "target": "Clorpromazina", "count": 3}, 
                    {"source": "Etanol", "target": "Amitriptlina", "count": 3}, 
                    {"source": "Fentanil", "target": "Prometazina", "count": 3}, 
                    {"source": "Aeme (crack)", "target": "Carboxi-thc*", "count": 3}, 
                    {"source": "Aeme (crack)", "target": "Fluoxetina", "count": 3}, 
                    {"source": "Fentanil", "target": "Bupropiona", "count": 3}, 
                    {"source": "Clorpromazina", "target": "Dipirona", "count": 3}, 
                    {"source": "Fluoxetina", "target": "Risperidona", "count": 3}, 
                    {"source": "Fluoxetina", "target": "Levomepromazina", "count": 3}, 
                    {"source": "Fentanil", "target": "Citalopram", "count": 3}, 
                    {"source": "Sertralina", "target": "Bupropiona", "count": 3}, 
                    {"source": "Prometazina", "target": "Topiramato", "count": 3}, 
                    {"source": "Prometazina", "target": "Bupropiona", "count": 3}, 
                    {"source": "Bupropiona", "target": "Topiramato", "count": 3}, 
                    {"source": "Diazepam", "target": "Bupropiona", "count": 3}, 
                    {"source": "Prometazina", "target": "Clorpromazina", "count": 3}, 
                    {"source": "Etanol", "target": "Diazepam", "count": 3}, 
                    {"source": "Levamisol", "target": "Midazolam", "count": 3}, 
                    {"source": "Cocaetileno", "target": "Clonazepam", "count": 3}, 
                    {"source": "Quetiapina", "target": "Ácido valpróico", "count": 3}, 
                    {"source": "Diazepam", "target": "Amitriptlina", "count": 3}, 
                    {"source": "Venlafaxina", "target": "Dipirona", "count": 3}, 
                    {"source": "Prometazina", "target": "Venlafaxina", "count": 3}, 
                    {"source": "Alprazolam", "target": "Prometazina", "count": 3}, 
                    {"source": "Diazepam", "target": "Alprazolam", "count": 3}, 
                    {"source": "Clomipramina", "target": "Dipirona", "count": 3}, 
                    {"source": "Etanol", "target": "Midazolam", "count": 3}, 
                    {"source": "Levomepromazina", "target": "Olanzapina", "count": 3}, 
                    {"source": "Sertralina", "target": "Citalopram", "count": 3}, 
                    {"source": "Prometazina", "target": "Olanzapina", "count": 3}, 
                    {"source": "Citalopram", "target": "Haloperidol", "count": 3}, 
                    {"source": "Cocaetileno", "target": "Diazepam", "count": 3}, 
                    {"source": "Cocaína", "target": "Citalopram", "count": 3}, 
                    {"source": "Fentanil", "target": "Alprazolam", "count": 3}, 
                    {"source": "Sertralina", "target": "Carbamazepina", "count": 3}, 
                    {"source": "Imipramina", "target": "Sertralina", "count": 3}, 
                    {"source": "Carboxi-thc*", "target": "Fluoxetina", "count": 3}, 
                    {"source": "Levamisol", "target": "Fluoxetina", "count": 3}, 
                    {"source": "Levamisol", "target": "Etanol", "count": 3}, 
                    {"source": "Cocaetileno", "target": "Fluoxetina", "count": 3}, 
                    {"source": "Olanzapina", "target": "Dipirona", "count": 3}, 
                    {"source": "Diazepam", "target": "Olanzapina", "count": 3}, 
                    {"source": "Bromazepam", "target": "Quetiapina", "count": 3}, 
                    {"source": "Bromazepam", "target": "Citalopram", "count": 3}, 
                    {"source": "Venlafaxina", "target": "Quetiapina", "count": 3}, 
                    {"source": "Midazolam", "target": "Venlafaxina", "count": 3}, 
                    {"source": "Fentanil", "target": "Haloperidol", "count": 3}, 
                    {"source": "Midazolam", "target": "Bupropiona", "count": 4}, 
                    {"source": "Aeme (crack)", "target": "Dipirona", "count": 4}, 
                    {"source": "Fluoxetina", "target": "Paracetamol", "count": 4}, 
                    {"source": "Prometazina", "target": "Amitriptlina", "count": 4}, 
                    {"source": "Levamisol", "target": "Clonazepam", "count": 4}, 
                    {"source": "Cocaetileno", "target": "Midazolam", "count": 4}, 
                    {"source": "Clonazepam", "target": "Ácido valpróico", "count": 4}, 
                    {"source": "Prometazina", "target": "Paracetamol", "count": 4}, 
                    {"source": "Alprazolam", "target": "Dipirona", "count": 4}, 
                    {"source": "Clonazepam", "target": "Venlafaxina", "count": 4}, 
                    {"source": "Clonazepam", "target": "Clomipramina", "count": 4}, 
                    {"source": "Amitriptlina", "target": "Sertralina", "count": 4}, 
                    {"source": "Midazolam", "target": "Sertralina", "count": 4}, 
                    {"source": "Midazolam", "target": "Amitriptlina", "count": 4}, 
                    {"source": "Fentanil", "target": "Amitriptlina", "count": 4}, 
                    {"source": "Clonazepam", "target": "Ibuprofeno", "count": 4}, 
                    {"source": "Carboxi-thc*", "target": "Sertralina", "count": 4}, 
                    {"source": "Prometazina", "target": "Citalopram", "count": 4}, 
                    {"source": "Levamisol", "target": "Prometazina", "count": 4}, 
                    {"source": "Clonazepam", "target": "Carbamazepina", "count": 4}, 
                    {"source": "Clonazepam", "target": "Imipramina", "count": 4}, 
                    {"source": "Levamisol", "target": "Carboxi-thc*", "count": 4}, 
                    {"source": "Cocaetileno", "target": "Etanol", "count": 4}, 
                    {"source": "Cocaetileno", "target": "Carboxi-thc*", "count": 4}, 
                    {"source": "Cocaína", "target": "Fluoxetina", "count": 4}, 
                    {"source": "Haloperidol", "target": "Diclofenaco", "count": 4}, 
                    {"source": "Diazepam", "target": "Diclofenaco", "count": 4}, 
                    {"source": "Diazepam", "target": "Levomepromazina", "count": 4}, 
                    {"source": "Clonazepam", "target": "Diclofenaco", "count": 4}, 
                    {"source": "Risperidona", "target": "Dipirona", "count": 4}, 
                    {"source": "Citalopram", "target": "Quetiapina", "count": 4}, 
                    {"source": "Haloperidol", "target": "Quetiapina", "count": 4}, 
                    {"source": "Venlafaxina", "target": "Haloperidol", "count": 4}, 
                    {"source": "Diazepam", "target": "Quetiapina", "count": 4}, 
                    {"source": "Aeme (crack)", "target": "Cocaetileno", "count": 5}, 
                    {"source": "Haloperidol", "target": "Risperidona", "count": 5}, 
                    {"source": "Diazepam", "target": "Risperidona", "count": 5}, 
                    {"source": "Etanol", "target": "Prometazina", "count": 5}, 
                    {"source": "Midazolam", "target": "Fluoxetina", "count": 5}, 
                    {"source": "Fentanil", "target": "Fluoxetina", "count": 5}, 
                    {"source": "Etanol", "target": "Paracetamol", "count": 5}, 
                    {"source": "Etanol", "target": "Dipirona", "count": 5}, 
                    {"source": "Etanol", "target": "Haloperidol", "count": 5}, 
                    {"source": "Dipirona", "target": "Diclofenaco", "count": 5}, 
                    {"source": "Carboxi-thc*", "target": "Citalopram", "count": 5}, 
                    {"source": "Levamisol", "target": "Haloperidol", "count": 5}, 
                    {"source": "Cocaetileno", "target": "Prometazina", "count": 5}, 
                    {"source": "Cocaína", "target": "Etanol", "count": 5}, 
                    {"source": "Levamisol", "target": "Dipirona", "count": 5}, 
                    {"source": "Haloperidol", "target": "Paracetamol", "count": 5}, 
                    {"source": "Haloperidol", "target": "Levomepromazina", "count": 5}, 
                    {"source": "Midazolam", "target": "Quetiapina", "count": 5}, 
                    {"source": "Diazepam", "target": "Venlafaxina", "count": 5}, 
                    {"source": "Quetiapina", "target": "Dipirona", "count": 5}, 
                    {"source": "Sertralina", "target": "Quetiapina", "count": 5}, 
                    {"source": "Aeme (crack)", "target": "Levamisol", "count": 6}, 
                    {"source": "Sertralina", "target": "Haloperidol", "count": 6}, 
                    {"source": "Clonazepam", "target": "Bupropiona", "count": 6}, 
                    {"source": "Carboxi-thc*", "target": "Dipirona", "count": 6}, 
                    {"source": "Carboxi-thc*", "target": "Haloperidol", "count": 6}, 
                    {"source": "Carboxi-thc*", "target": "Midazolam", "count": 6}, 
                    {"source": "Carboxi-thc*", "target": "Diazepam", "count": 6}, 
                    {"source": "Prometazina", "target": "Levomepromazina", "count": 6}, 
                    {"source": "Diazepam", "target": "Citalopram", "count": 6}, 
                    {"source": "Cocaetileno", "target": "Haloperidol", "count": 6}, 
                    {"source": "Etanol", "target": "Fluoxetina", "count": 6}, 
                    {"source": "Cocaetileno", "target": "Dipirona", "count": 6}, 
                    {"source": "Prometazina", "target": "Fluoxetina", "count": 6}, 
                    {"source": "Cocaína", "target": "Prometazina", "count": 6}, 
                    {"source": "Cocaína", "target": "Midazolam", "count": 6}, 
                    {"source": "Clonazepam", "target": "Olanzapina", "count": 6}, 
                    {"source": "Diazepam", "target": "Paracetamol", "count": 6}, 
                    {"source": "Fentanil", "target": "Quetiapina", "count": 6}, 
                    {"source": "Sertralina", "target": "Risperidona", "count": 7}, 
                    {"source": "Clonazepam", "target": "Amitriptlina", "count": 7}, 
                    {"source": "Carboxi-thc*", "target": "Prometazina", "count": 7}, 
                    {"source": "Prometazina", "target": "Quetiapina", "count": 7}, 
                    {"source": "Fentanil", "target": "Dipirona", "count": 7}, 
                    {"source": "Fentanil", "target": "Diazepam", "count": 7}, 
                    {"source": "Diazepam", "target": "Fluoxetina", "count": 7}, 
                    {"source": "Cocaína", "target": "Aeme (crack)", "count": 8}, 
                    {"source": "Clonazepam", "target": "Risperidona", "count": 8}, 
                    {"source": "Cocaína", "target": "Carboxi-thc*", "count": 8}, 
                    {"source": "Cocaína", "target": "Haloperidol", "count": 8}, 
                    {"source": "Cocaína", "target": "Diazepam", "count": 8}, 
                    {"source": "Cocaína", "target": "Clonazepam", "count": 8}, 
                    {"source": "Fentanil", "target": "Clonazepam", "count": 8}, 
                    {"source": "Paracetamol", "target": "Diclofenaco", "count": 8}, 
                    {"source": "Fluoxetina", "target": "Dipirona", "count": 8}, 
                    {"source": "Etanol", "target": "Clonazepam", "count": 9}, 
                    {"source": "Clonazepam", "target": "Citalopram", "count": 9}, 
                    {"source": "Cocaína", "target": "Dipirona", "count": 9}, 
                    {"source": "Clonazepam", "target": "Paracetamol", "count": 9}, 
                    {"source": "Sertralina", "target": "Dipirona", "count": 9}, 
                    {"source": "Dipirona", "target": "Paracetamol", "count": 10}, 
                    {"source": "Prometazina", "target": "Sertralina", "count": 10}, 
                    {"source": "Midazolam", "target": "Prometazina", "count": 10}, 
                    {"source": "Clonazepam", "target": "Levomepromazina", "count": 10}, 
                    {"source": "Midazolam", "target": "Haloperidol", "count": 10}, 
                    {"source": "Diazepam", "target": "Sertralina", "count": 11}, 
                    {"source": "Carboxi-thc*", "target": "Clonazepam", "count": 11}, 
                    {"source": "Cocaetileno", "target": "Levamisol", "count": 12}, 
                    {"source": "Prometazina", "target": "Dipirona", "count": 12}, 
                    {"source": "Clonazepam", "target": "Fluoxetina", "count": 12}, 
                    {"source": "Clonazepam", "target": "Quetiapina", "count": 12}, 
                    {"source": "Haloperidol", "target": "Dipirona", "count": 13}, 
                    {"source": "Midazolam", "target": "Dipirona", "count": 13}, 
                    {"source": "Diazepam", "target": "Midazolam", "count": 13}, 
                    {"source": "Cocaína", "target": "Levamisol", "count": 14}, 
                    {"source": "Cocaína", "target": "Cocaetileno", "count": 15}, 
                    {"source": "Diazepam", "target": "Prometazina", "count": 15}, 
                    {"source": "Clonazepam", "target": "Midazolam", "count": 15}, 
                    {"source": "Diazepam", "target": "Dipirona", "count": 15}, 
                    {"source": "Diazepam", "target": "Haloperidol", "count": 16}, 
                    {"source": "Fentanil", "target": "Midazolam", "count": 18}, 
                    {"source": "Prometazina", "target": "Haloperidol", "count": 20}, 
                    {"source": "Clonazepam", "target": "Haloperidol", "count": 21}, 
                    {"source": "Clonazepam", "target": "Prometazina", "count": 24}, 
                    {"source": "Clonazepam", "target": "Diazepam", "count": 25}, 
                    {"source": "Clonazepam", "target": "Dipirona", "count": 27}, 
                    {"source": "Clonazepam", "target": "Sertralina", "count": 28} 
                    ];
var nodes_data = [{"name": "Imipramina", "degree": 25, "total": 19},
                    {"name": "Efedrina", "degree": 3, "total": 1},
                    {"name": "Diazepam", "degree": 45, "total": 31},
                    {"name": "Sertralina", "degree": 37, "total": 28},
                    {"name": "Clorpromazina", "degree": 14, "total": 12},
                    {"name": "Levamisol", "degree": 30, "total": 23},
                    {"name": "Dipirona", "degree": 45, "total": 31},
                    {"name": "Cocaetileno", "degree": 29, "total": 22},
                    {"name": "Lamotrigina", "degree": 12, "total": 10},
                    {"name": "Etanol", "degree": 29, "total": 22},
                    {"name": "Fenobarbital", "degree": 3, "total": 1},
                    {"name": "Venlafaxina", "degree": 25, "total": 19},
                    {"name": "Diclofenaco", "degree": 25, "total": 19},
                    {"name": "Aldicarbe", "degree": 15, "total": 13},
                    {"name": "Ibuprofeno", "degree": 18, "total": 16},
                    {"name": "Amitriptlina", "degree": 28, "total": 21},
                    {"name": "Nitrazepam", "degree": 9, "total": 7},
                    {"name": "Morfina", "degree": 15, "total": 13},
                    {"name": "Lorazepam", "degree": 6, "total": 4},
                    {"name": "Bromazepam", "degree": 14, "total": 12},
                    {"name": "Metadona", "degree": 7, "total": 5},
                    {"name": "Midazolam", "degree": 42, "total": 30},
                    {"name": "Prometazina", "degree": 42, "total": 30},
                    {"name": "Topiramato", "degree": 15, "total": 13},
                    {"name": "Clonazepam", "degree": 50, "total": 32},
                    {"name": "Zolpidem", "degree": 10, "total": 8},
                    {"name": "Cocaína", "degree": 32, "total": 25},
                    {"name": "Metilfenidato", "degree": 5, "total": 3},
                    {"name": "Nortriptlina", "degree": 9, "total": 7},
                    {"name": "Fluoxetina", "degree": 32, "total": 25},
                    {"name": "Aeme (crack)", "degree": 27, "total": 20},
                    {"name": "Codeina", "degree": 3, "total": 1},
                    {"name": "Fenitoína", "degree": 7, "total": 5},
                    {"name": "Risperidona", "degree": 24, "total": 18},
                    {"name": "Olanzapina", "degree": 17, "total": 15},
                    {"name": "Ácido acetilsalicílico", "degree": 3, "total": 1},
                    {"name": "Carboxi-thc*", "degree": 28, "total": 21},
                    {"name": "Fentanil", "degree": 36, "total": 27},
                    {"name": "Mirtazapina", "degree": 13, "total": 11},
                    {"name": "Tramadol", "degree": 7, "total": 5},
                    {"name": "Alprazolam", "degree": 19, "total": 17},
                    {"name": "Levomepromazina", "degree": 32, "total": 25},
                    {"name": "Bromadiolone", "degree": 3, "total": 1},
                    {"name": "Brodifacoum", "degree": 11, "total": 9},
                    {"name": "Sibutramina", "degree": 11, "total": 9},
                    {"name": "Bupropiona", "degree": 31, "total": 24},
                    {"name": "Clomipramina", "degree": 13, "total": 11},
                    {"name": "Haloperidol", "degree": 41, "total": 29},
                    {"name": "Clobazam", "degree": 10, "total": 8},
                    {"name": "Ácido valpróico", "degree": 16, "total": 14},
                    {"name": "Pregabalina", "degree": 11, "total": 9},
                    {"name": "Gabapentina", "degree": 8, "total": 6},
                    {"name": "Paroxetina", "degree": 1, "total": 0},
                    {"name": "Cetamina", "degree": 4, "total": 2},
                    {"name": "Clozapina", "degree": 1, "total": 0},
                    {"name": "Paracetamol", "degree": 34, "total": 26},
                    {"name": "Quetiapina", "degree": 30, "total": 23},
                    {"name": "Carbamazepina", "degree": 19, "total": 17},
                    {"name": "Citalopram", "degree": 27, "total": 20}
                    ];

var nodeSizeScale = d3.scaleLinear()
  .domain(d3.extent(nodes_data, d => d.total))
  .range([1, 50]);

var linkSizeScale = d3.scaleLinear()
  .domain(d3.extent(links_data, d => d.count))
  .range([1, 28]);

var linkColourScale = d3.scaleSequential()
  .domain(d3.extent(links_data, d => d.count))
  .interpolator(d3.interpolateOranges);

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

var tooltipNetwork = d3.select("#rede_urina").append("div")
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