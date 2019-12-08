export namespace RegistrationComponent {
    export const pageTitle = 'Registration';
    export const minimumAge = 16;
}

export enum Role {
    student = 'student',
    instructor = 'instructor',
    parent = 'parent'
}

export namespace RegistrationFormComponent {
    export const SubmitText = 'Submit';

    export const birthday = 'Birthday';

    export const IAmA = 'I am a';

    export enum FieldKey {
        Email = 'email',
        Password = 'password',
    }

    export enum Labels {
        ProspectiveStudent = 'Student',
        ParentGuardian = 'Parent or guardian',
    }

    export enum Placeholders {
        Email = 'Email',
        Password = 'Password'
    }

    export enum FieldNames {
        Role = 'role',
        Email = 'email',
        Password = 'password',
        AgreeWithTerms = 'agreeWithTerms'
    }

    export enum Ids {
        Role = 'role',
        Email = 'email',
        Password = 'password',
    }

    export enum RegisterText {
        Student = 'Register as a student',
        Parent = 'Register as parent/guardian',
        Instructor = 'Register as an instructor',
    }

    export enum ErrorMessages {
        Email = 'Invalid email. Enter a valid email address.',
        Password = 'Invalid password. Must contain at least 5 characters, a letter and a number.',
    }

    export const agreeWithTerms = 'I agree with the {termsOfServiceReplace} of NabiMusic.';
    export const termsOfServicePlaceholder = '{termsOfServiceReplace}';
    export const termsText = 'Terms of Use';
}

export namespace RegistrationOptionsComponent {
    export const studentCTATitle = 'Find a Music Instructor Today!';
    export const studentCTADescription = 'Get started by posting a request.';
    export const studentButton = 'Find a Music Instructor Today';
    export const instructorCTATitle = 'Apply for Teaching Jobs';
    export const instructorCTADescription = 'Make more income through NabiMusic.';
    export const instructorButton = 'Apply for Jobs';
    export const preLaunchStudentCTATitle = 'Find a Music Instructor';
    export const preLaunchStudentCTADescription = 'Take music lessons with a qualified instructor.';
    export const preLaunchStudentButton = 'Find a Music Instructor';
    export const preLaunchInstructorCTATitle = 'Find Teaching Jobs';
}
