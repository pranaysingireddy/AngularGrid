import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'app-login',
	//template: `<h1>hello</h1>`,
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	loginUserData: any = {};
	isAuthorized: boolean = true;

	//constructor() {}
	constructor(private _auth: AuthService, private _router: Router) {}

	ngOnInit() {}

	loginUser() {
		this.isAuthorized = true;
		console.log(this.loginUserData);
		this._auth.loginUser(this.loginUserData).subscribe(
			(res) => {
				//this.isAuthorized = true;
				console.log(res);
				localStorage.setItem('token', res.accessToken);
				this._router.navigate([ '/books' ]);
			},
			(err) => {
				this.isAuthorized = false;
				console.log(err);
			}
		);
	}
}
