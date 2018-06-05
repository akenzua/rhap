import { Injectable }       from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService }      from './auth.service';


@Injectable()

export class AuthGuardService implements CanActivate {
   
  	
  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.authService.isLoggedIn()){
        return true;
    }else{
        
        this.router.navigate([ '/signin' ],{
            queryParams: {
              return: state.url
            }
          });
          return false;
        
    }
}
}