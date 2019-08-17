import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs";

/*
  Generated class for the AzureBackendProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AzureBackendProvider {
  testServer = '172.16.1.22:8080';
  mainURL: string = "http://52.176.108.222/";
  baseUrl: string = "http://45.222.194.54:4448/service";
  youtubeUrl =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCKJb-WIYA_f8Qbmsm5auxsQ&key=AIzaSyCK7LdOa5AradMLrdIao_d9EDXjbuIca0U&order=date";

  constructor(public http: Http) {
    console.log("Hello AzureBackendProvider Provider");
  }

  getNewsFeed(pageNumber) {
    return new Promise((resolve, reject) => {
      this.http
        .post(
          this.mainURL + "getNews?pageNumber=" + pageNumber + "&pageSize=10",
          ""
        )
        .subscribe(
          (res: any) => {
            let data = res.json();
            resolve(data.result);
          },
          (err: any) => {
            console.log("Show me what broke: ", err);
            reject(err);
          }
        );
    });
  }

  getYouTubeFeed() {
    return new Promise((resolve, reject) => {
      this.http.get(this.youtubeUrl).subscribe(
        (res: any) => {
          let data = res.json();
          resolve(data);
        },
        (err: any) => {
          console.log("What broke youtube call: ", err);
          reject(err);
        }
      );
    });
  }

  getInvoice(agentParams) {
    agentParams = {
      offset: agentParams.offset,
      limit: agentParams.limit,
      param: agentParams.agentIds
    };
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(
      "Authorization",
      "Bearer ae7df5cb-6cce-4dbe-ade9-97fce1e77c22"
    );
    headers.append("Accept", "application/json");
    return new Promise((resolve, reject) => {
      this.http
        .post(this.baseUrl + "/searchinvoicerequests", agentParams, {
          headers: headers
        })
        .subscribe(
          (res: any) => {
            let data = res.json();
            console.log("Testing the invoice call ", data);
            resolve(data);
          },
          err => {
            reject(err);
            console.log(err);
          }
        );
    });
  }

  getPaidForInvoice(agentParams) {
    agentParams = {
      offset: agentParams.offset,
      limit: agentParams.limit,
      param: agentParams.param
    }

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(
      "Authorization",
      "Bearer ae7df5cb-6cce-4dbe-ade9-97fce1e77c22"
    );
    headers.append("Accept", "application/json");
    headers.append('Access-Control-Allow-Origin', '*');
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/searchinvoice', agentParams, { headers: headers })
        .subscribe(
          (res: any) => {
            let data = res.json();
            let filteredData = data.result.filter(invoice => invoice.status === 'PD');
            if(res.status) {
            resolve(filteredData);

            }
          },
          (err) => {
            reject(err);
            console.error('Let me know what broke: ', err)
          }
        )
    })

  }

  agentLogin(agentParams) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(
      "Authorization",
      "Bearer ae7df5cb-6cce-4dbe-ade9-97fce1e77c22"
    );
    headers.append("Accept", "application/json");

    agentParams = {
      username: agentParams.username,
      password: agentParams.password,
      clientId: "nurs-agent-app"
    };
    return new Promise((resolve, reject) => {
      this.http
        .post(this.baseUrl + "/login", agentParams, { headers: headers })
        .subscribe(
          (res: any) => {
            let data = res.json();
            console.log("The response from the signup call: ", data);
            resolve(data);
          },
          (err: any) => {
            reject(err);
            console.log("What was the error : ", err);
          }
        );
    });
  }

  agentSendOtp(agentParams) {
    agentParams = {
      agentId: agentParams.agentId,
    };
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append(
      "Authorization",
      "Bearer ae7df5cb-6cce-4dbe-ade9-97fce1e77c22"
    );
    headers.append("Accept", "application/json");

    return new Promise((resolve, reject) => {
      this.http
        .post(this.baseUrl + "/agentsendotp", agentParams, {
          headers: headers
        })
        .subscribe(
          (res: any) => {
            let data = res.json();
            console.log("The response from the send OTP call: ", data);
            if (data.status) {
              resolve(data);
            } else {
              reject(data);
            }
          },
          err => {
            console.error("What broke: ", err);
            reject(err);
          }
        );
    });
  }

  agentVerifyOtp(agentParams) {
    agentParams = {
      agentId: agentParams.agentId,
      otp: agentParams.otp,
    };

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(
      "Authorization",
      "Bearer ae7df5cb-6cce-4dbe-ade9-97fce1e77c22"
    );
    headers.append("Accept", "application/json");

    return new Promise((resolve, reject) => {
      this.http
        .post(this.baseUrl + "/agentverifyotp", agentParams, {
          headers: headers
        })
        .subscribe(
          (res: any) => {
            let data = res.json();
            console.log("The response from the signup call: ", data);
            resolve(data);
          },
          (err: any) => {
            reject(err);
            console.log("What was the error : ", err);
          }
        );
    });
  }

  // ** The Search Vessel Data Call** //

  searchVessel(vesselParams) {
    vesselParams = {
      vesselParam: vesselParams.vessel
    };

    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append(
      "Authorization",
      "Bearer ae7df5cb-6cce-4dbe-ade9-97fce1e77c22"
    );
    headers.append("Accept", "application/json");

    return new Promise((resolve, reject) => {
      this.http
        .post(this.baseUrl + "/searchvessel", vesselParams, {
          headers: headers
        })
        .subscribe(
          (res: any) => {
            let data = res.json();

            switch (data.status) {
              case "404":
                reject(res);
                break;

              default:
                resolve(data);
                break;
            }

            console.log("The response from the vessel tracking call: ", data);
          },
          err => {
            reject(err);
            console.log("What was the error: ", err);
          }
        );
    });
  }

  // **Get the agent **//

  getAgent(agentParams) {
    agentParams = {
      agentId: agentParams.agentId
    }

    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append(
      "Authorization",
      "Bearer  ae7df5cb-6cce-4dbe-ade9-97fce1e77c22"
    );

    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/getagent', agentParams, {headers: headers}).subscribe((res: any) => {
        let data = res.json();

        resolve(data);
      },  (err) => {
        console.error('What is the error: ', err);
      })
    })

  }

  // ** Get Agent Image**//

  getAgentImage(imageProp) {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append(
      "Authorization",
      "Bearer  ae7df5cb-6cce-4dbe-ade9-97fce1e77c22"
    );

    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + imageProp,{headers: headers}).subscribe((res: any) => {
        if(res.status) {
          resolve(res);
        }
      }, (err) => {
        reject(err);
      })
    })
  }

  // ** The Booking Code Data Call**//

  searchBookingCode(bookingCodeParams) {
    bookingCodeParams = {
      bookingCode: bookingCodeParams.bookingCode
    };

    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append(
      "Authorization",
      "Bearer  ae7df5cb-6cce-4dbe-ade9-97fce1e77c22"
    );
    headers.append("Accept", "application/json");

    return new Promise((resolve, reject) => {
      this.http
        .post(this.baseUrl + "/getbookingcode", bookingCodeParams, {
          headers: headers
        })
        .subscribe(
          (res: any) => {
            let data = res.json();

            resolve(data);
          },
          err => {
            console.log("What is the error: ", err);
          }
        );
    });
  }
}
