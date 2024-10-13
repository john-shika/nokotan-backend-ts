import { isNoneOrEmptyOrWhiteSpace } from '@/utils/common';

export enum HttpStatusCode {
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

  public static parseCode(code: string): HttpStatusCode {
    const snakeCaseText = HttpStatusText.ToUpperSnakeCase(code);
    switch (snakeCaseText) {
      case HttpStatusText.CONTINUE:
        return HttpStatusCode.CONTINUE;
      case HttpStatusText.SWITCHING_PROTOCOLS:
        return HttpStatusCode.SWITCHING_PROTOCOLS;
      case HttpStatusText.PROCESSING:
        return HttpStatusCode.PROCESSING;
      case HttpStatusText.EARLY_HINTS:
        return HttpStatusCode.EARLY_HINTS;
      case HttpStatusText.OK:
        return HttpStatusCode.OK;
      case HttpStatusText.CREATED:
        return HttpStatusCode.CREATED;
      case HttpStatusText.ACCEPTED:
        return HttpStatusCode.ACCEPTED;
      case HttpStatusText.NON_AUTHORITATIVE_INFORMATION:
        return HttpStatusCode.NON_AUTHORITATIVE_INFORMATION;
      case HttpStatusText.NO_CONTENT:
        return HttpStatusCode.NO_CONTENT;
      case HttpStatusText.RESET_CONTENT:
        return HttpStatusCode.RESET_CONTENT;
      case HttpStatusText.PARTIAL_CONTENT:
        return HttpStatusCode.PARTIAL_CONTENT;
      case HttpStatusText.MULTI_STATUS:
        return HttpStatusCode.MULTI_STATUS;
      case HttpStatusText.ALREADY_REPORTED:
        return HttpStatusCode.ALREADY_REPORTED;
      case HttpStatusText.IM_USED:
        return HttpStatusCode.IM_USED;
      case HttpStatusText.MULTI_CHOICES:
        return HttpStatusCode.MULTI_CHOICES;
      case HttpStatusText.MOVED_PERMANENTLY:
        return HttpStatusCode.MOVED_PERMANENTLY;
      case HttpStatusText.FOUND:
        return HttpStatusCode.FOUND;
      case HttpStatusText.SEE_OTHER:
        return HttpStatusCode.SEE_OTHER;
      case HttpStatusText.NOT_MODIFIED:
        return HttpStatusCode.NOT_MODIFIED;
      case HttpStatusText.USE_PROXY:
        return HttpStatusCode.USE_PROXY;
      case HttpStatusText.UNUSED:
        return HttpStatusCode.UNUSED;
      case HttpStatusText.TEMPORARY_REDIRECT:
        return HttpStatusCode.TEMPORARY_REDIRECT;
      case HttpStatusText.PERMANENT_REDIRECT:
        return HttpStatusCode.PERMANENT_REDIRECT;
      case HttpStatusText.BAD_REQUEST:
        return HttpStatusCode.BAD_REQUEST;
      case HttpStatusText.UNAUTHORIZED:
        return HttpStatusCode.UNAUTHORIZED;
      case HttpStatusText.PAYMENT_REQUIRED:
        return HttpStatusCode.PAYMENT_REQUIRED;
      case HttpStatusText.FORBIDDEN:
        return HttpStatusCode.FORBIDDEN;
      case HttpStatusText.NOT_FOUND:
        return HttpStatusCode.NOT_FOUND;
      case HttpStatusText.METHOD_NOT_ALLOWED:
        return HttpStatusCode.METHOD_NOT_ALLOWED;
      case HttpStatusText.NOT_ACCEPTABLE:
        return HttpStatusCode.NOT_ACCEPTABLE;
      case HttpStatusText.PROXY_AUTHENTICATION_REQUIRED:
        return HttpStatusCode.PROXY_AUTHENTICATION_REQUIRED;
      case HttpStatusText.REQUEST_TIMEOUT:
        return HttpStatusCode.REQUEST_TIMEOUT;
      case HttpStatusText.CONFLICT:
        return HttpStatusCode.CONFLICT;
      case HttpStatusText.GONE:
        return HttpStatusCode.GONE;
      case HttpStatusText.LENGTH_REQUIRED:
        return HttpStatusCode.LENGTH_REQUIRED;
      case HttpStatusText.PRECONDITION_FAILED:
        return HttpStatusCode.PRECONDITION_FAILED;
      case HttpStatusText.PAYLOAD_TOO_LARGE:
        return HttpStatusCode.PAYLOAD_TOO_LARGE;
      case HttpStatusText.REQUEST_URI_TOO_LONG:
        return HttpStatusCode.REQUEST_URI_TOO_LONG;
      case HttpStatusText.UNSUPPORTED_MEDIA_TYPE:
        return HttpStatusCode.UNSUPPORTED_MEDIA_TYPE;
      case HttpStatusText.REQUESTED_RANGE_NOT_SATISFIABLE:
        return HttpStatusCode.REQUESTED_RANGE_NOT_SATISFIABLE;
      case HttpStatusText.EXPECTATION_FAILED:
        return HttpStatusCode.EXPECTATION_FAILED;
      case HttpStatusText.IM_A_TEAPOT:
        return HttpStatusCode.IM_A_TEAPOT;
      case HttpStatusText.INSUFFICIENT_SPACE_ON_RESOURCE:
        return HttpStatusCode.INSUFFICIENT_SPACE_ON_RESOURCE;
      case HttpStatusText.METHOD_FAILURE:
        return HttpStatusCode.METHOD_FAILURE;
      case HttpStatusText.MISDIRECTED_REQUEST:
        return HttpStatusCode.MISDIRECTED_REQUEST;
      case HttpStatusText.UNPROCESSABLE_ENTITY:
        return HttpStatusCode.UNPROCESSABLE_ENTITY;
      case HttpStatusText.LOCKED:
        return HttpStatusCode.LOCKED;
      case HttpStatusText.FAILED_DEPENDENCY:
        return HttpStatusCode.FAILED_DEPENDENCY;
      case HttpStatusText.UPGRADE_REQUIRED:
        return HttpStatusCode.UPGRADE_REQUIRED;
      case HttpStatusText.PRECONDITION_REQUIRED:
        return HttpStatusCode.PRECONDITION_REQUIRED;
      case HttpStatusText.TOO_MANY_REQUESTS:
        return HttpStatusCode.TOO_MANY_REQUESTS;
      case HttpStatusText.REQUEST_HEADER_FIELDS_TOO_LARGE:
        return HttpStatusCode.REQUEST_HEADER_FIELDS_TOO_LARGE;
      case HttpStatusText.UNAVAILABLE_FOR_LEGAL_REASONS:
        return HttpStatusCode.UNAVAILABLE_FOR_LEGAL_REASONS;
      case HttpStatusText.INTERNAL_SERVER_ERROR:
        return HttpStatusCode.INTERNAL_SERVER_ERROR;
      case HttpStatusText.NOT_IMPLEMENTED:
        return HttpStatusCode.NOT_IMPLEMENTED;
      case HttpStatusText.BAD_GATEWAY:
        return HttpStatusCode.BAD_GATEWAY;
      case HttpStatusText.SERVICE_UNAVAILABLE:
        return HttpStatusCode.SERVICE_UNAVAILABLE;
      case HttpStatusText.GATEWAY_TIMEOUT:
        return HttpStatusCode.GATEWAY_TIMEOUT;
      case HttpStatusText.HTTP_VERSION_NOT_SUPPORTED:
        return HttpStatusCode.HTTP_VERSION_NOT_SUPPORTED;
      case HttpStatusText.VARIANT_ALSO_NEGOTIATES:
        return HttpStatusCode.VARIANT_ALSO_NEGOTIATES;
      case HttpStatusText.INSUFFICIENT_STORAGE:
        return HttpStatusCode.INSUFFICIENT_STORAGE;
      case HttpStatusText.LOOP_DETECTED:
        return HttpStatusCode.LOOP_DETECTED;
      case HttpStatusText.NOT_EXTENDED:
        return HttpStatusCode.NOT_EXTENDED;
      case HttpStatusText.NETWORK_AUTHENTICATION_REQUIRED:
        return HttpStatusCode.NETWORK_AUTHENTICATION_REQUIRED;
      default:
        throw new Error(`FormatException: Invalid status code ${code}`);
    }
  }

