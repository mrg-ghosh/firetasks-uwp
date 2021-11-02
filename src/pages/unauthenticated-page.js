import React from 'react';
import {GoogleAuthProvider} from "firebase/auth";
import {signInWithRedirect} from "firebase/auth";
import {auth} from "../utils/firebase.utils";
import { BsGoogle} from "react-icons/all";

const UnauthenticatedPage = () => {

    /**
     * Initialize Google Sign In provider and set access level to only [userinfo.profile].
     * Refer to (https://firebase.google.com/docs/auth/web/google-signin#handle_the_sign-in_flow_with_the_firebase_sdk)
     */
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

    /**
     * This function [signInWithRedirect] by firebase redirects the user to Google to Sign In.
     *
     * In this demo we haven't handled the case if the sign in fails. You can refer to the below link to
     * understand how to handle errors:
     * Refer to (https://firebase.google.com/docs/auth/web/google-signin#redirect-mode)
     */
    const signIn = () => {
        signInWithRedirect(auth, provider);
    }

    return (
        <div className={"flex py-12 flex-col items-center space-y-8"}>
            <p className={"text-4xl font-medium text-gray-900"}>
                Welcome to Firetasks
            </p>
            <button className={"flex text-lg font-bold text-blue-500 border border-gray-200 justify-center items-center mx-auto bg-white px-6 py-3 transition duration-200 shadow-sm hover:shadow-md rounded-xl"} onClick={signIn}>
                <BsGoogle size={20} className={"text-blue-500 mr-3"}/>
                Sign in with Google
            </button>
        </div>
    );
}

export default UnauthenticatedPage;