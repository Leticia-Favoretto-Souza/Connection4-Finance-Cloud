const functions = require('@google-cloud/functions-framework');

functions.http('projetorInflacao', (req, res) => {
    // Configuração de CORS no GCP
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }

    const valorFinal = parseFloat(req.body.valorFinal);
    const tempoAnos = parseInt(req.body.tempo);
    
    // Simulação: IPCA médio de 4.5% ao ano
    const inflacaoAnual = 0.045; 
    
    if (valorFinal && tempoAnos) {
        // Desconta a inflação acumulada do valor final
        const perdaInflacao = valorFinal * Math.pow((1 - inflacaoAnual), tempoAnos);
        
        res.status(200).json({ 
            valorRealProjetado: perdaInflacao.toFixed(2),
            aviso: "Valor ajustado com base em IPCA fictício."
        });
    } else {
        res.status(400).send('Envie valorFinal e tempo no corpo da requisição.');
    }
});