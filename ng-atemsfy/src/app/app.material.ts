import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
	MatButtonModule,
	MatCheckboxModule,
	MatToolbarModule,
	MatSidenavModule,
	MatRippleModule,
	MatMenuModule,
	MatCardModule,
	MatButtonToggleModule
} from '@angular/material';

@NgModule({
	imports: [
		BrowserAnimationsModule,

		MatButtonModule,
		MatCheckboxModule,
		MatToolbarModule,
		MatSidenavModule,
		MatRippleModule,
		MatMenuModule,
		MatCardModule,
		MatButtonToggleModule,
		DragDropModule
	],
	exports: [
		MatButtonModule,
		MatCheckboxModule,
		MatToolbarModule,
		MatSidenavModule,
		MatRippleModule,
		MatMenuModule,
		MatCardModule,
		MatButtonToggleModule,
		DragDropModule
	],
})
export class AppMaterialModule { }