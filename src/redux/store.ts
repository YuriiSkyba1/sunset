import { configureStore } from "@reduxjs/toolkit";

import { isSSR } from "@/utils";

import { authReducer } from "./authorization";

import contactFormSlice from "./contactForm/contactFormSlice";
import getDataSlice from "./getData/getDataSlice";
import getLocationsViewSlice from "./getLocationsView/getLocationsViewSlice";
import feedbackForm from "./feedbackForm/feedbackForm";
import getGenersFilms from "./getFilteredFilms/getGenersFilms";
import getFilmView from "./getFilmView/getFilmView";
import getSessionSelection from "./sessionSelection/sessionSelection";
import type { EnhancedStore } from "@reduxjs/toolkit";
import getLocationsListSlice from "./getLocationsList/getLocationsListSlice";

let store: EnhancedStore;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createStore = (preloadedState?: any) =>
	configureStore({
		reducer: {
			auth: authReducer,
			contact: contactFormSlice,
			data: getDataSlice,
			locationView: getLocationsViewSlice,
			locationList: getLocationsListSlice,
			feedback: feedbackForm,
			genres: getGenersFilms,
			filmView: getFilmView,
			sessionSelection: getSessionSelection,
		},
		preloadedState,
	});

export const initializeStore = (preloadedState?: RootState): Store => {
	// Create new store if there is no existing one
	let newStore = store ?? createStore(preloadedState);

	// If we have both store and preloaded state, merge them
	if (preloadedState && store) {
		newStore = createStore({ ...store.getState(), ...preloadedState });

		// Assign store only on client
		// keep it undefined on backend
		if (!isSSR()) {
			store = newStore;
		}
	}

	// For SSG and SSR always create a new store
	// without setting it to the `store` object to avoid memory leaks
	if (isSSR()) {
		return newStore;
	}

	// If we are on client and store is not created
	if (!store) {
		store = newStore;
	}

	return newStore;
};

export type Store = ReturnType<typeof createStore>;
export type RootState = ReturnType<Store["getState"]>;
export type AppDispatch = Store["dispatch"];
