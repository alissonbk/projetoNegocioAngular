import { Injectable } from "@angular/core";

declare let alertify: any;

@Injectable({providedIn: 'root'})

export class NotificationService{

    showError(msg: string){
        alertify.dismissAll();
        alertify.set('notifier','delay', 2);
        alertify.set('notifier', 'position', 'top-right');
        alertify.error(msg);
    }

    showSuccess(msg: string){
        alertify.dismissAll();
        alertify.set('notifier','delay', 2);
        alertify.set('notifier', 'position', 'top-right');
        alertify.success(msg);
    }

    showWarning(msg: string){
        alertify.set('notifier','delay', 2);
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning(msg);
    }
}