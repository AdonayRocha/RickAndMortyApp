import React, { createContext, useContext, useEffect, useState } from 'react';
import { getLeftHanded, setLeftHanded as saveLeftHanded } from '../utils/Storage';

interface LeftHandedContextProps {
    leftHanded: boolean;
    setLeftHanded: (value: boolean) => void;
}

const LeftHandedContext = createContext<LeftHandedContextProps>({
    leftHanded: false,
    setLeftHanded: () => {},
});

export const useLeftHanded = () => useContext(LeftHandedContext);

export const LeftHandedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [leftHanded, setLeftHandedState] = useState(false);

    useEffect(() => {
        (async () => {
            const saved = await getLeftHanded();
            setLeftHandedState(saved);
        })();
    }, []);

    const setLeftHanded = (value: boolean) => {
        setLeftHandedState(value);
        saveLeftHanded(value);
    };

    return (
        <LeftHandedContext.Provider value={{ leftHanded, setLeftHanded }}>
            {children}
        </LeftHandedContext.Provider>
    );
};