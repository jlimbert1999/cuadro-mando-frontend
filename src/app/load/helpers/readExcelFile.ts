import * as XLSX from 'xlsx';
export function ReadExcel(File: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
        let fileReader = new FileReader()
        fileReader.readAsBinaryString(File)
        fileReader.onload = () => {
            let workbook = XLSX.read(fileReader.result, { type: 'binary' })
            let schemasNames = workbook.SheetNames
            resolve(XLSX.utils.sheet_to_json(workbook.Sheets[schemasNames[0]]))
        };
        fileReader.onerror = (err) => {
            reject(err)
            return []
        };
    });
}