import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { ConfirmDialogService } from 'src/app/service/confirm-dialog.service';
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
    private confirmDialogService: ConfirmDialogService,
  ) { }

  ngOnInit(): void {
    this.userService.getAll();
  }

  onDelete(user: User): void {
    this.userService.remove(user);
  }

  onConfirmDelete(user: User): void {
    this.confirmDialogService.confirmThis(
      `Are you sure to DELETE ${user.name} user?`, () => {
        this.onDelete(user);
      }, () => { })
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
  filterKey: string = 'name';

  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

}
