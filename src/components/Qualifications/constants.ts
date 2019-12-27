export enum Qualifications {
  certifiedTeacher = 'Certified teacher',
  musicTherapy = 'Music therapy ',
  musicProduction = 'Music production',
  earTraining = 'Ear training',
  conducting = 'Conducting',
  virtuosoRecognition = 'Virtuoso recognition',
  performance = 'Performance',
  musicTheory = 'Music theory',
  experienceTeachingYoungChildren = 'Experience teaching young children',
  repertoireSelection = 'Repertoire selection ',
}

export interface QualificationsOptions {
  label: Qualifications;
  name: string;
}

export const qualificationsOptions = {
  CertifiedTeacher: <QualificationsOptions> {
    label: Qualifications.certifiedTeacher,
    name: 'certifiedTeacher'
  },
  MusicTherapy: <QualificationsOptions> {
    label: Qualifications.musicTherapy,
    name: 'musicTherapy'
  },
  MusicProduction: <QualificationsOptions> {
    label: Qualifications.musicProduction,
    name: 'musicProduction'
  },
  EarTraining: <QualificationsOptions> {
    label: Qualifications.earTraining,
    name: 'earTraining'
  },
  Conducting: <QualificationsOptions> {
    label: Qualifications.conducting,
    name: 'conducting'
  },
  VirtuosoRecognition: <QualificationsOptions> {
    label: Qualifications.virtuosoRecognition,
    name: 'virtuosoRecognition'
  },
  Performance: <QualificationsOptions> {
    label: Qualifications.performance,
    name: 'performance'
  },
  MusicTheory: <QualificationsOptions> {
    label: Qualifications.musicTheory,
    name: 'musicTheory'
  },
  ExperienceTeachingYoungChildren: <QualificationsOptions> {
    label: Qualifications.experienceTeachingYoungChildren,
    name: 'experienceTeachingYoungChildren'
  },
  RepertoireSelection: <QualificationsOptions> {
    label: Qualifications.repertoireSelection,
    name: 'repertoireSelection'
  },
};

export namespace QualificationsComponent {
  export enum Text {
    AdditionalQualifications = 'Additional Qualifications',
    SpecifyYourAditional = 'Specify your additional qualifications (select all that apply)'
  }
}
