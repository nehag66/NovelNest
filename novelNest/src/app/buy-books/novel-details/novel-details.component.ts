import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'novel-details',
	standalone: true,
	imports: [],
	templateUrl: './novel-details.component.html',
	styleUrl: './novel-details.component.scss',
})
export class NovelDetailsComponent implements OnInit {
	constructor(private _activatedRoute: ActivatedRoute) {}

	ngOnInit() {
		this._activatedRoute.paramMap.subscribe((params) => {
			const novelId = params.get('id');
			console.log(novelId);
		});
	}
}
