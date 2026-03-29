const marked = require("marked");
const sanitizeHtmlLibrary = require('sanitize-html');
var TurndownService = require('turndown')

function sanitizeMarkDownContent(markdownContent){
    try{    
        var turndownService = new TurndownService()

        const convertedHtml = marked.parse(markdownContent);

        const sanitizedHtml = sanitizeHtmlLibrary(convertedHtml,{
            allowedTags: sanitizeHtmlLibrary.defaults.allowedTags
        });
        
        const sanitizedMarkdown= turndownService.turndown(sanitizedHtml);

        return sanitizedMarkdown;

    }catch(err){
        console.log(err);
        throw err;
    }
}
module.exports = sanitizeMarkDownContent;