import { UploadVideoService } from './../../services/upload-video.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Aplicant } from '../../models/aplicant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { UsersService } from '../../services/users.service';
declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  upload: boolean;
  disabled = true;
  progress: Number = 0;
  video: File;
  files: File
  constructor(private usersService: UsersService, private _formBuilder: FormBuilder, private uploadVideoService: UploadVideoService) {

  }
  universities = [
    { id: 1, name: 'Universidad Nacional' },
    { id: 2, name: 'EAFIT' },
    { id: 3, name: 'Universidad de Antioquia' },
    { id: 4, name: 'Universidad de Medellin' },
    { id: 5, name: 'Universidad Pontificia Bolivariana' }
  ];


  res: boolean;
  selectedUniviversity: any = { id: 0, name: '' };
  namen: string = '';
  lastname: string = '';
  email: string = '';
  phone: string = '';
  university: string = '';
  praxisModality: string = 'firstjob';
  selfDescription: string = '';
  username: string = '';
  password: string = '';
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  submitted = false;
  rePassword;
  model: Aplicant;

  addCustomUser = (term) => ({ id: term, name: term });
  
  ngOnInit() {
    this.upload = false;
    //jquerys
    jQuery('#n1').click(function () {
      $('#pills-tab li:nth-child(2) a').tab('show');
    });
    jQuery('#n2').click(function () {
      $('#pills-tab li:nth-child(3) a').tab('show');
    });
    jQuery('#b2').click(function () {
      $('#pills-tab li:nth-child(1) a').tab('show');
    });
    jQuery('#b3').click(function () {
      $('#pills-tab li:nth-child(2) a').tab('show');
    });
    jQuery('#n3').click(function () {
      $('#pills-tab li:nth-child(4) a').tab('show');
    });
    jQuery('#b4').click(function () {
      $('#pills-tab li:nth-child(3) a').tab('show');
    });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  submit2() {
    this.upload = true;

    this.uploadVideoService.uploadfile(this.files);
    const progressInterval = setInterval(() => {
      this.progress = this.uploadVideoService.getProgress();
      if (this.progress == 100) {
        clearInterval(progressInterval);
      }
    }, 100);


    this.registerAplicant()

  }
  registerAplicant() {
      let prekey=this.uploadVideoService.getKey();
      let key=this.uploadVideoService.getFileUrl(prekey);
    
    this.model=new Aplicant();
    this.model.video = key;
    this.model.name = this.namen;
    this.model.lastName = this.lastname;
    this.model.email = this.email;
    this.model.username = this.username;
    this.model.password = this.password;
    this.model.phone = this.phone;
    this.model.university = this.selectedUniviversity.name;
    this.model.goal = this.praxisModality;
    this.model.selfDescription = this.selfDescription;
    console.log(this.model)
    this.usersService.newAplicant(this.model).subscribe(res=>console.log(res));
    

  }
  showFormControls(form: any) {
    return form && form.controls['name'] &&
      form.controls['name'].value; // Dr. IQ
  }
  submit() {
    this.progress = 0;
    this.video = this.uploadVideoService.getVideo();
    this.files = new File([this.video], this.username + String(".mp4"), {
      type: 'video/mp4'
    });
    console.log(this.files);


  }

  length(str: string, min: number, max: number) {
    if (str.length < min || str.length > max) {

      return true
    }
    else {

      return false
    }

  }
  validateEmail() {
    // Create a regular expression
    let regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // Test email against regular expression
    if (regExp.test(this.email)) {
      return false; // Return as valid email
    } else {
      return true // Return as invalid email
    }
  }
  validateSpace(str) {
    let regexp = /\s/;;
    if (regexp.test(this.password)) {
      return true;
    }
    else {
      return false;
    }

  }
}