export const alreadyLoggedGuard = () => {
    if (localStorage.getItem("user_token")) {
        return false;
    } else {
        return true;
    }
}