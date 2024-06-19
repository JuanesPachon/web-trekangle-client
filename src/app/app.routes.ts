import { Routes } from '@angular/router';
import { HomeComponent } from './domains/home/home.component';
import { CheckoutPageComponent } from './domains/checkout-page/checkout-page.component';
import { UserSettingsComponent } from './domains/user-settings/user-settings.component';
import { LoginComponent } from './domains/login/login.component';
import { ExperiencePageComponent } from './domains/experience-page/experience-page.component';
import { SignupComponent } from './domains/signup/signup.component';
import { loginGuard } from './guards/loginGuard';
import { alreadyLoggedGuard } from './guards/alreadyLoggedGuard';
import { AboutUsComponent } from './domains/about-us/about-us.component';
import { LocationsComponent } from './domains/locations/locations.component';

export const routes: Routes = [
    { path:"", component: HomeComponent},
    { path:"sign-up", component: SignupComponent, canActivate: [alreadyLoggedGuard]},
    { path:"login", component: LoginComponent, canActivate: [alreadyLoggedGuard]},
    { path:"experience/:id", component: ExperiencePageComponent},
    { path:"checkout", component: CheckoutPageComponent, canActivate: [loginGuard]},
    { path:"user-settings", component: UserSettingsComponent, canActivate: [loginGuard]},
    { path:"about-us", component: AboutUsComponent},
    { path:"locations", component: LocationsComponent},
];
