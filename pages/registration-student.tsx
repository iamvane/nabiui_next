import { connect } from 'react-redux';

import { withRouter, NextRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

import {
    createUser,
} from '../src/redux/actions/UserActions';

import { StoreState } from '../src/redux/reducers/store';
import { RegistrationType } from '../src/types/registration';
import Registration from '../src/components/role-register/Registration';
import { Role } from '../src/constants/Roles';

interface StateProps {
    invitationToken: string;
    isRequesting: boolean;
    apiError: string;
}

interface DispatchProps {
    createUser: (user: RegistrationType) => void;
}
interface Props extends
    WithRouterProps,
    NextRouter,
    DispatchProps,
    StateProps { }
const RegistrationPage = (props: Props) => {
    return (
        <Registration role={Role.student} { ...props} />
    )
}

function mapStateToProps(state: StoreState): StateProps {
    const {
        invitationToken,
        actions: {
            createUser: {
                isRequesting,
                error
            }
        },
    } = state.user;

    return {
        invitationToken,
        isRequesting,
        apiError: error
    };
}

const mapDispatchToProps = (
    dispatch: any,
): DispatchProps => ({
    createUser: (user: RegistrationType) => dispatch(createUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegistrationPage));