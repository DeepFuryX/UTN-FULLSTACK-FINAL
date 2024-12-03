import { Riple, ThreeDot } from 'react-loading-indicators';

function LoadingIndicators({ type, color }: { type: string; color: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {type === 'riple' && (
        <Riple color={color} size='large' text='Loading' textColor='#e30d7c' />
      )}
      {type === 'threedot' && (
        <ThreeDot
          variant='bounce'
          color={color}
          size='small'
          text=''
          textColor=''
        />
      )}
    </div>
  );
}

export default LoadingIndicators;
