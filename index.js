const puppeteer= require('puppeteer');

(async () => {
    let contractUrl='https://prefeitura.pbh.gov.br/saude/licitacao/pregao-eletronico-151-2020';
   
    /* Initiate the Puppeteer browser */
    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto(contractUrl, { waitUntil :'load', timeout: 0});

     /* Run javascript inside of the page */
  let data =  await page.evaluate(() =>{

        var k=document.querySelector('#block-views-block-view-noticia-pbh-block-5 > div > div > div > div > div > div.views-field.views-field-nothing > span').childNodes;
        let  PublicationDate = k[0].innerText;
        let BiddingDate = k[18].innerText;
        let Object = k[5].innerText;
        let links=document.querySelector('td:nth-child(2) > div > div > div > a').href;

        /* Returning an object filled with data */
        return{

        PublicationDate,
        BiddingDate,
        Object,
        links
        }


    }  );

    /* Output*/
    console.log(data);

    await browser.close();

})();