import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'
import { ActivatedRoute } from "@angular/router"

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  isLoggedIn
  itemsInCart
  countArray = []

  constructor(private route: ActivatedRoute, private data: DataService) { }

  ngOnInit() {
    this.data.currentStatus.subscribe(message => this.isLoggedIn = message);
    this.itemsInCart = this.data.getCart();
    this.countArray = Array.from(this.itemsInCart.keys());
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

  buyNow() {
    this.data.clearCart()
  }
} 
