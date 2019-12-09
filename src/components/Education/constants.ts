export namespace EducationComponent {
  export enum Text {
    YourEducation = 'Your Education',
    TellStudentsAbout = 'Tell students about your educational background',
    AddEducation = 'Add Education'
  }
}

export namespace EducationFormComponent {
  export const extraYears = 7;

  export enum Text {
    AddButton = 'Add',
    SaveChangesButton = 'Save Changes',
    CancelButton = 'Cancel'
  }

  export enum FieldNames {
    School = 'school',
    GraduationYear = 'graduationYear',
    FieldOfStudy = 'fieldOfStudy',
    DegreeType = 'degreeType',
    SchoolLocation = 'schoolLocation'
  }

  export enum Ids {
    School = 'school',
    GraduationYear = 'graduationYear',
    FieldOfStudy = 'fieldOfStudy',
    DegreeType = 'degreeType',
    SchoolLocation = 'schoolLocation'
  }

  export enum Placeholders {
    School = 'School Name',
    FieldOfStudy = 'Field of study (major or concentration)',
    SchoolLocation = 'School location (city, state, country)'
  }

  export enum DisabledPlaceholders {
    GraduationYear= 'Graduation year',
    Degreetype = 'Degree type'
  }
}

export const degreeTypeKey = {
  associate: 'associate',
  bachelors: 'bachelors',
  graduate: 'graduate',
  professional: 'professional',
  certification: 'certification',
  other: 'other'
};

export const degreeTypeLabels = {
  [degreeTypeKey.associate]: 'Associate Degree',
  [degreeTypeKey.bachelors]: 'Bachelor\'s Degree',
  [degreeTypeKey.graduate]: 'Graduate Degree',
  [degreeTypeKey.professional]: 'Professional Degree',
  [degreeTypeKey.certification]: 'Certification',
  [degreeTypeKey.other]: 'Other'
};

export enum DegreeType {
  associate = 'Associate Degree',
  bachelors = 'Bachelor\'s Degree',
  graduate = 'Graduate Degree',
  professional = 'Professional Degree',
  certification = 'Certification',
  other = 'Other'
}

export interface Degree {
  value: string;
  label: DegreeType;
}

export const degreeOptions = {
  Associate: <Degree> {
    value: degreeTypeKey.associate,
    label: degreeTypeLabels.associate
  },
  Bachelor: <Degree> {
    value: degreeTypeKey.bachelors,
    label: degreeTypeLabels.bachelors
  },
  graduate: <Degree> {
    value: degreeTypeKey.graduate,
    label: degreeTypeLabels.graduate
  },
  Professional: <Degree> {
    value: degreeTypeKey.professional,
    label: degreeTypeLabels.professional
  },
  Certification: <Degree> {
    value: degreeTypeKey.certification,
    label: degreeTypeLabels.certification
  },
  Other: <Degree> {
    value: degreeTypeKey.other,
    label: degreeTypeLabels.other
  }
};

export namespace EducationAddedComponent {
  export const concentration = '{degreeTypeReplace}, {fieldOfStudyReplace}';
  export const degreeTypePlaceholder = '{degreeTypeReplace}';
  export const fieldOfStudyPlaceholder = '{fieldOfStudyReplace}';
}
