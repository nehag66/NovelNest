import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';

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
	],
})
export class MaterialModule {}
