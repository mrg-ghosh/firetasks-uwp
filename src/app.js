import React, {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./utils/firebase.utils";
import Loading from "./components/loading";
import UnauthenticatedPage from "./pages/unauthenticated-page";
import AuthenticatedPage from "./pages/authenticated-page";

const App = () => {

	/**
	 * The loading state of the web application.
	 *
	 * @remarks
	 * This is property indicates that application is loading.
	 * By loading we are referring to firebase giving us information on the user.
	 * We add loading state so that if a user is logged in we don't show the sign in page for a moment
	 */
	const [loading, setLoading] = useState(true);

	/**
	 * The authenticated state.
	 */
	const [authenticated, setAuthenticated] = useState(false);

	/**
	 * The user data.
	 */
	const [user, setUser] = useState(null);

	useEffect(() => {
		/**
		 * Adds an observer for changes to the user's sign-in state.
		 * Refer to (https://firebase.google.com/docs/auth/web/manage-users#get_the_currently_signed-in_user)
		 */
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setAuthenticated(true);
				setUser(user);
			} else {
				setAuthenticated(false);
				setUser(null);
			}

			setLoading(false);
		});
	}, [])

	return (
		<>
			<main className={"bg-gray-100"}>
				{/*Navigation Bar*/}
				<header className={"bg-white flex justify-center items-center space-x-5 h-16 border-b border-gray-300 sticky top-0"}>
					<img src={"https://tasksboard.com/img/logo.png"} className={"w-8"} alt={"Tasks"}/>
					<h1 className={"text-4xl font-extrabold"}>
						Firetasks
					</h1>
				</header>

				<div className={"min-h-screen p-4 max-w-2xl mx-auto"}>
					{/*Main App View*/}
					{
						/**
						 * We show a loading screen until firebase tells us what the
						 * authenticated state is.
						*/
						loading ?
							<div className={"flex w-full justify-center"}>
								<Loading/>
							</div>
							:
							(
								authenticated ?
									/**
									 * Render the authenticated view if user is authenticated.
									 * We pass the user data to it so it can show the user details.
									 */
									<AuthenticatedPage user={user}/>
									:
									/**
									 * Render the Sign In page if user is not authenticated.
									 */
									<UnauthenticatedPage/>
							)
					}
				</div>
			</main>
		</>
	 )

}

export default App;