import axios from 'axios';
import { load } from 'cheerio';

const getJsonFromUrl = async (url: string) => {
    return await axios.get(url).then(response => {
        const $ = load(response.data);
        let generalComment = '';
        let textComposition = $('div.container-composition h2').text().trim() + '\n';
        const jsonOutput: any = {};
        const customTitleText = $('i.custom-title').text().trim();

        $('.text-composition p').each((i, element) => {
            // Remove spans with the specific color
            $(element).find('span').each((j, span) => {
              if ($(span).css('color') === '#00b050') {
                $(span).text(''); // Remove the text content
              }
            });
            
            // Remove spaces before punctuation
            let paragraphText = $(element).text();
            paragraphText = paragraphText.replace(/ \./g, '.').replace(/ ,/g, ',').replace(/ !/g, '!').replace(/ \?/g, '?');
            textComposition += paragraphText + '\n';
          });

        // Extracting general comment
        $('div.text').each((i, div) => {
            generalComment = $(div).find('p').text().trim(); 
        });
        jsonOutput.feedback_geral = generalComment;

        // Extracting feedback items
        $('div.text ul li').each((i, element) => {
            if (i < 5) {
                const listItemText = $(element).text().trim().slice(3);
                jsonOutput[`feedback${i + 1}`] = listItemText;
            }
        });

        // Extracting points
        $('span.points').each((i, element) => {
            if (i < 5) { 
                const pointText = $(element).text().trim();
                jsonOutput[`nota${i + 1}`] = parseInt(pointText);
            }
        });


        return {topic: customTitleText, text: textComposition, json: jsonOutput};
    }).catch(error => {
        console.log('An error occurred:', error);
        return {error: error};
    });
}

const fetchAndLogData = async () => {
    const result = await getJsonFromUrl('https://educacao.uol.com.br/bancoderedacoes/redacoes/qualificacoes-para-o-mercado-de-trabalho.htm');
    console.log(result);
  };
  
  fetchAndLogData();