  public static fromCode(code: HttpStatusCode): string {
    switch (code) {
      case HttpStatusCode.CONTINUE:
        return HttpStatusText.CONTINUE;
      case HttpStatusCode.SWITCHING_PROTOCOLS:
        return HttpStatusText.SWITCHING_PROTOCOLS;
      case HttpStatusCode.PROCESSING:
        return HttpStatusText.PROCESSING;
      case HttpStatusCode.EARLY_HINTS:
        return HttpStatusText.EARLY_HINTS;
      case HttpStatusCode.OK:
        return HttpStatusText.OK;
      case HttpStatusCode.CREATED:
        return HttpStatusText.CREATED;
      case HttpStatusCode.ACCEPTED:
        return HttpStatusText.ACCEPTED;
      case HttpStatusCode.NON_AUTHORITATIVE_INFORMATION:
        return HttpStatusText.NON_AUTHORITATIVE_INFORMATION;
      case HttpStatusCode.NO_CONTENT:
        return HttpStatusText.NO_CONTENT;
      case HttpStatusCode.RESET_CONTENT:
        return HttpStatusText.RESET_CONTENT;
      case HttpStatusCode.PARTIAL_CONTENT:
        return HttpStatusText.PARTIAL_CONTENT;
      case HttpStatusCode.MULTI_STATUS:
        return HttpStatusText.MULTI_STATUS;
      case HttpStatusCode.ALREADY_REPORTED:
        return HttpStatusText.ALREADY_REPORTED;
      case HttpStatusCode.IM_USED:
        return HttpStatusText.IM_USED;
      case HttpStatusCode.MULTI_CHOICES:
        return HttpStatusText.MULTI_CHOICES;
      case HttpStatusCode.MOVED_PERMANENTLY:
        return HttpStatusText.MOVED_PERMANENTLY;
      case HttpStatusCode.FOUND:
        return HttpStatusText.FOUND;
      case HttpStatusCode.SEE_OTHER:
        return HttpStatusText.SEE_OTHER;
      case HttpStatusCode.NOT_MODIFIED:
        return HttpStatusText.NOT_MODIFIED;
      case HttpStatusCode.USE_PROXY:
        return HttpStatusText.USE_PROXY;
      case HttpStatusCode.UNUSED:
        return HttpStatusText.UNUSED;
      case HttpStatusCode.TEMPORARY_REDIRECT:
        return HttpStatusText.TEMPORARY_REDIRECT;
      case HttpStatusCode.PERMANENT_REDIRECT:
        return HttpStatusText.PERMANENT_REDIRECT;
      case HttpStatusCode.BAD_REQUEST:
        return HttpStatusText.BAD_REQUEST;
      case HttpStatusCode.UNAUTHORIZED:
        return HttpStatusText.UNAUTHORIZED;
      case HttpStatusCode.PAYMENT_REQUIRED:
        return HttpStatusText.PAYMENT_REQUIRED;
      case HttpStatusCode.FORBIDDEN:
        return HttpStatusText.FORBIDDEN;
      case HttpStatusCode.NOT_FOUND:
        return HttpStatusText.NOT_FOUND;
      case HttpStatusCode.METHOD_NOT_ALLOWED:
        return HttpStatusText.METHOD_NOT_ALLOWED;
      case HttpStatusCode.NOT_ACCEPTABLE:
        return HttpStatusText.NOT_ACCEPTABLE;
      case HttpStatusCode.PROXY_AUTHENTICATION_REQUIRED:
        return HttpStatusText.PROXY_AUTHENTICATION_REQUIRED;
      case HttpStatusCode.REQUEST_TIMEOUT:
        return HttpStatusText.REQUEST_TIMEOUT;
      case HttpStatusCode.CONFLICT:
        return HttpStatusText.CONFLICT;
      case HttpStatusCode.GONE:
        return HttpStatusText.GONE;
      case HttpStatusCode.LENGTH_REQUIRED:
        return HttpStatusText.LENGTH_REQUIRED;
      case HttpStatusCode.PRECONDITION_FAILED:
        return HttpStatusText.PRECONDITION_FAILED;
      case HttpStatusCode.PAYLOAD_TOO_LARGE:
        return HttpStatusText.PAYLOAD_TOO_LARGE;
      case HttpStatusCode.REQUEST_URI_TOO_LONG:
        return HttpStatusText.REQUEST_URI_TOO_LONG;
      case HttpStatusCode.UNSUPPORTED_MEDIA_TYPE:
        return HttpStatusText.UNSUPPORTED_MEDIA_TYPE;
      case HttpStatusCode.REQUESTED_RANGE_NOT_SATISFIABLE:
        return HttpStatusText.REQUESTED_RANGE_NOT_SATISFIABLE;
      case HttpStatusCode.EXPECTATION_FAILED:
        return HttpStatusText.EXPECTATION_FAILED;
      case HttpStatusCode.IM_A_TEAPOT:
        return HttpStatusText.IM_A_TEAPOT;
      case HttpStatusCode.INSUFFICIENT_SPACE_ON_RESOURCE:
        return HttpStatusText.INSUFFICIENT_SPACE_ON_RESOURCE;
      case HttpStatusCode.METHOD_FAILURE:
        return HttpStatusText.METHOD_FAILURE;
      case HttpStatusCode.MISDIRECTED_REQUEST:
        return HttpStatusText.MISDIRECTED_REQUEST;
      case HttpStatusCode.UNPROCESSABLE_ENTITY:
        return HttpStatusText.UNPROCESSABLE_ENTITY;
      case HttpStatusCode.LOCKED:
        return HttpStatusText.LOCKED;
      case HttpStatusCode.FAILED_DEPENDENCY:
        return HttpStatusText.FAILED_DEPENDENCY;
      case HttpStatusCode.UPGRADE_REQUIRED:
        return HttpStatusText.UPGRADE_REQUIRED;
      case HttpStatusCode.PRECONDITION_REQUIRED:
        return HttpStatusText.PRECONDITION_REQUIRED;
      case HttpStatusCode.TOO_MANY_REQUESTS:
        return HttpStatusText.TOO_MANY_REQUESTS;
      case HttpStatusCode.REQUEST_HEADER_FIELDS_TOO_LARGE:
        return HttpStatusText.REQUEST_HEADER_FIELDS_TOO_LARGE;
      case HttpStatusCode.UNAVAILABLE_FOR_LEGAL_REASONS:
        return HttpStatusText.UNAVAILABLE_FOR_LEGAL_REASONS;
      case HttpStatusCode.INTERNAL_SERVER_ERROR:
        return HttpStatusText.INTERNAL_SERVER_ERROR;
      case HttpStatusCode.NOT_IMPLEMENTED:
        return HttpStatusText.NOT_IMPLEMENTED;
      case HttpStatusCode.BAD_GATEWAY:
        return HttpStatusText.BAD_GATEWAY;
      case HttpStatusCode.SERVICE_UNAVAILABLE:
        return HttpStatusText.SERVICE_UNAVAILABLE;
      case HttpStatusCode.GATEWAY_TIMEOUT:
        return HttpStatusText.GATEWAY_TIMEOUT;
      case HttpStatusCode.HTTP_VERSION_NOT_SUPPORTED:
        return HttpStatusText.HTTP_VERSION_NOT_SUPPORTED;
      case HttpStatusCode.VARIANT_ALSO_NEGOTIATES:
        return HttpStatusText.VARIANT_ALSO_NEGOTIATES;
      case HttpStatusCode.INSUFFICIENT_STORAGE:
        return HttpStatusText.INSUFFICIENT_STORAGE;
      case HttpStatusCode.LOOP_DETECTED:
        return HttpStatusText.LOOP_DETECTED;
      case HttpStatusCode.NOT_EXTENDED:
        return HttpStatusText.NOT_EXTENDED;
      case HttpStatusCode.NETWORK_AUTHENTICATION_REQUIRED:
        return HttpStatusText.NETWORK_AUTHENTICATION_REQUIRED;
      default:
        throw new Error(`Exception: Unsupported status code: ${code}`);
    }
  }
}

export default HttpStatusCode;
