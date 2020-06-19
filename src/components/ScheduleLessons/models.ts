export interface LessonType {
  bookingId: number;
  date: string;
  time: string;
  timezone: string;
  status?: LessonStatusType;
  grade?: number;
  comment?: string;
}

export enum LessonStatusType {
	Scheduled = 'scheduled',
	Missed = 'missed',
	Conplete = 'complete'
}
