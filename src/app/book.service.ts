import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class BookService {
	_url = 'http://localhost:61063/api/Book';
	//_token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjMiLCJuYmYiOjE1OTEwMjAxNjEsImV4cCI6MTU5MTAyMDIyMSwiaWF0IjoxNTkxMDIwMTYxfQ.Hy_pYBg7Un5dob5WEHcJZX9tpxOATTCgl4tfIO0U5J4';
	// header = {
	// 	headers: new HttpHeaders().set('Authorization', `bearer ${this._token}`)
	// };

	constructor(private _http: HttpClient) {}

	getBooks(): Observable<Book[]> {
		return this._http.get<Book[]>(this._url).pipe(catchError(this.errorHandler));
	}

	getBookById(bookId: number): Observable<Book> {
		return this._http.get<Book>(`${this._url}/${bookId}`).pipe(catchError(this.errorHandler));
	}

	saveBook(book: Book) {
		console.log(book);
		console.log(environment.apiurl);
		return this._http.put(`${environment.apiurl}/api/book`, book);
	}

	errorHandler(error: HttpErrorResponse) {
		return observableThrowError(error.message || 'Server Error');
	}
}

export class Book {
	bookId: number;
	title: string;
	type: string;
	price: number;
	notes: string;
	pubId: string;
	royalty: number;
	publishedDate: string;
	pub: {
		pubId: number;
		publisherName: string;
		city: string;
		state: string;
		country: string;
	};
}
