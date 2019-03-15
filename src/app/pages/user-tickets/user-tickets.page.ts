import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import _ from 'lodash';
import { LoginService } from '../../services/login.service';

@Component({
    selector: 'app-user-tickets',
    templateUrl: './user-tickets.page.html',
    styleUrls: ['./user-tickets.page.scss'],
})
export class UserTicketsPage implements OnInit {

    private ticketList: any;

    constructor( private ticketService: TicketsService, private router: Router, private loginService: LoginService ) {


        // this.ticketList = [
        //     { event: "Cirque du Soleil", date: "2019-02-15", seat: "3A", localisation:"Centre Bell", id:"string1" },
        //     { event: "Concert Celine Dion", date: "2019-03-14", seat: "3A", localisation:"Centre Bell", id:"ed36a534-3acd-11e9-b210-d663bd873d93" },
        //     { event: "Festival", date: "2019-05-12", seat: "3A", localisation:"Centre Bell", id:"string3" }
        // ]
    }

    ngAfterContentInit(){
        
    }

    ngOnInit() {
        //this.ticketService.getUserTicketsData(userId);
        //then update curent ticket in ticketService
        this.ticketChecker();
        
    }

    ticketClickHandler (ticket) {
        this.ticketService.setCurrentTicket(ticket);
        this.router.navigateByUrl('ticket');
    }

    ticketChecker () {
        this.loginService.getUserInfo().then(
            value => {
                let listTicket = value.data.Tickets;
                listTicket.map( ticket => {
                    if ( !moment().isBefore(ticket.Date) ){
                        _.remove(listTicket, t => t.UUID === ticket.UUID )
                    }
                });
                this.ticketList = listTicket;
            }
        )
        .catch(() => console.log("could not retrieve local storage"));
    }

}
