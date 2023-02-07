import { Component } from '@angular/core';
import { BasketItem } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {

  constructor(public basketService: BasketService) {}

  incrementQuantity(item: BasketItem) {
    this.basketService.addItemToBasket(item)
  }
  removeItem(id: number, quantity: number) {
    this.basketService.removeItemFromBasket(id, quantity)
  }
}
