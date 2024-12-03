import { removeToken } from '@/utils/token';

export const API_URI_TASKS = 'https://api-tasks-wmh4.onrender.com/api/tasks';

export const getResponseError = (response: any) => {
  console.log('error', response);
  if (response) {
    if (!response.ok && response.status === 401) {
      removeToken();
      return {
        code: 'Unauthorized',
        message: 'The user is not authorized.',
      };
    }
    if (!response.ok && response.status === 404) {
      return {
        code: 'Not Found',
        message: 'You cannot fetch the data.',
      };
    }
  }

  return undefined;
};
