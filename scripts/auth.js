
// authService.js
let authenticated = false;

export async function giveAuth(user){
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('auth', true);
}

export function onLogin(user) {
    authenticated = true;
}

export function checkLogged(){
    if(localStorage.getItem('user') && localStorage.getItem('auth')){
        return true;
    }else{
        return false;
    }
}

export function checkAdmin(){
    if(localStorage.getItem('user') == 'admin' && localStorage.getItem('auth')){
        return true;
    }else{
        return false;
    }
} 

export function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('auth');
    location.reload();
}

export function isAuthenticated() {
    return a;
}
