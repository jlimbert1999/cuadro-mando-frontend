
export interface EarningDto {
    ACTIVIDADES: number
    INMUEBLES: number
    TASAS: number
    VEHICULOS: number
    date: Date
}
export interface ProjectionDto {
    months: {
        ACTIVIDADES: number
        INMUEBLES: number
        TASAS: number
        VEHICULOS: number
    }[];
    year: number

}