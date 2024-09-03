import { SetMetadata } from '@nestjs/common';

export const JwtAuth = () => SetMetadata('isPublic', false);
