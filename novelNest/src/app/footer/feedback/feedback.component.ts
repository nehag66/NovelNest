import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-feedback',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './feedback.component.html',
	styleUrl: './feedback.component.scss',
})
export class FeedbackComponent {
	feedback = {
		name: '',
		email: '',
		message: '',
	};

	submitFeedback() {
		console.log('Feedback submitted:', this.feedback);
		// You can send this to backend later
		alert('Thank you for your feedback!');
		this.feedback = { name: '', email: '', message: '' }; // Reset form
	}
}
