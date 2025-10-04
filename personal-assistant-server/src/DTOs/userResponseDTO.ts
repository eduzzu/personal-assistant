export class UserResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate?: Date;
  role: 'USER' | 'ADMIN';
}
