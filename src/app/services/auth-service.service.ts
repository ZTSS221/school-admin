import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  // constructor(private http: HttpClient) { }

  // login(username: string, password: string): Observable<any> {
  //   return this.http.get<any>('assets/users.json').pipe(
  //     map(users => {
  //       const user = users.find(u => u.username === username && u.password === password);
  //       if (user) {
  //         // Assuming you have some token generation logic here
  //         const token = 'generated_token_here';
  //         return { success: true, token };
  //       } else {
  //         return { success: false, message: 'Invalid username or password' };
  //       }
  //     })
  //   );
  // }
}