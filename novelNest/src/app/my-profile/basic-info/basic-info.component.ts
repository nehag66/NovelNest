import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StorageService } from 'services/storage.service';

@Component({
	selector: 'app-basic-info',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './basic-info.component.html',
	styleUrl: './basic-info.component.scss',
})
export class BasicInfoComponent {
	profileDetails: any;

	constructor(private _storageService: StorageService) {
		this.profileDetails = this._storageService.get<string>('userInfo');
	}
}
