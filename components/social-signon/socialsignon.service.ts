import Axios, { AxiosPromise, AxiosRequestConfig } from "axios";
import { getSite } from "../../_foundation/hooks/useSite";
import store from "../../redux/store";
import { LOGIN_SUCCESS_ACTION, FETCH_USER_DETAILS_SUCCESS_ACTION } from "../../redux/actions/user";
import personService from "../../_foundation/apis/transaction/person.service";

const SocialSignOnService = {
    /**
       * Measur Page View of the pages user visits
       * `@method`
       * `@name validateOuthToken`
       *  
        * `@param {any} dataObj`  object and have following properties:
        ** `@property {string} lastName (required)` Last name of the User.
        ** `@property {string} firstName (required)`first name of the  User.
        ** `@property {string} nickName (required)` NickName Of the user.
        ** `@property {string} email (required)` Email Id of the User.
        ** `@property {string} authorizationProvider (required)` authorization provider ex : Google/Facebook.
        ** `@property {string} accessToken (required)` accessToken.
        ** `@property {string} id (required)` User Id.        
       ** 
       **/
    validateOuthToken(dataObj): AxiosPromise<any> {
        let storeID = getSite()?.storeID;
        let requestOptions: AxiosRequestConfig = Object.assign({
            url: "/wcs/resources/store/" + storeID + "/loginidentity/oauth_validate",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: dataObj
        });
        return Axios(requestOptions);

    },
    async loginAndFetchDetails(dispatch, data) {
        let response = await this.validateOuthToken(data);
        dispatch(LOGIN_SUCCESS_ACTION(response.data));
        personService.findPersonBySelf({}).then(responseObj => {
            dispatch(FETCH_USER_DETAILS_SUCCESS_ACTION(responseObj.data))
        })

    }
}

export default SocialSignOnService;