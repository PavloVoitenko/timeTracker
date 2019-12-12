import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Base database access class
 */
@Injectable({
  providedIn: 'root',
})
export abstract class DataBaseService {
  protected appJson = { 'Content-Type': 'application/json' };

  public constructor(protected http: HttpClient) {}

  public abstract getAddress(): string;
}
