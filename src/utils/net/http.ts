import { isNoneOrEmptyOrWhiteSpace } from '@/utils/common';

export enum HttpStatusCodes {
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,
  EARLY_HINTS = 103,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  MULTI_STATUS = 207,
  ALREADY_REPORTED = 208,
  IM_USED = 226,
  MULTI_CHOICES = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  USE_PROXY = 305,
  UNUSED = 306,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  REQUEST_URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  REQUESTED_RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  IM_A_TEAPOT = 418,
  INSUFFICIENT_SPACE_ON_RESOURCE = 419,
  METHOD_FAILURE = 420,
  MISDIRECTED_REQUEST = 421,
  UNPROCESSABLE_ENTITY = 422,
  LOCKED = 423,
  FAILED_DEPENDENCY = 424,
  UPGRADE_REQUIRED = 426,
  PRECONDITION_REQUIRED = 428,
  TOO_MANY_REQUESTS = 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
  UNAVAILABLE_FOR_LEGAL_REASONS = 451,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
  VARIANT_ALSO_NEGOTIATES = 506,
  INSUFFICIENT_STORAGE = 507,
  LOOP_DETECTED = 508,
  NOT_EXTENDED = 510,
  NETWORK_AUTHENTICATION_REQUIRED = 511,
}

export class HttpStatusText {
  public static CONTINUE: string = 'CONTINUE';
  public static SWITCHING_PROTOCOLS: string = 'SWITCHING_PROTOCOLS';
  public static PROCESSING: string = 'PROCESSING';
  public static EARLY_HINTS: string = 'EARLY_HINTS';
  public static OK: string = 'OK';
  public static CREATED: string = 'CREATED';
  public static ACCEPTED: string = 'ACCEPTED';
  public static NON_AUTHORITATIVE_INFORMATION: string = 'NON_AUTHORITATIVE_INFORMATION';
  public static NO_CONTENT: string = 'NO_CONTENT';
  public static RESET_CONTENT: string = 'RESET_CONTENT';
  public static PARTIAL_CONTENT: string = 'PARTIAL_CONTENT';
  public static MULTI_STATUS: string = 'MULTI_STATUS';
  public static ALREADY_REPORTED: string = 'ALREADY_REPORTED';
  public static IM_USED: string = 'IM_USED';
  public static MULTI_CHOICES: string = 'MULTI_CHOICES';
  public static MOVED_PERMANENTLY: string = 'MOVED_PERMANENTLY';
  public static FOUND: string = 'FOUND';
  public static SEE_OTHER: string = 'SEE_OTHER';
  public static NOT_MODIFIED: string = 'NOT_MODIFIED';
  public static USE_PROXY: string = 'USE_PROXY';
  public static UNUSED: string = 'UNUSED';
  public static TEMPORARY_REDIRECT: string = 'TEMPORARY_REDIRECT';
  public static PERMANENT_REDIRECT: string = 'PERMANENT_REDIRECT';
  public static BAD_REQUEST: string = 'BAD_REQUEST';
  public static UNAUTHORIZED: string = 'UNAUTHORIZED';
  public static PAYMENT_REQUIRED: string = 'PAYMENT_REQUIRED';
  public static FORBIDDEN: string = 'FORBIDDEN';
  public static NOT_FOUND: string = 'NOT_FOUND';
  public static METHOD_NOT_ALLOWED: string = 'METHOD_NOT_ALLOWED';
  public static NOT_ACCEPTABLE: string = 'NOT_ACCEPTABLE';
  public static PROXY_AUTHENTICATION_REQUIRED: string = 'PROXY_AUTHENTICATION_REQUIRED';
  public static REQUEST_TIMEOUT: string = 'REQUEST_TIMEOUT';
  public static CONFLICT: string = 'CONFLICT';
  public static GONE: string = 'GONE';
  public static LENGTH_REQUIRED: string = 'LENGTH_REQUIRED';
  public static PRECONDITION_FAILED: string = 'PRECONDITION_FAILED';
  public static PAYLOAD_TOO_LARGE: string = 'PAYLOAD_TOO_LARGE';
  public static REQUEST_URI_TOO_LONG: string = 'REQUEST_URI_TOO_LONG';
  public static UNSUPPORTED_MEDIA_TYPE: string = 'UNSUPPORTED_MEDIA_TYPE';
  public static REQUESTED_RANGE_NOT_SATISFIABLE: string = 'REQUESTED_RANGE_NOT_SATISFIABLE';
  public static EXPECTATION_FAILED: string = 'EXPECTATION_FAILED';
  public static IM_A_TEAPOT: string = 'IM_A_TEAPOT';
  public static INSUFFICIENT_SPACE_ON_RESOURCE: string = 'INSUFFICIENT_SPACE_ON_RESOURCE';
  public static METHOD_FAILURE: string = 'METHOD_FAILURE';
  public static MISDIRECTED_REQUEST: string = 'MISDIRECTED_REQUEST';
  public static UNPROCESSABLE_ENTITY: string = 'UNPROCESSABLE_ENTITY';
  public static LOCKED: string = 'LOCKED';
  public static FAILED_DEPENDENCY: string = 'FAILED_DEPENDENCY';
  public static UPGRADE_REQUIRED: string = 'UPGRADE_REQUIRED';
  public static PRECONDITION_REQUIRED: string = 'PRECONDITION_REQUIRED';
  public static TOO_MANY_REQUESTS: string = 'TOO_MANY_REQUESTS';
  public static REQUEST_HEADER_FIELDS_TOO_LARGE: string = 'REQUEST_HEADER_FIELDS_TOO_LARGE';
  public static UNAVAILABLE_FOR_LEGAL_REASONS: string = 'UNAVAILABLE_FOR_LEGAL_REASONS';
  public static INTERNAL_SERVER_ERROR: string = 'INTERNAL_SERVER_ERROR';
  public static NOT_IMPLEMENTED: string = 'NOT_IMPLEMENTED';
  public static BAD_GATEWAY: string = 'BAD_GATEWAY';
  public static SERVICE_UNAVAILABLE: string = 'SERVICE_UNAVAILABLE';
  public static GATEWAY_TIMEOUT: string = 'GATEWAY_TIMEOUT';
  public static HTTP_VERSION_NOT_SUPPORTED: string = 'HTTP_VERSION_NOT_SUPPORTED';
  public static VARIANT_ALSO_NEGOTIATES: string = 'VARIANT_ALSO_NEGOTIATES';
  public static INSUFFICIENT_STORAGE: string = 'INSUFFICIENT_STORAGE';
  public static LOOP_DETECTED: string = 'LOOP_DETECTED';
  public static NOT_EXTENDED: string = 'NOT_EXTENDED';
  public static NETWORK_AUTHENTICATION_REQUIRED: string = 'NETWORK_AUTHENTICATION_REQUIRED';

