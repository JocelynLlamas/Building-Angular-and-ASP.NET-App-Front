import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { Type } from '../interfaces/Type';
import { EntryService } from '../entry.service';
import { EntriesRequest } from '../interfaces/request.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-new-entry',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './new-entry.component.html',
  styleUrl: './new-entry.component.css'
})
export class NewEntryComponent {

  isLoading: boolean = false;

  types: Type[] = [
    { value: true, display: 'Expense' },
    { value: false, display: 'Income' },
  ]

  constructor(private service: EntryService, private snackBar: MatSnackBar) {

  }

  entryForm = new FormGroup({
    description: new FormControl<string>('', Validators.required),
    isExpense: new FormControl<string>('', Validators.required),
    value: new FormControl<number | null>(null, [Validators.required, Validators.pattern('\\d+\\.?\\d*')])
  })

  onSubmit() {
    this.isLoading = true;
    const formValues = this.entryForm.value;

    const entry: EntriesRequest = {
      description: formValues.description as string,
      isExpense: formValues.isExpense === 'true' ? true : false,
      value: Number(formValues.value)
    };

    console.log(entry);
    this.service.createEntry(entry).subscribe(
      (data) => {
        this.isLoading = false;
        this.snackBar.open('Entry created successfully!', 'Close', {
          duration: 3000,
        });

        this.entryForm.reset({
          description: '',
          isExpense: '',
          value: null
        });
      },
      (error) => {
        this.snackBar.open('Failed to create entry!', 'Close', {
          duration: 3000,
        });
        console.error('Error:', error);
        this.isLoading = false;
      })
  }

}
