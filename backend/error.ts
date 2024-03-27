export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Error occured in database query";
  }
}
