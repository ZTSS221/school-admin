import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
})
export class StudentProfileComponent {
  studentDetails: any;
  subscription!: Subscription;
  constructor(private homeService: HomeService, private route: ActivatedRoute) {
    this.subscription = this.homeService.tabChangeEvent$.subscribe(
      (student: any) => {
        this.studentDetails = student;
      }
    );
  }
  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    if (!this.studentDetails) {
      let data = this.homeService.getArrayData('students') || [];
      this.studentDetails = this.homeService.getStudentById(id, data);
    }
  }
}
