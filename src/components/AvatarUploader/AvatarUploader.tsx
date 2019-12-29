import * as React from 'react';
import AvatarCropper from './AvatarCropper';

interface Props {
  originalImage?: string;
  imageChanged( avatar: string ): void;
}

const AvatarUploader = (props: Props) => {
  return (
    <AvatarCropper originalImage={props.originalImage} imageChanged={(avatar: string) => props.imageChanged(avatar)} />
  );
};

export default AvatarUploader;
