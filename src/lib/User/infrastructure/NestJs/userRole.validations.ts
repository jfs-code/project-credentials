import { IsInt, Min, IsOptional } from 'class-validator';

export class FindOneParams {
  @IsOptional()
  @IsInt({ message: 'El id debe ser un número' })
  @Min(1, { message: 'El id no debe ser inferior a 1' })
  userId?: number;

  @IsOptional()
  @IsInt({ message: 'El id debe ser un número' })
  @Min(1, { message: 'El id no debe ser inferior a 1' })
  roleId?: number;
}

export class Create {
  @IsInt({ message: 'El id debe ser un número' })
  @Min(1, { message: 'El id no debe ser inferior a 1' })
  userId?: number;

  @IsInt({ message: 'El id debe ser un número' })
  @Min(1, { message: 'El id no debe ser inferior a 1' })
  roleId?: number;

  @IsInt()
  @IsOptional()
  status?: number = 1;
}

export class Edit {
  @IsInt({ message: 'El id debe ser un número' })
  @Min(1, { message: 'El id no debe ser inferior a 1' })
  userId?: number;

  @IsInt({ message: 'El id debe ser un número' })
  @Min(1, { message: 'El id no debe ser inferior a 1' })
  roleId?: number;

  @IsInt()
  @IsOptional()
  status?: number = 1;
}

// export class FindUserRole {
//   @IsOptional()
//   @IsInt({ message: 'El id debe ser un número' })
//   @Min(1, { message: 'El id no debe ser inferior a 1' })
//   userId?: number;

//   @IsOptional()
//   @IsInt({ message: 'El id debe ser un número' })
//   @Min(1, { message: 'El id no debe ser inferior a 1' })
//   roleId?: number;
// }