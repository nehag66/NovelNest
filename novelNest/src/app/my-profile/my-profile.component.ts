import { Component } from '@angular/core';
import { ApiService } from 'services/api.service';

@Component({
	selector: 'app-my-profile',
	standalone: true,
	imports: [],
	templateUrl: './my-profile.component.html',
	styleUrl: './my-profile.component.scss',
})
export class MyProfileComponent {
	profileDetails = null;
	userId: string | null = '';

	constructor(private _apiService: ApiService) {
		this.userId = localStorage.getItem('userId');
		this.fetchProfileDetails();
	}

	fetchProfileDetails() {
		this._apiService
			.get<{
				message: string;
				users: any;
			}>(`users/${this.userId}`)
			.subscribe((res: any) => {
				console.log('res=>', res.user);
			});
	}
}
