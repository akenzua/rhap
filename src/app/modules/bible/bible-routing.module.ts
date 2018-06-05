import { BibleComponent } from './components/bible/bible.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';


const bibleRoutes : Routes = [  
{path: 'bible', component: BibleComponent},
{path: 'bible/:id', component: BibleComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(bibleRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class BibleRoutingModule {}