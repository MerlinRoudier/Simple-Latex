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
    latexEquation=latexEquation.replace(/alpha/g, '\\alpha');
    latexEquation=latexEquation.replace(/beta/g, '\\beta');
    latexEquation=latexEquation.replace(/gamma/g, '\\gamma');
    latexEquation=latexEquation.replace(/epsilon/g, '\\epsilon');
    latexEquation = latexEquation.replace(/delta/g, '\\delta');
    latexEquation = latexEquation.replace(/theta/g, '\\theta');
    latexEquation = latexEquation.replace(/lambda/g, '\\lambda');
    latexEquation = latexEquation.replace(/mu/g, '\\mu');
    latexEquation = latexEquation.replace(/\*/g, '\\times');
    const mathFunctions = ['cos', 'sin', 'tan', 'log', 'max', 'min','sum', 'int'];
    mathFunctions.forEach(func => {
        const regex = new RegExp(`\\b${func}\\b`, 'g');
        latexEquation = latexEquation.replace(regex, `\\${func}`);
    });
    const arrows = {
      '->': '\\rightarrow',
      '<-': '\\leftarrow',
      '<->': '\\leftrightarrow'
  };
  Object.entries(arrows).forEach(([arrow, replacement]) => {
      const regex = new RegExp(arrow.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      latexEquation = latexEquation.replace(regex, replacement);
  });
    latexEquation = latexEquation.replace(/\*\*/g, '^');
    const comparisonOperators = {
      '<=': '\\leq',
      '>=': '\\geq',
      '!=': '\\neq',
      '<': '<',
      '>': '>'
  };
  Object.entries(comparisonOperators).forEach(([operator, replacement]) => {
    const regex = new RegExp(operator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    latexEquation = latexEquation.replace(regex, replacement);
    });
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
