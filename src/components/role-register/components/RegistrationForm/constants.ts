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