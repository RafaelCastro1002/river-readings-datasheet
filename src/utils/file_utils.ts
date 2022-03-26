import { XlsxGenerator } from 'office-chart';
import { RiverReading } from '../models/RiverReading';
import { join } from 'path';

export const saveToXlsxFile = async (
  readings: RiverReading[],
  fileName: string
) => {
  const gen = new XlsxGenerator();

  await gen.createWorkbook();

  const sheet1 = await gen.createWorksheet('RiverReadings');

  const headerSheet = [
    'NOME ESTACAO',
    'COD. ESTACAO',
    'NIVEL',
    'VAZAO',
    'CHUVA',
    'DATA/HORA',
  ];

  const containerSheet: (string | number)[][] = [headerSheet];

  readings.forEach((reading) => containerSheet.push(Object.values(reading)));

  await sheet1.addTable([...containerSheet]);

  const path = join(__dirname, '..', 'datasheets', fileName);

  await gen.generate(path, 'file');
};
