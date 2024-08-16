import { Component, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Type } from '../interfaces/Type';
import { EntryService } from '../entry.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-update-entry',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './update-entry.component.html',
  styleUrl: './update-entry.component.css'
})
export class UpdateEntryComponent implements OnInit {

  types: Type[] = [
    { value: true, display: 'Expense' },
    { value: false, display: 'Income' },
  ]
  form!: FormGroup;
  id!: number;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { Description: string, IsExpense: boolean, Value: number, Id: number },
    private service: EntryService,
    private snackBar: MatSnackBar
  ) {
    this.id = data.Id;

    this.form = fb.group({
      description: [data.Description, Validators.required],
      isExpense: [data.IsExpense, Validators.required],
      value: [data.Value, Validators.required],
    })
  }

  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.isLoading = true;
    this.form.value.id = this.id;

    this.service.updateEntry(this.id, this.form.value).subscribe(
      (data) => {
        this.isLoading = false;
        this.snackBar.open('Entry updated successfully!', 'Close', {
          duration: 3000,
        });
        this.dialogRef.close(true);
      },
      (error) => {
        this.isLoading = false;
        this.snackBar.open('Failed to update entry!', 'Close', {
          duration: 3000,
        });
      }
    )
  }

}
