import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorlistComponent } from './authorlist/authorlist.component';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { BookslistComponent } from './bookslist/bookslist.component';
import { BookdetailsComponent } from './bookdetails/bookdetails.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AddbookComponent } from './addbook/addbook.component';
import { PublisherComponent } from './publisher/publisher.component';

const routes: Routes = [
	{ path: '', redirectTo: '/books', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{ path: 'authors', component: AuthorlistComponent, canActivate: [ AuthGuard ] },
	{ path: 'books', component: BookslistComponent },
	{ path: 'publishers', component: PublisherComponent },
	{ path: 'books/add', component: AddbookComponent },
	{ path: 'books/view/:id', component: BookdetailsComponent },
	{ path: '**', component: PageNotfoundComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}

export const routingComponets = [
	AuthorlistComponent,
	BookslistComponent,
	PageNotfoundComponent,
	LoginComponent,
	AddbookComponent,
	PublisherComponent
];
