export type AOA = any[][];

function readAsBinaryString(file: File) {
    return new Promise(function (resolve, reject) {
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
            console.log('excel file loaded');
            resolve(e.target.result as string);
        };
        reader.onerror = (e: any) => {
            console.log('excel file error');
            reject(e);
        };
        reader.readAsBinaryString(file);
    });
}

export class ExcelReader {
    public async readAsBinaryString(excelFile: File) {
        return readAsBinaryString(excelFile);
    }
}
