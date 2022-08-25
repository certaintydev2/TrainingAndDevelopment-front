import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  check:Boolean=true;
  userList:any;
  authorList:any;
  traineeList:any;
  courseList:any;
  numberOfCourses:any;
  numberOfUsers:any;
  numberOfAuthors:any;
  numberOfTrainee:any;
  user: any;
  courseName:any;
  userRoleList:any;
  userData: any;
  loggedInUserData: any;
  loggedInUserId: any = localStorage.getItem('id');

  Round:EChartsOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: 'bottom'

    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        // radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        radius: [50, 150],
        center: ['50%', '50%'],
        
        itemStyle: {

          
          borderRadius: 9,
          borderColor: '#fff',
          borderWidth: 2

        },
        
        
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 40, name: 'rose 1' },
          { value: 38, name: 'rose 2' },
          { value: 32, name: 'rose 3' },
          { value: 30, name: 'rose 4' },
          { value: 28, name: 'rose 5' },
          { value: 26, name: 'rose 6' },
          { value: 22, name: 'rose 7' }
        ]
      }
    ]
  };
  
  

  gradientChart:EChartsOption= {
    tooltip:{},
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    xAxis: {
       data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisLabel: {
        inside: true,
        color: '#fff'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999'
      }
    },
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data: [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220]
      }
    ]
  };

  ngOnInit(): void {
    // debugger;
    this.userService.getUserById(this.loggedInUserId).subscribe(
      (res) => {
        console.log('user', res);
        this.userData = JSON.stringify(res);
        this.loggedInUserData = JSON.parse(this.userData);
        this.user = this.loggedInUserData.name;
        this.courseName = this.loggedInUserData.profile;
        this.userRoleList = this.loggedInUserData.roles;
        if(this.userRoleList.length >1){
          this.check = false;
        }
      } ,(err:HttpErrorResponse)=>{
          if(err.status===401){
            this.logout();
          }
      }
      );
      this.userService.getAllUsersExceptAdmin().subscribe(
        (res) =>{
          this.userList=res;
          this.numberOfUsers=this.userList.length;
        
        },(err:HttpErrorResponse)=>{
          if(err.status===401){
            this.logout();
          }
      }
      );

      this.userService.getCourses().subscribe(
        (res) =>{
          
        this.courseList=res;
        this.numberOfCourses=this.courseList.length;

        },(err:HttpErrorResponse)=>{
          if(err.status===401){
            this.logout();
          }
      }
      );

      this.userService.getAuthorList().subscribe(
        (res) =>{
          
        this.authorList=res;
        this.numberOfAuthors=this.authorList.length;

        },(err:HttpErrorResponse)=>{
          if(err.status===401){
            this.logout();
          }
      }
      );

      this.userService.getTraineeList().subscribe(
        (res) =>{
          
        this.traineeList=res;
        this.numberOfTrainee=this.traineeList.length;

        },(err:HttpErrorResponse)=>{
          if(err.status===401){
            this.logout();
          }
      }
      );
  }

  logout() {
    this.userService.logout();
  }





}
