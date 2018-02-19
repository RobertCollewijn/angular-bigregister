import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {parseString} from "xml2js";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'BIG-register';
  registrationNumber = 19919077501;
mailingName=""

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  test() {
    console.log(this.registrationNumber)
  }

  getBigRegistration() {
    const url = 'http://webservices.cibg.nl/Ribiz/OpenbaarV4.asmx';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/soap+xml; charset=utf-8',
      }),
      responseType: 'text' as 'text'
    };
    let body = '<?xml version="1.0" encoding="utf-8"?>'
    body += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">'
    body += '<soap12:Body>'
    body += '<listHcpApproxRequest xmlns = "http://services.cibg.nl/ExternalUser" >'
    body += '<WebSite>Ribiz</WebSite>'
    body += '<RegistrationNumber >' + this.registrationNumber + '</RegistrationNumber>' //
    body += '</listHcpApproxRequest>'
    body += '</soap12:Body>'
    body += '</soap12:Envelope>'

    console.log(body)

    this.http.post(url, body, options)
      .subscribe(
        response => {
          this.getMailingName(response)
        },
        err => {
          console.error(err);
          this.mailingName = "CORS ERROR !!"
        },
        () => console.log('complete'));
  }

  readSoap(xml) {
    parseString(xml, function (err, soap) {
      console.log(soap['soap:Envelope']['soap:Body'][0]);
      const result = soap['soap:Envelope']['soap:Body'][0].ListHcpApprox4Result[0].ListHcpApprox[0];
      if (result === '') {
        console.error('Geen match')
      }
      else {
        const person = result.ListHcpApprox4[0]
        const mailingName = person.MailingName[0]

        console.log(mailingName)

      }
    });
  }

  getMailingName(xml) {
  let mailingName ="";
    parseString(xml, function (err, soap) {

      console.log(soap['soap:Envelope']['soap:Body'][0]);
      const result = soap['soap:Envelope']['soap:Body'][0].ListHcpApprox4Result[0].ListHcpApprox[0];
      if (result === '') {
        console.error('Geen match')
        mailingName = 'Geen match'


      }
      else {
        const person = result.ListHcpApprox4[0]
        mailingName = person.MailingName[0]

        console.log(mailingName);
        return mailingName
      }
    });


    this.mailingName = mailingName
  }
}
