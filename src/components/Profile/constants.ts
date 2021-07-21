export namespace ProfileComponent {
  export const pageTitle = 'Instructor Details';
  export const breadcrumbLabels = {
    home: 'Home',
    applicationList: 'Application List',
    profile: 'Profile'
  }
  export const error = 'There was an error processing your request. Please refresh the page and try again.';
  export const bookTrialWith = 'Book Trial with ';
  export const bookTrialButton = 'Book Trial';
  export const viewMoreInstructorsButton = "View More Instructors";
  export const profileChat = "Message"

}

export namespace EditModalComponent {
  export enum Text {
    EditInstruments = 'Edit Instruments',
    EditRates = 'Edit Rates'
  }
}

export namespace ProfileHeaderComponent {
  export enum Text {
    YearOld = 'Yrs old',
    Save = 'Save',
    Cancel = 'Cancel',
    YearExperiece = 'Yrs exp',
    LessonsRates = 'Rate',
    MemberSince = 'Member Since',
    ViewLess = 'View Less',
    ViewMore = '...View More',
    LessonsTaught = 'Lessons Taught',
    Teaches = 'Teaches:',
  }

  export enum rates {
    ThirtyMinsRate = '30 mins',
    FortyFiveMinsRate = '45 mins',
    SixtyMinsRate = '60 mins',
    NinetyMinsRate = '90 mins',
  }
}

export namespace ProfileSidebarComponent {
  export enum Text {
    AddToFavorite = 'Add to favorite',
    InviteToApply = 'Invite to apply',
    SendMessage = 'Send Message',
    noContent = 'No Data Available'
  }
}

export namespace ProfileContentComponent {
  export enum Text {
    TeachingExperience = 'Teaching experience',
    Education = 'Education',
    Meet = 'Meet {instructorNameReplace}',
    Music = 'Music',
    AdditionalQualifications = 'Additional qualifications',
    Reviews = 'Reviews',
    noContent = 'No Data Available'
  }

  export const monday = {
    mon3to6: '3PM-6PM',
    mon6to9: '6PM-9PM',
    mon8to10: '8AM-10AM',
    mon10to12: '10AM-12PM',
    mon12to3: '12PM-3PM',
  };

  export const tuesday = {
    tue3to6: '3PM-6PM',
    tue6to9: '6PM-9PM',
    tue8to10: '8AM-10AM',
    tue10to12: '10AM-12PM',
    tue12to3: '12PM-3PM',
  };

  export const wednesday = {
    wed3to6: '3PM-6PM',
    wed6to9: '6PM-9PM',
    wed8to10: '8AM-10AM',
    wed10to12: '10AM-12PM',
    wed12to3: '12PM-3PM',
  };

  export const thursday = {
    thu3to6: '3PM-6PM',
    thu6to9: '6PM-9PM',
    thu8to10: '8AM-10AM',
    thu10to12: '10AM-12PM',
    thu12to3: '12PM-3PM',
  };

  export const friday = {
    fri3to6: '3PM-6PM',
    fri6to9: '6PM-9PM',
    fri8to10: '8AM-10AM',
    fri10to12: '10AM-12PM',
    fri12to3: '12PM-3PM',
  };

  export const saturday = {
    sat3to6: '3PM-6PM',
    sat6to9: '6PM-9PM',
    sat8to10: '8AM-10AM',
    sat10to12: '10AM-12PM',
    sat12to3: '12PM-3PM',
  };

  export const sunday = {
    sun3to6: '3PM-6PM',
    sun6to9: '6PM-9PM',
    sun8to10: '8AM-10AM',
    sun10to12: '10AM-12PM',
    sun12to3: '12PM-3PM',
  };

  export const instructorNamePlaceholder = '{instructorNameReplace}';
  export const availability = {
    ...monday,
    ...tuesday,
    ...wednesday,
    ...thursday,
    ...friday,
    ...saturday,
    ...sunday
  };
}
