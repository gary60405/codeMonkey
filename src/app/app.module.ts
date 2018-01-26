import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './../environments/environment';
import { NotepadService } from './notepad/notepad.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NotepadComponent } from './notepad/notepad.component';
import { CanvasComponent } from './canvas/canvas.component';
import { ShareService } from './share/share.service';
import { CompileService } from './notepad/compile.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotepadComponent,
    CanvasComponent,
  ],
  imports: [
    BrowserModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [NotepadService,
              ShareService,
              CompileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
