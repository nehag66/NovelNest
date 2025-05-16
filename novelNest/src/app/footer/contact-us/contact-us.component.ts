import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-contact-us',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './contact-us.component.html',
	styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {
	contactData = {
		name: '',
		email: '',
		message: '',
	};

	submitted = false;

	onSubmit() {
		console.log('Contact Form Submitted:', this.contactData);
		this.submitted = true;

		// Reset form (optional)
		this.contactData = { name: '', email: '', message: '' };
	}
}
