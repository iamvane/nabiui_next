import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';

interface Props {
  avatarImg: string;
}

const RecommendationsAvatar: React.StatelessComponent<Props> = props => {
  return (
    <div>
      <Avatar
        alt="Adelle Charles"
        src={props.avatarImg}
        className="recommendation-avatar nabi-margin-center"
      />
    </div>
  );
};

export default RecommendationsAvatar;
