type StorageType = 'session' | 'local';
type UseStorageReturnValue = {
	getItem: (key: any, type?: StorageType) => string;
	setItem: (key: any, value: any, type?: StorageType) => boolean;
	removeItem: (key: any, type?: StorageType) => void;
};

const useStorage = (): UseStorageReturnValue => {
	const storageType = (type?: StorageType): 'localStorage' | 'sessionStorage' =>
		`${type ?? 'session'}Storage`;

	const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();

	const getItem = (key: any, type?: StorageType): any => {
		return isBrowser ? window[storageType(type)][key] : '';
	};

	const setItem = (key: any, value: any, type?: StorageType): boolean => {
		if (isBrowser) {
			window[storageType(type)].setItem(key, value);
			return true;
		}

		return false;
	};

	const removeItem = (key: any, type?: StorageType): void => {
		window[storageType(type)].removeItem(key);
	};

	return {
		getItem,
		setItem,
		removeItem,
	};
};

export default useStorage;
