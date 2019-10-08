import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export abstract class DataBaseService {

  protected appJson = {'Content-Type': 'application/json'};

  constructor(protected http: HttpClient) { }

  public abstract getAddress(): string;
}
