import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class TicketsService {

    currentTicket: any;
    TICKET_INFO = "ticketKey";

    constructor( private storage: Storage ) {
    }

    getTickets () {
        return this.storage.get(this.TICKET_INFO);
    }
  
    saveTickets (tickets) {
        console.log(tickets);
        console.log('hi')
        return this.storage.set(this.TICKET_INFO, tickets);
    }

    setCurrentTicket (ticket) {
        this.currentTicket = ticket;
    }

    deleteTickets () {
        return this.storage.set(this.TICKET_INFO, null);
    }
}
