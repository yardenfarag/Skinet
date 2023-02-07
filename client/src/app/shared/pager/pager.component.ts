import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent {
 @Input() totalCount?: number
 @Input() pageSize?: number
 @Output() pageChange = new EventEmitter<number>()

 onPagerChange(event: any) {
  this.pageChange.emit(event.page)
 }
}
