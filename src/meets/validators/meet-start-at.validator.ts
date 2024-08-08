import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class MeetStartAtValidator implements ValidatorConstraintInterface {
  private getMinMilliseconds(): number {
    return Date.now() + 1000 * 60 * 60 * 2; // min 2 hours
  }

  private getMaxMilliseconds(): number {
    return Date.now() + 1000 * 60 * 60 * 24 * 14; // max 14 days
  }

  validate(value: any): boolean {
    const ms = Date.parse(value);

    return ms >= this.getMinMilliseconds() && ms <= this.getMaxMilliseconds();
  }

  defaultMessage(): string {
    return 'startAt must be greater then now';
  }
}
