import {Pipe, PipeTransform} from '@angular/core';


@Pipe({name: 'language'})
export class LanguagesPipe implements PipeTransform {
transform(version, args?) {
    // ES6 array destructuring
    
    return version.filter(version => {
      return version.lang_name_eng = args;
    });


  
}
} 