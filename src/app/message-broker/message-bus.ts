
import { Injectable } from '@angular/core';
import { Subject, Observable, filter, map } from 'rxjs';

interface Message {
    channel: string;
    data: any;
}


@Injectable({
    providedIn: 'root'
})
export class MessageBus {
    private message$ = new Subject<Message>();

    public publish<T>(message: T): void {
        const channel = (<any>message).constructor.name;
        this.message$.next({ channel: channel, data: message });
    }

    public of<T>(messageType: { new(...args: any[]): T }): Observable<T> {
        const channel = (<any>messageType).name;
        return this.message$.pipe(
            filter(m => m.channel === channel),
            map(m => m.data)
        );
    }
}

