import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { PageComponent } from './page.component';
import { HomeComponent } from './home/home.component';
import {MatCardModule} from '@angular/material/card';
import { MatSlideToggleModule ,} from '@angular/material/slide-toggle';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'
import {MatSelectModule} from '@angular/material/select';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CourseComponent } from './course/course.component';
import { TopicComponent } from './topic/topic.component';
import { ViewCourseComponent } from './view-course/view-course.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { ViewTopicComponent } from './view-topic/view-topic.component';
import { SubTopicComponent } from './sub-topic/sub-topic.component';
import { ViewSubTopicComponent } from './view-sub-topic/view-sub-topic.component';
import { QuestionComponent } from './question/question.component';
import { ViewQuestionComponent } from './view-question/view-question.component';
import { TopicViewComponent } from './topic-view/topic-view.component';
import { SubTopicViewComponent } from './sub-topic-view/sub-topic-view.component';
import { QuestionViewComponent } from './question-view/question-view.component';
import { EmailComponent } from './email/email.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { PerformQuestionComponent } from './perform-question/perform-question.component';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { UpdateTopicComponent } from './update-topic/update-topic.component';
import { UpdateSubTopicComponent } from './update-sub-topic/update-sub-topic.component';
import { UpdateQuestionComponent } from './update-question/update-question.component';


@NgModule({
  declarations: [
    PageComponent,
    HomeComponent,
    CourseComponent,
    TopicComponent,
    ViewCourseComponent,
    ViewUsersComponent,
    ViewTopicComponent,
    SubTopicComponent,
    ViewSubTopicComponent,
    QuestionComponent,
    ViewQuestionComponent,
    TopicViewComponent,
    SubTopicViewComponent,
    QuestionViewComponent,
    EmailComponent,
    ViewProfileComponent,
    PerformQuestionComponent,
    UpdateCourseComponent,
    AddUserComponent,
    ConfirmationDialogComponent,
    UpdateTopicComponent,
    UpdateSubTopicComponent,
    UpdateQuestionComponent,
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatCardModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatGridListModule,
    MatSnackBarModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class PageModule { }
