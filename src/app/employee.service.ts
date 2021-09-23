import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  fetchEmpList() {
    return this.http
      .get('http://www.appgrowthcompany.com:5069/api/v1/employee/getAll')
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  fetchSingleEmp(id: number) {
    // https://reqres.in/api/users/
    return this.http
      .get('http://www.appgrowthcompany.com:5069/api/v1/employee/get/' + id)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  createUsers(emp) {
    // https://reqres.in/api/users
    return this.http
      .post('http://www.appgrowthcompany.com:5069/api/v1/employee/create', emp)
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError((error) => {
          return throwError('Something went wrong!');
        })
      );
  }
  updateEmployee(id: any, user: any) {
    return this.http
      .put(
        'http://www.appgrowthcompany.com:5069/api/v1/employee/update/' + id,
        user
      )
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError((error) => {
          return throwError('Something went wrong!');
        })
      );
  }
  deleteEmployee(id: any) {
    return this.http.delete(
      'http://www.appgrowthcompany.com:5069/api/v1/employee/delete/' + id
    );
  }
}
