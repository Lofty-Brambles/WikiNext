import { useMemo, useState } from "react";
import {
	Auth,
	AuthError,
	GithubAuthProvider,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth";
import store from "../store";

type Return = [
	// eslint-disable-next-line no-unused-vars
	(email: string, password: string) => Promise<void>,
	() => Promise<void>,
	() => Promise<void>,
	boolean,
	boolean,
	AuthError | undefined
];

const useLoginMethods = (auth: Auth): Return => {
	const [error, setError] = useState<AuthError | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);

	const userSetter = store(state => state.setUser);

	const signInWithEmail = async (email: string, pass: string) => {
		if (loading) return;
		setLoading(true);
		setError(undefined);

		try {
			const user = await signInWithEmailAndPassword(auth, email, pass);
			userSetter(user.user);
		} catch (e) {
			setError(e as AuthError);
		} finally {
			setLoading(false);
			setSuccess(true);
		}
	};

	const signInWithGmail = async () => {
		if (loading) return;
		setLoading(true);
		setError(undefined);

		try {
			const provider = new GoogleAuthProvider();
			const user = await signInWithPopup(auth, provider);
			userSetter(user.user);
		} catch (e) {
			setError(e as AuthError);
		} finally {
			setLoading(false);
			setSuccess(true);
		}
	};

	const signInWithGh = async () => {
		if (loading) return;
		setLoading(true);
		setError(undefined);

		try {
			const provider = new GithubAuthProvider();
			const user = await signInWithPopup(auth, provider);
			userSetter(user.user);
		} catch (e) {
			setError(e as AuthError);
		} finally {
			setLoading(false);
			setSuccess(true);
		}
	};

	const results: Return = [
		signInWithEmail,
		signInWithGmail,
		signInWithGh,
		loading,
		success,
		error,
	];

	return useMemo<Return>(() => results, results);
};

export default useLoginMethods;
