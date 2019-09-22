interface Ticket {
    ticketID: string,
    ticketStatus: boolean
}

let tickets: Ticket[] = [];

export function getNextTicket() {
    return String(tickets.length+1).padStart(4, '0')
}

export function updateTicket(ticketID: string) {
    tickets.forEach((element) => {
        if (element.ticketID === ticketID) {
            element.ticketStatus = true;
            return;
        }
    })
}

export function getTotalCountOfTickets() {
    return tickets.length;
}

export function getTickets() {
    return tickets;
}

export function addTicket(ticketID: string, ticketStatus: boolean) {
    tickets.push({ticketID, ticketStatus});
}

export function getTicketWithWaintingStatus() {
    let _tickets: Ticket[] = [];
    tickets.forEach(element => {
        if (!element.ticketStatus) {
            _tickets.push(element);
        }
    });
    return _tickets;
}