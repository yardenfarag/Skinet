import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket } from 'src/app/shared/models/basket';
import { Address } from 'src/app/shared/models/user';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent {
  @Input() checkoutForm?: FormGroup

  constructor(private checkoutService: CheckoutService, 
    private basketService: BasketService,
    private router: Router
    ) {}

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    if (!basket) return
    const OrderToCreate = this.getOrderToCreate(basket)
    if (!OrderToCreate) return
    this.checkoutService.createOrder(OrderToCreate).subscribe({
      next: order => {
        this.basketService.deleteLocalBasket()
        const navigationExtras: NavigationExtras = {state: order}
        this.router.navigate(['checkout/success'], navigationExtras)
      }
    })
  }

  getOrderToCreate(basket: Basket) {
    const deliveryMethodId = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value
    const shipToAddress = this.checkoutForm?.get('addressForm')?.value as Address
    if(!deliveryMethodId || !shipToAddress) return
    return {
      basketId: basket.id,
      deliveryMethodId: deliveryMethodId,
      shipToAddress: shipToAddress
    }
  }
}
