import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentProfileComponent } from './student-profile.component';
import { StudentProfileRoutingModule } from './student-profile-routing.module';

@NgModule({
  declarations: [StudentProfileComponent],
  imports: [CommonModule, StudentProfileRoutingModule],
})
export class StudentProfileModule {}
