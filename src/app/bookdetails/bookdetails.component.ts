import { Component, OnInit } from '@angular/core';
import { Book, BookService } from '../book.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
	selector: 'app-bookdetails',
	templateUrl: './bookdetails.component.html',
	styleUrls: [ './bookdetails.component.css' ]
})
export class BookdetailsComponent implements OnInit {
	public bookId = 0;
	public department: Book = null;
	constructor(private _route: ActivatedRoute, private _bookService: BookService, private _router: Router) {}

	ngOnInit(): void {
		//let id = parseInt(this._route.snapshot.paramMap.get('id'));

		this._route.paramMap.subscribe((params: ParamMap) => {
			this.bookId = parseInt(params.get('id'));
		});

		this._bookService.getBookById(this.bookId).subscribe((data) => {
			console.log(data);
			this.department = data;
		});
		console.log(this.department);
		//this.departmentId = id;
	}
}
