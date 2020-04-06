import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtemsfyLoadingComponent } from './components/atemsfy-loading/atemsfy-loading.component';
import { AtemsfyMosaicBackgroundComponent } from './components/atemsfy-mosaic-background/atemsfy-mosaic-background.component';
import { AtemsfyModalComponent } from './components/atemsfy-modal/atemsfy-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AtemsfyPaginatorComponent } from './components/atemsfy-paginator/atemsfy-paginator.component';

@NgModule({
  declarations: [
    AtemsfyLoadingComponent,
    AtemsfyMosaicBackgroundComponent,
    AtemsfyModalComponent,
    AtemsfyPaginatorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    AtemsfyLoadingComponent,
    AtemsfyMosaicBackgroundComponent,
    AtemsfyModalComponent,
    FormsModule,
    ReactiveFormsModule,
    AtemsfyPaginatorComponent
  ]
})
export class SharedModule { }
