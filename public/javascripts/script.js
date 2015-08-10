/**
 * Created by natalie on 8/10/2015.
 */


//Example 1: GET request with synchronous response
/*
var request = new XMLHttpRequest();
request.open("GET", "../package.json", false);  //when using false for the third argument, console does not log until the readyState === 4.
request.setRequestHeader("Content-Type", "application/json");
request.addEventListener('readystatechange', function () {
    console.log('ready state has changed to', request.readyState);
    // I can remove the condition that ready state be 4, because the method is blocked until the request state == 4 anyway (synchronous)
    //if (request.readyState === 4 && request.status === 200){
        console.log(JSON.parse(request.responseText));
   // }
});
request.send(null);
*/


// Example 2: form encoding
/*
function getEncoded (data) {
    var  arr = [];
    for (var key in data){
        arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    console.log(arr);
    url += '?' + arr.join('&');
    console.log(url);
}
*/

//Example 3: file upload
/*
document.addEventListener('DOMContentLoaded', function () {

    var btn = document.querySelector('button');
    var input_element = document.querySelector('input[type="file"]');

    btn.addEventListener('click', function () {

        var formdata = new FormData();
        var files = Array.prototype.slice.call(input_element.files);
        formdata = files.reduce(function (formdata, file) {
            formdata.append('info', file);
            return formdata;
        }, formdata);
        console.log(formdata);

        // make an ajax call and upload the data ...
        if (files.length) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/files/upload');
            xhr.addEventListener('readystatechange', function () {
                if (xhr.status === 200 && xhr.readyState === 4) {
                    console.log(xhr.responseText);
                }
            });
            xhr.send(formdata);
        }
    });
});
*/

//Example 4: abort request
var four = document.getElementById('four');

var button = document.createElement('button');
button.textContent = 'Abort Request';

four.appendChild(button);


var request = new XMLHttpRequest();
request.open("GET", "../package.json");
request.setRequestHeader("Content-Type", "application/json");
request.addEventListener('readystatechange', function () {
    button.addEventListener('click', function () {
        request.abort();
        if (request.readyState <= 3 && request.readyState > 0){
            console.log('Request was aborted');
        }
        else{
            console.log('Request could not be aborted in time');}
    });
    if (request.readyState === 4 && request.status === 200){
        console.log(JSON.parse(request.responseText));
    }
});
request.send(null);