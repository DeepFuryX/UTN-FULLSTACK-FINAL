export const getFormattedDate = ({ eventDate }: { eventDate: string }) => {
  const formattedDate = new Date(eventDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const formattedTime = new Date(eventDate).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  });
  return `${formattedDate} ${formattedTime}`;
};