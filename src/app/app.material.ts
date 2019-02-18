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
	MatButtonToggleModule,
	MatTabsModule,
	MatIconModule,
	MatFormFieldModule,
	MatInputModule
} from '@angular/material';

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