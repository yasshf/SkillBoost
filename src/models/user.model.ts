export class User {
  id?: number;
  firstName: string | null; // Can be null
  lastName: string | null;  // Can be null
  email: string | null;     // Can be null
  password?: string | null; // Can be null
  role: 'Admin' | 'STUDENT' | 'INSTRUCTOR' | null; // Can be null
  dateNaissance: string | null; // Can be null
  country: string | null;         // Can be null

  constructor(
    firstName: string | null = null,
    lastName: string | null = null,
    email: string | null = null,
    role: 'Admin' | 'STUDENT' | 'INSTRUCTOR' | null = null,
    id?: number,
    password?: string | null,
    dateNaissance?: string | null,
    country?: string | null
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.role = role;
    this.dateNaissance = dateNaissance || null;
    this.country = country || null;
  }
}
