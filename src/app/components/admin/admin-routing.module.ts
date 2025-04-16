import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
// import { AdminAssignmentComponent } from './admin-assignment/admin-assignment.component';
// import { AdminWishlistComponent } from './admin-wishlist/admin-wishlist.component';
// import { AdminAnnouncementsComponent } from './admin-announcements/admin-announcements.component';
// import { AdminWithdrawComponent } from './admin-withdraw/admin-withdraw.component';
// import { AdminEnrolledCourseComponent } from './admin-enrolled-course/admin-enrolled-course.component';
// import { AdminQaComponent } from './admin-qa/admin-qa.component';
// import { AdminQuizComponent } from './admin-quiz/admin-quiz.component';
// import { AdminQuizAttemptsComponent } from './admin-quiz-attempts/admin-quiz-attempts.component';
// import { AdminQuizAttemptsDetailsComponent } from './admin-quiz-attempts-details/admin-quiz-attempts-details.component';
// import { AdminReferralComponent } from './admin-referral/admin-referral.component';
// import { AdminTicketsComponent } from './admin-tickets/admin-tickets.component';
// import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
// import { AdminChatComponent } from './admin-chat/admin-chat.component';
import {SujetpfeAdminComponent} from './sujetpfe-admin/sujetpfe-admin.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {PfeDetailsComponent} from "./pfe-details/pfe-details.component";
// import { AdminEarningsComponent } from './admin-earnings/admin-earnings.component';
// import { AdminNotificationComponent } from './admin-notification/admin-notification.component';
// import { AdminProfileComponent } from './admin-profile/admin-profile.component';
// import { AdminReviewsComponent } from './admin-reviews/admin-reviews.component';
// import { AdminEditComponent } from './admin-edit/admin-edit.component';
// import { AdminQuizDetailsComponent } from './admin-quiz-details/admin-quiz-details.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      // {
      //   path: 'admin-chat',
      //   component: AdminChatComponent,
      // },
      {
        path: 'list-sujet',
        component: SujetpfeAdminComponent,
      },
      {
        path: 'sujet-details/:id',
        component: PfeDetailsComponent,
      },
      {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
      },
      // {
      //   path: 'admin-earnings',
      //   component: AdminEarningsComponent,
      // },
      // {
      //   path: 'admin-notification',
      //   component: AdminNotificationComponent,
      // },
      // {
      //   path: 'admin-orders',
      //   component: AdminOrdersComponent,
      // },
      // {
      //   path: 'sujet-details/:id',
      //   component: AdminProfileComponent,
      // },
      // {
      //   path: 'admin-reviews',
      //   component: AdminReviewsComponent,
      // },
      // {
      //   path: 'admin-tickets',
      //   component: AdminTicketsComponent,
      // },
      {
        path: 'admin-view',
        loadChildren: () =>
          import('./admin-view/admin-view.module').then(
            (m) => m.AdminViewModule
          ),
      },
      // {
      //   path: 'admin-edit',
      //   component: AdminEditComponent,
      // },
      // {
      //   path: 'admin-announcements',
      //   component: AdminAnnouncementsComponent,
      // },
      // {
      //   path: 'admin-assignment',
      //   component: AdminAssignmentComponent,
      // },
      // {
      //   path: 'admin-wishlist',
      //   component: AdminWishlistComponent,
      // },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      // { path: 'admin-withdraw', component: AdminWithdrawComponent },
      //
      // {
      //   path: 'admin-enrolled-course',
      //   component: AdminEnrolledCourseComponent,
      // },
      // {
      //   path: 'admin-qa',
      //   component: AdminQaComponent,
      // },
      // {
      //   path: 'admin-quiz',
      //   component: AdminQuizComponent,
      // },
      // {
      //   path: 'admin-quiz-attempts',
      //   component: AdminQuizAttemptsComponent,
      // },
      // {
      //   path: 'admin-quiz-attempts-details',
      //   component: AdminQuizAttemptsDetailsComponent,
      // },
      // {
      //   path: 'admin-referral',
      //   component: AdminReferralComponent,
      // },
      // {
      //   path: 'admin-quiz-details',
      //   component: AdminQuizDetailsComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
