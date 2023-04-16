import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
    const [session, setSession] = useLocalStorage('auth', null);
    
    return [session, setSession];
};