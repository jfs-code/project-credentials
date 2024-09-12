import { IsOptional, IsString, IsInt, Min, Length, IsEmail } from 'class-validator';

export class FindOneParams {
    @IsInt({ message: 'El id debe ser un número' })
    @Min(1, { message: 'El id no debe ser inferior a 1' })
    id: number;
}

export class Create {
    @IsString()
    @Length(1, 50) 
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @Length(1, 30) 
    login: string;

    @IsString()
    @Length(1, 132) 
    password: string;

    @IsInt()
    @IsOptional()
    status?: number = 1;
}

export class Edit {
    @IsString()
    @Length(1, 50) 
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @Length(1, 30) 
    login: string;

    @IsString()
    @Length(1, 132) 
    password: string;
}

export class FindUser {
    @IsOptional()
    @IsInt({ message: 'El id debe ser un número' })
    @Min(1, { message: 'El id no debe ser inferior a 1' })
    id?: number;
  
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsOptional()
    @IsString()
    login?: string;
  }