import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthorService } from '../author.service';
import { Observable } from 'rxjs';
import { BookService, Book } from '../book.service';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';

@Component({
	selector: 'app-bookslist',
	templateUrl: './bookslist.component.html',
	styleUrls: [ './bookslist.component.css' ]
})
export class BookslistComponent implements OnInit {
	books: Book[] = [];
	temp = [];
	errorMessage = '';
	rows = [];
	loadingIndicator = true;
	reorderable = true;

	columns = [
		{ prop: 'bookId' },
		{ name: 'title' },
		{ name: 'type', sortable: false },
		{ name: 'price' },
		{ name: 'publishedDate' },
		{ name: 'publisherName' }
	];

	@ViewChild(DatatableComponent) table: DatatableComponent;
	ColumnMode = ColumnMode;
	constructor(private _bookService: BookService, private _router: Router) {}

	ngOnInit() {
		this._bookService.getBooks().subscribe((data) => {
			console.log(typeof data);
			this.books = data;
			this.rows = data;
			this.temp = [ ...data ];
			console.log(typeof this.books);
			console.log(this.books.filter((a) => a.bookId === 1).map((a) => a.notes));
		}, (error) => (this.errorMessage = error));
	}

	updateFilter(event) {
		const val = event.target.value.toLowerCase();

		// filter our data
		const temp = this.temp.filter(function(d) {
			return d.title.toLowerCase().indexOf(val) !== -1 || !val;
		});

		console.log(temp);
		// update the rows
		this.rows = temp;
		// Whenever the filter changes, always go back to the first page
		this.table.offset = 0;
	}

	onActivate(event) {
		if (event.type == 'click') {
			console.log(event.row.bookId);
			this._router.navigate([ '/books/view', event.row.bookId ]);
		}
	}
}
