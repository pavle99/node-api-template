type PostV1LoginInput = {
    username: string;
    password: string;
};

type PostV1LoginResponse = {
    status: "success";
    data: {
        id: string;
        username: string;
        email: string;
        roles: string[];
        accessToken: string;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

type PostV1RegisterInput = ({
    username: string;
    email: string;
} & {
    roles: string[];
}) & {
    username: string;
    email: string;
    password: string;
    roles?: string[] | undefined;
};

type PostV1RegisterResponse = {
    status: "success";
    data: {
        message: string;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

type GetV1UsersInput = {} & {};

type GetV1UsersResponse = {
    status: "success";
    data: {
        demoData: string;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

type GetV1UsersModInput = ({} & {}) & {};

type GetV1UsersModResponse = {
    status: "success";
    data: {
        demoData: string;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

type GetV1UsersAdminInput = ({} & {}) & {};

type GetV1UsersAdminResponse = {
    status: "success";
    data: {
        demoData: string;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

type GetV1UsersIdInput = {} & {
    /** a numeric string containing the id of the user */
    id: string;
    queryParam?: string[] | undefined;
};

type GetV1UsersIdResponse = {
    status: "success";
    data: {
        demoData: string;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

type PostV1UsersIdInput = {} & {
    /** a numeric string containing the id of the user */
    id: string;
    name: string;
};

type PostV1UsersIdResponse = {
    status: "success";
    data: {
        name: string;
        createdAt: string;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

export type Path = "/v1/login" | "/v1/register" | "/v1/users" | "/v1/users/mod" | "/v1/users/admin" | "/v1/users/:id" | "/v1/users/:id";

export type Method = "get" | "post" | "put" | "delete" | "patch";

export type MethodPath = `${Method} ${Path}`;

export interface Input extends Record<MethodPath, any> {
    "post /v1/login": PostV1LoginInput;
    "post /v1/register": PostV1RegisterInput;
    "get /v1/users": GetV1UsersInput;
    "get /v1/users/mod": GetV1UsersModInput;
    "get /v1/users/admin": GetV1UsersAdminInput;
    "get /v1/users/:id": GetV1UsersIdInput;
    "post /v1/users/:id": PostV1UsersIdInput;
}

export interface Response extends Record<MethodPath, any> {
    "post /v1/login": PostV1LoginResponse;
    "post /v1/register": PostV1RegisterResponse;
    "get /v1/users": GetV1UsersResponse;
    "get /v1/users/mod": GetV1UsersModResponse;
    "get /v1/users/admin": GetV1UsersAdminResponse;
    "get /v1/users/:id": GetV1UsersIdResponse;
    "post /v1/users/:id": PostV1UsersIdResponse;
}

export const jsonEndpoints = { "post /v1/login": true, "post /v1/register": true, "get /v1/users": true, "get /v1/users/mod": true, "get /v1/users/admin": true, "get /v1/users/:id": true, "post /v1/users/:id": true };

export const endpointTags = { "post /v1/login": ["auth"], "post /v1/register": ["auth"], "get /v1/users": ["users"], "get /v1/users/mod": ["users"], "get /v1/users/admin": ["users"], "get /v1/users/:id": ["users"], "post /v1/users/:id": ["users"] };

export type Provider = <M extends Method, P extends Path>(method: M, path: P, params: Input[`${M} ${P}`]) => Promise<Response[`${M} ${P}`]>;

export type Implementation = (method: Method, path: string, params: Record<string, any>) => Promise<any>;

/*
export const exampleImplementation: Implementation = async (
  method,
  path,
  params
) => {
  const hasBody = !["get", "delete"].includes(method);
  const searchParams = hasBody ? "" : `?${new URLSearchParams(params)}`;
  const response = await fetch(`https://example.com${path}${searchParams}`, {
    method: method.toUpperCase(),
    headers: hasBody ? { "Content-Type": "application/json" } : undefined,
    body: hasBody ? JSON.stringify(params) : undefined,
  });
  if (`${method} ${path}` in jsonEndpoints) {
    return response.json();
  }
  return response.text();
};

const client = new ExpressZodAPIClient(exampleImplementation);
client.provide("get", "/v1/user/retrieve", { id: "10" });
*/
export class ExpressZodAPIClient {
    constructor(protected readonly implementation: Implementation) { }
    public readonly provide: Provider = async (method, path, params) => this.implementation(method, Object.keys(params).reduce((acc, key) => acc.replace(`:${key}`, params[key]), path), Object.keys(params).reduce((acc, key) => path.indexOf(`:${key}`) >= 0 ? acc : { ...acc, [key]: params[key] }, {}));
}