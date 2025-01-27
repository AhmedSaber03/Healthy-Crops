import { Component, ViewEncapsulation } from '@angular/core';
import { NavbarComponent } from '../home-page/navbar/navbar.component';
import { CoverpicComponent } from '../coverpic/coverpic.component';
import { FooterComponent } from "../home-page/footer/footer.component";
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule, Validators, ValidationErrors, AbstractControl  } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NgModule } from '@angular/core';
import { ObservableInput, Subject, takeUntil } from 'rxjs';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [NavbarComponent, CoverpicComponent, FooterComponent, TranslateModule, NzFormModule,
    FormsModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzSelectModule, NzRadioModule, NzButtonModule
   ],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.scss',
  encapsulation: ViewEncapsulation.None
  
})
export class ContactusComponent {
  selectedCompanyType: string | null = null;


  validateForm: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      fullname: ['', [Validators.required, this.nameValidator]],
      email: ['', [Validators.required, Validators.email, this.mailtypeValidator]],
      phone: ['', [Validators.required, this.numericValidator]] ,
      companyName: ['', [Validators.required]],
      companyType: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      requestType: ['', [Validators.required]],
      message: ['', [Validators.required]],
      required: [false],
    });
  }

  nameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const isValid = /^[a-zA-Z\s]*$/.test(value);
    return isValid ? null : { name: true }; 
  }

  numericValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const isValid = /^[0-9]*$/.test(value);
    return isValid ? null : { numeric: true };
  }
  mailtypeValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const isValid =  /^[^\s@]+@[^\s@]+\.[^\s@]*$/.test(value);
    return isValid ? null : {mailtype: true};
  }

  ngOnInit(): void {
    this.validateForm.get('required')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: boolean) => {
        this.requiredChange(value);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  requiredChange(required: boolean): void {
    const fullname = this.validateForm.get('nickname');
    if (!required) {
      fullname?.clearValidators();
      fullname?.markAsPristine();
    } else {
      fullname?.setValidators(Validators.required);
      fullname?.markAsDirty();
    }
    fullname?.updateValueAndValidity();
  }
}