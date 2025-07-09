export interface DetailsResponse{
    ok:boolean;
    result:DetailsData[]
}

export interface DetailsData{
    data_pagamento: string;
    id_pagamento: number;
    id_verbale: number;
    importo: number;
    importo_pagato: number;
    rimborso: number;
    spesecomando: number;
    spesepostali: number;
    speseprocedura: number;
    stato:  string;
    tipo: string;
    temp_importo?:number;
    temp_importo_pagato?:number;
    temp_rimborso?:number;
    temp_spesecomando?:number;
    temp_spesepostali?:number;
    temp_speseprocedura?:number;
}

export interface TempInfoResponse{
    ok:boolean;
    result:TempInfoData[]
}

export interface TempInfoData{
    id: number;
    id_verbale: number;
    id_pagamento: number;
    stato_verbale: string;
    importo_pagato: number;
    data_pagamento: string;
    tipo_importo: string;
    importo_sanzione: number;
    spese_procedura: number;
    spese_postali: number;
    spese_comando: number;
    da_rimborsare: number;
}