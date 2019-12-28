import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";

import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: "root"
})
export class MembersService {
    private membersUrl = environment.membersApi;

    constructor(private http: HttpClient) {}

    getMembers() {
        return this.http.get<any[]>(this.membersUrl);
    }
}
