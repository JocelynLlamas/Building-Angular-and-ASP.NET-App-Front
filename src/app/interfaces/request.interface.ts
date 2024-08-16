export interface EntryResponse {
    Description: string;
    IsExpense: boolean;
    Value: number;
}

export interface EntriesResponse extends Array<EntryResponse> {}

export interface EntriesRequest {
    description: string;
    isExpense: boolean;
    value: number;
}