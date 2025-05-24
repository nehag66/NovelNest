import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
	selector: 'app-faq',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './faq.component.html',
	styleUrl: './faq.component.scss',
})
export class FaqComponent {
	faqs = [
		{
			question: 'How can I sell my used novels on NovelNest?',
			answer: 'Click on "Sell Used Novels" in the header and fill out the listing form.',
			open: false,
		},
		{
			question: 'What condition should my books be in to sell?',
			answer: 'Books should be in good, readable condition. We list them as Good, Excellent, or Like New.',
			open: false,
		},
		{
			question: 'Do you offer refunds or exchanges?',
			answer: 'Currently, we do not offer refunds or exchanges on used books.',
			open: false,
		},
		{
			question: 'How long does delivery take?',
			answer: 'We typically ship within 2 business days. Delivery can take 3–7 days depending on your location.',
			open: false,
		},
	];
}
