export interface BarChartData {
    labels: string[],
    datasets: datasets[]
}
interface datasets {
    label: string
    data: number[]
    borderWidth: number
}