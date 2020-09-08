import React from 'react';
import { GoogleLogin } from 'react-google-login';
import SocialSignOnService from './socialsignon.service';
import { useDispatch } from 'react-redux';

const GoogleSignIn: React.FC<any> = (props: any) => {
    const dispatch = useDispatch();
    const handleSocialLogin = async (user) => {
        console.log(user);
        const { accessToken, googleId } = user;
        const { givenName, familyName, name, email } = user.profileObj;
        const googleObj = {
            lastName: familyName,
            firstName: givenName,
            nickName: name,
            email,
            authorizationProvider: 'Google',
            accessToken,
            id: googleId
        }

        try {
            //let response = await SocialSignOnService.validateOuthToken(googleObj);
            await SocialSignOnService.loginAndFetchDetails(dispatch, googleObj);
        } catch (err) {
            console.log("Error in API - ", err);
        }
    }

    const handleSocialLoginFailure = (err) => {
        console.error(err)
    }
    return (
        <div className="sbox">
            <GoogleLogin
                clientId="<YOUR_GOOGLE_CLIENT_ID>"
                buttonText="Login with Google"
                theme="light"
                className="GoogleBtn"
                onSuccess={handleSocialLogin}
                onFailure={handleSocialLoginFailure}
            />
        </div>
    );

}

export default GoogleSignIn;
