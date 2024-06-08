import { Routes } from '@angular/router';
import { HomeComponent } from './domains/home/home.component';
import { CheckoutPageComponent } from './domains/checkout-page/checkout-page.component';
import { UserSettingsComponent } from './domains/user-settings/user-settings.component';
import { LoginComponent } from './domains/login/login.component';
import { ExperiencePageComponent } from './domains/experience-page/experience-page.component';
import { SignupComponent } from './domains/signup/signup.component';

export const routes: Routes = [
    { path:"", component: HomeComponent},
    { path:"sign-up", component: SignupComponent},
    { path:"login", component: LoginComponent},
    { path:"experience:id", component: ExperiencePageComponent},
    { path:"checkout", component: CheckoutPageComponent},
    { path:"user-settings", component: UserSettingsComponent},
];
