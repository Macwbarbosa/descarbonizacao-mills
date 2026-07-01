import * as XLSX from 'xlsx';

/**
 * Baixa uma planilha .xlsx a partir de linhas (array de objetos). O cabeçalho
 * vem das chaves dos objetos. Usado para exportar os DADOS que geram cada gráfico.
 */
export const downloadXlsx = (filename, sheetName, rows) => {
    const ws = XLSX.utils.json_to_sheet(rows || []);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, String(sheetName || 'Dados').slice(0, 31));
    XLSX.writeFile(wb, filename);
};

export default { downloadXlsx };
