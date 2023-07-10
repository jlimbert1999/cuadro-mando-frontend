export interface ExecutionDto {
    data: {
        secretaria: string;
        programa: string;
        tipoDeGasto: string
        DA: string
        UE: string
        catPrg: string
        descripcionCatPrg: string
        presupuestoInicial: number
        modAprobadas: number
        presupVig: number
        preventivo: number
        compromiso: number
        ejecutado: number
        pagado: number
        saldoDeveng: number
    }[]
    date: Date
}