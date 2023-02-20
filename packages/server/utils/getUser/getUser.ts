import axios from 'axios';
import { API_HOST } from '../constants';

export const getUser = async (cookies: string | undefined) => {
  try {
    const user = await axios.get(`http://${API_HOST}/api/v2/auth/user`, {
      withCredentials: true,
      headers: {
        Cookie: cookies,
      },
    });
    const userTheme = await axios.get(`http://${API_HOST}/api/theme`, { params: { userId: user.data.id } });
    return { ...user.data, theme: userTheme.data.theme };
  } catch (e) {
    return console.log(e);
  }
};
