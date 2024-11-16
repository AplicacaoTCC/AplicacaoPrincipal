import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { ProgressBarModule } from 'primeng/progressbar';
// For dynamic progressbar demo
import { ToastModule } from 'primeng/toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { UploadVideoComponent } from './Components/upload-video/upload-video.component';
import { VideoManagerComponent } from './Components/video-manager/video-manager.component';
import { VideoInputComponent } from './views/video-input/video-input.component';
import { ResultsProcessComponent } from './Components/results-process/results-process.component';
import { AwaitingAnalysisComponent } from './Components/awaiting-analysis/awaiting-analysis.component';
import { CarouselComponent } from './Components/carousel/carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UploadVideoComponent,
    VideoManagerComponent,
    VideoInputComponent,
    ResultsProcessComponent,
    AwaitingAnalysisComponent,
    CarouselComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    StyleClassModule,
    CardModule,
    HttpClientModule,
    AppRoutingModule,
    ChartModule,
    ProgressBarModule,
    ToastModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
