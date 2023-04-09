import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
    const [session, setSession] = useLocalStorage('Auth', null);
    
    return [session, setSession];
};