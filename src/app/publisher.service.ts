import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';

@Injectable({
	providedIn: 'root'
})
export class PublisherService {
	_url = 'http://localhost:61063/api/publisher';
	publishers: Publisher[] = [];

	constructor(private _httpClient: HttpClient) {}

	getPublishers(): Observable<Publisher[]> {
		return this._httpClient.get<Publisher[]>(this._url);
	}
}

export class Publisher {
	pubId: number;
	publisherName: string;
	city: string;
	state: string;
	country: string;
}
