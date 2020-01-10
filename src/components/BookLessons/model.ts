export interface BookLessonPackages {
  name: string;
  lessonNumber: number;
}

export interface BookLessonsPayload {
	lessonQty: number,
	totalAmount: number;
	applicationId: number;
	chargeDescription: string;
	stripeToken: string;
}
