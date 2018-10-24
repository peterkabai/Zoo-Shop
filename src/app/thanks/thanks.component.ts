import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'
import { ActivatedRoute } from "@angular/router"

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.css']
})
export class ThanksComponent implements OnInit {
  isLoggedIn
  itemsInCart
  countArray = []

  constructor(private route: ActivatedRoute, private data: DataService) { }

  newItems$ : Object

  ngOnInit() {
    this.data.currentStatus.subscribe(message => this.isLoggedIn = message);
    this.itemsInCart = this.data.getCart();
    this.countArray = Array.from(this.itemsInCart.keys());

    this.data.getItems().subscribe(data => this.newItems$ = data); 
  }

  getGrandTotal() {
    var total = 0
    this.itemsInCart.forEach((key, value) => {
      total += value.price * key
    });
    return total
  }

  signOut() {
    this.isLoggedIn = "No"
    this.data.clearCart()
    this.data.changeMessage("No")
  }





  
  testPut(newValue) {
    let itemNumber = 1
    this.data.putQuantity(this.newItems$, itemNumber, newValue)
    console.log(this.newItems$)
    console.log(newValue)
  }


}