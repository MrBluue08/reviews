import { navigate } from "svelte-navigator";
// authService
export async function giveAuth(user){
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('auth', true);

    location.reload();
}

export async function giveAdmin(user){
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('auth', true);
    localStorage.setItem('admin', true);


    navigate("/");
    location.reload();

}


export function checkLogged(){
    if(localStorage.getItem('user') && localStorage.getItem('auth')){
        return true;
    }else{
        return false;
    }
}

export function checkAdmin(){
    if(localStorage.getItem('user') && localStorage.getItem('admin') && localStorage.getItem('auth')){
        return true;
    }else{
        return false;
    }
} 

export function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('auth');
    if(localStorage.getItem('admin')){
        localStorage.removeItem('admin');
    }
    navigate("/");
    location.reload();
}
