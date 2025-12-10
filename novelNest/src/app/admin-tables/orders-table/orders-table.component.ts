import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'app/material.module';
import { ApiService } from 'services/api.service';

@Component({
	selector: 'app-orders-table',
	standalone: true,
	imports: [MaterialModule, CommonModule],
	templateUrl: './orders-table.component.html',
	styleUrl: './orders-table.component.scss',
})
export class OrdersTableComponent implements OnInit {
	displayedColumns: string[] = [
		'orderId',
		'userId',
		'items',
		'totalAmount',
		'status',
		'paymentId',
		'createdAt',
	];

	orders: any[] = [];

	constructor(private _apiService: ApiService) {}

	ngOnInit(): void {
		// adjust endpoint to your backend
		this._apiService.get('orders').subscribe((res: any) => {
			this.orders = res.orders;
		});
	}
}
