import React from 'react';
import FacebookLogin from 'react-facebook-login';
// npm install --save-dev @iconify/react @iconify/icons-mdi
import { Icon, InlineIcon } from '@iconify/react';
import facebookIcon from '@iconify/icons-mdi/facebook';
import './SocialSignOn.scss';
import { useDispatch } from 'react-redux';
import SocialSignOnService from './socialsignon.service';

const FacebookSignIn: React.FC<any> = (props: any) => {
    const dispatch = useDispatch();
    const handleSocialLogin = async (user) => {
        console.log(user);
        const { accessToken, first_name, last_name, name, id, email } = user;
        const fbObj = {
            authorizationProvider: 'Facebook',
            lastName: last_name,
            firstName: first_name,
            nickName: name,
            email,
            accessToken,
            id
        }
        console.log("Facebook Object --", fbObj);
        try {
            //let response = await SocialSignOnService.validateOuthToken(googleObj);
            await SocialSignOnService.loginAndFetchDetails(dispatch, fbObj);
        } catch (err) {
            console.log("Error in API - ", err);
        }
    }

    const handleSocialLoginFailure = (err) => {
        console.error(err)
    }
    return (
        <div className="sbox">
            <FacebookLogin
                appId="<YOUR_FACEBOOK_APP_ID>"
                autoLoad={false}
                fields="first_name,last_name,name,email,picture"
                callback={handleSocialLogin}
                cssClass="my-facebook-button-class"
                icon={<Icon icon={facebookIcon} color="#1877F2" width="30px" className="fb-icon" />}

            />
        </div>
    );

}

export default FacebookSignIn;
