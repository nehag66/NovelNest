import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardLayoutComponent } from 'app/card-layout/card-layout.component';
import { MaterialModule } from 'app/material.module';
import { CardDetails } from 'app/models/card';
import { ApiService } from 'services/api.service';

@Component({
	selector: 'app-sell-old-books',
	standalone: true,
	templateUrl: './sell-old-books.component.html',
	styleUrl: './sell-old-books.component.scss',
	imports: [MaterialModule, CardLayoutComponent, CommonModule],
})
export class SellOldBooksComponent implements OnInit {
	cardDetails: CardDetails[] = [];

	constructor(private _apiService: ApiService) {}

	ngOnInit(): void {
		this._apiService
			.get('sellOldBooksCards')
			.subscribe((res: any) => (this.cardDetails = res.cards));
	}
}
