import {Component} from '@angular/core';
import {EmailService} from "../../services/email.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  fullName: string = '';
  message: string = '';
  isPlaneAnimating: boolean = false;

  constructor(private emailService: EmailService,
              private toastrService: ToastrService) {
  }

  sendEmail() {
    const emailData = {
      fullName: this.fullName,
      message: this.message
    };
    this.emailService.sendEmail(emailData).then(() => {
      this.toastrService.show("Email sent successfully");
    },);

  }

  sendMessage() {
    this.isPlaneAnimating = true;
    setTimeout(() => {
      // this.completeCall();
    }, 1000); // Adjust the delay to match your animation duration
  }
  completeCall() {
    this.isPlaneAnimating = false;
  }
}
