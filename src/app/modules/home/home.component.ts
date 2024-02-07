import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { HomeService } from 'src/app/services/home.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  @ViewChild('dt') dataTable!: Table;
  studentForm!: FormGroup;
  classTypes: any = [
    {
      name: 'KGs',
      value: 'kgs',
    },
    {
      name: 'Primary',
      value: 'primary',
    },
    {
      name: 'Secondary',
      value: 'secondary',
    },
  ];
  selectedClassType: any;
  selectedYear: any;
  classes: any;
  selectedClass: any;
  maxDate!: Date;
  isCalenderActive: boolean = true;
  classArray: any;
  visible: boolean = false;
  selectedStudents: any = [];
  students: any = [];
  name: string = '';
  class: string = '';
  year: string = '';
  messages: any;

  constructor(
    private homeService: HomeService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear, 11, 31);
  }

  ngOnInit() {
    this.students = this.homeService.getArrayData('students') || [];
    this.studentForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      class: ['', Validators.required],
      year: ['', Validators.required],
      imageUrl: [''],
      subject: this.formBuilder.group({
        math: ['', Validators.required],
        english: ['', Validators.required],
        science: ['', Validators.required],
      }),
    });

    this.getClassesByclassType();
    if (this.students.length == 0) {
      this.getAllStudents();
    }
  }
  onChangeClass(ev:any){
    this.getAllStudents()
  }
  onYearChange(event: any) {
    // Handle the year change event here
    this.getAllStudents()
    console.log(this.selectedYear);
  }
  onChangeFilter(ev: any) {
    this.getAllStudents()
    if (ev.value != null) {
      const filteredClasses = this.classArray.filter((cls: any) => {
        return cls.type == ev.value.value;
      });
      this.classes = filteredClasses;
      this.isCalenderActive = false;
      this.selectedYear = this.maxDate as any;
    }
  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.dataTable.filterGlobal(
      ($event.target as HTMLInputElement).value,
      stringVal
    );
  }

  openAddStudentModal() {
    this.visible = true;
  }

  deleteStudent(event: any, id: any) {
    this.deleteConfirm(event, id);
  }

  deleteConfirm(event: Event, id: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.students = this.students.filter(
          (student: any) => student.id !== id
        );
        this.homeService.saveArrayData('students', this.students);
      },
      reject: () => {},
    });
  }

  addStudent() {
    this.studentForm.patchValue({
      id: this.generateRandomString(10),
      type: this.getClassCategory(this.studentForm.value.class),
    });
    if (this.studentForm.valid) {
      this.students.unshift(this.studentForm.value);
      this.homeService.saveArrayData('students', this.students);
      this.studentForm.reset();
      this.visible = false;
      this.cdr.detectChanges();
    } else {
      this.messages = [
        {
          severity: 'error',
          summary: 'Error',
          detail: 'Please fill required details',
        },
      ];
    }
  }

  clearFilter(ev: any) {
    this.selectedClassType = undefined;
    this.selectedClass = undefined;
    this.classes = [];
    this.isCalenderActive = true;
    this.selectedYear = undefined;
    this.getAllStudents();
  }

  getClassesByclassType() {
    this.homeService.getClasses().subscribe({
      next: (response: any) => {
        this.classArray = response;
      },
    });
  }

  applyFilters() {
    const dateString = this.selectedYear;
    const date = new Date(dateString);
    const year = date.getFullYear();
    this.students = this.students.filter((student: any) => {
      return (
        student.type == this.selectedClassType.value &&
        student.year == year &&
        student.class == this.selectedClass.classValue
      );
    });
  }
  getAllStudents() {
    this.homeService.getAllStudents().subscribe({
      next: (res: any) => {
        this.students = res;
        this.homeService.saveArrayData('students', this.students);
      },
      error: (err: any) => {},
    });
  }
  generateRandomString(length: any) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    return result;
  }

  getClassCategory(className: any) {
    if (className.toLowerCase().includes('kg')) {
      return 'kgs';
    } else {
      const classNumber = parseInt(className, 10);
      if (classNumber >= 2 && classNumber <= 6) {
        return 'primary';
      } else if (classNumber >= 7 && classNumber <= 10) {
        return 'secondary';
      } else {
        return 'kgs'; // Or you can handle other cases according to your requirement
      }
    }
  }

  navigate(student: any) {
    this.router.navigate(['/student-profile/' + student.id]);
    this.homeService.sendTabChangeEvent(student);
  }

  onEditComplete(event: any) {
    this.homeService.saveArrayData('students', this.students);
  }
}
