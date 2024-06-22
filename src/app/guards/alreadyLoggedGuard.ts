import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const alreadyLoggedGuard = () => {

    const router = inject(Router);

    if (localStorage.getItem("user_token")) {
        router.navigate(["/locations"]);
        return false;
    } else {
        return true;
    }
}