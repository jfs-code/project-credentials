import { IsOptional, IsString, IsInt, Min, Length } from 'class-validator';

export class FindOneParams {
    @IsInt({ message: 'El id debe ser un número' })
    @Min(1, { message: 'El id no debe ser inferior a 1' })
    id: number;
}

export class CreateRole {
    @IsString()
    @Length(1, 50)  
    nameRole: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsInt()
    @IsOptional()
    statusRole?: number = 1;
}

export class EditRole {
    @IsString()
    @Length(1, 50) 
    nameRole: string;

    @IsString()
    @IsOptional()
    description: string;
}

export class FindRole {
    @IsOptional()
    @IsInt({ message: 'El id debe ser un número' })
    @Min(1, { message: 'El id no debe ser inferior a 1' })
    id?: number;
  
    @IsString()
    @Length(1, 50) 
    nameRole: string;
  }