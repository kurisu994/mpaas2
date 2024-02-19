import { getStorageSync, removeStorageSync, setStorageSync } from '@tarojs/taro';
import { useEffect, useState } from 'react';

const getDefaultStorage = (key: string) => {
  return getStorageSync(key);
};

function useStorage2<T>(key: string, defaultValue?: T): [T, (string: T) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(getDefaultStorage(key) || defaultValue);

  const setStorageValue = (value: T) => {
    setStorageSync(key, value);
    if (value !== storedValue) {
      setStoredValue(value);
    }
  };

  const removeStorage = () => {
    removeStorageSync(key);
    setStoredValue(getDefaultStorage(key) || defaultValue);
  };

  useEffect(() => {
    const storageValue = getStorageSync(key);
    if (storageValue) {
      setStoredValue(storageValue);
    }
  }, [key]);

  return [storedValue, setStorageValue, removeStorage];
}

export default useStorage2;
