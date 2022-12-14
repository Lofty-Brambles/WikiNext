import { useMemo, useState } from "react";
import {
	Auth,
	AuthError,
	browserSessionPersistence,
	GithubAuthProvider,
	GoogleAuthProvider,
	setPersistence,
	signInWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth";

type Return = [
	// eslint-disable-next-line no-unused-vars
	(email: string, password: string) => Promise<void>,
	() => Promise<void>,
	() => Promise<void>,
	boolean,
	AuthError | undefined
];

const useLoginMethods = (auth: Auth): Return => {
	const [error, setError] = useState<AuthError | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(false);

	const signInWithEmail = async (email: string, pass: string) => {
		if (loading) return;
		setLoading(true);
		setError(undefined);

		try {
			await setPersistence(auth, browserSessionPersistence);
			await signInWithEmailAndPassword(auth, email, pass);
		} catch (e) {
			setError(e as AuthError);
		} finally {
			setLoading(false);
		}
	};

	const signInWithGmail = async () => {
		if (loading) return;
		setLoading(true);
		setError(undefined);

		try {
			const provider = new GoogleAuthProvider();
			await setPersistence(auth, browserSessionPersistence);
			await signInWithPopup(auth, provider);
		} catch (e) {
			setError(e as AuthError);
		} finally {
			setLoading(false);
		}
	};

	const signInWithGh = async () => {
		if (loading) return;
		setLoading(true);
		setError(undefined);

		try {
			const provider = new GithubAuthProvider();
			await setPersistence(auth, browserSessionPersistence);
			await signInWithPopup(auth, provider);
		} catch (e) {
			setError(e as AuthError);
		} finally {
			setLoading(false);
		}
	};

	const results: Return = [
		signInWithEmail,
		signInWithGmail,
		signInWithGh,
		loading,
		error,
	];

	return useMemo<Return>(() => results, results);
};

export default useLoginMethods;
