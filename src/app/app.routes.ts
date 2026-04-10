import { Routes } from '@angular/router';
import {HomePage} from './pages/home-page/home-page';
import {SecurityContext} from './features/security/security-context/security-context';
import {Login} from './features/security/login/login.component';
import {Register} from './features/security/register/register.component';
import {ForgotPassword} from './features/security/forgot-password/forgot-password';
import {ResetPwd} from './features/security/reset-password/reset-pwd.component';
import {VerifyEmailComponent} from './features/security/verify-email/verify-email.component';
import {HotelDetailsComponent} from './pages/hotel-details/hotel-details.component';
import {BookingComponent} from './pages/booking/booking.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component:HomePage
  },
  {
    path: 'hotel-details/:id',
    component: HotelDetailsComponent,
  },
  {
    path:'booking/:roomId/:hotelId',
    component:BookingComponent,
  },
  {path:'security',component:SecurityContext,children:[
      {path:'',redirectTo:'/security/login',pathMatch:"full"},
      {path:'login',component:Login},
      {path:'register',component:Register},
      {path:'register-verification/:email',component:VerifyEmailComponent},
      {path:'forgot-password',component:ForgotPassword},
      {path: 'reset-pwd', component: ResetPwd}
    ]},
];
