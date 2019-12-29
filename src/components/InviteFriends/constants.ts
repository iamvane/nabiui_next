export namespace InviteFriendsComponent {
  export const sectionTitle = 'Invite Friends';
  export const ctaTitle = 'Share your love for music';
  export const termsText = 'Terms apply';
  export const termsPlaceholder = '{termsReplace}';
  // tslint:disable-next-line
  export const ctaDescriptionInstructor = 'Invite people you know to join Nabi Music. For every person who completes a lesson, you’ll get a lesson free of commission. {termsReplace}.';
  export const ctaDescriptionStudent = 'Invite people you know to join Nabi Music. For every person who completes a lesson, you’ll get a FREE lesson. {termsReplace}.';
  export const placeholder = 'Enter email address';
  export const fieldLabel = 'Share your invite link';
  export const inviteButton = 'Invite';
  export const copyLink = 'Copy';
  export const copiedMessage = 'Copied to clipboard';

  export enum FieldKey {
    Email = 'email',
    CopyLink = 'copyLink',
  }

  export const fieldNames = {
    [FieldKey.Email]: 'email',
    [FieldKey.CopyLink]: 'copyLink',
  };

  export const ids = {
    [FieldKey.Email]: 'email',
    [FieldKey.CopyLink]: 'copyLink',
  };
}
