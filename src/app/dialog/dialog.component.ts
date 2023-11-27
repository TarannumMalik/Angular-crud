import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  freshnessList = ["Brand New", "Second Hand", "Refurbished"];
  productForm!: FormGroup;
  http: any;
  actionBtn: string = 'Save'
  constructor(private formbuilder: FormBuilder, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogref: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formbuilder.group({
      productname: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      fresh: ['', Validators.required],
      price: ['', Validators.required],
      // Comment:['', Validators.required]
    });
    console.log(this.editData);
    if (this.editData) {
      this.actionBtn = 'Update';
      this.productForm.controls['productname'].setValue(this.editData.productname);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['fresh'].setValue(this.editData.fresh);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['price'].setValue(this.editData.price);

    }

  }



  addproduct() {
    console.log(this.productForm.value);
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            alert("product added successfully");
            this.productForm.reset();
            this.dialogref.close('save');
          },
          error: () => {
            alert("Error while adding  the product ")
          }
        })
      }
    }
    else{
      this.updateProduct()
    }
  }
updateProduct(){
  this.api.putProduct(this.productForm.value,this.editData.id).subscribe({
    next:(res)=>{
      alert("product updated successfully!")
      this.productForm.reset();
      this.dialogref.close('Updated')
    },
    error:()=>{
      alert("Error while updating data")
    }
  })
}

}
