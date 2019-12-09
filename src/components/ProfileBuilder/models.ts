import { PlaceForLessonsType } from 'components/PlaceForLessons/model';
import { RatesType } from 'components/Rates/model';
import { QualificationsType } from 'components/Qualifications/model';
import { AvailabilityType } from 'components/Availability/model';
import {
  LessonSizeType,
  AgeGroupType,
} from 'components/JobPreferences/model';
import { InstrumentsType } from 'components/Instruments/model';

export interface JobPreferencesType extends
  LessonSizeType,
  AgeGroupType,
  PlaceForLessonsType,
  RatesType,
  QualificationsType,
  AvailabilityType {
    instruments: InstrumentsType[];
    languages: string[];
  }
