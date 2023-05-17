import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  checkoutForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) {

    this.checkoutForm = this.formBuilder.group({
      nif: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]], // 9-digit number
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{4}-[0-9]{3}$')]], // XXXX-XXX format
      cardType: ['', Validators.required],
      cardName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^[A-Za-z ]*$/), this.noNumbersValidator]), // Custom validator for no numbers
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$')]], // XXXX XXXX XXXX XXXX format
      expDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/[0-9]{2}$')]], // MM/YY format
      securityNumber: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]] // 3-digit number
    });
  }

  noNumbersValidator(control: AbstractControl): ValidationErrors | null {
    const hasNumbers = /\d/.test(control.value);
    return hasNumbers ? { containsNumbers: true } : null;
  }

  areAllInputsFilled(): boolean {
    const formValues = this.checkoutForm.value;
    return Object.values(formValues).every(value => !!value);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  checkout() {
    if (this.checkoutForm.valid) {
      const username = this.userService.getLoggedInUser();
      this.userService.postUserCheckout(username).subscribe(item => console.log(item));
    } else {
      this.checkoutForm.markAllAsTouched();
      if (this.checkoutForm.get('nif')?.invalid ||
          this.checkoutForm.get('email')?.invalid ||
          this.checkoutForm.get('address')?.invalid ||
          this.checkoutForm.get('city')?.invalid ||
          this.checkoutForm.get('postalCode')?.invalid ||
          this.checkoutForm.get('cardType')?.invalid ||
          this.checkoutForm.get('cardName')?.invalid ||
          this.checkoutForm.get('cardNumber')?.invalid ||
          this.checkoutForm.get('expDate')?.invalid ||
          this.checkoutForm.get('securityNumber')?.invalid) {
        alert('Incorrectly filled or Empty sections');
      }
    }
  }
}