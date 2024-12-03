import { CSSProperties } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: '#e30d7c',
};

function Loading({ color, isLoading }: { color: string; isLoading: boolean }) {
  return (
    <ClipLoader
      color={color}
      loading={isLoading}
      cssOverride={override}
      size={150}
      aria-label='Loading Spinner'
      data-testid='loader'
    />
  );
}

export default Loading;
