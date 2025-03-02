import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseDetailsRoutingModule } from './course-details-routing.module';
import { CourseDetailsComponent } from './course-details.component';
import { FeatherIconModule } from 'src/app/shared/module/feather.module';
import { StudentSidebarModule } from "../../../student/common/student-sidebar/student-sidebar.module";


@NgModule({
  declarations: [
    CourseDetailsComponent
  ],
  imports: [
    CommonModule,
    CourseDetailsRoutingModule,
    FeatherIconModule,
    StudentSidebarModule
]
})
export class CourseDetailsModule { }