  public static ToUpperSnakeCase(value: string): string {
    if (isNoneOrEmptyOrWhiteSpace(value)) return '';
    return value
      .trim()
      .replace(/(?<!^)(?=[A-Z])|[-_\s]+/g, '_')
      .replace(/[-_\s]+/g, '_')
      .toUpperCase();
  }

  public static parseCode(statusText: string): HttpStatusCodes {
    const snakeCaseText = HttpStatusText.ToUpperSnakeCase(statusText);
    switch (snakeCaseText) {
      case HttpStatusText.CONTINUE:
        return HttpStatusCodes.CONTINUE;
      case HttpStatusText.SWITCHING_PROTOCOLS:
        return HttpStatusCodes.SWITCHING_PROTOCOLS;
      case HttpStatusText.PROCESSING:
        return HttpStatusCodes.PROCESSING;
      case HttpStatusText.EARLY_HINTS:
        return HttpStatusCodes.EARLY_HINTS;
      case HttpStatusText.OK:
        return HttpStatusCodes.OK;
      case HttpStatusText.CREATED:
        return HttpStatusCodes.CREATED;
      case HttpStatusText.ACCEPTED:
        return HttpStatusCodes.ACCEPTED;
      case HttpStatusText.NON_AUTHORITATIVE_INFORMATION:
        return HttpStatusCodes.NON_AUTHORITATIVE_INFORMATION;
      case HttpStatusText.NO_CONTENT:
        return HttpStatusCodes.NO_CONTENT;
      case HttpStatusText.RESET_CONTENT:
        return HttpStatusCodes.RESET_CONTENT;
      case HttpStatusText.PARTIAL_CONTENT:
        return HttpStatusCodes.PARTIAL_CONTENT;
      case HttpStatusText.MULTI_STATUS:
        return HttpStatusCodes.MULTI_STATUS;
      case HttpStatusText.ALREADY_REPORTED:
        return HttpStatusCodes.ALREADY_REPORTED;
      case HttpStatusText.IM_USED:
        return HttpStatusCodes.IM_USED;
      case HttpStatusText.MULTI_CHOICES:
        return HttpStatusCodes.MULTI_CHOICES;
      case HttpStatusText.MOVED_PERMANENTLY:
        return HttpStatusCodes.MOVED_PERMANENTLY;
      case HttpStatusText.FOUND:
        return HttpStatusCodes.FOUND;
      case HttpStatusText.SEE_OTHER:
        return HttpStatusCodes.SEE_OTHER;
      case HttpStatusText.NOT_MODIFIED:
        return HttpStatusCodes.NOT_MODIFIED;
      case HttpStatusText.USE_PROXY:
        return HttpStatusCodes.USE_PROXY;
      case HttpStatusText.UNUSED:
        return HttpStatusCodes.UNUSED;
      case HttpStatusText.TEMPORARY_REDIRECT:
        return HttpStatusCodes.TEMPORARY_REDIRECT;
      case HttpStatusText.PERMANENT_REDIRECT:
        return HttpStatusCodes.PERMANENT_REDIRECT;
      case HttpStatusText.BAD_REQUEST:
        return HttpStatusCodes.BAD_REQUEST;
      case HttpStatusText.UNAUTHORIZED:
        return HttpStatusCodes.UNAUTHORIZED;
      case HttpStatusText.PAYMENT_REQUIRED:
        return HttpStatusCodes.PAYMENT_REQUIRED;
      case HttpStatusText.FORBIDDEN:
        return HttpStatusCodes.FORBIDDEN;
      case HttpStatusText.NOT_FOUND:
        return HttpStatusCodes.NOT_FOUND;
      case HttpStatusText.METHOD_NOT_ALLOWED:
        return HttpStatusCodes.METHOD_NOT_ALLOWED;
      case HttpStatusText.NOT_ACCEPTABLE:
        return HttpStatusCodes.NOT_ACCEPTABLE;
      case HttpStatusText.PROXY_AUTHENTICATION_REQUIRED:
        return HttpStatusCodes.PROXY_AUTHENTICATION_REQUIRED;
      case HttpStatusText.REQUEST_TIMEOUT:
        return HttpStatusCodes.REQUEST_TIMEOUT;
      case HttpStatusText.CONFLICT:
        return HttpStatusCodes.CONFLICT;
      case HttpStatusText.GONE:
        return HttpStatusCodes.GONE;
      case HttpStatusText.LENGTH_REQUIRED:
        return HttpStatusCodes.LENGTH_REQUIRED;
      case HttpStatusText.PRECONDITION_FAILED:
        return HttpStatusCodes.PRECONDITION_FAILED;
      case HttpStatusText.PAYLOAD_TOO_LARGE:
        return HttpStatusCodes.PAYLOAD_TOO_LARGE;
      case HttpStatusText.REQUEST_URI_TOO_LONG:
        return HttpStatusCodes.REQUEST_URI_TOO_LONG;
      case HttpStatusText.UNSUPPORTED_MEDIA_TYPE:
        return HttpStatusCodes.UNSUPPORTED_MEDIA_TYPE;
      case HttpStatusText.REQUESTED_RANGE_NOT_SATISFIABLE:
        return HttpStatusCodes.REQUESTED_RANGE_NOT_SATISFIABLE;
      case HttpStatusText.EXPECTATION_FAILED:
        return HttpStatusCodes.EXPECTATION_FAILED;
      case HttpStatusText.IM_A_TEAPOT:
        return HttpStatusCodes.IM_A_TEAPOT;
      case HttpStatusText.INSUFFICIENT_SPACE_ON_RESOURCE:
        return HttpStatusCodes.INSUFFICIENT_SPACE_ON_RESOURCE;
      case HttpStatusText.METHOD_FAILURE:
        return HttpStatusCodes.METHOD_FAILURE;
      case HttpStatusText.MISDIRECTED_REQUEST:
        return HttpStatusCodes.MISDIRECTED_REQUEST;
      case HttpStatusText.UNPROCESSABLE_ENTITY:
        return HttpStatusCodes.UNPROCESSABLE_ENTITY;
      case HttpStatusText.LOCKED:
        return HttpStatusCodes.LOCKED;
      case HttpStatusText.FAILED_DEPENDENCY:
        return HttpStatusCodes.FAILED_DEPENDENCY;
      case HttpStatusText.UPGRADE_REQUIRED:
        return HttpStatusCodes.UPGRADE_REQUIRED;
      case HttpStatusText.PRECONDITION_REQUIRED:
        return HttpStatusCodes.PRECONDITION_REQUIRED;
      case HttpStatusText.TOO_MANY_REQUESTS:
        return HttpStatusCodes.TOO_MANY_REQUESTS;
      case HttpStatusText.REQUEST_HEADER_FIELDS_TOO_LARGE:
        return HttpStatusCodes.REQUEST_HEADER_FIELDS_TOO_LARGE;
      case HttpStatusText.UNAVAILABLE_FOR_LEGAL_REASONS:
        return HttpStatusCodes.UNAVAILABLE_FOR_LEGAL_REASONS;
      case HttpStatusText.INTERNAL_SERVER_ERROR:
        return HttpStatusCodes.INTERNAL_SERVER_ERROR;
      case HttpStatusText.NOT_IMPLEMENTED:
        return HttpStatusCodes.NOT_IMPLEMENTED;
      case HttpStatusText.BAD_GATEWAY:
        return HttpStatusCodes.BAD_GATEWAY;
      case HttpStatusText.SERVICE_UNAVAILABLE:
        return HttpStatusCodes.SERVICE_UNAVAILABLE;
      case HttpStatusText.GATEWAY_TIMEOUT:
        return HttpStatusCodes.GATEWAY_TIMEOUT;
      case HttpStatusText.HTTP_VERSION_NOT_SUPPORTED:
        return HttpStatusCodes.HTTP_VERSION_NOT_SUPPORTED;
      case HttpStatusText.VARIANT_ALSO_NEGOTIATES:
        return HttpStatusCodes.VARIANT_ALSO_NEGOTIATES;
      case HttpStatusText.INSUFFICIENT_STORAGE:
        return HttpStatusCodes.INSUFFICIENT_STORAGE;
      case HttpStatusText.LOOP_DETECTED:
        return HttpStatusCodes.LOOP_DETECTED;
      case HttpStatusText.NOT_EXTENDED:
        return HttpStatusCodes.NOT_EXTENDED;
      case HttpStatusText.NETWORK_AUTHENTICATION_REQUIRED:
        return HttpStatusCodes.NETWORK_AUTHENTICATION_REQUIRED;
      default:
        throw new Error(`FormatException: ${statusText}`);
    }
  }

