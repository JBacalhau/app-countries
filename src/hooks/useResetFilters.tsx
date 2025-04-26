
import { useRouter } from 'next/navigation';

const useResetFilters = (resetFilters: () => void) => {
    const router = useRouter();

    const handleReset = () => {
        resetFilters();  
        router.push('/');
    };

    return handleReset;
};

export default useResetFilters;
