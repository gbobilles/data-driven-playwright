import * as XLSX from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';

export interface DataTestRow {
  employer_identification_number: string;
  company_name: string;
  sector: string;
  company_address: string;
  automation_tool: string;
  annual_automation_saving: string;
  date_of_first_project: string;
  username: string;
  password: string;
}

export function readExcelData<T = Record<string, unknown>>(
  filePath: string,
  sheetName?: string
): T[] {
  const resolvedPath = path.resolve(filePath);

  if (!fs.existsSync(resolvedPath)) {
    throw new Error(
      `Excel file not found at "${resolvedPath}"`
    );
  }

  const workbook = XLSX.readFile(resolvedPath);
  const targetSheet = sheetName ?? workbook.SheetNames[0];
  const worksheet = workbook.Sheets[targetSheet];

  if (!worksheet) {
    throw new Error(
      `Sheet "${targetSheet}" not found in "${resolvedPath}". Available sheets: ${workbook.SheetNames.join(', ')}`
    );
  }

  return XLSX.utils.sheet_to_json<T>(worksheet, { defval: '' });
}


export function readTestData(
  filePath: string = path.join(__dirname, '..', 'data', 'test-data.xlsx')
): DataTestRow[] {
  return readExcelData<DataTestRow>(filePath, 'data');
}
