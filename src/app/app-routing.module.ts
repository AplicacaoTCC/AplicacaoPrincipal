import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VideoManagerComponent } from './Components/video-manager/video-manager.component';
import { VideoInputComponent } from './views/video-input/video-input.component';

const routes: Routes = [
  {path: '', component: VideoInputComponent},
  {path: 'upload', component: VideoManagerComponent},
];

@NgModule({
  declarations:[],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
