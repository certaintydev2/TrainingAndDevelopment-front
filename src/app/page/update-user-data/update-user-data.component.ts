import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';

@Component({
  selector: 'app-update-user-data',
  templateUrl: './update-user-data.component.html',
  styleUrls: ['./update-user-data.component.css']
})
export class UpdateUserDataComponent implements OnInit {

  constructor(private fb: FormBuilder,private userService:UserService,private router: Router,private snackBar: MatSnackBar,private route:ActivatedRoute) { }

  myFormGro!:FormGroup;
  profileGro!:FormGroup;

  userId:any;
  userData:any;
  roles:any;
  log_name:any;
  log_email:any;
  log_useName:any;
  log_password:any;
  log_profile:any;
  selectedProfile:any;
  userRole:any;
  disabled = false;
  profile:any;

  coursesList:any=[
    {value: 'JAVA', courseName: 'JAVA'},
    {value: 'PYTHON', courseName: 'PYTHON'},
    {value: 'NODE JS', courseName: 'NODE JS'},
    {value: 'ANGULAR', courseName: 'ANGULAR'},
    {value: 'REACT JS', courseName: 'REACT JS'},
    {value: 'PHP', courseName: 'PHP'}
  ];

  selectedItems:any;
  selectedProfileName:any;
  dropdownSettings:IDropdownSettings = {};
  profileDropdownSettings:IDropdownSettings = {};


  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];

    this.userService.getUserById(this.userId).subscribe(
      (res)=>{
        this.userData=res;
        this.log_name=this.userData.name;
        this.log_email=this.userData.email;
        this.log_useName=this.userData.userName;
        this.log_password=this.userData.password;
        this.log_profile=this.userData.profile;
        this.userRole=this.userData.roles;
        setTimeout(() => {
          for (let i = 0; i < this.userRole.length; i++) {
            this.selectedProfile=this.userRole[i].roleName;
          }
        }, 2000);
      },(err:HttpErrorResponse)=>{
        if(err.status===401){
          this.userService.logout();
        }
      });
      this.userService.getAllRoles().subscribe((res) => {
        this.roles = res;
      },(err:HttpErrorResponse)=>{
        if(err.status===401){
          this.userService.logout();
        }
      });
      this.userService.getAllProfile().subscribe(
        (res)=>{
          console.log(res);
          
          this.profile=res;
        }
      );
      this.dropdownSettings= {
        singleSelection: false,
        idField: 'id',
        textField: 'roleName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
      this.profileDropdownSettings= {
        singleSelection: false,
        idField: 'id',
        textField: 'profileName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
    this.myFormGro = this.fb.group({
      roles: ['', Validators.compose(
        [Validators.required]
      )],
      profile: ['', Validators.compose(
        [Validators.required]
      )]          
  });
  }

  ngAfterViewInit(){
    setTimeout(() => {
     this.selectedItems=this.userRole;
     this.selectedProfileName=this.log_profile;
     this.myFormGro.patchValue({
       roles:this.selectedItems,
       profile:this.selectedProfileName
     });
    }, 100);
   }
   onItemSelect(item: any) {
     console.log(item);
   }
   onSelectAll(items: any) {
     console.log(items);
   }

   prevoius() {
    window.history.back();
  }

  updateUser(data:any) {
    this.userService.updateUser(this.userId,data).subscribe(
     (res)=>{
       console.log(res);
       
       let snack = this.snackBar.open("User Updated Successfully", "Done");
             snack.afterDismissed().subscribe(() => {
           });
             snack.onAction().subscribe(() => {
           });
           this.prevoius();
     },(err:HttpErrorResponse)=>{
       if(err.status===401){
         this.userService.logout();
       }
     }
    );
   }

}
