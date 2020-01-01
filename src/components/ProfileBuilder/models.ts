import { PlaceForLessonsType } from '../PlaceForLessons/model';
import { RatesType } from '../Rates/model';
import { QualificationsType } from '../Qualifications/model';
import { AvailabilityType } from '../Availability/model';
import {
  LessonSizeType,
  AgeGroupType,
} from '../JobPreferences/model';
import { InstrumentsType } from '../Instruments/model';

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

export interface BackgroundCheckParams {
  instructorId?: number,
  amount: NumberConstructor,
  stripeToken: string;
}
