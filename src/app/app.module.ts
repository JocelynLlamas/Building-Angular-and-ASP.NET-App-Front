import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { EntriesComponent } from './entries/entries.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

//services
import { EntryService } from './entry.service';
import { AuthService } from './auth.service';

// Angular Material
import {MatButtonModule} from '@angular/material/button';
import { UpdateEntryComponent } from './update-entry/update-entry.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppComponent,
    EntriesComponent,
    FooterComponent,
    HeaderComponent,
    MatButtonModule,
    UpdateEntryComponent,
    RegisterComponent,
    ReactiveFormsModule,
    MatIconModule
  ],
  providers: [
    EntryService,
    AuthService
  ],
})
export class AppModule { }
