
import * as React from 'react';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';
import Cropper from 'cropperjs';

import {
  Button,
  CircularProgress
} from '@material-ui/core';

import { fetchUser, uploadAvatar } from '../../redux/actions/UserActions';
import { StoreState } from '../../redux/reducers/store';
import  '../../../node_modules/cropperjs/dist/cropper.min.css';
import blur from '../../utils/AvatarBlur';
import SnackBar from '../common/SnackBar';
import { AvatarCropperComponent } from './constants';

interface State {
  isLoading: boolean;
  isCropping: boolean;
  baseImage: string;
  showError: boolean;
  uploadedAvatarStatus: boolean;
  file: any;
}

interface DispatchProps {
  uploadAvatar: (value: string) => void;
  fetchUser: () => void;
}

interface StateProps {
  avatar: string;
  isRequestingAvatar: boolean;
  uploadError: string;
  message: string;
  isRequestingFetch: boolean;
}

interface Props extends
  DispatchProps,
  StateProps { }

type PropsWithStyles = Props;

/**
 * Crops an image file
 */
class AvatarCropper extends React.Component<PropsWithStyles, State> {
  cropperInstance: any;
  imageHolder: any;
  fileUpload: any;

  constructor(props: PropsWithStyles) {
    super(props);

    const defaultAvatar = 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/nabi-default-avatar.png';
    this.state = {
      isLoading: false,
      isCropping: false,
      showError: false,
      uploadedAvatarStatus: false,
      baseImage: props.avatar || defaultAvatar,
      file: null
    };
  }

  validateFile(image: any) {
    var fileExtension = image.type.split('/').pop().toLowerCase();
    var isValidFile = false;

    for (var index in AvatarCropperComponent.allowedExtension) {

    if (fileExtension === AvatarCropperComponent.allowedExtension[index]) {
      isValidFile = true;
      break;
      }
    }
    return isValidFile;
  }

  onFileChange = (e: any) => {
    let imageMaxSize = AvatarCropperComponent.maxImageSize;
    let picFiles: any = e.target.files;
    let onePic: any = picFiles[0];

    if (FileReader && picFiles && picFiles.length) {
      if (onePic.size > imageMaxSize || !this.validateFile(onePic)) {
        this.setState({
          showError: true,
          baseImage: this.state.baseImage
        });
      } else {
        let fr = new FileReader();
        fr.onload =  () => {
          this.setState({isCropping: true, baseImage: fr.result as string, file: onePic});
        };
        fr.readAsDataURL(onePic);
      }
    }
  }

  async componentDidUpdate(prevProps: Props) {
    if (this.state.uploadedAvatarStatus === true) {
      this.setState({
        uploadedAvatarStatus: false
      });
    }

    if (this.props.uploadError !== prevProps.uploadError) {
      this.setState({
        uploadedAvatarStatus: this.props.uploadError ? true : false
      });
    }
    if ((this.props.message !== prevProps.message) && this.props.message) {
      await this.props.fetchUser();
      this.setState({
        uploadedAvatarStatus: true
      });
    }
    if (this.state.isCropping) {
      this.cropperInstance = new Cropper(
        this.imageHolder,
        {
          aspectRatio: 1,
          minContainerHeight: 150,
          minContainerWidth: 150,
          modal: false,
          viewMode: 1,
          minCropBoxWidth: 150,
          background: false,
        }
      );

      this.imageHolder.addEventListener('ready', (e: any) => {
        let crpCont = document.getElementsByClassName('cropper-container')[0];
        let crpBgd = this.imageToDataUri(this.state.baseImage, 150, 150);
        crpCont.setAttribute(
          'style',
          'min-width:150px;'
          + ' min-height:150px;background-size: cover; background-image: url(\''
          + crpBgd + '\')');
      });
    }
    if (this.props.avatar !== prevProps.avatar) {
      this.setState({
        baseImage: this.props.avatar
      });
    }
  }

  imageOnClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  }

  handleCrop = async(e) => {
    e.preventDefault();
    e.stopPropagation();
    let newBase64 = this.cropperInstance.getCroppedCanvas(
      {
        minWidth: 150,
        maxWidth: 300,
        fillColor: '#ffffff',
        imageSmoothingQuality: 'high'
      }
    ).toDataURL();

    if (newBase64) {
      this.cropperInstance.clear();
      this.cropperInstance.destroy();
      this.cropperInstance = null;
      this.setState({isCropping: false, baseImage: newBase64});
      await this.props.uploadAvatar(this.state.file);
    }
    // Get new ImageCropped value;
  }

  imageToDataUri(img: string, width: number, height: number): string {
    // create an off-screen canvas
    let canvas = document.createElement('canvas');
    let ctx: any = canvas.getContext('2d');
    let imgObj = document.createElement('img');
    imgObj.src = img;
    canvas.width = width;
    canvas.height = height;
    if (ctx) {
      ctx.drawImage(imgObj, 0, 0, width, height);
      let imageData = ctx.getImageData(0, 0, width, height);
      ctx.putImageData(blur(imageData, { amount: 2} ), 0, 0);
    }

    // encode image to data-uri with base64 version of compressed image
    return canvas.toDataURL();
  }

  render() {
    const currentLogo = this.state.baseImage;
    const handleClose = () => {
      const { showError, uploadedAvatarStatus }  = this.state;
      if (showError) {
        this.setState({ showError: false });
      }
      if (uploadedAvatarStatus) {
        this.setState({ uploadedAvatarStatus: false });
      }
    };

    let actions;
    if (this.state.isCropping) {
      actions = (
        <Button
          className="nabi-margin-top-small"
          color="primary"
          onClick={this.handleCrop}
          variant="contained"
        >
          {AvatarCropperComponent.changePhotoButtonText}
        </Button>
      );
    }
    const imgStyle = (!this.state.isCropping) ? {
      width: '140px',
      height: '140px',
      maxWidth: '100%',
      borderRadius: '50%',
    } : { maxWidth: '100%'};

    return (
      <div>
        <input
          className="nabi-display-none"
          id={AvatarCropperComponent.inputId}
          type="file"
          accept="image/*"
          onChange={this.onFileChange}
          ref={(e) => { this.fileUpload = e; }}
          disabled={this.state.isCropping}
        />
        <label className="nabi-cursor-pointer nabi-text-center" htmlFor={AvatarCropperComponent.inputId}>
          {
            this.props.isRequestingAvatar || this.props.isRequestingFetch ?
            <CircularProgress /> :
            <img ref={(e) => { this.imageHolder = e; }} src={currentLogo} style={imgStyle} />
          }
        </label>
        {actions}
        <SnackBar
          isOpen={this.state.showError}
          message={AvatarCropperComponent.errorMessage}
          handleClose={handleClose}
          variant="error"
        />
        <SnackBar
          isOpen={this.state.uploadedAvatarStatus}
          message={this.props.uploadError ? 'Image could not be uploaded' : 'Image successfully uploaded.'}
          handleClose={handleClose}
          variant={this.props.uploadError ? 'error' : 'success'}
        />
      </div>
    );
  }
}

function mapStateToProps(state: StoreState): StateProps {
  const {
    user: {
      avatar
    },
    actions: {
      uploadAvatar: {
        isRequesting: isRequestingAvatar,
        error: uploadError,
        message
      },
      fetchUser: {
        isRequesting: isRequestingFetch,
      },
    },
  } = state.user;

  return {
    avatar,
    isRequestingAvatar,
    uploadError,
    message,
    isRequestingFetch
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
  _ownProps: {}
): DispatchProps => ({
  uploadAvatar: (value: string) => dispatch(uploadAvatar(value)),
  fetchUser: () => dispatch(fetchUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(AvatarCropper);
