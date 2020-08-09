export interface BookLessonPackages {
  name: string;
	lessonNumber: number;
	value: string;
}

export interface BookLessonsPayload {
	studentId: number;
	package: string;
	paymentMethodId?: number;
	paymentMethodCode?: string;
}

export interface BookLessonsData {
	clientSecret?: string;
	lessonRate?: number
	lessonsPrice?: number;
	paymentMethods?: any[]
	placementFee?: number;
	processingFee?: number;
	subTotal?: number
	total?: number;
	freeTrial?: boolean;
	virtuosoDiscount?: number;
	discounts?: number;
	instructor: {
		avatar: string;
		reviews: {
			rate: string;
			quantity: number
		},
		backgroundCheckStatus: string;
		display_name: string;
		rate: number;
		yearsOfExperience: number;
		age: number;
	}
}

export enum LessonStatusType {
	Scheduled = 'scheduled',
	Missed = 'missed',
	Conplete = 'complete'
}

export interface LessonType {
	studentId?: number;
	date?: string;
	time?: string;
	status?: LessonStatusType;
	grade?: number;
	comment?: string;
}
