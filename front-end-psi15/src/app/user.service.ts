import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private backEnd = 'http://localhost:3065';

    constructor (
      private http: HttpClient,
      private messageService: MessageService) {}

    /**
     * POST: add a new user to the server
     */  
    addUser(user: User): Observable<User> {
      return this.http.post<User>(this.backEnd, this.httpOptions).pipe(
        tap((newUser: User) => this.log(`added a new user w/ id=${newUser.id}`)),
        catchError(this.handleError<User>('addUser'))
      );
    }

  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    private log(message: string) {
      this.messageService.add(`HeroService: ${message}`);
    }
}
