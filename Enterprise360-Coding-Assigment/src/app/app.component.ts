import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatAccordion} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import { FormBuilder,FormControl,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule,
    MatExpansionModule,
    HttpClientModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Enterprise360-Coding-Assigment';
  userForm: FormGroup[]=[];
  panelOpenState = false;
  mainForm: FormGroup;
  usersData: any[] = [];
  isSubmitting : boolean[] = [];
  originalFormValues: any;
  
  constructor(private fb: FormBuilder,
    private _http: HttpClient){
    this.mainForm = this.fb.group({
      name: ['', Validators.required],
      address: this.fb.group({
        city: ['', Validators.required],
        postalCode: ['', Validators.required],
      }),
    });

  }
  ngOnInit(): void {
   this.fetchUserList();
  }

  fetchUserList()
  {
    this._http.get('https://dummyjson.com/users')
    .subscribe((data: any) => {
      this.usersData = data['users']; // Extract user data from the response
      this.userForm = this.usersData.map((user: any) => this.createUserForm(user));
      this.originalFormValues = this.usersData.map(user => ({ ...user }));
    }, error => {
      console.error('Error occurred:', error);
      // Handle the error
    });
  }
  createUserForm(users: any) :FormGroup{
  //  return this.userForm.patchValue(users);
    return this.fb.group({
      id: new FormControl(users.id),
      firstName: new FormControl(users.firstName, Validators.required),
      lastName: new FormControl(users.lastName, Validators.required),
      maidenName: new FormControl(users.maidenName),
      age: new FormControl(users.age, Validators.min(0)),
      gender: new FormControl(users.gender, Validators.required),
      email: new FormControl(users.email, [Validators.required, Validators.email]),
      // Add other form controls based on the structure of your user data
      
        phone: new FormControl(users.phone),
        username: new FormControl(users.username),
        password: new FormControl(users.password),
        birthDate: new FormControl(users.birthDate),
        // image: new FormControl(users.image),
        bloodGroup: new FormControl(users.bloodGroup),
        height: new FormControl(users.height),
        weight:new FormControl(users.weight),
        eyeColor: new FormControl(users.eyeColor),
        hair: this.fb.group({
          color: new FormControl(users.hair.color),
          type: new FormControl(users.hair.type),
        }),
        domain: new FormControl(users.domain),
        ip: new FormControl(users.ip),
        address: this.fb.group({
          address: new FormControl(users.address.address),
          city: new FormControl(users.address.city),
          coordinates: this.fb.group({
            lat: new FormControl(users.address.coordinates.lat),
            lng: new FormControl(users.address.coordinates.lng)
          }),
          postalCode: new FormControl(users.address.postalCode),
          state: new FormControl(users.address.state)
        }),
        macAddress: new FormControl(users.macAddress),
        university: new FormControl(users.university),
        bank: this.fb.group({
          cardExpire: new FormControl(users.bank.cardExpire),
          cardNumber: new FormControl(users.bank.cardNumber),
          cardType: new FormControl(users.bank.cardType),
          currency: new FormControl(users.bank.currency),
          iban:new FormControl(users.bank.iban)
        }),
        company: this.fb.group({
          address: this.fb.group({
            address:new FormControl(users.company.address.address),
            city:new FormControl(users.company.address.city),
            coordinates: this.fb.group({
              lat: new FormControl(users.company.address.coordinates.lat),
              lng: new FormControl(users.company.address.coordinates.lng)
            }),
            postalCode: new FormControl(users.company.address.postalCode),
            state: new FormControl(users.company.address.state)
          }),
          department: new FormControl(users.company.department),
          name: new FormControl(users.company.name),
          title: new FormControl(users.company.title)
        }),
        ein: new FormControl(users.ein),
        ssn: new FormControl(users.ssn),
    });
  }
  
  onSubmit(i:number) {
    this.isSubmitting[i] = true;
    console.log(this.userForm[i].value);
    this.saveUser(this.userForm[i].value ,i)
  }
  saveUser(user:any,index:number)
  {
   
    this._http.put<any>('https://dummyjson.com/users',user)
      .subscribe((data: any) => {
        console.error('Error occurred:', data);
        this.isSubmitting[index] = false;
        this.fetchUserList();
        
      }, error => {
        console.error('Error occurred:', error);
        // Handle the error
      });
  }
  cancel(i:number)
  {
    console.log(this.userForm[i].value);
    this.userForm[i].patchValue(this.originalFormValues[i]);
    console.log(this.userForm[i].value);
  }
 
}
