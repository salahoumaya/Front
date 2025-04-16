import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {FeatherIconModule} from 'src/app/shared/module/feather.module';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {SujetpfeAdminComponent} from './sujetpfe-admin/sujetpfe-admin.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from 'src/app/shared/module/shared.module';
import {AdminSidebarModule} from "./common/admin-sidebar/admin-sidebar.module";
import {PfeDetailsComponent} from "./pfe-details/pfe-details.component";

// import { InstructorAnnouncementsComponent } from './instructor-announcements/instructor-announcements.component';
// import { InstructorAssignmentComponent } from './instructor-assignment/instructor-assignment.component';
// import { InstructorWishlistComponent } from './instructor-wishlist/instructor-wishlist.component';
// import { InstructorQaComponent } from './instructor-qa/instructor-qa.component';
// import { InstructorQuizComponent } from './instructor-quiz/instructor-quiz.component';
// import { InstructorQuizAttemptsComponent } from './instructor-quiz-attempts/instructor-quiz-attempts.component';
// import { InstructorQuizAttemptsDetailsComponent } from './instructor-quiz-attempts-details/instructor-quiz-attempts-details.component';
// import { InstructorReferralComponent } from './instructor-referral/instructor-referral.component';
// import { InstructorWithdrawComponent } from './instructor-withdraw/instructor-withdraw.component';
// import { InstructorTicketsComponent } from './instructor-tickets/instructor-tickets.component';
// import { InstructorOrdersComponent } from './instructor-orders/instructor-orders.component';
// import { InstructorReviewsComponent } from './instructor-reviews/instructor-reviews.component';
// import { StudentSujetDetails } from './instructor-profile/instructor-profile.component';
// import { InstructorNotificationComponent } from './instructor-notification/instructor-notification.component';
// import { InstructorEditComponent } from './instructor-edit/instructor-edit.component';
// import { InstructorChatComponent } from './instructor-chat/instructor-chat.component';
// import { InstructorEarningsComponent } from './instructor-earnings/instructor-earnings.component';
//
// import { InstructorQuizDetailsComponent } from './instructor-quiz-details/instructor-quiz-details.component';
// import { InstructorEnrolledCourseComponent } from './instructor-enrolled-course/instructor-enrolled-course.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    SujetpfeAdminComponent,
    PfeDetailsComponent
    // InstructorAnnouncementsComponent,
    // InstructorAssignmentComponent,
    // InstructorWishlistComponent,
    // InstructorQaComponent,
    // InstructorQuizComponent,
    // InstructorQuizAttemptsComponent,
    // InstructorQuizAttemptsDetailsComponent,
    // InstructorReferralComponent,
    // InstructorWithdrawComponent,
    // InstructorTicketsComponent,
    // InstructorOrdersComponent,
    // InstructorReviewsComponent,
    // StudentSujetDetails,
    // InstructorNotificationComponent,
    // InstructorEditComponent,
    // InstructorChatComponent,
    // InstructorEarningsComponent,
    //
    // InstructorQuizDetailsComponent,
    // InstructorEnrolledCourseComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FeatherIconModule,
    RouterModule,
    SharedModule,
    AdminSidebarModule
  ],
})
export class AdminModule {
}
