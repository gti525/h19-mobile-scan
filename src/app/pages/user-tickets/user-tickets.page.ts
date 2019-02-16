import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import _ from 'lodash';

@Component({
    selector: 'app-user-tickets',
    templateUrl: './user-tickets.page.html',
    styleUrls: ['./user-tickets.page.scss'],
})
export class UserTicketsPage implements OnInit {

    private ticketList: any;

    constructor( private ticketService: TicketsService, private router: Router ) {
        this.ticketList = [
            { event: "Cirque du Soleil", date: "2019-02-15", seat: "3A", localisation:"Centre Bell", id:"string1" },
            { event: "Concert Celine Dion", date: "2019-03-14", seat: "3A", localisation:"Centre Bell", id:"string2" },
            { event: "Festival", date: "2019-05-12", seat: "3A", localisation:"Centre Bell", id:"string3" }
        ]
    }

    ngOnInit() {
        //this.ticketService.getUserTicketsData(userId);
        //then update curent ticket in ticketService
        this.ticketList.map( ticket => {
            if ( !moment().isBefore(ticket.date) ){
                _.remove(this.ticketList, t => t.id === ticket.id )
            }
        })
    }

    ticketClickHandler (ticket) {
        this.ticketService.setCurrentTicket(ticket);
        this.router.navigateByUrl('ticket');
    }

}
