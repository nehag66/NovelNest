import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'app/material.module';
import { ApiService } from 'services/api.service';

@Component({
	selector: 'app-users-table',
	standalone: true,
	imports: [MaterialModule, CommonModule],
	templateUrl: './users-table.component.html',
	styleUrl: './users-table.component.scss',
})
export class UsersTableComponent implements OnInit {
	users: any = [];
	displayedColumns = ['name', 'email', 'mobile', 'role', 'addresses'];

	constructor(private _apiService: ApiService) {}

	ngOnInit() {
		this._apiService.get('users').subscribe((res: any) => {
			this.users = res.users;
		});
	}
}
