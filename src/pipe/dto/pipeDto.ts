import {
  IsInt,
  Length,
  Contains,
  Min,
  Max,
  IsEmail,
  IsFQDN,
} from 'class-validator';

export class PipeDto {
  name: string;
  @IsInt()
  age: number;
  sex: boolean;
  @Length(10, 20, {
    message({ targetName, property, value, constraints }) {
      return `${targetName} 类的 ${property} 属性的值 ${value} 不满足约束: ${constraints}`;
    },
  })
  title: string;

  @Contains('hello')
  text: string;

  @IsInt()
  @Min(0)
  @Max(10)
  rating: number;

  @IsEmail()
  email: string;

  @IsFQDN()
  site: string;
}
