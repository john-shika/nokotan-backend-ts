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
  MULTIPLE_CHOICES = 300,
  MOVED_PERMANENTLY = 301,
  MOVED_TEMPORARILY = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  USE_PROXY = 305,
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
  REQUEST_TOO_LONG = 413,
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
  INSUFFICIENT_STORAGE = 507,
  NETWORK_AUTHENTICATION_REQUIRED = 511,
}

export enum HttpStatusText {
  CONTINUE = 'Continue',
  SWITCHING_PROTOCOLS = 'Switching Protocols',
  PROCESSING = 'Processing',
  EARLY_HINTS = 'Early Hints',
  OK = 'Ok',
  CREATED = 'Created',
  ACCEPTED = 'Accepted',
  NON_AUTHORITATIVE_INFORMATION = 'Non Authoritative Information',
  NO_CONTENT = 'No Content',
  RESET_CONTENT = 'Reset Content',
  PARTIAL_CONTENT = 'Partial Content',
  MULTI_STATUS = 'Multi Status',
  MULTIPLE_CHOICES = 'Multiple Choices',
  MOVED_PERMANENTLY = 'Moved Permanently',
  MOVED_TEMPORARILY = 'Moved Temporarily',
  SEE_OTHER = 'See Other',
  NOT_MODIFIED = 'Not Modified',
  USE_PROXY = 'Use Proxy',
  TEMPORARY_REDIRECT = 'Temporary Redirect',
  PERMANENT_REDIRECT = 'Permanent Redirect',
  BAD_REQUEST = 'Bad Request',
  UNAUTHORIZED = 'Unauthorized',
  PAYMENT_REQUIRED = 'Payment Required',
  FORBIDDEN = 'Forbidden',
  NOT_FOUND = 'Not Found',
  METHOD_NOT_ALLOWED = 'Method Not Allowed',
  NOT_ACCEPTABLE = 'Not Acceptable',
  PROXY_AUTHENTICATION_REQUIRED = 'Proxy Authentication Required',
  REQUEST_TIMEOUT = 'Request Timeout',
  CONFLICT = 'Conflict',
  GONE = 'Gone',
  LENGTH_REQUIRED = 'Length Required',
  PRECONDITION_FAILED = 'Precondition Failed',
  REQUEST_TOO_LONG = 'Request Too Long',
  REQUEST_URI_TOO_LONG = 'Request URI Too Long',
  UNSUPPORTED_MEDIA_TYPE = 'Unsupported Media Type',
  REQUESTED_RANGE_NOT_SATISFIABLE = 'Requested Range Not Satisfiable',
  EXPECTATION_FAILED = 'Expectation Failed',
  IM_A_TEAPOT = 'Im A Teapot',
  INSUFFICIENT_SPACE_ON_RESOURCE = 'Insufficient Space On Resource',
  METHOD_FAILURE = 'Method Failure',
  MISDIRECTED_REQUEST = 'Misdirected Request',
  UNPROCESSABLE_ENTITY = 'Unprocessable Entity',
  LOCKED = 'Locked',
  FAILED_DEPENDENCY = 'Failed Dependency',
  UPGRADE_REQUIRED = 'Upgrade Required',
  PRECONDITION_REQUIRED = 'Precondition Required',
  TOO_MANY_REQUESTS = 'Too Many Requests',
  REQUEST_HEADER_FIELDS_TOO_LARGE = 'Request Header Fields Too Large',
  UNAVAILABLE_FOR_LEGAL_REASONS = 'Unavailable For Legal Reasons',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  NOT_IMPLEMENTED = 'Not Implemented',
  BAD_GATEWAY = 'Bad Gateway',
  SERVICE_UNAVAILABLE = 'Service Unavailable',
  GATEWAY_TIMEOUT = 'Gateway Timeout',
  HTTP_VERSION_NOT_SUPPORTED = 'HTTP Version Not Supported',
  INSUFFICIENT_STORAGE = 'Insufficient Storage',
  NETWORK_AUTHENTICATION_REQUIRED = 'Network Authentication Required',
}

export interface HttpMessageStatus {
  status: HttpStatusText;
  status_code: HttpStatusCodes;
  status_ok: boolean;
}

export interface HttpMessageBody<T extends any> extends HttpMessageStatus {
  message: string;
  timestamp: string;
  data?: T;
}

export function getHttpStatusText(code: HttpStatusCodes): HttpStatusText {
  switch (code) {
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
    case HttpStatusCodes.MULTIPLE_CHOICES:
      return HttpStatusText.MULTIPLE_CHOICES;
    case HttpStatusCodes.MOVED_PERMANENTLY:
      return HttpStatusText.MOVED_PERMANENTLY;
    case HttpStatusCodes.MOVED_TEMPORARILY:
      return HttpStatusText.MOVED_TEMPORARILY;
    case HttpStatusCodes.SEE_OTHER:
      return HttpStatusText.SEE_OTHER;
    case HttpStatusCodes.NOT_MODIFIED:
      return HttpStatusText.NOT_MODIFIED;
    case HttpStatusCodes.USE_PROXY:
      return HttpStatusText.USE_PROXY;
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
    case HttpStatusCodes.REQUEST_TOO_LONG:
      return HttpStatusText.REQUEST_TOO_LONG;
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
    case HttpStatusCodes.INSUFFICIENT_STORAGE:
      return HttpStatusText.INSUFFICIENT_STORAGE;
    case HttpStatusCodes.NETWORK_AUTHENTICATION_REQUIRED:
      return HttpStatusText.NETWORK_AUTHENTICATION_REQUIRED;
  }
}

export function setStatusMessage(messageStatus: HttpMessageStatus, code: HttpStatusCodes) {
  messageStatus.status = getHttpStatusText(code);
  messageStatus.status_code = code;
  messageStatus.status_ok = 200 <= code && code < 300;
}

export default HttpStatusCodes;
