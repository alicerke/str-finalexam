import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users$: BehaviorSubject<User[]> = this.userService.list$;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getAll();
  }

  onDelete(user: User): void {
    this.userService.remove(user);
  }

  // sorter
  columnKey: string = '';
  direction: string = '';

  onColumnSelect(key: string): void {
    if (this.columnKey != key) {
      this.direction = 'asc';
    } else {
      this.direction = this.swichDirectionValue();
    }
    this.columnKey = key;
  }

  swichDirectionValue(): any {
    if (this.direction === '' || this.direction === 'dsc') {
      return this.direction = 'asc';
    }
    return this.direction = 'dsc';
  }

  //filter
  phrase: string = '';

  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

}
