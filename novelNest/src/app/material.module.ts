import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  exports: [MatButtonModule, MatInputModule, MatToolbarModule, MatCardModule],
})
export class MaterialModule {}
