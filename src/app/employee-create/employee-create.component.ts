import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css'],
})
export class EmployeeCreateComponent implements OnInit {
  message = null;
  empId;
  empDetails;
  isEditable = false;
  @ViewChild('form', { static: false }) updateForm: NgForm;

  constructor(
    private _empService: EmployeeService,
    private spinner: NgxSpinnerService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.empId = this._route.snapshot.params.id;
    if (this.empId) {
      this.spinner.show();
      this._empService.fetchSingleEmp(this.empId).subscribe((data: any) => {
        this.empDetails = data.data;
        console.log(this.empDetails);
        this.updateForm.form.patchValue({
          employee_age: this.empDetails.employee_age,
          employee_name: this.empDetails.employee_name,
          employee_salary: this.empDetails.employee_salary,
          id: this.empDetails.id,
        });
        this.isEditable = true;
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      });
    }
  }
  onSubmit(form: NgForm) {
    this.spinner.show();
    let body = {
      id: +form.value.id,
      employee_name: form.value.employee_name,
      employee_age: +form.value.employee_age,
      employee_salary: +form.value.employee_salary,
    };
    if (!this.isEditable) {
      this._empService.createUsers(body).subscribe((res) => {
        if (res.message) {
          setTimeout(() => {
            this.message = res.message;
            form.resetForm();
            this.spinner.hide();
          }, 500);
        }
      });
    }
    if (this.isEditable) {
      this._empService.updateEmployee(this.empId, body).subscribe((res) => {
        setTimeout(() => {
          this.message = res.message;
          form.resetForm();
          this.spinner.hide();
        }, 500);
      });
    }
  }
}
