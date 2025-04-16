import { Component } from '@angular/core';
import { ProfileResponse } from 'app/models/profile';
import { ApiService } from 'services/api.service';

@Component({
	selector: 'app-my-profile',
	standalone: true,
	imports: [],
	templateUrl: './my-profile.component.html',
	styleUrl: './my-profile.component.scss',
})
export class MyProfileComponent {
	profileDetails = {};
	userId: string | null = '';

	constructor(private _apiService: ApiService) {
		this.userId = localStorage.getItem('userId');
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
