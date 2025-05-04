import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProfileResponse } from 'app/models/profile';
import { ApiService } from 'services/api.service';
import { StorageService } from 'services/storage.service';

@Component({
	selector: 'app-basic-info',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './basic-info.component.html',
	styleUrl: './basic-info.component.scss',
})
export class BasicInfoComponent {
	profileDetails: ProfileResponse | null = null;
	userId: string | null = '';

	constructor(
		private _apiService: ApiService,
		private _storageService: StorageService,
	) {
		this.userId = this._storageService.get<string>('userId');
		this.fetchProfileDetails();
	}

	fetchProfileDetails() {
		this._apiService
			.get<{
				message: string;
				user: ProfileResponse;
			}>(`users/${this.userId}`)
			.subscribe((res: { message: string; user: ProfileResponse }) => {
				this.profileDetails = res.user;
			});
	}
}
