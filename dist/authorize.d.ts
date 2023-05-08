export interface AuthorizeXML {
    template: 'authorize';
    data: {
        username: string;
        password: string;
    };
}
export declare function authorize({ username, password }: {
    username: string;
    password: string;
}): Promise<string>;
