export namespace LanguageComponent {
  export enum Text {
    Add = 'Add Language',
    Languages = 'Languages',
    English = 'English',
    SelectWhatLanguage = 'Select what language(s) you can teach in'
  }

  export const selectPlaceholder = 'Select language';
  export const id = 'language';
  export const fieldName = 'language';
}

export namespace LanguageAddedComponent {
  export const languageAdded = '- {languageReplace}';
  export const languagePlaceholder = '{languageReplace}';
}
