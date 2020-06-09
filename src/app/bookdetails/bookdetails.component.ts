import { Component, OnInit } from '@angular/core';
import { Book, BookService } from '../book.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PublisherService, Publisher } from '../publisher.service';

@Component({
	selector: 'app-bookdetails',
	templateUrl: './bookdetails.component.html',
	styleUrls: [ './bookdetails.component.css' ]
})
export class BookdetailsComponent implements OnInit {
	public bookId = 0;
	public book: Book = null;
	isEdit: boolean = false;
	formData: Book;
	publishers: Publisher[];

	constructor(
		private _route: ActivatedRoute,
		private _bookService: BookService,
		private _publisherService: PublisherService,
		private _router: Router,
		private fb: FormBuilder
	) {}

	ngOnInit(): void {
		//let id = parseInt(this._route.snapshot.paramMap.get('id'));

		this._route.paramMap.subscribe((params: ParamMap) => {
			this.bookId = parseInt(params.get('id'));
		});

		this._bookService.getBookById(this.bookId).subscribe((data) => {
			this.book = data;
			this.formData = data;
			console.log(this.book);
		});

		this._publisherService.getPublishers().subscribe((data) => {
			this.publishers = data;
			console.log(this.publishers);
		});
		//this.departmentId = id;
	}

	editBook() {
		this.isEdit = !this.isEdit;
	}

	// onSubmit(form: NgForm) {
	// 	// if (this.validateForm()) {
	// 	//   this.service.saveOrUpdateOrder().subscribe(res => {
	// 	// 	this.resetForm();
	// 	// 	this.toastr.success('Submitted Successfully', 'Restaurent App.');
	// 	// 	this.router.navigate(['/orders']);
	// 	//   })
	// 	// }
	// }

	saveBook() {
		//console.log(this.formData);
		this._bookService.saveBook(this.formData);
	}
}
