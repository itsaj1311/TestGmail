var axios = require('axios');
var qs = require('qs');

class GmailAPI{

    getAcceToken = async ()=>{

        var data = qs.stringify({
            'client_id': '762106376280-nnlrjkhidrohtgsmjgeph1dc9tqkrvvr.apps.googleusercontent.com',
            'client_secret': 'cZ1reRYPfjr5FmQO5jrPp7gH',
            'refresh_token': '1//0g1K-_xLFkvoVCgYIARAAGBASNwF-L9IrjFyfBmvL7lU4T3xVmaCZlfJL_oKWoR68CwU2eTLSkg0S6hnmbMfkOHWJ_ews6_WPsgk',
            'grant_type': 'refresh_token' 
          });
          var config = {
            method: 'post',
            url: 'https://accounts.google.com/o/oauth2/token',
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded', 
              'Cookie': '__Host-GAPS=1:e88aKkgqz9nqQ_sqcShtaqP6t_XqJg:t7UrQ0X33ovTHB_I'
            },
            data : data
          };
          
          let accessToken="";
          
          await axios(config)
          .then(async function (response) {            
            accessToken = await response.data.access_token;
          
            console.log("Access Token "+ accessToken);
          })
          .catch(function (error) {
            console.log(error);
          });

          return accessToken;
    }

    searchGmail = async ()=>{

        var config1 = {
            method: 'get',
            url: 'https://www.googleapis.com/gmail/v1/users/me/messages?q=from:itsaj1313@gmail.com',
            headers: { 
              'Authorization': `Bearer ${await this.getAcceToken()}`,
            }
          };
          
          await axios(config1)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
          
    }





}

module.exports= new GmailAPI();