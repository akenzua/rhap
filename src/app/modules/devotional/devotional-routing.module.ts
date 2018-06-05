import { PlanComponent } from './components/plan/plan.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { DevotionalComponent } from './components/devotional/devotional.component';
import { AuthGuardService } from '../../auth-guard.services';

const devotionalRoutes : Routes = [
    
    {
        path: 'devotional/:language/:date', 
        component: DevotionalComponent,
        canActivate: [ AuthGuardService],
    
    },
    {path: 'devotional', component: DevotionalComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(devotionalRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class DevotionalRoutingModule {}