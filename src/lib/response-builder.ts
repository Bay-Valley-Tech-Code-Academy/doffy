type ResponseData<T = unknown> = T[] | Record<string, T>;

// interface Response {
//   data: ResponseData;
//   msg: string;
//   err: boolean;
// }

interface MainResponseBuilderOptions {
  error?: Error;
  log?: boolean;
}

export interface ResponseBuilderData<T> {
  data: T;
  msg: string;
  err: boolean;
  options?: MainResponseBuilderOptions;
}

class ResponseBuilderOptions {
  error: Error = null;
  log = false;

  constructor(options: MainResponseBuilderOptions) {
    this.error = options ? options.error : this.error;
    this.log = options ? options.log : this.log;
  }
}

export const ResponseBuilder = (
  data: ResponseData,
  msg: string = null,
  err = false,
  builderOptions?: MainResponseBuilderOptions,
): string => {
  const options = new ResponseBuilderOptions(builderOptions);

  if (err) {
    if (options.log) {
      console.error('An error occurred', options.error);
    }

    if (options.error) {
      throw options.error;
    }
  }

  return JSON.stringify({
    data,
    msg,
    err,
  });
};

export default ResponseBuilder;