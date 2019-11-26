import { Time } from '@angular/common';

export enum TaskType {
    Development,
    Testing,
    Investigation,
    Estimate,
    Meeting,
}

/**
 * Tracking
 */
export class Tracking {
    public trackingId?: number;
    public projectName: string;
    public taskName: string;
    public taskDescription: string;
    public taskType: TaskType;
    public trackingDate: Date;
    public startTime: Time;
    public endTime: Time;
}
