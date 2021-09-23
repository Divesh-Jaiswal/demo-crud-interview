import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  p: number = 1;
  empListArray = [];
  filterListArray = [];
  key: any;
  reverse: boolean = false;
  fiterRange;

  constructor(
    private _empService: EmployeeService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.spinner.show();
    this._empService.fetchEmpList().subscribe((data: any) => {
      console.log(data);
      this.empListArray = data.allEmployees;
      this.filterListArray = data.allEmployees;
      setTimeout(() => {
        this.spinner.hide();
      }, 500);
      //  console.log(this.empListArray);
    });
  }

  onSort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  onSearch(event) {
    let key = event.target.value;
    if (key !== '') {
      this.empListArray = this.filterListArray.filter((el) => {
        return el.employee_name.search(new RegExp(key, 'i')) > -1;
      });
    } else {
      this.ngOnInit();
    }
  }
  condition = 'Greater Than';
  onFilterRangeChange(event) {
    console.log(event.target.value);
    if (event.target.value) {
      this.condition = event.target.value;
    }
  }
  onFilterSalary(event) {
    console.log(this.condition);
    let key = +event.target.value;
    if (key && this.condition) {
      if (this.condition == 'Greater Than') {
        this.empListArray = this.filterListArray.filter((el) => {
          return el.employee_salary > key;
        });
      }
      if (this.condition == 'Equals To') {
        this.empListArray = this.filterListArray.filter((el) => {
          return el.employee_salary == key;
        });
      }
      if (this.condition == 'Less Than') {
        this.empListArray = this.filterListArray.filter((el) => {
          return el.employee_salary < key;
        });
      }
    } else {
      this.ngOnInit();
    }
  }
  onFilterAge(event) {
    let key = +event.target.value;
    if (key && this.condition) {
      if (this.condition == 'Greater Than') {
        this.empListArray = this.filterListArray.filter((el) => {
          return el.employee_age > key;
        });
      }
      if (this.condition == 'Equals To') {
        this.empListArray = this.filterListArray.filter((el) => {
          return el.employee_age == key;
        });
      }
      if (this.condition == 'Less Than') {
        this.empListArray = this.filterListArray.filter((el) => {
          return el.employee_age < key;
        });
      }
    } else {
      this.ngOnInit();
    }
  }
  onChangeCreatedAt(event) {
    console.log(event.target.value);
    let key = moment(event.target.value).format('YYYY-MM-DD');
    console.log(key);
    if (key && this.condition) {
      if (this.condition == 'Greater Than') {
        this.empListArray = this.filterListArray.filter((el) => {
          return moment(el.createdAt).format('YYYY-MM-DD') > key;
        });
      }
      if (this.condition == 'Equals To') {
        this.empListArray = this.filterListArray.filter((el) => {
          return moment(el.createdAt).format('YYYY-MM-DD') == key;
        });
      }
      if (this.condition == 'Less Than') {
        this.empListArray = this.filterListArray.filter((el) => {
          return el.createdAt < key;
        });
      }
    } else {
      this.ngOnInit();
    }
  }
  onDeleteEmployee(id) {
    if (window.confirm('are you sure you want to delete this?')) {
      this._empService.deleteEmployee(id).subscribe((data) => {
        // console.log(data);
        this.getEmployeeList();
      });
    }
  }
}
