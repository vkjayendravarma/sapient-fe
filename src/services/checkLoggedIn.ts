export const alreadyLoggedIn = () => {
    return window.localStorage.getItem("token") ? true : false    
}
