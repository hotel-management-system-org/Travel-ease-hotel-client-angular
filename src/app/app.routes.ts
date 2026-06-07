import { Routes } from '@angular/router';
import {HomePageComponent} from './features/home/pages/home-page/home-page.component';
import {SecurityContextComponent} from './features/security/components/security-context/security-context.component';
import {Login} from './features/security/pages/login/login.component';
import {Register} from './features/security/pages/register/register.component';
import {ForgotPasswordComponent} from './features/security/pages/forgot-password/forgot-password.component';
import {ResetPwd} from './features/security/pages/reset-password/reset-password.component';
import {VerifyEmailComponent} from './features/security/pages/verify-email/verify-email.component';
import {HotelDetailsComponent} from './features/hotel-details/pages/hotel-details/hotel-details.component';
import {BookingComponent} from './features/booking/pages/booking-page/booking.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component:HomePageComponent
  },
  {
    path: 'hotel-details/:id',
    component: HotelDetailsComponent,
  },
  {
    path:'booking/:roomId/:hotelId',
    component:BookingComponent,
  },
  {path:'security',component:SecurityContextComponent,children:[
      {path:'',redirectTo:'/security/login',pathMatch:"full"},
      {path:'login',component:Login},
      {path:'register',component:Register},
      {path:'register-verification/:email',component:VerifyEmailComponent},
      {path:'forgot-password',component:ForgotPasswordComponent},
      {path: 'reset-pwd', component: ResetPwd}
    ]},
];
