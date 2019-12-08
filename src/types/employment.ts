export interface EmploymentType {
    id?: number;
    employer: string;
    jobTitle: string;
    jobLocation: string;
    fromMonth: string;
    fromYear: string;
    toMonth?: string;
    toYear?: string;
    stillWorkHere?: boolean;
}
