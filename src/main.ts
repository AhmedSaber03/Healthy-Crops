/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { appInitializerProvider } from './app/app.config'; 
import { importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


bootstrapApplication(AppComponent, appConfig) 
  .catch((err) => console.error(err));

  platformBrowserDynamic()
  .bootstrapModule(AppComponent) // Ensure AppComponent is your root component
  .catch(err => console.error(err));

 // Select the custom cursor
const customCursor = document.getElementById('custom-cursor');

// Ensure the custom cursor exists
if (!customCursor) {
  console.error("Custom cursor element not found.");
  throw new Error("Custom cursor element is required.");
}

// Helper function to calculate brightness
function getBrightness(rgb: string) {
  const [r, g, b] = rgb
    .replace('rgb(', '')
    .replace(')', '')
    .split(',')
    .map(Number); // Convert to numbers
  return (r * 299 + g * 587 + b * 114) / 1000; // YIQ brightness formula
}

// Listen for mouse movement
document.addEventListener('mousemove', (event) => {
  // Log mouse movement
  console.log("Mouse moved to:", { x: event.pageX, y: event.pageY });

  // Move the custom cursor to follow the mouse
  customCursor.style.left = `${event.pageX - customCursor.offsetWidth / 2}px`;
  customCursor.style.top = `${event.pageY - customCursor.offsetHeight / 2}px`;

  // Get the element under the cursor
  const elementUnderCursor = document.elementFromPoint(event.clientX, event.clientY);

  if (elementUnderCursor) {
    console.log("Element under cursor:", elementUnderCursor);

    // Get the computed background color
    const bgColor = window.getComputedStyle(elementUnderCursor).backgroundColor;
    console.log("Background color of element:", bgColor);

    // If the background color is valid (e.g., "rgb(...)")
    if (bgColor.startsWith('rgb')) {
      const brightness = getBrightness(bgColor);

      if (brightness > 128) {
        // Light background -> Use dark cursor
        customCursor.style.background = "url('../src/assets/pic/ICON/cursor.svg') no-repeat center";
      } else {
        // Dark background -> Use light cursor
        customCursor.style.background = "url('../src/assets/pic/ICON/cursorw.svg') no-repeat center";
      }
    }
  }
});
