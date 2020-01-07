import { BookLessonPackages } from './model';

export namespace BookLessonsComponent {
  export const pageTitle = 'Book Lessons';
  export const description = 'All of our lesson packages include a FREE trial lesson.';
  export const descriptionSecond = 'If you are not satisfied after the first lesson you’ll get a full refund.';
  export const cta = 'Choose a lesson package';
  export const satisfactionGuaranteed = '100% Satisfaction Guaranteed';

  export const bookLessonPackages: BookLessonPackages[] = [
    {
      name: 'The Artist',
      lessonNumber: 4,
    },
    {
      name: 'The Maestro',
      lessonNumber: 8,
    },
    {
      name: 'The Virtuoso',
      lessonNumber: 12,
    }
  ];

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
  export const lessonCost = '${lessonCost}/each';

  export const tooltipText = 'This is a one-time fee charged by Nabi Music';

  export const packageCostPlaceholer = '{packageCost}';
  export const packageCost = '${packageCost}';

  export const placementFee = 12.00;
  export const processingFee = .029;

  export enum BookingSummary {
    SectionTitle = 'Booking summary',
    FreeLesson = '1 FREE lesson',
    NumberOfLessonsPlaceholder = '{numberOfLessons}',
    LessonPricePlaceholder = '{lessonPrice}',
    LessonCalculation = '{numberOfLessons} x ${lessonPrice}',
    FreeLessonCost = 0.00,
    PlacementFee = ' Placement Fee',
    ProcessingFee = 'Processing Fee',
    Total = 'Total:'
  }
}