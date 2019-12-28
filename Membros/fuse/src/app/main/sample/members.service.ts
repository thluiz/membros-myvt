import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

    private membersUrl = "https://localhost:5001/api/members";

    constructor(private http: HttpClient) { }

    getMembers() {
        return this.http.get<any[]>(this.membersUrl);
    }
}
