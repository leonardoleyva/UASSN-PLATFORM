import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'src/app/shared/components/select/select.component';
import { RegistrationService } from 'src/services/registration/service';
import {
  RegistrationBaseUser,
  RegistrationError,
} from 'src/services/registration/type';
import { isError } from 'src/services/utils/functions';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  data: RegistrationBaseUser = {
    name: '',
    email: '',
    password: '',
    studentID: '',
    faculty: {
      id: '',
      name: '',
    },
  };

  constructor(
    private router: Router,
    private registrationService: RegistrationService
  ) {}

  async handleSubmit() {
    try {
      await this.registrationService.createBaseUser(this.data);

      this.router.navigate(['login']);
    } catch (error: any) {
      if (isError<RegistrationError>(error)) {
        console.error(error.message);
      }
    }
  }

  handleChangeFaculty(item: SelectItem) {
    this.data.faculty = { id: item.value, name: item.stringItem };
  }
}
