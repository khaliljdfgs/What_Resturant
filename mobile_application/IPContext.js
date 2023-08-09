import React, { createContext } from 'react';

export const IPContext = createContext();

export const IPProvider = ({ children }) => {
    const ipAddress = '192.168.1.11'; // Your IP address here

    return <IPContext.Provider value={{ ipAddress }}>{children}</IPContext.Provider>;
};
