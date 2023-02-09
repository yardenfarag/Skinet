import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent {
  @Input() checkoutForm?: FormGroup

  constructor(private accountSerice: AccountService) {}

  saveUserAddress() {
    this.accountSerice.updateUserAddress(this.checkoutForm?.get('addressForm')?.value).subscribe({
      next: () => this.checkoutForm?.get('addressForm')?.reset(this.checkoutForm?.get('addressForm')?.value)
    })
  }
}
