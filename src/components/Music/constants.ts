
export namespace MusicComponent {
  export enum Text {
    ShareYourMusic = 'Add up to four YouTube videos or SoundCloud music to your profile.',
    AddMusic = 'Add Music',
    EmbedError = 'Enter a valid SoundCloud embed code.',
    EmbedErrorYoutube = 'Enter a valid YouTube url.',
    MaxMusicError = 'You can add up to four music items to your profile',
    // TODO: ADD VALIDATION FOR DUPLICATE MUSIC ITEM
    DuplicateMusicError = 'The music item you are trying to add was already added to your profile',
    YourMusic = 'Your Music'
  }

  export const maxMusicItems = 4;
}

export const addMusicSteps = ['1. Click "Share"', '2. Choose "Embed" ', '3. Copy embed code'];

export namespace MusicFormComponent {
  export enum Text {
    AddButton = 'Add',
    CancelButton = 'Cancel',
    Paste  = 'Paste SoundCloud embed code below:',
    PasteYoutube = 'Paste YouTube video url below: '
  }
  export enum FieldNames {
    TypeOfEmbedCode = 'typeOfEmbedCode',
    EmbedCode = 'embedCode'
  }
  export enum Ids {
    TypeOfEmbedCode = 'typeOfEmbedCode',
    EmbedCode = 'embedCode'
  }
}

export enum MusicTypes {
  youTube = 'youTube',
  soundCloud = 'soundCloud'
}

export interface Music {
  label: string;
  value: MusicTypes;
}

export const musicOptions = {
  SoundCloud: <Music> {
    label: 'SoundCloud',
    value: MusicTypes.soundCloud
  },
  YouTube: <Music> {
    label: 'YouTube',
    value: MusicTypes.youTube
  }
};
