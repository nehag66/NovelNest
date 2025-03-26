import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';

@NgModule({
	exports: [
		MatButtonModule,
		MatInputModule,
		MatToolbarModule,
		MatCardModule,
		MatIconModule,
		MatMenuModule,
		MatTabsModule,
		MatRadioModule,
		MatCheckboxModule,
		MatSelectModule,
		MatBadgeModule,
		MatDividerModule,
		MatProgressSpinnerModule,
		FormsModule,
	],
})
export class MaterialModule {}
