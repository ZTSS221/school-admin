import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
students = [{
  id: '1000',
  code: 'f230fh0g3',
  name: 'Bamboo Watch',
  description: 'Product Description',
  image: 'bamboo-watch.jpg',
  price: 65,
  category: 'Accessories',
  quantity: 24,
  inventoryStatus: 'INSTOCK',
  rating: 5
}]

selectedStudents: any = [];
visible: boolean = false;
name: string = '';
class: string = '';
year: string = '';

openNew(){
  this.visible = true;
}

deleteSelectedStudents(){

}

deleteProduct(event: any){

}

addStudent(){
  
}

}
