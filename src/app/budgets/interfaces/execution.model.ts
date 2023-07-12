import { ExecutionDto } from "../dtos/execution.dto"

export interface Execution extends ExecutionDto {
    _id: string
    user: string
}

export interface GroupedExecution {
    lastRecord: {
        _id: string
        user: string
        date: string
    }
    execution: {
        _id: string;
        presupuesto_vigente: number;
        presupuesto_ejecutado: number;
    }[]

}


export interface ExcelDataExecution {
    Secretaria: string
    Programa: string
    "tipo de gasto": string
    DA: string
    UE: string
    "Cat. Prg.": string
    "Descripción Cat. Prg.": string
    "Presupuesto Inicial": number
    "Mod. Aprobadas": number
    "Presup. Vig.": number
    Preventivo: number
    Compromiso: number
    Ejecutado: number
    Pagado: number
    "Saldo Deveng.": number
}

