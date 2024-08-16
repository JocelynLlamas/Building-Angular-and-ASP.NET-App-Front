import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { EntryService } from '../entry.service';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EntriesResponse, EntryResponse } from '../interfaces/request.interface';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpdateEntryComponent } from '../update-entry/update-entry.component';
import { RouterModule, Routes } from '@angular/router';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-entries',
  standalone: true,
  imports: [
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    RouterModule,
    MatSortModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './entries.component.html',
  styleUrl: './entries.component.css'
})
export class EntriesComponent implements OnInit {

  displayedColumns: string[] = ['Description', 'IsExpense', 'Value', 'Actions'];
  ELEMENT_DATA: EntryResponse[] = [];
  dataSource = new MatTableDataSource<EntryResponse>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: EntryService,
    private dialog: MatDialog
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getAllEntries();
  }

  applyFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.dataSource.filter = inputElement.value.trim().toLowerCase();
    }
  }


  getAllEntries() {
    this.service.getAll().subscribe((data: EntriesResponse) => {
      this.dataSource.data = data;
      console.log('Res: ', data);
    })
  }

  updateEntry(entry: any) {
    console.log(entry)

    const dialogRef = this.dialog.open(UpdateEntryComponent, {
      data: {
        Id: entry.Id,
        Description: entry.Description,
        IsExpense: entry.IsExpense,
        Value: entry.Value
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.getAllEntries();
      }
    });
  }

}
