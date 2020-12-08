/**
 * 3: Party time
 *
 * After reading the documentation make a request to https://reservation100-sandbox.mxapps.io/rest-doc/api
 * and print the response to the console. Use async-await and try/catch.
 *
 * Hints:
 * - make sure to use the correct headers and http method in the request
 */

const fetch = require("node-fetch");
let data = {
    name: "John Doe",
    numberOfPeople: 3,
};

async function makeReservation() {
    // YOUR CODE GOES IN HERE
    try {
        const response = await fetch("https://reservation100-sandbox.mxapps.io/rest-doc/api", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(data),
        });
        console.log(response);
    } catch (error) {
        console.log("something went wrong", error);
    }
}

makeReservation();
