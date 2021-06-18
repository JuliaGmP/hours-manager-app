/**
 *
 * @param {*} URL to fetch
 * @param {*} method GET/POST/PUT/...
 * @param  bodyReq request body
 * @param  params  url params
 * @param  token authorizathion token
 * @returns  response json
 * @author Adriller Ferreira
 */

export default async function customFetch(URL, method = "GET", bodyReq = null, params = null, token = null) {
    if (!URL) return { error: "invalid URL" };
    const finalURL = params ? URL + "/" + params : URL;
    let response;
    //console.log(finalURL)
    try {
        response = await fetch(finalURL, {
            method,
            // params:  params ? JSON.stringify(params) : null,
            body: bodyReq ? JSON.stringify(bodyReq) : null,
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        });
    } catch (e) {
        console.log(e);
        response = e;
    }
    let jsonResponse = response;
    if (response.headers && response.headers.get("Content-Type")) {
        if (response.headers.get("Content-Type").indexOf("application/json") > -1) {
            try {
                jsonResponse = await response.json();
            } catch (err) {
                jsonResponse = response;
            }
        }
    }
    return jsonResponse;
}
