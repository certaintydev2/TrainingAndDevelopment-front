import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private router: Router) { }
  

  //add User
  public addUser(user:any){
    return this.http.post(`${baseUrl}/authenticate/add-userData`,user);
  }

  public getAllRoles() {
    return this.http.get(`${baseUrl}/authenticate/getAllRoles`);
  }

  public loginUser(login:any){
    return this.http.post(`${baseUrl}/authenticate`,login);
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public getUserByUserName(username:any) {
    return this.http.get(`${baseUrl}/authenticate/getUserByUserName/`+username);
  }

  public getUserById(id:any) {
    return this.http.get(`${baseUrl}/getUserById/`+id);
  }

  public getUser() {
    return this.http.get(`${baseUrl}/getUser`);
  }

  public deleteUser(id:any) {
    return this.http.delete(`${baseUrl}/deleteById/`+id);
  }

  public updateUser(id:any,user:any){
    return this.http.put(`${baseUrl}/updateUser/`+id,user);
  }

  public addCourse(course:any){
    return this.http.post(`${baseUrl}/add-course`,course);
  }

  public getCourses() {
    return this.http.get(`${baseUrl}/authenticate/getCourseNames`);
  }

  public getAllUsers() {
    return this.http.get(`${baseUrl}/getAllUsers`);
  }

  public getAllUsersExceptAdmin() {
    return this.http.get(`${baseUrl}/getAllUsersExceptAdmin`);
  }

  public getTopics() {
    return this.http.get(`${baseUrl}/getTopics`);
  }

  public getSubTopics() {
    return this.http.get(`${baseUrl}/getSubTopics`);
  }

  public getQuestions() {
    return this.http.get(`${baseUrl}/getQuestions`);
  }

  public addTopic(topic:any){
    return this.http.post(`${baseUrl}/add-topics`,topic);
  }

  public addSubTopic(subTopic:any){
    return this.http.post(`${baseUrl}/add-sub_topics`,subTopic);
  }

  public addQuestion(question:any){
    return this.http.post(`${baseUrl}/add-questions`,question);
  }

  public getTopicsByCourseId(courseId:any) {
    return this.http.get(`${baseUrl}/getTopicsById/`+courseId);
  }

  public getSubTopicsByTopicId(topicId:any) {
    return this.http.get(`${baseUrl}/getSubTopicsById/`+topicId);
  }

  public getQuestionsBySubTopicId(subTopicId:any) {
    return this.http.get(`${baseUrl}/getQuestionsById/`+subTopicId);
  }

  public sendEmail(email:any) {
    return this.http.post(`${baseUrl}/sendEmail`,email);
  }

  public sendOtp(email:any) {
    return this.http.post(`${baseUrl}/authenticate/send-otp`,email);
  }

  public changePassword(data:any) {
    return this.http.post(`${baseUrl}/authenticate/forgotPassword`,data);
  }

  public getQuestionByCourseName(courseName:any) {
    return this.http.get(`${baseUrl}/getQuestionsByCourse/`+courseName);
  }

  public getCourseByCourseId(courseId:any) {
    return this.http.get(`${baseUrl}/getCourseByCourseId/`+courseId);
  }

  public updateCourse(courseId:any,course:any){
    return this.http.put(`${baseUrl}/updateCourse/`+courseId,course);
  }

  public getTopicByTopicId(id:any) {
    return this.http.get(`${baseUrl}/getTopicByTopicId/`+id);
  }

  public updateTopic(id:any,topic:any){
    return this.http.put(`${baseUrl}/updateTopic/`+id,topic);
  }

  public deleteCourse(courseId:any) {
    return this.http.delete(`${baseUrl}/deleteCourse/`+courseId);
  }

  public deleteTopic(id:any) {
    return this.http.delete(`${baseUrl}/deleteTopic/`+id);
  }

  public deleteSubTopic(id:any) {
    return this.http.delete(`${baseUrl}/deleteSubTopic/`+id);
  }

  public getSubTopicBySubTopicId(id:any) {
    return this.http.get(`${baseUrl}/getSubTopicBySubTopicId/`+id);
  }

  public deleteQuestion(id:any) {
    return this.http.delete(`${baseUrl}/deleteQuestion/`+id);
  }

  public getQuestionsByQuestionId(id:any) {
    return this.http.get(`${baseUrl}/getQuestionsByQuestionId/`+id);
  }

  public logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  public updateSubTopic(id:any,subTopic:any){
    return this.http.put(`${baseUrl}/updateSubTopic/`+id,subTopic);
  }

  public updateQuestion(id:any,question:any){
    return this.http.put(`${baseUrl}/updateQuestion/`+id,question);
  }

  public solveQuestion(id:any,questionStatus:any) {
    return this.http.post(`${baseUrl}/solveQuestion/`+id,questionStatus);
  }

  public getStatusByQuestionId(id:any) {
    return this.http.get(`${baseUrl}/getStatusByQuestionId/`+id);
  }

  public getAuthorList() {
    return this.http.get(`${baseUrl}/getAuthorList`);
  }

  public getMentorList() {
    return this.http.get(`${baseUrl}/getMentorList`);
  }

  public getTraineeList() {
    return this.http.get(`${baseUrl}/getTraineeList`);
  }
}
