export interface ReportResponseModel{
    ok:boolean,
    result:SummaryData[]
}

export interface SummaryData{
    id:number;
    rifcomune:string;
    totale_importo:number;
    num_verbali:number;
    fissoinserito?:number,
    fissospedito?:number,
    percsanzione?:number,
    fissoresponsabile?:number,
    rendicontatoperc?:number, 
}