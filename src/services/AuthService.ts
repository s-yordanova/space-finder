import { User, UserAttributes } from "../model/Model";

export class AuthService {
  //this function will return a promise of User if we have it or undefined
  public async login(
    userName: string,
    password: string
  ): Promise<User | undefined> {
    if (userName === "user" && password === "1234") {
      return {
        userName: userName,
        email: "some@email.com",
      };
    } else {
      return undefined;
    }
  }

  public async getUserAttributes(user: User):Promise<UserAttributes[]>{
    const result: UserAttributes[] = [];
    result.push({
      Name: 'description',
      Value: 'Person description here!'
    });

    result.push({
      Name: 'job',
      Value: 'Engineer'
    });

    result.push({
      Name: 'age',
      Value: '23'
    });

    result.push({
      Name: 'experience',
      Value: '1 year'
    });
    return result;
  }
}
