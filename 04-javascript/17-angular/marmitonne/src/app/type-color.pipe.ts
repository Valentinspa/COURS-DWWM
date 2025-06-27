import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeColor',
  standalone: true
})
export class TypeColorPipe implements PipeTransform {

  transform(value: string): string 
  {
    let color = "";
    switch(value)
    {
      case "dessert":
        color = "pink";
        break;
      case "plat":
        color = "brown";
        break;
      case "entrée":
        color = "green"
        break;
    }
    return color;
  }

}
