
export interface Earning {
    _id: string
    ACTIVIDADES: number
    INMUEBLES: number
    TASAS: number
    VEHICULOS: number
    user: string
    date: Date
}


export interface ExcelDataEarning {
    ACTIVIDADES: number
    INMUEBLES: number
    TASAS: number
    VEHICULOS: number
    FECHA: Date

}

export interface GroupedEarning {
    lastRecord: {
        _id: string,
        user: string,
        date: string
    }
    earning: {
        _id?: null;
        ACTIVIDADES: number;
        TASAS: number;
        VEHICULOS: number;
        INMUEBLES: number;
    };
    projection: Projection;
}

export interface Projection {
    _id: string;
    months: {
        ACTIVIDADES: number;
        TASAS: number;
        VEHICULOS: number;
        INMUEBLES: number;
    }[];
    year: number;
}

export interface ComparisonEarningData {
    _id: number;
    ACTIVIDADES: number;
    VEHICULOS: number;
    INMUEBLES: number;
    TASAS: number;
}


