import { AppDispatch } from '@/redux/store';
import { useDispatch as useDefaultDispatch } from 'react-redux';

const useDispatch = () => useDefaultDispatch<AppDispatch>();

export default useDispatch;