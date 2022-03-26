import { RiverReading } from './models/RiverReading';
import { fetchRiverReadingData } from './services/river_reading_service';
import { subtractDays } from './utils/date_utils';
import { saveToXlsxFile } from './utils/file_utils';

type StationInfoType = {
  name: string;
  code: string;
};

const STATIONS = [
  { name: 'Aquidauana (Rio Aquidauana)', code: '66945000' },
  { name: 'Coxim (Rio Taquari)', code: '66870000' },
  { name: 'Ladário (Rio Paraguai)', code: '66825000' },
  { name: 'Bonito (Rio Miranda)', code: '66900000' },
  { name: 'Bataguassu (Rio Pardo)', code: '63970000' },
];

const generateRiverDataFiles = async (
  stationsCode: StationInfoType[],
  initialDate: Date,
  finalDate: Date
) => {
  let readings: RiverReading[] = [];

  await Promise.all(
    stationsCode.map(async ({ code: stationCode, name: stationName }) => {
      const riverReadingsFromCodeStation = await fetchRiverReadingData(
        stationName,
        stationCode,
        initialDate,
        finalDate
      );
      readings = readings.concat(riverReadingsFromCodeStation);
    })
  );

  saveToXlsxFile(readings, 'leituras');
  console.log('Mal feito desfeito');
};

generateRiverDataFiles(STATIONS, subtractDays(7), subtractDays());
