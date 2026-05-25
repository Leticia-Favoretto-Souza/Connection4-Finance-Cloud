module.exports = async function (context, req) {
    const valorBRL = parseFloat(req.body.valorBRL);
    
    // Taxas de câmbio fictícias para simulação
    const taxaDolar = 5.10;
    const taxaEuro = 5.50;

    if (valorBRL) {
        const valorUSD = valorBRL / taxaDolar;
        const valorEUR = valorBRL / taxaEuro;

        context.res = {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: { 
                dolar: valorUSD.toFixed(2), 
                euro: valorEUR.toFixed(2) 
            }
        };
    } else {
        context.res = {
            status: 400,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: "Por favor, envie o valorBRL no corpo da requisição."
        };
    }
};