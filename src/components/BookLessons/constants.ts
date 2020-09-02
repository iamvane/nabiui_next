import { BookLessonPackages } from './model';

export namespace BookLessonsComponent {
  export const pageTitle = 'Keep Learning';
  export const pageTitleTrial = 'Book Trial';
  export const trialHeading = 'Start Your Free Trial';
  export const bookingConfirmation = 'Thank you for your booking!';
  export const trialDescription = 'A payment method is required to schedule trial lesson. You will not be charged anything. You can use this payment method later if you decide to purchase a lesson package.';
  export const buyLessons = 'Choose a lesson package';
  export const satisfactionGuaranteed = '100% Satisfaction Guaranteed';

  export const bookLessonPackages: BookLessonPackages[] = [
    {
      name: 'The Artist - 4 lessons',
      lessonNumber: 4,
      value: 'artist'
    },
    {
      name: 'The Maestro - 8 lessons',
      lessonNumber: 8,
      value: 'maestro'
    },
    {
      name: 'The Virtuoso - 12 lessons (5% discount)',
      lessonNumber: 12,
      value: 'virtuoso'
    }
  ];

  export const lessonNumber = {
    artist: 4,
    maestro: 8,
    virtuoso: 12
  };

  export const cardTextColors = ['nabi-color-yellow', 'nabi-color-orange', 'nabi-color-nabi'];
  export const cardBackgroundColors = ['nabi-background-yellow', 'nabi-background-orange', 'nabi-background-nabi'];

  export const lessons = 'Lessons';
  export const includes = 'Includes:'
  export const freeLesson = '1 FREE lesson';
  export const fivePercentOff = '5% Off';
  export const saving = '{totalReplace} (save {totalSavings})';
  export const totalPlaceholer = '{totalReplace}';
  export const savingsPlaceholer = '{totalSavings}';

  export const lessonCostPlaceholer = '{lessonCost}';
  export const lessonCost = '${lessonCost}/lesson';

  export const tooltipText = 'This is a one-time fee charged by Nabi Music';

  export const packageCostPlaceholer = '{packageCost}';
  export const packageCost = '${packageCost}';

  export const processingFee = .029;

  export enum BookingSummary {
    SectionTitle = 'Booking summary',
    FreeLesson = '1 FREE lesson',
    NumberOfLessonsPlaceholder = '{numberOfLessons}',
    LessonsPlaceholder = '{lessons}',
    LessonPricePlaceholder = '{lessonPrice}',
    LessonCalculation = '{numberOfLessons} {lessons} x ${lessonPrice}',
    FreeLessonCost = 0.00,
    PlacementFee = ' Placement Fee',
    ProcessingFee = 'Processing Fee',
    Total = 'Total:',
    SubTotal = 'Sub Total',
    VirtuosoDiscount = 'Virtuoso Discount',
    Discounts = 'Discount'
  }
}

export namespace ScheduleLessonsComponent {
  export const title = 'Schedule Your Next Lesson';
  export const description = 'Set the date and time for your next lesson.'
  export const scheduleLessonButton = 'Schedule Lesson';
  export const goToStudio = "Go To Studio";

  export enum Placeholders {
    LessonDate = 'Lesson date',
    LessonTime = 'Lesson time',
    UserTimezone = 'Timezone',
  }

  export enum FieldNames {
    LessonDate = 'date',
    LessonTime = 'time',
    UserTimezone = 'timezone',
  }

  export enum FieldKey {
    LessonDate = 'date',
    LessonTime = 'time',
    UserTimezone = 'timezone',
  }

  export enum Ids {
    LessonDate = 'date',
    LessonTime = 'time',
    UserTimezone = 'timezone',
  }

  export interface FormErrors {
    [FieldKey.LessonDate]?: string;
    [FieldKey.LessonTime]?: string;
    [FieldKey.UserTimezone]?: string;
  }

  export enum ErrorMessages {
    LessonDate = 'Enter lesson date.',
    LessonTime = 'Enter lesson time.',
    UserTimezone = 'Select timezone.',
  }
}
