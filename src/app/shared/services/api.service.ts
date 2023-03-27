import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Latex } from '../../latex'
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //public baseURL = "https://latex.codecogs.com/png.json?";
  public baseURL = "https://latex.codecogs.com/svg.image?";

  constructor(private http: HttpClient) {}

  toLaTeXUrl(input: string): string {
    let latexEquation = input;
    latexEquation=latexEquation.replace(/(\w+)\/(\w+)/g, '\\frac{$1}{$2}');
    latexEquation=latexEquation.replace(/pi/g, '\\pi');
    //const output = encodeURIComponent(latexEquation);
    const output = latexEquation;
    return `${output}`;
  }



  getLatex(req : string, user:string): Observable<Latex>{
    return this.http.get(this.baseURL + this.toLaTeXUrl(req), {responseType: 'text'})
      .pipe(map(response => {
          const index = response.indexOf( '\n',response.indexOf('\n')+1)
          return{
          user: user,
          type: "svg",
          equation: req,
          url: this.baseURL+this.toLaTeXUrl(req),
          svg: response.slice(index+1)
        } as Latex
      }))
  }
}
