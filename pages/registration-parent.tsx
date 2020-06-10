import { connect } from 'react-redux';

import { withRouter, NextRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import Head from 'next/head';

import {
    createUser,
} from '../src/redux/actions/UserActions';

import { StoreState } from '../src/redux/reducers/store';
import { RegistrationType } from '../src/components/Auth/Registration/models';
import Registration from '../src/components/Auth/Registration/Registration';
import { Role } from '../src/constants/Roles';
import { pageTitlesAndDescriptions } from '../src/components/common/constants/TitlesAndDescriptions';

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
        <>
            <Head>
                <title>{pageTitlesAndDescriptions.registrationParent.title}</title>
                <meta name="description" content={pageTitlesAndDescriptions.registrationParent.description}></meta>
                <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDfA1CE5k-YS94ZnyFiOIjwlr99jz7JjOA&libraries=places"></script>
            </Head>
            <Registration role={Role.parent} { ...props} />
        </>
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
