import axios from 'axios';
import fs from 'fs';
import { load } from 'cheerio';
import buildPrompt from '../functions/src/utils/prompt';

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

        for (let i = 0; i < 5; i++) {
            const feedbackElement = $('div.text ul li').eq(i);
            const feedbackText = feedbackElement.text().trim().slice(3);
            if(feedbackText) {
                jsonOutput[`feedback${i + 1}`] = feedbackText;
            }

            const pointText = $('span.points').eq(i).text().trim();
            if(pointText) {
                jsonOutput[`nota${i + 1}`] = parseInt(pointText);
            }
        }
        if (jsonOutput.feedback5 === undefined) {
            return null;
        }


        return {topic: customTitleText, text: textComposition, json: jsonOutput};
    }).catch(error => {
        console.log('An error occurred:', error);
        return {topic: error, text: error, json: error};

    });
}

const getLinksFromPage = async (pageUrl: string): Promise<string[]> => {
    const response = await axios.get(pageUrl);
    const $ = load(response.data);
    const links: string[] = [];
  
    $('article.rt-body div.rt-line-option a').each((i, element) => {
      const href = $(element).attr('href');
      if (href) links.push(href);
    });
  
    return links;
  };

const processLinks = async (pageUrl: string) => {
    const links = await getLinksFromPage(pageUrl);
    const promises = links.map(link => getJsonFromUrl(link));
    const results = await Promise.all(promises);
    const filteredResults = results.filter(result => result !== null);
    
    return filteredResults; 
};

const getLinksFromLocalPage = (filePath: string): string[] => {
    try {
        // Read the HTML file content
        const htmlContent = fs.readFileSync(filePath, 'utf8');
    
        // Load the HTML content into Cheerio
        const $ = load(htmlContent);

    
        // Extract the links
        const links: string[] = [];
        $('div.thumbnails-wrapper a').each((i, element) => {
            const href = $(element).attr('href');
            if (href) links.push(href);
        });
    
        return links;
    } catch (error) {
        console.error('An error occurred:', error);
        return [];
    }
};

type ResultType = { topic: string; text: string; json: any; } | null;

const processAllPagesInParallel = async (links: string[]): Promise<ResultType[]> => {
  const promises = links.map(link => processLinks(link));
  const resultsArrays: ResultType[][] = await Promise.all(promises);
  
  // Concatenate all the arrays into one
  const concatenatedResults: ResultType[] = ([] as ResultType[]).concat(...resultsArrays);
  return concatenatedResults;
};  

const fetchAndLogData = async () => {
    const filePath = 'page.html'; // Update this path to your local file
    const links = getLinksFromLocalPage(filePath);
    
    // Await the results
    const resultsArray = await processAllPagesInParallel(links);
    
    // Wrap the resultsArray in a JSON object
    const resultsObject = { results: resultsArray };
    
    return resultsObject;
};

const writeObjectsToJSONL = (objects: object[], filePath: string) => {
    const writeStream = fs.createWriteStream(filePath);
  
    objects.forEach(object => {
      const jsonString = JSON.stringify(object);
      writeStream.write(jsonString + '\n');
    });
  
    writeStream.end();
  };

const createPrompt = async () => {
    let trainingData = [];
    const result = await fetchAndLogData();
    for(let i = 0; i < result.results.length; i++) {
        const element = result.results[i];
        const promp = buildPrompt(element!.text, element!.topic);
        trainingData.push({prompt: promp, completion: JSON.stringify(element!.json)});
    }

    writeObjectsToJSONL(trainingData, 'trainingData.jsonl');
}

  
createPrompt();