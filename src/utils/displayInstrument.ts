import { instruments } from '../../assets/data/instruments';

export const instrumentDisplay = (instrument: string) => {
  const instrumentObject = instruments.find(t => t.value === instrument);

  return instrumentObject.name;
};
