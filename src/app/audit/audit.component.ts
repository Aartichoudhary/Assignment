import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';

import { Audit } from '@/_models';
import { AuditService, AuthenticationService } from '@/_services';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { post } from 'jquery';
import { userInfo } from 'os';

declare  var $;
@Component({ templateUrl: 'audit.component.html' })
export class AuditComponent implements OnInit
{
    @ViewChild('dataTable',{static:true}) table;
    dataTable:any;
    dtOptions: DataTables.Settings = {};
    today = new Date("February 04, 2011 19:00:00"); //this is the 12hr date format 
    returnUrl: string;
    audits = [];
    showContent: boolean;
      constructor(
        private authenticationService: AuthenticationService,
        private auditService: AuditService,
        private router: Router,
        private http:HttpClient)
    {
    }
    selectedLevel;
    isLoading = true;

  data:Array<Object> = [
      {id: this.today, name: "name1"},

  ];

 
ngOnInit(): void {

    this.audits = [];
    setTimeout(()=>
    this.showContent=true,2000);
    this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5,
    processing: true,
    serverSide:false,

  };
this.loadAllAudits()
}
selected(){
  var date = new Date("February 04, 2011 19:00:00");
  var options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  var timeString = date.toLocaleString();
  console.log("date format",timeString);
  this.selectedLevel.id=timeString;
}


 private loadAllAudits()
    {
        this.auditService.getAll()
            .pipe(first())
            .subscribe(audits => {
              this.isLoading=false
                this.audits = audits
            });
                 
                
                

                
    }
}