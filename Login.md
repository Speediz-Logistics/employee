### 1. Middleawres
- Middleware is a function that has access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

- Middleware function
    - Middleware functions can perform the following tasks:
        - Execute any code.
        - Make changes to the request and the response objects.
        - End the request-response cycle.
        - Call the next middleware function in the stack.
        - If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

Please check on folder (Router -> middleware.js) for more details.
``` we have two middleware functions in this folder.```

### 2. requiredAuth middleware
```it's use for protect the route. that means if user is not login then user can't access the route.```

Example: if user is not login and try to access dashboard page then we will redirect the user to login page.

Apply to the route:
```javascript
{
    path:'onboard-screen',
        name: 'onboard-Screen',
        component: () => import('@/views/pages/vendor/screens/OnBoardScreen.vue'),
        meta: { middlewares: [requiredAuth] },
},
```

we put requiredAuth middleware in meta object of route. to redirect the user to login page if user is not login.

So **Yong** and **Teveda** need to put this meta middleware in all the route which they want to protect.

////////////////////////////

### 3. redirectifAuthenicated (authenticated) middleware

```it's use for protect the route. that means if user is login then user can't access the route.```

Example if user already login and try to access login page then we will redirect the user to dashboard page.

Apply to the route:
```javascript
{
        path: 'login',
        name: 'login',
        component: () => import('@/views/pages/vendor/screens/LoginScreen.vue'),
        meta: { middlewares: [authenticated] },
},
```

### 4. Conection with backend for Login Feature
- For login feature we need to connect with backend.

1. First we need to create a service for login feature.
   src/services/LoginService.js
2. Then we need to replace the login function in service.
   export default new LoginService(**'login'**);
3. Then create state (Store) for login feature.
   src/store/auth.js ( i'm already init **auth.js** for **login** and **logout** so **register** the **login** function in auth.js)
4. Please check the store auth.js for more details.
5. I'm use cookie to store token response from backend. so api will identify the user by token in cookie.
6. Login feature is required to connect with backend. so please check the backend for login feature in postman.
    - Postman Collection: https://mspt27.postman.co/workspace/MSPT-Public-API~c47d2ca8-e3a4-4ae7-beab-e7536cf5a5a3/collection/20779498-989e94e8-c913-4bfb-86df-d38a5eef9064?action=share&creator=20779498
7. After that call return function in login from auth.js in LoginScreen.vue -> LoginForm.vue
8. on Submit button (**handleLogin**) call the login function from auth.js and pass the email and password as parameter.
9. than we will get the response from backend and store the token in cookie.
10. Please check inspects -> Application -> Cookies to check the token in cookie.
11. If token is store in cookie then user is login.
12. If user is login then we will redirect the user to dashboard page.

### 5. Register Feature ( How to implement the register feature)
- Register feature is same as login feature.
- We need to create a service for register feature.
- Then we need to replace the register function in service.
- Then create state (Store) for register feature (put new function for register in auth.js).
- Register feature is required to connect with backend. so please check the backend for register feature in postman.
- After that call return function in register from auth.js in RegisterScreen.vue -> RegisterForm.vue
- on Submit button (**handleRegister**) call the register function from auth.js and pass parameters.
- than we will get the response from backend and store the token in cookie.
- Please check inspects -> Application -> Cookies to check the token in cookie.
- If token is store in cookie then user is registered.

Note : please store token in cookie after register and login.

