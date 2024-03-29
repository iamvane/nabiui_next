export namespace InviteFriendsComponent {
  export const sectionTitle = "Give 20%, get $5";
  export const ctaTitle = "Share your love for music";
  export const termsText = "Terms apply";
  export const termsPlaceholder = "{termsReplace}";
  // tslint:disable-next-line
  export const ctaDescriptionInstructor =
    "Give your friends 20% off music lessons when they book a package from your referral link. You get $5 back. {termsReplace}.";
  export const ctaDescriptionStudent =
    "Give your friends 20% off music lessons when they book a package from your referral link. You get $5 towards lessons. {termsReplace}.";
  export const placeholder = "Enter email address";
  export const fiseldLabel = "Share your invite link";
  export const inviteButton = "Invite";
  export const copyLinkText = "Copy link";
  export const copyLinkButton = "Copy";
  export const copiedMessage = "Copied to clipboard";
  export const referAndEarn = "Refer and earn";
  export const shareNow = "Share now";
  export const emailInviteText = "Invite by email";
  export const referralUrl = "http://nabimusic.com/referral/";
  export const referralMessage = "I want to give you 20% off music lessons with Nabi Music. Sign up using my referral link:"
  export const referralEmailSubjectLine = "My gift to you: 20% off music lessons"
  export const referralEmailMessage = "Hello friend! I want to give you 20% off music lessons with Nabi Music. To get your discount, sign up using my referral link:"

  export enum FieldKey {
    Email = "email",
    CopyLink = "copyLink"
  }

  export const fieldNames = {
    [FieldKey.Email]: "email",
    [FieldKey.CopyLink]: "copyLink"
  };

  export const ids = {
    [FieldKey.Email]: "email",
    [FieldKey.CopyLink]: "copyLink"
  };
}
