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
  putQuantity(itemNumber, inStock) { 
    const putHeader = new HttpHeaders().append('Content-Type' , 'application/json');
    return this.http.put(
      'http://localhost:8081/put/'+itemNumber+'/'+inStock, 
      JSON.stringify({}), 
      {headers: putHeader})
  }

  // store cross page map for the shopping cart
  private itemsInCart = new Map<Object,[number, number]>()

  getCart() {
    return this.itemsInCart
  }

  addToCartService(item, numberOfItem) {  
    this.itemsInCart.forEach((value, key) => {
      if (item.itemNumber == value[1]) {
        this.itemsInCart.delete(key)
      }
    });
    this.itemsInCart.set(item, [numberOfItem, item.itemNumber])
  }

  removeItemFromCart(itemToRemove){
    this.itemsInCart.delete(itemToRemove)
  }

  clearCart(){
    this.itemsInCart = new Map<Object,[number, number]>()
  }
}