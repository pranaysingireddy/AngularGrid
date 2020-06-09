import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { IAuthor } from './author';
import { tap, catchError } from 'rxjs/operators';
import { throwError as observableThrowError, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthorService {
	private url = 'http://localhost:61063/api/Authors';
	constructor(private http: HttpClient) {}

	getAuthors(): Observable<IAuthor[]> {
		return this.http.get<IAuthor[]>(this.url).pipe(catchError(this.errorHandler));
	}
	errorHandler(error: HttpErrorResponse) {
		return observableThrowError(error.message || 'Server Error');
	}
}
