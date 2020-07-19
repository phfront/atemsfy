import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';



import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


// import {
//   MatButtonModule,
//   MatCheckboxModule,
//   MatToolbarModule,
//   MatSidenavModule,
//   MatRippleModule,
//   MatMenuModule,
//   MatCardModule,
//   MatButtonToggleModule,
//   MatTabsModule,
//   MatIconModule,
//   MatFormFieldModule,
//   MatInputModule
// } from '@angular/material';

@NgModule({
  imports: [
    BrowserAnimationsModule,

    DragDropModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatRippleModule,
    MatMenuModule,
    MatCardModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    DragDropModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatRippleModule,
    MatMenuModule,
    MatCardModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
})
export class AppMaterialModule { }