  public static fromCode(statusCode: HttpStatusCodes): string {
    switch (statusCode) {
      case HttpStatusCodes.CONTINUE:
        return HttpStatusText.CONTINUE;
      case HttpStatusCodes.SWITCHING_PROTOCOLS:
        return HttpStatusText.SWITCHING_PROTOCOLS;
      case HttpStatusCodes.PROCESSING:
        return HttpStatusText.PROCESSING;
      case HttpStatusCodes.EARLY_HINTS:
        return HttpStatusText.EARLY_HINTS;
      case HttpStatusCodes.OK:
        return HttpStatusText.OK;
      case HttpStatusCodes.CREATED:
        return HttpStatusText.CREATED;
      case HttpStatusCodes.ACCEPTED:
        return HttpStatusText.ACCEPTED;
      case HttpStatusCodes.NON_AUTHORITATIVE_INFORMATION:
        return HttpStatusText.NON_AUTHORITATIVE_INFORMATION;
      case HttpStatusCodes.NO_CONTENT:
        return HttpStatusText.NO_CONTENT;
      case HttpStatusCodes.RESET_CONTENT:
        return HttpStatusText.RESET_CONTENT;
      case HttpStatusCodes.PARTIAL_CONTENT:
        return HttpStatusText.PARTIAL_CONTENT;
      case HttpStatusCodes.MULTI_STATUS:
        return HttpStatusText.MULTI_STATUS;
      case HttpStatusCodes.ALREADY_REPORTED:
        return HttpStatusText.ALREADY_REPORTED;
      case HttpStatusCodes.IM_USED:
        return HttpStatusText.IM_USED;
      case HttpStatusCodes.MULTI_CHOICES:
        return HttpStatusText.MULTI_CHOICES;
      case HttpStatusCodes.MOVED_PERMANENTLY:
        return HttpStatusText.MOVED_PERMANENTLY;
      case HttpStatusCodes.FOUND:
        return HttpStatusText.FOUND;
      case HttpStatusCodes.SEE_OTHER:
        return HttpStatusText.SEE_OTHER;
      case HttpStatusCodes.NOT_MODIFIED:
        return HttpStatusText.NOT_MODIFIED;
      case HttpStatusCodes.USE_PROXY:
        return HttpStatusText.USE_PROXY;
      case HttpStatusCodes.UNUSED:
        return HttpStatusText.UNUSED;
      case HttpStatusCodes.TEMPORARY_REDIRECT:
        return HttpStatusText.TEMPORARY_REDIRECT;
      case HttpStatusCodes.PERMANENT_REDIRECT:
        return HttpStatusText.PERMANENT_REDIRECT;
      case HttpStatusCodes.BAD_REQUEST:
        return HttpStatusText.BAD_REQUEST;
      case HttpStatusCodes.UNAUTHORIZED:
        return HttpStatusText.UNAUTHORIZED;
      case HttpStatusCodes.PAYMENT_REQUIRED:
        return HttpStatusText.PAYMENT_REQUIRED;
      case HttpStatusCodes.FORBIDDEN:
        return HttpStatusText.FORBIDDEN;
      case HttpStatusCodes.NOT_FOUND:
        return HttpStatusText.NOT_FOUND;
      case HttpStatusCodes.METHOD_NOT_ALLOWED:
        return HttpStatusText.METHOD_NOT_ALLOWED;
      case HttpStatusCodes.NOT_ACCEPTABLE:
        return HttpStatusText.NOT_ACCEPTABLE;
      case HttpStatusCodes.PROXY_AUTHENTICATION_REQUIRED:
        return HttpStatusText.PROXY_AUTHENTICATION_REQUIRED;
      case HttpStatusCodes.REQUEST_TIMEOUT:
        return HttpStatusText.REQUEST_TIMEOUT;
      case HttpStatusCodes.CONFLICT:
        return HttpStatusText.CONFLICT;
      case HttpStatusCodes.GONE:
        return HttpStatusText.GONE;
      case HttpStatusCodes.LENGTH_REQUIRED:
        return HttpStatusText.LENGTH_REQUIRED;
      case HttpStatusCodes.PRECONDITION_FAILED:
        return HttpStatusText.PRECONDITION_FAILED;
      case HttpStatusCodes.PAYLOAD_TOO_LARGE:
        return HttpStatusText.PAYLOAD_TOO_LARGE;
      case HttpStatusCodes.REQUEST_URI_TOO_LONG:
        return HttpStatusText.REQUEST_URI_TOO_LONG;
      case HttpStatusCodes.UNSUPPORTED_MEDIA_TYPE:
        return HttpStatusText.UNSUPPORTED_MEDIA_TYPE;
      case HttpStatusCodes.REQUESTED_RANGE_NOT_SATISFIABLE:
        return HttpStatusText.REQUESTED_RANGE_NOT_SATISFIABLE;
      case HttpStatusCodes.EXPECTATION_FAILED:
        return HttpStatusText.EXPECTATION_FAILED;
      case HttpStatusCodes.IM_A_TEAPOT:
        return HttpStatusText.IM_A_TEAPOT;
      case HttpStatusCodes.INSUFFICIENT_SPACE_ON_RESOURCE:
        return HttpStatusText.INSUFFICIENT_SPACE_ON_RESOURCE;
      case HttpStatusCodes.METHOD_FAILURE:
        return HttpStatusText.METHOD_FAILURE;
      case HttpStatusCodes.MISDIRECTED_REQUEST:
        return HttpStatusText.MISDIRECTED_REQUEST;
      case HttpStatusCodes.UNPROCESSABLE_ENTITY:
        return HttpStatusText.UNPROCESSABLE_ENTITY;
      case HttpStatusCodes.LOCKED:
        return HttpStatusText.LOCKED;
      case HttpStatusCodes.FAILED_DEPENDENCY:
        return HttpStatusText.FAILED_DEPENDENCY;
      case HttpStatusCodes.UPGRADE_REQUIRED:
        return HttpStatusText.UPGRADE_REQUIRED;
      case HttpStatusCodes.PRECONDITION_REQUIRED:
        return HttpStatusText.PRECONDITION_REQUIRED;
      case HttpStatusCodes.TOO_MANY_REQUESTS:
        return HttpStatusText.TOO_MANY_REQUESTS;
      case HttpStatusCodes.REQUEST_HEADER_FIELDS_TOO_LARGE:
        return HttpStatusText.REQUEST_HEADER_FIELDS_TOO_LARGE;
      case HttpStatusCodes.UNAVAILABLE_FOR_LEGAL_REASONS:
        return HttpStatusText.UNAVAILABLE_FOR_LEGAL_REASONS;
      case HttpStatusCodes.INTERNAL_SERVER_ERROR:
        return HttpStatusText.INTERNAL_SERVER_ERROR;
      case HttpStatusCodes.NOT_IMPLEMENTED:
        return HttpStatusText.NOT_IMPLEMENTED;
      case HttpStatusCodes.BAD_GATEWAY:
        return HttpStatusText.BAD_GATEWAY;
      case HttpStatusCodes.SERVICE_UNAVAILABLE:
        return HttpStatusText.SERVICE_UNAVAILABLE;
      case HttpStatusCodes.GATEWAY_TIMEOUT:
        return HttpStatusText.GATEWAY_TIMEOUT;
      case HttpStatusCodes.HTTP_VERSION_NOT_SUPPORTED:
        return HttpStatusText.HTTP_VERSION_NOT_SUPPORTED;
      case HttpStatusCodes.VARIANT_ALSO_NEGOTIATES:
        return HttpStatusText.VARIANT_ALSO_NEGOTIATES;
      case HttpStatusCodes.INSUFFICIENT_STORAGE:
        return HttpStatusText.INSUFFICIENT_STORAGE;
      case HttpStatusCodes.LOOP_DETECTED:
        return HttpStatusText.LOOP_DETECTED;
      case HttpStatusCodes.NOT_EXTENDED:
        return HttpStatusText.NOT_EXTENDED;
      case HttpStatusCodes.NETWORK_AUTHENTICATION_REQUIRED:
        return HttpStatusText.NETWORK_AUTHENTICATION_REQUIRED;
      default:
        throw new Error(`Invalid status code: ${statusCode}`);
    }
  }
}

export interface HttpMessageStatus {
  status: HttpStatusText;
  statusCode: HttpStatusCodes;
  statusOk: boolean;
}

export interface HttpMessageBody<T extends any> extends HttpMessageStatus {
  message: string;
  timestamp: string;
  data?: T;
}

export function setStatusMessage(messageBody: HttpMessageStatus, code: HttpStatusCodes) {
  messageBody.statusOk = 200 <= code && code < 300;
  messageBody.statusCode = code;
  messageBody.status = HttpStatusText.fromCode(code);
}

export default HttpStatusCodes;
