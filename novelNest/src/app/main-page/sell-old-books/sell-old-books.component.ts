import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CardLayoutComponent } from "../../reusable-components/card-layout/card-layout.component";

@Component({
    selector: 'app-sell-old-books',
    standalone: true,
    templateUrl: './sell-old-books.component.html',
    styleUrl: './sell-old-books.component.scss',
    imports: [MaterialModule, CardLayoutComponent]
})
export class SellOldBooksComponent {

}
