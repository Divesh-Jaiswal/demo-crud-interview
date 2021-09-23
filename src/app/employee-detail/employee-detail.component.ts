import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent implements OnInit {
  emp: any = {};
  img =
    'https://img.pngio.com/profile-icon-png-image-free-download-searchpngcom-profile-icon-png-673_673.png';
  constructor(
    private _route: ActivatedRoute,
    private _empService: EmployeeService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    let empId = this._route.snapshot.params.id;
    if (empId) {
      this._empService.fetchSingleEmp(empId).subscribe((data: any) => {
        this.emp = data.data;
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      });
    }
  }
}
