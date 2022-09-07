import {
	doc,
	DocumentData,
	FirestoreDataConverter,
	getDoc,
	QueryDocumentSnapshot,
	WithFieldValue,
} from "firebase/firestore";
import { db } from "../firebase/firebase-init";

interface UserDataType {
	customise_sans: boolean;
	customise_darkMode: boolean;
	customise_sideSpace: "sm" | "md" | "lg";
	customise_justify: boolean;
}

const UserDataInit: UserDataType = {
	customise_sans: false,
	customise_darkMode: false,
	customise_sideSpace: "md",
	customise_justify: false,
};

const fetchUserData = async (username: string): Promise<UserDataType> => {
	const userDataConverter: FirestoreDataConverter<UserDataType> = {
		toFirestore(UserData: WithFieldValue<UserDataType>): DocumentData {
			return {
				customise_sans: UserData.customise_sans,
				customise_darkMode: UserData.customise_darkMode,
				customise_sideSpace: UserData.customise_sideSpace,
				customise_justify: UserData.customise_justify,
			};
		},

		fromFirestore(snapshot: QueryDocumentSnapshot): UserDataType {
			const data = snapshot.data();
			return {
				customise_sans: data.customise_sans,
				customise_darkMode: data.customise_darkMode,
				customise_sideSpace: data.customise_sideSpace,
				customise_justify: data.ustomise_justify,
			};
		},
	};

	const dataRef = doc(db, `users/${username}`).withConverter(
		userDataConverter
	);
	const docSnap = await getDoc(dataRef);
	if (docSnap.exists()) return docSnap.data();
	return UserDataInit;
};

export default fetchUserData;
export { UserDataInit };
export type { UserDataType };
