import { useCookies } from 'vue3-cookies';

export default function authenticated({ to, next }) {
  const { cookies } = useCookies();
  const token = cookies.get('token');
  const tokenType = cookies.get('tokenType');
  if (token && tokenType) {
    return next({ name: 'onboard-Screen' });
  } else {
    return next();
  }
}
