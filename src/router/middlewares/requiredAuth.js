import { useCookies } from 'vue3-cookies';

export default function requiredAuth({ next, router }) {
  const { cookies } = useCookies();

  const token = cookies.get('token');
  const tokenType = cookies.get('tokenType');

  if (token && tokenType) {
    // Allow navigation to the route
    return next();
  }
  // Redirect to login page
 return next({ name: 'login' });
}
