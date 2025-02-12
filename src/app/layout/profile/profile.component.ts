import { Component, ViewEncapsulation, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule, Validators, ValidationErrors, AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import intlTelInput from "intl-tel-input";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NzCollapseModule, NzFormModule, FormsModule, TranslateModule, NzInputModule, ReactiveFormsModule, NzIconModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements AfterViewInit, OnDestroy {
  customImage = 'assets/pic/Account/EditIcon.svg';
  validateForm: FormGroup;
  phoneNumber: string = '';
  phoneError: string | null = null;
  iti: any; 
  private destroy$ = new Subject<void>();

  
  panels = [
    { id: 1, name: 'layout.myProfile.EditProfile', active: false },
    { id: 2, name: 'layout.myProfile.ChangePhoneNumber', active: false },
    { id: 3, name: 'layout.myProfile.ChangePassword', active: false }
  ];

  
  passwordVisibleCurrent = false;
  passwordVisibleNew = false;
  passwordVisibleConfirm = false;
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  currentPasswordError: string | null = null;
  newPasswordError: string | null = null;
  confirmPasswordError: string | null = null;

  @ViewChild('phoneInput', { static: false }) phoneInput!: ElementRef;

  constructor(private fb: FormBuilder, private translate: TranslateService) {
    this.validateForm = this.fb.group({
      firstName: ['', [Validators.required, this.nameValidator]],
      lastName: ['', [Validators.required, this.nameValidator]],
      required: [false]
    });
  }

  nameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const isValid = /^[\u0600-\u06FFa-zA-Z\s]*$/.test(value);
    return isValid ? null : { name: true };
  }

  nameSubmit() {
    if (this.validateForm.invalid) {
      this.validateForm.markAllAsTouched();
      console.log('Form is invalid ❌', this.validateForm.value);
      return;
    }
    console.log('Form Name submitted successfully ✅', this.validateForm.value);
  }

  ngAfterViewInit() {
    if (!this.phoneInput?.nativeElement) {
      console.error(" phoneInput is not found in the DOM. ❌");
      return;
    }
    setTimeout(() => {
      this.iti = intlTelInput(this.phoneInput.nativeElement, {
        initialCountry: "eg",
        onlyCountries: ['eg', 'us', 'gb', 'ae'],
        separateDialCode: true, 
        utilsScript: "assets/utils.js",
      } as any);
  
      (window as any).iti = this.iti; 
  
      const checkUtils = setInterval(() => {
        if ((window as any).intlTelInputUtils) {
          clearInterval(checkUtils);
        }
      }, 200);
    }, 500);
  }

  validatePhone() {
    if (!this.iti) {
      return;
    }
  
    const rawInputValue = this.phoneInput.nativeElement.value.trim();
  
    let fullNumber = this.iti.getNumber();
    if (!fullNumber) {
      const countryData = this.iti.getSelectedCountryData();
      fullNumber = `+${countryData.dialCode}${rawInputValue.replace(/^0+/, "")}`;
    }

    const parsedNumber = parsePhoneNumberFromString(fullNumber);
    if (!parsedNumber || !parsedNumber.isValid()) {
      this.phoneError = "⚠️ Invalid phone number!";
      return;
    }
    if (parsedNumber?.country === "EG") {
      const egyptPattern = /^(?:\+20)?(10|11|12|15)\d{8}$/;
      if (!egyptPattern.test(fullNumber)) {
        this.phoneError = "Invalid Egyptian phone number!⚠️";
        console.warn("Invalid Egyptian phone number:", fullNumber, "❌");
        return;
      }
    }    

    this.phoneError = null;
    this.phoneNumber = parsedNumber.formatInternational();
  }
  
  onSubmit() {
    
    if (!this.phoneNumber || this.phoneError) {
      console.error("❌ Cannot submit due to invalid phone number.");
      return;
    }
    console.log("Submitting phone number:", this.phoneNumber,"✅");
  }
   //Passwords Validation ✅
  validateCurrentPassword(): void {
    this.currentPasswordError = !this.currentPassword ? 'Current password is required!' : null;
  }
//New Password

  
  passwordValidations = {
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
  };
  passwordTouched = false; 
  submitted = false;
  
  validateNewPassword(): void {
    const password = this.newPassword || '';
    
    this.passwordTouched = password.length > 0;
    
    // Reset validation if password is empty
    if (!password) {
      this.passwordTouched = false;
      this.submitted = false;
      this.passwordValidations = {
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
      };
      return;
    }
    
    this.passwordTouched = true;
    
    this.passwordValidations.length = password.length >= 8;
    this.passwordValidations.lowercase = /[a-z]/.test(password);
    this.passwordValidations.uppercase = /[A-Z]/.test(password);
    this.passwordValidations.number = /\d/.test(password);
  }
  

  

  validateConfirmPassword(): void {
    if (!this.confirmPassword) {
      this.confirmPasswordError = 'Please confirm your password!';
    } else if (this.confirmPassword !== this.newPassword) {
      this.confirmPasswordError = 'Passwords do not match! ❌';
    } else {
      this.confirmPasswordError = null;
    }
  }

  Submit() {
    this.submitted = true; 
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      console.log('Please fill all fields.❌');
      return;
    }
    if (this.newPassword.length < 8) {
      console.log('New password must be at least 8 characters long.❌');
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      console.log('Passwords do not match.❌');
      return;
    }
  
    console.log('Form submitted successfully: ✅', {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword
    });
  }

  onActiveChange(panel: any, active: boolean) {
    panel.active = active;
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }

  // ✅ Cleanup on Destroy
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
