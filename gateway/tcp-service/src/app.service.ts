import { Injectable } from '@nestjs/common';

const data = [
  {
    id: 1,
    name: 'John Doe',
    age: 25,
  },
  {
    id: 2,
    name: 'Jane Doe',
    age: 26,
  },
];

@Injectable()
export class AppService {
  getdata() {
    return data;
  }
}
