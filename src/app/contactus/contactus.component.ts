import { Component, ViewEncapsulation, inject } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import emailjs from 'emailjs-com';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [NavbarComponent, CoverpicComponent, FooterComponent, TranslateModule, NzFormModule,
    FormsModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzSelectModule, NzRadioModule, NzButtonModule, CommonModule,
   ],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.scss',
  encapsulation: ViewEncapsulation.None
  
})
export class ContactusComponent {
  selectedCompanyType: string | null = null;
  validateForm: FormGroup;
  statusMessage: string = '';
  statusClass: string = '';
 
  private http = inject(HttpClient);

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private toastr: ToastrService, private translate: TranslateService) {
    this.validateForm = this.fb.group({
      full_name: ['', [Validators.required, this.nameValidator]],
      email: ['', [Validators.required, Validators.email, this.mailtypeValidator]],
      phone_number: ['', [Validators.required, this.numericValidator]] ,
      company_name: ['', [Validators.required]],
      company_type: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      request_type: ['', [Validators.required]],
      message: ['', [Validators.required]],
      required: [false],
    });
    emailjs.init('ipYeKgim8SA4592oQ');
  }

  nameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const isValid = /^[\u0600-\u06FFa-zA-Z\s]*$/.test(value);
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
      const formData = this.validateForm.value;
      this.http.post('contact', formData).subscribe({
        next: (res: any) => {
          if (res.status) {
            emailjs.send('service_qn7xusq', 'template_zz8arx4', {
              fullname: formData.full_name,
              email: formData.email,
              phone: formData.phone_number,
              companyName: formData.company_name,
              companyType: formData.company_type,
              subject: formData.subject,
              requestType: formData.request_type,
              message: formData.message,
            }).then(
              (response: any) => {
                this.translate.get('CONTACTUS.TOAST.EMAIL_SUCCESS').subscribe((translatedMsg) => {
                  this.toastr.success(translatedMsg);
                });
                this.validateForm.reset();
              },
              (error: any) => {
                this.translate.get('CONTACTUS.TOAST.EMAIL_ERROR').subscribe((translatedMsg) => {
                  this.toastr.error(translatedMsg);
                });
                console.error('EmailJS error:', error);
              }
            );
          } else {
            console.error('API Error:', res);
            this.translate.get('CONTACTUS.TOAST.API_ERROR').subscribe((translatedMsg) => {
              this.toastr.error(translatedMsg);
            });
          }
        },
        error: (error) => {
          console.error('API Error:', error);
          if (error?.error) {
            console.error('Server Response:', error.error);
          }
          this.translate.get('CONTACTUS.TOAST.API_ERROR').subscribe((translatedMsg) => {
            this.toastr.error(translatedMsg);
          });
        }
      });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      this.translate.get('CONTACTUS.TOAST.FORM_INVALID').subscribe((translatedMsg) => {
        this.toastr.warning(translatedMsg);
      });
    }
  }  
  
  
  requiredChange(required: boolean): void {
    const fullname = this.validateForm.get('fullname');
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