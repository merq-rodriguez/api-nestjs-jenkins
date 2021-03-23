import { IsString, IsEmail, IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDTO{
  @IsString()
  @IsNotEmpty()
  names: string;
  
  @IsString()
  @IsNotEmpty()
  password: string;
  
  @IsString()
  @IsNotEmpty()
  username: string;
  
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class UpdateUserDTO{
  @IsInt()
  idUser: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  names: string;
  
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username: string;
  
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email: string;
}