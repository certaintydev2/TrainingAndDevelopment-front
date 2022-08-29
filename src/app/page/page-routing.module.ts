import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page.component';
import { HomeComponent } from './home/home.component';
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
import { AuthGuardGuard } from '../auth/auth-guard.guard';
import { EmailComponent } from './email/email.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { PerformQuestionComponent } from './perform-question/perform-question.component';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateTopicComponent } from './update-topic/update-topic.component';
import { UpdateSubTopicComponent } from './update-sub-topic/update-sub-topic.component';
import { UpdateQuestionComponent } from './update-question/update-question.component';
import { SolveQuestionComponent } from './solve-question/solve-question.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { MentorListComponent } from './mentor-list/mentor-list.component';
import { TraineeListComponent } from './trainee-list/trainee-list.component';
import { UpdateUserDataComponent } from './update-user-data/update-user-data.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'addUser',
    component: AddUserComponent
  },
  {
    path: 'course',
    component: CourseComponent
  },
  {
    path: 'topic',
    component: TopicComponent
  },
  {
    path: 'subTopic',
    component: SubTopicComponent
  },
  {
    path: 'viewCourse',
    component: ViewCourseComponent
  },
  {
    path: 'viewUsers',
    component: ViewUsersComponent
  },
  {
    path: 'viewTopics',
    component: ViewTopicComponent
  },
  {
    path: 'viewSubTopics',
    component: ViewSubTopicComponent
  },
  {
    path: 'question',
    component: QuestionComponent
  },
  {
    path: 'viewQuestions',
    component: ViewQuestionComponent
  },
  {
    path: 'topicView/:id',
    component: TopicViewComponent
  },
  {
    path: 'subTopicView/:id',
    component: SubTopicViewComponent
  },
  {
    path: 'questionView/:id',
    component: QuestionViewComponent
  },
  {
    path: 'sendEmail',
    component: EmailComponent
  },
  {
    path: 'viewProfile',
    component: ViewProfileComponent
  },
  {
    path: 'performQuestion/:courseName',
    component: PerformQuestionComponent
  },
  {
    path: 'updateCourse/:id',
    component: UpdateCourseComponent
  },
  {
    path: 'updateTopic/:id',
    component: UpdateTopicComponent
  },
  {
    path: 'updateSubTopic/:id',
    component: UpdateSubTopicComponent
  },
  {
    path: 'updateQuestion/:id',
    component: UpdateQuestionComponent
  },
  {
    path: 'solveQuestion/:id',
    component: SolveQuestionComponent
  },
  {
    path: 'viewAuthors',
    component: AuthorListComponent
  },
  {
    path: 'viewMentors',
    component: MentorListComponent
  },
  {
    path: 'viewTrainee',
    component: TraineeListComponent
  },
  {
    path: 'updateUser/:id',
    component: UpdateUserDataComponent
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
