export namespace PlaceForLessonsComponent {
  export enum Text {
    StudentHome = 'Student home',
    Studio = 'Studio',
    Online = 'Online',
    ViewAddress = 'view address',
    noContent = 'No Data Available'
  }
}

export enum PlaceForLessons {
  home = 'Student\'s home',
  studio = 'Instructor\'s studio',
  online = 'Online',
}

export interface PlaceForLessonsOptions {
  label: PlaceForLessons;
  name: string;
}

export const placeForLessonsOptions = {
  Online: <PlaceForLessonsOptions> {
    label: PlaceForLessons.online,
    name: 'online'
  }
};

export namespace PlaceForLessonsComponent {

  export const sectionTitle = 'Place for lessons';
  export const description = 'Specify the place(s) where you are available to teach (select all that apply)';

  export const studioAddress = '({studioAddressReplace})';
  export const studioAddressPlaceholder = '{studioAddressReplace}';
}
