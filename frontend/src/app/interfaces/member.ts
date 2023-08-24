export interface IMember {
  _id: string;
  name: string;
  email: string;
  membershipType: string;
  booksIssued: string[];
  membershipExpiry: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
