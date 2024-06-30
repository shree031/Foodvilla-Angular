import {Component, OnInit} from '@angular/core';
import {ProductRecipeService} from "../services/product-recipe.service";
import {FormBuilder} from "@angular/forms";
import {NavigationService} from "../services/navigation.service";
import {ToastrService} from "ngx-toastr";
import {UserType} from "../modals/enum";
import {IUser} from "../modals/modal_def";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  private userDetails: IUser | undefined;
  private userId!: number | undefined;
  protected isLoading: boolean = false;
  protected users: IUser[] = [];
  protected tab: UserType = UserType.USER;
  protected readonly UserType = UserType;
  protected distributor: IUser[] = [];
  filteredUsers: IUser[] = [];
  currentUserId: number = 0;

  constructor(private productRecipeService: ProductRecipeService,
              private fb: FormBuilder,
              private navigationService: NavigationService,
              private toastrService: ToastrService,
              private userService: UserService
  ) {
    if (!JSON.parse(localStorage.getItem('isLoggedIn') || 'false')) {
      this.navigationService.navigateRoot();
    }
  }

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '');
    this.userId = this.userDetails?.id;
    if (UserType.ADMIN !== this.userDetails?.userType) {
      this.navigationService.navigateRoot();
    }
    this.isLoading = true;
    this.fetchAllUsers();
  }

  addUser() {

  }

  fetchAllUsers(): void {
    this.isLoading = true;
    this.users=[];
    this.distributor=[];
    this.userService.getAllUsers().then(
      (data: IUser[]) => {
        data.forEach((user) => {
          if (user.userType === UserType.USER) {
            this.users.push(user)
          }
          if (user.userType === UserType.DISTRIBUTOR) {
            this.distributor.push(user)
          }
        })
        this.filteredUsers = [];
        this.filteredUsers = [...(this.tab === UserType.USER ? this.users : this.distributor)]
      },
      (error: any) => {
        console.error('Error fetching users', error);
      }
    ).finally(() => this.isLoading = false);
  }

  editProduct(user: any) {

  }

  selectedTab(tab: UserType) {
    this.filteredUsers = [];
    this.tab = tab;
    this.filteredUsers = [...(tab === UserType.USER ? this.users : this.distributor)]
  }

  deleteUser() {
    this.userService.deleteUser(this.currentUserId).then((res) => {
      this.toastrService.show("User removed successfully")
      this.fetchAllUsers();
    }, (e) => {
      console.log(e);
    });
  }
}
