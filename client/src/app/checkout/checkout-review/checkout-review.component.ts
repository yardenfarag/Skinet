import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr/public_api';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent {
  @Input() stepper?: CdkStepper

  constructor(private basketService: BasketService, private toastr: ToastrService) {}

  createPaymentIntent() {
    this.basketService.createPaymentIntent().subscribe({
      next: () => {
        this.stepper?.next()
      },
      error: error => this.toastr.error(error.message)
    })
  }

}
