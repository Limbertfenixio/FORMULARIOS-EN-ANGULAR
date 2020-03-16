import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { ReactiveFormsComponent } from './components/reactive-forms/reactive-forms.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '' ,  redirectTo: 'contacts', pathMatch: 'full'},
  { path: 'contacts', component: ReactiveFormsComponent },
  { path: 'formBuilder', component: FormBuilderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
