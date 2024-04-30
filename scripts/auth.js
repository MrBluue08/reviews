
// authService.js
let authenticated = false;

export async function giveAuth(user){
    localStorage.setItem('user', JSON.stringify(user));
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
