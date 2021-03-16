import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint: string = 'http://localhost:3000/users';
  list$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get all users from the database.
   * @returns on observable with all users.
   */
  getAll(): void {
    this.http.get<User[]>(this.endpoint).subscribe(
      event => this.list$.next(event)
    )
  }

  /**
   * Get a specified user from the database by id.
   * @param id {number} user id.
   * @returns an observable with a user object.
   */
  get(id: number): Observable<User> {
    id = typeof id === 'string' ? parseInt(id, 10) : id;
    if ( id !== 0 ) {
      return this.http.get<User>(`${this.endpoint}/${id}`)
    } else {
      return of ( new User());
    }
  }

  /**
   * Delete a user from the database.
   * The method is: this.http.delete
   */
  remove(user: User): void {
    this.http.delete<User>(`${this.endpoint}/${user.id}`).subscribe(
      () => this.getAll()
    );
  }

  /**
   * Create a user in the database.
   * The method is: this.http.post
   */
  create(user: User): Observable<User> {
    return this.http.post<User>(this.endpoint, user);
  }


  /**
   * Update a user in the database.
   * The method is: this.http.patch
   */
  update(user: User): Observable<User> {
    return this.http.patch<User>(`${this.endpoint}/${user.id}`, user)
  }
}
