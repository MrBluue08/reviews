// authService.js
let authenticated = false;

export async function onRegister(user){
    localStorage.setItem('user', user);
}

export function onLogin(user) {
    authenticated = true;
}

export function logout(user) {
    authenticated = false;
}

export function isAuthenticated() {
    return a;
}
