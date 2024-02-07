import { Component } from '@angular/core';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
})
export class StudentProfileComponent {
  studentDetails: any;
  subscription!: Subscription;
  constructor(private dataSharingService: DataSharingService) {
    this.subscription = this.dataSharingService.tabChangeEvent$.subscribe(
      (student: any) => {
        this.studentDetails = student;
      }
    );
  }
  ngOnInit() {}
}
