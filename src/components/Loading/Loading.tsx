import { CircularProgress } from '@mui/material';
import './loading.css';

export default function Loading() {
  return (
    <div className="loading-container">
      <CircularProgress color="inherit" className="loading-icon" />
    </div>
  );
}
