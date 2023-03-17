// import { ValidationError } from 'class-validator';
// import { BadRequestException } from '@nestjs/common';

// interface MessagesError {
//   field: string;
//   message: string | Array<string> | undefined;
// }

// export const PipeValidatorConfig = {
//   transform: true,
//   whitelist: true,
//   forbidNonWhitelisted: true,
//   skipMissingProperties: false,
//   exceptionFactory: (errors: Array<ValidationError>) => {
//     const messages: Array<MessagesError> = errors.map((error) => {
//       let keys = new Array<string>();
//       if (error.constraints) {
//         keys = Object.keys(error.constraints);
//       }
//       const message: Array<string> = new Array<string>();
//       if (keys.length > 1 && message instanceof Array) {
//         keys.forEach((msgError) => {
//           message.push(error.constraints?.[msgError] ?? '');
//         });
//       }
//       return {
//         field: error.property,
//         message: message.length > 0 ? message : error.constraints?.[keys[0]],
//       };
//     });
//     return new BadRequestException(messages);
//   },
// };
