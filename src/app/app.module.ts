import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule, routingComponets } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AuthorlistComponent } from './authorlist/authorlist.component';
import { AuthorService } from './author.service';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { BookslistComponent } from './bookslist/bookslist.component';
import { BookdetailsComponent } from './bookdetails/bookdetails.component';
import { LoginComponent } from './login/login.component';
import { BookService } from './book.service';
import { AuthService } from './auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { AddbookComponent } from './addbook/addbook.component';
import { PublisherComponent } from './publisher/publisher.component';
import { PublisherService } from './publisher.service';

@NgModule({
	declarations: [
		AppComponent,
		routingComponets,
		BookdetailsComponent,
		LoginComponent,
		AddbookComponent,
		PublisherComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		NgxDatatableModule,
		ReactiveFormsModule,
		FormsModule,
		ReactiveFormsModule,
		ToastrModule.forRoot(),
		BrowserAnimationsModule
	],
	providers: [
		AuthorService,
		BookService,
		AuthService,
		PublisherService,
		AuthGuard,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptorService,
			multi: true
		}
	],
	bootstrap: [ AppComponent, routingComponets ]
})
export class AppModule {}
