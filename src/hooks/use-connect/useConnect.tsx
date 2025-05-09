import { ConnectContext } from '@/context/ConnectContext';
import { useContext } from 'react';

export const useConnectState = () => useContext(ConnectContext);
