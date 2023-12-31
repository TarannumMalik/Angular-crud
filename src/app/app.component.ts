import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './service/api.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource, } from '@angular/material/table';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-video';
  displayedColumns: string[] = ['id', 'productname', 'category', 'date', 'fresh', 'price', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService) {
  }
  ngOnInit(): void {
    this.getAllProducts();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllProducts();
      }
    })
  }
  getAllProducts() {
    this.api.getProduct().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert("Error while fetching data")
      }
    })
  }
  editproduct(row:any){
this.dialog.open(DialogComponent,{
  width:'30%',
  data: row
}).afterClosed().subscribe(val=>{
  if(val==='Updated'){
     this.getAllProducts();
  }
})
  }
  deleteProduct(id:number){
this.api.deleteProduct(id).subscribe({
  next:(res)=>{
    alert("delete successflly");
    this.getAllProducts();
  },
  error:()=>{
    alert("Error while deleting record ")
  }
})
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
}
