class DateHelper
{
    static textoParaData(texto)
    {
        // fail-fast (falharemos rápido)
        if (!texto.match(/^\d{4}-\d{2}-\d{2}$/)) 
            throw new Error('Texto deve estar no formato aaaa-mm-dd');

        // spread operator ...
        return new Date(...
            texto.split('-').map((d,i) => d-i%2) // arrow functions
        );
    }

    static dataParaTexto(data)
    {
        let day = data.getDate();
        let month = data.getMonth() +1;

        day   =  day   < 10 ? '0' +  day : day;
        month =  month < 10 ? '0' +  month : month;
       
        // template string
        return `${day}/${month}/${data.getFullYear()}`;
    }
}