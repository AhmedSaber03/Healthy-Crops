/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { appInitializerProvider } from './app/app.config'; 
import { importProvidersFrom } from '@angular/core';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  platformBrowserDynamic()
  .bootstrapModule(AppComponent) // Ensure AppComponent is your root component
  .catch(err => console.error(err));