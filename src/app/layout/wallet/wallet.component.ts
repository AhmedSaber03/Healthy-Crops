import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss'
})
export class WalletComponent {

  walletForm: FormGroup;
  balance: number = 0 ; // Initial balance
  transactions: { orderNo: string; orderDate: string; amount: number; transactionType: string }[] = [];

  constructor(private fb: FormBuilder) {
    this.walletForm = this.fb.group({
      orderNo: ['', Validators.required],
      orderDate: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      transactionType: ['in', Validators.required]
    });
  }

  addTransaction() {
    if (this.walletForm.valid) {
      const transaction = this.walletForm.value;
      if (transaction.transactionType === 'out' && transaction.amount > this.balance) {
        alert('Insufficient balance!');
        return;
      }

      this.transactions.push(transaction);
      this.balance += transaction.transactionType === 'in' ? transaction.amount : -transaction.amount;
      this.walletForm.reset({ transactionType: 'in' });
    }
  }

}
