import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  {path: '' ,redirectTo:'/employees',pathMatch:'full'},
  {path:'employees' ,component:EmployeeListComponent},
  {path:'employee/:id' ,component:EmployeeDetailComponent},
  {path:'employee-create' ,component:EmployeeCreateComponent},
  {path:'employee-update/:id' ,component:EmployeeCreateComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
