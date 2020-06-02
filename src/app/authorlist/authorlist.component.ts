import { Component, OnInit, ViewChild } from '@angular/core';
import { IAuthor } from '../author';
import { AuthorService } from '../author.service';
import { Observable } from 'rxjs';
import { DatatableComponent } from '@swimlane/ngx-datatable';

//import { ColumnMode } from 'projects/swimlane/ngx-datatable/src/public-api';

@Component({
	selector: 'app-authorlist',
	templateUrl: './authorlist.component.html',
	styleUrls: [ './authorlist.component.css' ]
})
export class AuthorlistComponent implements OnInit {
	public authors = [];
	public errorMessage = '';
	rows = [];
	temp = [];
	loadingIndicator = true;
	reorderable = true;

	columns = [ { prop: 'lastName' }, { name: 'firstName' }, { name: 'address', sortable: false } ];
	@ViewChild(DatatableComponent) table: DatatableComponent;
	//ColumnMode = ColumnMode;

	constructor(private _service: AuthorService) {}

	ngOnInit() {
		this._service.getAuthors().subscribe((data) => {
			this.rows = data;
			this.temp = [ ...data ];
			setTimeout(() => {
				this.loadingIndicator = false;
			}, 1500);
		}, (error) => (this.errorMessage = error));
	}

	updateFilter(event) {
		const val = event.target.value.toLowerCase();

		// filter our data
		const temp = this.temp.filter(function(d) {
			return d.firstName.toLowerCase().indexOf(val) !== -1 || !val;
		});

		console.log(temp);
		// update the rows
		this.rows = temp;
		// Whenever the filter changes, always go back to the first page
		this.table.offset = 0;
	}
}

// export class AuthorlistComponent implements OnInit {
// 	public authors = [];
// 	public errorMessage = '';
// 	constructor(private _service: AuthorService) {}

// 	ngOnInit() {
// 		this._service.getAuthors().subscribe((data) => {
// 			this.authors = data;
// 			console.log(this.authors);
// 		}, (error) => (this.errorMessage = error));
// 	}
// }
