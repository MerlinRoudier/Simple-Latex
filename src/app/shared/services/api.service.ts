import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Latex } from '../../latex'
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public baseURL = "https://latex.codecogs.com/png.json?";
  constructor(private http: HttpClient) {}

  toLaTeXUrl(input: string): string {
    let latexEquation = input;
    latexEquation=latexEquation.replace(/(\w+)\/(\w+)/g, '\\frac{$1}{$2}');
    latexEquation=latexEquation.replace(/pi/g, '\\pi');
    //const output = encodeURIComponent(latexEquation);
    const output = latexEquation;
    return `${output}`;
  }


  getLatex(req : string): Observable<Latex>{
    return this.http.get<any>(this.baseURL + this.toLaTeXUrl(req), {responseType: 'json'})
      .pipe(map(response => {
          return{
          type: response.latex.type,
          equation: response.latex.equation,
          url: response.latex.url,
          base64: response.latex.base64
        } as Latex
      }))
    }
}
