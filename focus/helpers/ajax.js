/**
  * @desc An XMLHttpRequest wrapper
  * @param object {
  *    method (string) : 'POST' || 'GET' || 'PUT' || 'UPDATE' || 'DELETE'
  *    url (string) : the resource to reach
  *    onSuccess (xhr, response) : success callback
  *    onFailure (xhr) : failure callback
  *    data (string) : parameters
  * }
*/

var ajax = Focus.ajax = function(object) {

    var _method = object.method.toUpperCase() || 'GET';
    var _url = object.url;
    var _onSuccess = object.onSuccess || function() {};
    var _onFailure = object.onFailure || function() {};

    if (_method === 'GET' && object.data) {
        _url= _url+'?'+object.data;
        delete object.data;
    }

    var xhr = new XMLHttpRequest();
    xhr.open(_method, _url, true);

    if (object.contentType) {
        xhr.setRequestHeader('Content-type', object.contentType);
    }

    if (object.onProgress && typeof object.onProgress ==="function") {
        var _onprogress = function (evt) {
            object.onProgress(evt);
        };
        xhr.addEventListener("progress", _onprogress);

    }



    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4  ) {
            if (_onprogress) xhr.removeEventListener("progress", _onprogress);
            if ( xhr.status != 200) {
                _onFailure(xhr);
            } else if (xhr.status == 200) {
                _onSuccess(xhr, JSON.parse(xhr.responseText) );
                return true;
            }

            return false;
        }

    };

    xhr.send( object.data );

};
