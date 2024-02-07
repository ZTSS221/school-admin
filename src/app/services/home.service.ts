import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private tabChangeEventSource = new BehaviorSubject<any>(null);
  tabChangeEvent$ = this.tabChangeEventSource.asObservable();

  constructor(private http: HttpClient) {}

  getStudents(
    classType: any,
    classYear: any,
    studentClass: any
  ): Observable<any> {

    return this.http.get<any>('./assets/data/students.json').pipe(
      map((data: any) => {
        return data.filter((student: any) => {
          return (
            student.type == classType &&
            student.year == classYear &&
            student.class == studentClass
          );
        });
      })
    );
  }
  getAllStudents(): Observable<any> {
    return this.http.get<any>('./assets/data/students.json').pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getStudentById(userId: any, data?: any): Observable<any> {
    if (!data) {
      return this.http.get<any>('./assets/data/students.json').pipe(
        map((data: any) => {
          return data.filter((student: any) => {
            return student.id == userId;
          });
        })
      );
    } else {
      return data.filter((student: any) => {
        return student.id == userId;
      })?.[0];
    }
  }

  getClassType(): Observable<any> {
    return this.http.get<any>('./assets/data/typeFilterData.json').pipe(
      map((data: any) => {
        return data;
      })
    );
  }
  getClasses(): Observable<any> {
    return this.http.get<any>('./assets/data/classData.json').pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  // Function to save array data in session storage
  saveArrayData(key: string, data: any[]): void {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  // Function to retrieve array data from session storage
  getArrayData(key: string): any[] | null {
    const storedData = sessionStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  }

  // Function to clear array data from session storage
  clearArrayData(key: string): void {
    sessionStorage.removeItem(key);
  }

  sendTabChangeEvent(student: any) {
    this.tabChangeEventSource.next(student);
  }
}
