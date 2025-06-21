export interface ReportResponseModel{
    ok:boolean,
    result:SummaryData[]
}

export interface SummaryData{
    id:number;
    ente_id:number;
    rifcomune:string;
    totale_importo:number;
    num_verbali:number;
    fissoinserito?:number,
    fissospedito?:number,
    percsanzione?:number,
    fissoresponsabile?:number,
    rendicontatoperc?:number, 
    tot_pagati:number,
    tot_da_pagare:number,
    tot_rimborso:number
}