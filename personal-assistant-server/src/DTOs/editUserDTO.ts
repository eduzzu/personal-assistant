export class EditUserDto {
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
  role?: 'USER' | 'ADMIN';
}
