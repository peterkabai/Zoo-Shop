import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // keeps track of the signed in status ("Yes" or "No")
  private loginStatus = new BehaviorSubject('No');
  currentStatus = this.loginStatus.asObservable();
  changeMessage(status: string) {
    this.loginStatus.next(status)
  }

  // functions to GET
  getUsers() { return this.http.get('http://localhost:8081/users') }
  getItems() { return this.http.get('http://localhost:8081/') }
  getItem(itemNumber) { return this.http.get('http://localhost:8081/'+itemNumber) }

  // functions to PUT
  putQuantity(newItem, itemNumber, inStock) { 
    const headers = new HttpHeaders().set('content-type' , 'application/json');
    this.http.put(
      'http://localhost:8081/put/'+itemNumber+'/'+inStock,
      JSON.stringify({}),
      {headers: headers}
    )
  }

  // store cross page map for the shopping cart
  private itemsInCart = new Map<Object,number>()
  getCart() {
    return this.itemsInCart
  }
  addToCartService(item, numberOfItem) {
    this.itemsInCart.set(item, Number(numberOfItem))
  }
  removeItemFromCart(itemToRemove){
    this.itemsInCart.delete(itemToRemove)
  }
  clearCart(){
    this.itemsInCart = new Map<Object,number>()
  }

}