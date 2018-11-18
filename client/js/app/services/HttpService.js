class HttpService
{
    get(url)
    {
        return this._base(url);
    }
    
    post(url)
    {
        return this._base(url, 'POST');
    }

    _base(url, verbo = 'GET')
    {
        let xhr = new XMLHttpRequest;

        return new Promise((resolve, reject) => {

            xhr.open(verbo, url);
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) 
                {
                    if (xhr.status == 200) resolve(JSON.parse(xhr.response));
                    else reject(xhr.response);
                }
            }

            xhr.send();
        });
    }
}