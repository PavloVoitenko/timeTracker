using AngleSharp;
using AngleSharp.Dom;
using AngleSharp.Html.Dom;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace TimeTracker.DataImport
{
    class DataExtractor
    {
        private const string DatePattern = @"([0-9]{2}[/.][0-9]{2})";
        private const string ContentRoute = "body a div span div";

        private IDocument _document;

        public DataExtractor(string content)
        {
            var config = Configuration.Default.WithDefaultLoader();
            var context = BrowsingContext.New(config);

            _document = context.OpenAsync(vr => vr.Content(content)).Result;
        }

        public IEnumerable<string> Lines()
        {
            var currentDatePrefix = GetDate(_document.QuerySelector<IHtmlDivElement>(ContentRoute));

            foreach (var element in _document.QuerySelectorAll<IHtmlDivElement>(ContentRoute))
            {
                if (element.ChildElementCount != 0 || element.TextContent.Contains("Author"))
                {
                    continue;
                }

                var parsedPrefix = GetDate(element);
                if (!string.IsNullOrEmpty(parsedPrefix))
                {
                    currentDatePrefix = parsedPrefix;
                    continue;
                }

                yield return GetLine(currentDatePrefix, element.TextContent);
            }
        }

        private string GetLine(string date, string content)
        {
            return $"{date}:{content.Trim()}\n";
        }

        private string GetDate(IHtmlElement node)
        {
            var result = string.Empty;

            if (node.ChildElementCount == 0)
            {
                var match = Regex.Match(node.TextContent, DatePattern);

                if (match.Success)
                {
                    result = match.Groups.Values.FirstOrDefault().Value;
                }
            }

            return result;
        }


    }
}
