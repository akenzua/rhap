import { ActivatedRoute } from '@angular/router';
import { BibleService } from './../../../../bible.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

planId = "";
passages;
times =1;
  constructor(
    private bibleService : BibleService,
    private route : ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.map(params => params['planId']).subscribe((planId)=>{
      this.planId = planId;
      this.bibleService.getStudy(this.planId, this.times)
      .subscribe(
         (plan)=>this.passages = plan,
         (error: Response) => console.log(error)
         );
      
    })
  }

}
