import { Component, OnInit } from '@angular/core';
import { EntryService } from '../entry.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { EntryResponse } from '../interfaces/request.interface';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-entry',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './delete-entry.component.html',
  styleUrl: './delete-entry.component.css'
})
export class DeleteEntryComponent implements OnInit {

  entry = {
    description: '',
    value: 0,
    isExpense: false
  }
  id: any;
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute,
    private service: EntryService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getEntry(this.id).subscribe((data: EntryResponse) => {

      this.entry.description = data.Description;
      this.entry.isExpense = data.IsExpense;
      this.entry.value = data.Value;
    })
  }

  cancel() {
    this.router.navigate(['/']);
  }

  confirm() {
    this.service.deleteEntry(this.id).subscribe(
      (data) => {
        this.isLoading = false;
        this.snackBar.open('Entry updated successfully!', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/']);
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
