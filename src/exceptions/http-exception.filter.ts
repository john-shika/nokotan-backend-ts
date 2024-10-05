import MessageBody from '@/schemas/MessageBody';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpExceptionBodyMessage, HttpExceptionBody } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    const error = typeof exceptionResponse == 'object' ? (exceptionResponse as HttpExceptionBody).error : exceptionResponse;
    const message = error ? `Error ${error} At ${request.url}` : `Error At ${request.url}`;
    const messageBody = new MessageBody(status, message);

    response.status(status).json(messageBody);
  }
}

export default HttpExceptionFilter;
