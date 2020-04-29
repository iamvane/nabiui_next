export interface BookLessonPackages {
  name: string;
  lessonNumber: number;
}

export interface BookLessonsPayload {
	applicationId: number;
	package: string;
	paymentMethodId?: number;
	paymentMethodCode?: string;
	date?: string;
	time?: string;
	timezone?: string;
}
